import { supabase, supabaseQuery } from '../config/supabase.js';
import aiService from '../services/aiService.js';
import chatService from '../services/chatService.js';
import { detectCategory } from '../config/ai.js';

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
    const { message, sessionId } = req.body;
    const userId = req.user.id;

    // 1. Get or Create Session
    const session = await chatService.getOrCreateSession(userId, sessionId, message);
    const currentSessionId = session.id;

    // 2. Load Long-term Memory & Short-term History
    const [userMemory, chatHistoryRes] = await Promise.all([
      chatService.getUserMemory(userId),
      supabaseQuery.many('epanen_chat_messages', {
        where: [
          { column: 'user_id', value: userId },
          { column: 'session_id', value: currentSessionId }
        ],
        order: { column: 'created_at', ascending: false },
        limit: 3
      })
    ]);

    const history = (chatHistoryRes.data || []).reverse();

    // 3. Save User Message
    await supabaseQuery.insert('epanen_chat_messages', {
      user_id: userId,
      session_id: currentSessionId,
      role: 'user',
      message
    });

    // 4. Call AI with Full Context (Prompt + Memory + History)
    const aiResult = await aiService.askAI(message, history, userMemory);

    // 5. Save AI Response
    await supabaseQuery.insert('epanen_chat_messages', {
      user_id: userId,
      session_id: currentSessionId,
      role: 'assistant',
      message: aiResult.response,
      category: aiResult.category
    });

    // 6. Update Knowledge Memory (Post-process)
    await chatService.updateMemory(userId, message, aiResult);

    // 7. Dynamic Session Title Update (if first or generic)
    if (!sessionId || session.title === 'Percakapan Baru') {
      const newTitle = message.substring(0, 35) + (message.length > 35 ? '...' : '');
      await chatService.updateSession(currentSessionId, newTitle);
    }

    // Log Activity
    await supabaseQuery.insert('epanen_activity_logs', {
      user_id: userId,
      action: 'ask_question',
      entity_type: 'chat',
      entity_id: userId,
      details: `Category: ${aiResult.category}, Session: ${currentSessionId}`
    });

    res.json({
      success: true,
      data: {
        sessionId: currentSessionId,
        userMessage: message,
        aiResponse: aiResult.response,
        category: aiResult.category,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('CRITICAL ERROR in sendMessage:', {
      userId,
      sessionId,
      message: error.message,
      stack: error.stack,
      details: error.response?.data || error
    });
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan internal. Mohon coba beberapa saat lagi.'
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
