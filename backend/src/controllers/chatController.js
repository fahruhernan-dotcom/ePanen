import { supabase, supabaseQuery } from '../config/supabase.js';

/**
 * Get all chat logs (Admin only)
 */
export const getAllChatLogs = async (req, res) => {
  try {
    const { page = 1, limit = 50, userId, category, startDate, endDate } = req.query;
    const offset = (page - 1) * limit;
    const from = offset;
    const to = offset + limit - 1;

    let query = supabase
      .from('epanen_chat_messages')
      .select('*, epanen_users(name, email)', { count: 'exact' });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    if (category) {
      query = query.eq('category', category);
    }

    if (startDate) {
      query = query.gte('created_at', startDate);
    }

    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data: messages, error, count } = await query;

    if (error) throw error;

    // Flatten user data into messages
    const flatMessages = (messages || []).map(msg => ({
      ...msg,
      user_name: msg.epanen_users?.name || null,
      user_email: msg.epanen_users?.email || null
    }));

    res.json({
      success: true,
      data: {
        messages: flatMessages,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all chat logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil chat logs'
    });
  }
};

/**
 * Get specific user's chat history (Admin)
 */
export const getUserChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    // Get user info
    const { data: user } = await supabase
      .from('epanen_users')
      .select('id, name, email, phone, created_at')
      .eq('id', userId)
      .single();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    // Get chat messages
    const { data: messages } = await supabase
      .from('epanen_chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    res.json({
      success: true,
      data: {
        user,
        messages: messages || [],
        totalMessages: (messages || []).length
      }
    });
  } catch (error) {
    console.error('Get user chat history error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil riwayat chat user'
    });
  }
};

/**
 * Get chat statistics (Admin)
 */
export const getChatStats = async (req, res) => {
  try {
    // Total messages
    const { count: totalMessages } = await supabase
      .from('epanen_chat_messages')
      .select('*', { count: 'exact', head: true });

    // Messages by role
    const { data: byRole } = await supabase
      .from('epanen_chat_messages')
      .select('role')
      .order('role');

    const roleCounts = {};
    (byRole || []).forEach(item => {
      roleCounts[item.role] = (roleCounts[item.role] || 0) + 1;
    });
    const byRoleArray = Object.entries(roleCounts).map(([role, count]) => ({ role, count }));

    // Messages by category
    const { data: byCategory } = await supabase
      .from('epanen_chat_messages')
      .select('category')
      .not('category', 'is', null)
      .order('category');

    const categoryCounts = {};
    (byCategory || []).forEach(item => {
      if (item.category) {
        categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
      }
    });
    const byCategoryArray = Object.entries(categoryCounts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);

    // Active users (users who sent messages in last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { count: activeUsers } = await supabase
      .from('epanen_chat_messages')
      .select('user_id', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo.toISOString());

    // Messages per day (last 7 days)
    const { data: messagesPerDay } = await supabase
      .from('epanen_chat_messages')
      .select('created_at')
      .gte('created_at', sevenDaysAgo.toISOString())
      .order('created_at', { ascending: false });

    const dayCounts = {};
    (messagesPerDay || []).forEach(msg => {
      const date = new Date(msg.created_at).toISOString().split('T')[0];
      dayCounts[date] = (dayCounts[date] || 0) + 1;
    });
    const messagesPerDayArray = Object.entries(dayCounts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => b.date.localeCompare(a.date));

    res.json({
      success: true,
      data: {
        totalMessages: totalMessages || 0,
        byRole: byRoleArray,
        byCategory: byCategoryArray,
        activeUsers: activeUsers || 0,
        messagesPerDay: messagesPerDayArray
      }
    });
  } catch (error) {
    console.error('Get chat stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil statistik chat'
    });
  }
};
