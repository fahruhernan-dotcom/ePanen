import axios from 'axios';
import { supabaseQuery } from '../config/supabase.js';

/**
 * n8n Service for WhatsApp Integration
 * Connects ePanen web platform with existing n8n WhatsApp workflows
 */

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || '';
const N8N_API_KEY = process.env.N8N_API_KEY || '';

class N8nService {
  /**
   * Send message to n8n for WhatsApp delivery
   * @param {Object} data - Message data
   */
  async sendToWhatsApp(data) {
    if (!N8N_WEBHOOK_URL) {
      console.log('N8N_WEBHOOK_URL not set, skipping n8n integration');
      return { success: false, message: 'n8n not configured' };
    }

    try {
      const payload = {
        ...data,
        source: 'epanen-web',
        timestamp: new Date().toISOString()
      };

      const response = await axios.post(N8N_WEBHOOK_URL, payload, {
        headers: {
          'Content-Type': 'application/json',
          ...(N8N_API_KEY && { 'Authorization': `Bearer ${N8N_API_KEY}` })
        }
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error sending to n8n:', error.message);
      return {
        success: false,
        message: error.message
      };
    }
  }

  /**
   * Forward web chat to WhatsApp (via n8n)
   * @param {number} userId - User ID
   * @param {string} message - Message content
   * @param {string} phoneNumber - WhatsApp number (optional)
   */
  async forwardChatToWhatsApp(userId, message, phoneNumber = null) {
    // Get user data including phone if available
    const user = await supabaseQuery.one('epanen_users', {
      where: [{ column: 'id', value: userId }]
    });

    const phone = phoneNumber || user?.phone;

    if (!phone) {
      console.log('No phone number available, cannot send to WhatsApp');
      return { success: false, message: 'No phone number' };
    }

    return await this.sendToWhatsApp({
      type: 'chat_message',
      phone: phone,
      message: message,
      user_id: userId,
      user_name: user?.name
    });
  }

  /**
   * Sync new user from web to WhatsApp system
   * @param {Object} user - User data
   */
  async syncUserToWhatsApp(user) {
    return await this.sendToWhatsApp({
      type: 'new_user',
      user_id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone
    });
  }

  /**
   * Broadcast announcement to WhatsApp users
   * @param {string} message - Announcement message
   * @param {Array} userPhones - Array of phone numbers
   */
  async broadcastToWhatsApp(message, userPhones = []) {
    return await this.sendToWhatsApp({
      type: 'broadcast',
      message: message,
      recipients: userPhones
    });
  }

  /**
   * Send price alert to WhatsApp
   * @param {Object} priceData - Price information
   */
  async sendPriceAlert(priceData) {
    const message = `ℹ️ Update Harga ${priceData.name}:\nRp ${priceData.price.toLocaleString('id-ID')}/${priceData.unit}\nLokasi: ${priceData.location || 'Nasional'}\nTrend: ${priceData.trend === 'up' ? '📈 Naik' : priceData.trend === 'down' ? '📉 Turun' : '➡️ Stabil'}`;

    return await this.sendToWhatsApp({
      type: 'price_alert',
      message: message,
      commodity: priceData.name,
      price: priceData.price,
      location: priceData.location
    });
  }

  /**
   * Handle incoming webhook from n8n (WhatsApp → Web)
   * This stores WhatsApp messages in ePanen database
   */
  async handleIncomingWhatsAppMessage(payload) {
    try {
      const {
        wa_identity,
        phone,
        message,
        pushName
      } = payload;

      const whatsappNumber = wa_identity || phone;

      // 1. Find or Create record in the Customer Table
      let customer = await supabaseQuery.one('customer', {
        where: [{ column: 'No Whatapps', value: whatsappNumber }]
      }).catch(() => null);

      if (!customer) {
        // Create new customer if not exists
        customer = await supabaseQuery.insert('customer', {
          'No Whatapps': whatsappNumber,
          'Nama': pushName || 'New WhatsApp Lead',
          'Status': 'new',
          'Created At': new Date().toISOString()
        });
        console.log('🆕 Created new customer for:', whatsappNumber);
      }

      let userId = customer.user_id;

      // 1.5 Auto-Link Logic: If no user_id is set, try to match by phone
      if (!userId) {
        console.log('🔍 Attempting auto-link for:', whatsappNumber);

        // For auto-linking, we need the raw digits to match with user profiles
        // Handle WAHA JID format: 6282133859391:56@s.whatsapp.net -> 6282133859391
        const rawNumber = whatsappNumber.split('@')[0].split(':')[0];
        const cleanNumber = rawNumber.replace(/^\+?62|^0/, '');

        // Search in epanen_users for a matching phone
        const { data: matchedUsers } = await supabase.from('epanen_users')
          .select('id, name')
          .or(`phone.like.%${cleanNumber},phone.eq.${whatsappNumber}`);

        if (matchedUsers && matchedUsers.length > 0) {
          userId = matchedUsers[0].id;
          // Persist the link in customer table
          await supabaseQuery.update('customer',
            { user_id: userId },
            { where: [{ column: 'id', value: customer.id }] }
          );
          console.log(`✅ Auto-linked WhatsApp ${whatsappNumber} to User: ${matchedUsers[0].name}`);
        }
      }

      // 2. Fetch User metadata (optional but useful)
      let userName = customer.Nama;
      if (userId) {
        const user = await supabaseQuery.one('epanen_users', {
          where: [{ column: 'id', value: userId }]
        });
        if (user) userName = user.name;
      }

      // 2. Extract clean text for Web Dashboard while preserving JSON for logs
      let rawContent = message || payload; // payload contains the full object if n8n sends it
      let displayText = "";
      let fullJson = {};

      if (typeof rawContent === 'object') {
        fullJson = rawContent;
        // Extract content if it exists
        let contentStr = rawContent.content || JSON.stringify(rawContent);
        // Smart extract: if it follows "Pesan user saat ini: '...'" pattern
        const match = contentStr.match(/Pesan user saat ini: "([^"]+)"/i);
        displayText = match ? match[1] : contentStr;
      } else {
        displayText = String(rawContent);
        fullJson = { role: 'user', text: displayText, timestamp: new Date().toISOString() };
      }

      // 3. Save to epanen_chat_messages (Web Dashboard - Clean Text)
      const chatMessage = await supabaseQuery.insert('epanen_chat_messages', {
        user_id: userId || 0,
        customer_id: customer.id,
        role: 'user',
        message: displayText,
        category: 'whatsapp'
      });

      // 4. ALSO Save to specialized WhatsApp chat_history table (Full JSON)
      await supabaseQuery.insert('chat_history', {
        session_id: whatsappNumber,
        message: fullJson
      }).catch(err => console.warn('⚠️ chat_history save failed:', err.message));

      return {
        success: true,
        user_id: userId,
        customer_id: customer.id,
        message_id: chatMessage.id,
        clean_text: displayText
      };
    } catch (error) {
      console.error('Error handling WhatsApp message:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }

  /**
   * Get AI response and send back via n8n to WhatsApp
   * @param {number} userId - User ID
   * @param {string} message - User message
   */
  async processWhatsAppChat(userId, message) {
    try {
      // Get chat history
      const { data: chatHistory } = await supabaseQuery.many('epanen_chat_messages', {
        where: [{ column: 'user_id', value: userId }],
        order: { column: 'created_at', ascending: true },
        limit: 10
      });

      // Call AI service
      const aiService = (await import('../services/aiService.js')).default;
      const aiResult = await aiService.askAI(message, chatHistory.data || []);

      // Save AI response
      await supabaseQuery.insert('epanen_chat_messages', {
        user_id: userId,
        role: 'assistant',
        message: aiResult.response,
        category: aiResult.category
      });

      // Get user's primary or latest WhatsApp identity from customer table
      const customers = await supabaseQuery.many('customer', {
        where: [{ column: 'user_id', value: userId }],
        limit: 1
      });

      const targetIdentity = customers.data?.[0]?.['No Whatapps'];

      // ALSO Save AI Response to specialized WhatsApp chat_history table
      if (targetIdentity) {
        await supabaseQuery.insert('chat_history', {
          session_id: targetIdentity,
          message: {
            role: 'assistant',
            text: aiResult.response,
            timestamp: new Date().toISOString()
          }
        }).catch(err => console.warn('⚠️ chat_history AI save failed:', err.message));
      }

      // Update Memory Keys
      if (aiResult.memory) {
        for (const [key, value] of Object.entries(aiResult.memory)) {
          await supabaseQuery.update('epanen_ai_memory',
            { value: String(value), updated_at: new Date() },
            {
              where: [
                { column: 'user_id', value: userId },
                { column: 'key', value: key }
              ]
            }
          ).catch(async () => {
            // If doesn't exist, insert
            await supabaseQuery.insert('epanen_ai_memory', {
              user_id: userId,
              key: key,
              value: String(value)
            });
          });
        }
      }

      // Send response back to WhatsApp via n8n
      if (targetIdentity) {
        await this.sendToWhatsApp({
          type: 'ai_response',
          wa_identity: targetIdentity,
          message: aiResult.response,
          category: aiResult.category
        });
      }

      return {
        success: true,
        ai_response: aiResult.response
      };
    } catch (error) {
      console.error('Error processing WhatsApp chat:', error);
      return {
        success: false,
        message: error.message
      };
    }
  }
}

export default new N8nService();
