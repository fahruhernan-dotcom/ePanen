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
        phone,
        message,
        message_from, // customer name from n8n
        session_id
      } = payload;

      // Find or create user by phone number
      let user = await supabaseQuery.one('epanen_users', {
        where: [{ column: 'phone', value: phone }]
      });

      // If user doesn't exist, you might want to create them
      // or link to existing customer table
      if (!user) {
        // Option 1: Create new user
        // Option 2: Link to existing customer from your database
        console.log('User not found for phone:', phone);
        return { success: false, message: 'User not found' };
      }

      // Save WhatsApp message to chat history
      const chatMessage = await supabaseQuery.insert('epanen_chat_messages', {
        user_id: user.id,
        role: 'user',
        message: message,
        category: 'whatsapp'
      });

      return {
        success: true,
        user_id: user.id,
        message_id: chatMessage.id
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

      // Get user phone
      const user = await supabaseQuery.one('epanen_users', {
        where: [{ column: 'id', value: userId }]
      });

      // Send response back to WhatsApp via n8n
      if (user?.phone) {
        await this.sendToWhatsApp({
          type: 'ai_response',
          phone: user.phone,
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
