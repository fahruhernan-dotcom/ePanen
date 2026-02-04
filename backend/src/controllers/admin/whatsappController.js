import { supabaseQuery } from '../../config/supabase.js';

/**
 * Admin WhatsApp Controller (Refactored for Customer Table)
 * Manages relationships between Web Users and Customers
 */

// List all customers that have WhatsApp identities
export const getAllLinks = async (req, res) => {
    try {
        const { data: customers, count } = await supabaseQuery.many('customer', {
            order: { column: 'Created At', ascending: false }
        });

        // Enrich with user account data if linked
        const enrichedLinks = await Promise.all(customers.map(async (customer) => {
            let userName = null;
            if (customer.user_id) {
                const user = await supabaseQuery.one('epanen_users', {
                    where: [{ column: 'id', value: customer.user_id }]
                });
                userName = user?.name;
            }
            return {
                id: customer.id,
                user_id: customer.user_id,
                user_name: userName,
                wa_identity: customer['No Whatapps'],
                customer_name: customer.Nama,
                lead_score: customer['Lead Score'],
                location: customer['Location City'],
                status: customer.Status,
                created_at: customer['Created At']
            };
        }));

        return res.json({
            success: true,
            data: enrichedLinks,
            count
        });
    } catch (error) {
        console.error('Error fetching customers:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch customer links' });
    }
};

// Link a customer record to a web user
export const linkAccount = async (req, res) => {
    try {
        const { user_id, wa_identity } = req.body;

        if (!user_id || !wa_identity) {
            return res.status(400).json({ success: false, message: 'user_id and wa_identity are required' });
        }

        // Update the customer record that matches the WhatsApp identity
        await supabaseQuery.update('customer',
            { user_id },
            { where: [{ column: 'No Whatapps', value: wa_identity }] }
        );

        return res.json({
            success: true,
            message: 'Account linked successfully'
        });
    } catch (error) {
        console.error('Error linking account:', error);
        return res.status(500).json({ success: false, message: 'Failed to link account' });
    }
};

// Unlink account by clearing user_id in customer table
export const unlinkAccount = async (req, res) => {
    try {
        const { id } = req.params;

        await supabaseQuery.update('customer',
            { user_id: null },
            { where: [{ column: 'id', value: id }] }
        );

        return res.json({
            success: true,
            message: 'Account unlinked successfully'
        });
    } catch (error) {
        console.error('Error unlinking account:', error);
        return res.status(500).json({ success: false, message: 'Failed to unlink account' });
    }
};

// Global Automatic Sync: Match all customers with epanen_users by phone
export const syncAutoLinks = async (req, res) => {
    try {
        const { data: customers } = await supabaseQuery.many('customer', {
            where: [{ column: 'user_id', value: null, operator: 'is' }]
        });

        let syncCount = 0;
        const results = [];

        for (const customer of customers) {
            const waNumber = customer['No Whatapps'];
            if (!waNumber) continue;

            const cleanNumber = waNumber.replace(/^\+?62|^0/, '');

            const { data: matchedUsers } = await supabaseQuery.many('epanen_users', {
                where: [
                    { column: 'phone', value: `%${cleanNumber}`, operator: 'like' }
                ],
                limit: 1
            });

            if (matchedUsers && matchedUsers.length > 0) {
                await supabaseQuery.update('customer',
                    { user_id: matchedUsers[0].id },
                    { where: [{ column: 'id', value: customer.id }] }
                );
                syncCount++;
                results.push({ customer: customer.Nama, user: matchedUsers[0].name });
            }
        }

        return res.json({
            success: true,
            message: `Berhasil mensinkronisasi ${syncCount} akun secara otomatis.`,
            data: results
        });
    } catch (error) {
        console.error('Auto-sync error:', error);
        return res.status(500).json({ success: false, message: 'Gagal menjalankan auto-sync' });
    }
};
