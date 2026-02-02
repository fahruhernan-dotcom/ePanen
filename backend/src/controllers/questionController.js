import { supabase, supabaseQuery } from '../config/supabase.js';
import aiService from '../services/aiService.js';

/**
 * Send message to AI (guest - no auth required)
 */
export const sendMessageGuest = async (req, res) => {
  try {
    const { message } = req.body;

    // Call AI service directly without saving to database
    const aiResult = await aiService.askAI(message, []);

    res.json({
      success: true,
      data: {
        userMessage: message,
        aiResponse: aiResult.response,
        category: aiResult.category,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Send message (guest) error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengirim pesan'
    });
  }
};

/**
 * Send message to AI
 */
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    // Save user message
    await supabaseQuery.insert('epanen_chat_messages', {
      user_id: userId,
      role: 'user',
      message
    });

    // Get chat history for context (last 10 messages)
    const { data: chatHistory } = await supabaseQuery.many('epanen_chat_messages', {
      where: [{ column: 'user_id', value: userId }],
      order: { column: 'created_at', ascending: true },
      limit: 10
    });

    // Call AI service
    const aiResult = await aiService.askAI(message, chatHistory.data || []);

    // Save AI response
    await supabaseQuery.insert('epanen_chat_messages', {
      user_id: userId,
      role: 'assistant',
      message: aiResult.response,
      category: aiResult.category
    });

    // Log activity
    await supabaseQuery.insert('epanen_activity_logs', {
      user_id: userId,
      action: 'ask_question',
      entity_type: 'chat',
      entity_id: userId,
      details: `Category: ${aiResult.category}`
    });

    res.json({
      success: true,
      data: {
        userMessage: message,
        aiResponse: aiResult.response,
        category: aiResult.category,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengirim pesan'
    });
  }
};

/**
 * Get user's chat history
 */
export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: messages } = await supabaseQuery.many('epanen_chat_messages', {
      where: [{ column: 'user_id', value: userId }],
      order: { column: 'created_at', ascending: true },
      limit: 100
    });

    res.json({
      success: true,
      data: { messages: messages.data || [] }
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil riwayat chat'
    });
  }
};

/**
 * Get specific chat session
 */
export const getChatSession = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: messages } = await supabaseQuery.many('epanen_chat_messages', {
      where: [{ column: 'user_id', value: userId }],
      order: { column: 'created_at', ascending: true }
    });

    res.json({
      success: true,
      data: { messages: messages.data || [] }
    });
  } catch (error) {
    console.error('Get chat session error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil sesi chat'
    });
  }
};

/**
 * Delete chat history
 */
export const clearChatHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    await supabaseQuery.delete('epanen_chat_messages', {
      where: [{ column: 'user_id', value: userId }]
    });

    res.json({
      success: true,
      message: 'Riwayat chat berhasil dihapus'
    });
  } catch (error) {
    console.error('Clear chat history error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus riwayat chat'
    });
  }
};
