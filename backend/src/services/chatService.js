import { supabase, supabaseQuery } from '../config/supabase.js';

class ChatService {
    /**
   * Get or create active session for user
   */
    async getOrCreateSession(userId, sessionId, firstMessage = '') {
        if (sessionId) {
            const { data: session } = await supabase.from('epanen_chat_sessions').select('*').eq('id', sessionId).single();
            if (session) return session;
        }

        // Intelligent Title Generation
        let title = 'Percakapan Baru';
        if (firstMessage) {
            // Clean up message for title
            const cleanMsg = firstMessage.replace(/[^\w\s]/gi, '').trim();
            title = cleanMsg.substring(0, 40) + (cleanMsg.length > 40 ? '...' : '');
        }

        return await supabaseQuery.insert('epanen_chat_sessions', {
            user_id: userId,
            title
        });
    }

    /**
     * Get user specific memory
     */
    async getUserMemory(userId) {
        const { data } = await supabaseQuery.many('epanen_ai_memory', {
            where: [{ column: 'user_id', value: userId }]
        });
        return data || [];
    }

    /**
     * Update selective memory based on AI response and category
     */
    async updateMemory(userId, message, aiResult) {
        const { category } = aiResult;

        // Logic for what to remember: categorizing by focus areas
        const memoryUpdates = [];

        // Map categories to specific memory keys to avoid clutter
        const categoryMap = {
            'hama': 'pembahasan_hama',
            'budidaya': 'pembahasan_budidaya',
            'pasar': 'pembahasan_pasar',
            'teknologi': 'pembahasan_teknologi'
        };

        if (categoryMap[category]) {
            memoryUpdates.push({
                key: categoryMap[category],
                value: message.substring(0, 150)
            });
        }

        // Always keep track of the absolute last context for immediate reference
        memoryUpdates.push({
            key: 'konteks_terakhir',
            value: `User terakhir bertanya tentang ${category}: "${message.substring(0, 80)}"`
        });

        for (const mem of memoryUpdates) {
            await supabase.from('epanen_ai_memory').upsert({
                user_id: userId,
                key: mem.key,
                value: mem.value,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id,key' });
        }
    }

    /**
     * Update session details (title, summary)
     */
    async updateSession(sessionId, title, summary) {
        const updates = {};
        if (title) updates.title = title;
        if (summary) updates.context_summary = summary;
        updates.updated_at = new Date().toISOString();

        await supabase.from('epanen_chat_sessions')
            .update(updates)
            .eq('id', sessionId);
    }
}

export default new ChatService();
