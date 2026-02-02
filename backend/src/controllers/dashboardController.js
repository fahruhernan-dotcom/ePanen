import { supabase } from '../config/database.js';

/**
 * Get dashboard statistics (Admin only)
 */
export const getDashboardStats = async (req, res) => {
  try {
    // Total users (farmers only)
    const { count: totalUsers, error: usersError } = await supabase
      .from('epanen_users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'farmer');

    if (usersError) throw usersError;

    // Active users (last 7 days) - count DISTINCT user_id
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: activeUsersData, error: activeError } = await supabase
      .from('epanen_chat_messages')
      .select('user_id')
      .gte('created_at', sevenDaysAgo);

    if (activeError) throw activeError;

    // Count unique users
    const activeUsers = new Set(activeUsersData?.map(m => m.user_id) || []).size;

    // Total questions asked (user messages)
    const { count: totalQuestions, error: questionsError } = await supabase
      .from('epanen_chat_messages')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'user');

    if (questionsError) throw questionsError;

    // Total articles published
    const { count: totalArticles, error: articlesError } = await supabase
      .from('epanen_articles')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published');

    if (articlesError) throw articlesError;

    // Total discussions
    const { count: totalDiscussions, error: discussionsError } = await supabase
      .from('epanen_discussions')
      .select('*', { count: 'exact', head: true });

    if (discussionsError) throw discussionsError;

    // Messages this week
    const { count: messagesThisWeek, error: weekError } = await supabase
      .from('epanen_chat_messages')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo);

    if (weekError) throw weekError;

    // New users this month
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const { count: newUsersThisMonth, error: monthError } = await supabase
      .from('epanen_users')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo)
      .eq('role', 'farmer');

    if (monthError) throw monthError;

    // AI usage by category
    const { data: aiByCategory, error: categoryError } = await supabase
      .from('epanen_chat_messages')
      .select('category')
      .eq('role', 'assistant')
      .not('category', 'is', null);

    if (categoryError) throw categoryError;

    // Group by category manually
    const categoryCounts = {};
    (aiByCategory || []).forEach(msg => {
      const cat = msg.category || 'Umum';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    const byCategory = Object.entries(categoryCounts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);

    // Recent activity (last 20)
    const { data: recentActivity, error: activityError } = await supabase
      .from('epanen_activity_logs')
      .select(`
        *,
        user:epanen_users!epanen_activity_logs_user_id_fkey(name)
      `)
      .order('created_at', { ascending: false })
      .limit(20);

    if (activityError) throw activityError;

    const formattedActivity = (recentActivity || []).map(log => ({
      ...log,
      user_name: log.user?.name || 'System'
    }));

    // Messages per day (last 7 days)
    const { data: messagesData, error: perDayError } = await supabase
      .from('epanen_chat_messages')
      .select('role, created_at')
      .gte('created_at', sevenDaysAgo)
      .order('created_at', { ascending: true });

    if (perDayError) throw perDayError;

    // Group by date
    const messagesPerDay = {};
    (messagesData || []).forEach(msg => {
      const date = new Date(msg.created_at).toISOString().split('T')[0];
      if (!messagesPerDay[date]) {
        messagesPerDay[date] = { date, user_messages: 0, ai_responses: 0 };
      }
      if (msg.role === 'user') {
        messagesPerDay[date].user_messages++;
      } else if (msg.role === 'assistant') {
        messagesPerDay[date].ai_responses++;
      }
    });

    const messagesPerDayArray = Object.values(messagesPerDay)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    // Top viewed articles
    const { data: topArticles, error: topArticlesError } = await supabase
      .from('epanen_articles')
      .select('id, title, views, category')
      .eq('status', 'published')
      .order('views', { ascending: false })
      .limit(5);

    if (topArticlesError) throw topArticlesError;

    // Popular discussions with reply count
    const { data: discussionsData, error: discussionsDataError } = await supabase
      .from('epanen_discussions')
      .select('id, title, views')
      .eq('status', 'active')
      .order('views', { ascending: false })
      .limit(5);

    if (discussionsDataError) throw discussionsDataError;

    // Get reply counts for each discussion
    const discussionsWithReplies = await Promise.all(
      (discussionsData || []).map(async (d) => {
        const { count } = await supabase
          .from('epanen_replies')
          .select('*', { count: 'exact', head: true })
          .eq('discussion_id', d.id);
        return {
          ...d,
          replies: count || 0
        };
      })
    );

    res.json({
      success: true,
      data: {
        overview: {
          totalUsers: totalUsers || 0,
          activeUsers: activeUsers || 0,
          totalQuestions: totalQuestions || 0,
          totalArticles: totalArticles || 0,
          totalDiscussions: totalDiscussions || 0,
          messagesThisWeek: messagesThisWeek || 0,
          newUsersThisMonth: newUsersThisMonth || 0
        },
        aiUsage: {
          byCategory,
          messagesPerDay: messagesPerDayArray
        },
        recentActivity: formattedActivity,
        topContent: {
          articles: topArticles || [],
          discussions: discussionsWithReplies || []
        }
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil statistik dashboard'
    });
  }
};

/**
 * Get user management data (Admin)
 */
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 50, search, status } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('epanen_users')
      .select('id, name, email, phone, role, status, created_at', { count: 'exact' })
      .eq('role', 'farmer');

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    if (status) {
      query = query.eq('status', status);
    }

    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: users, count, error } = await query;

    if (error) throw error;

    // Get message counts for each user
    const usersWithCounts = await Promise.all(
      (users || []).map(async (user) => {
        const { count } = await supabase
          .from('epanen_chat_messages')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        return {
          ...user,
          total_messages: count || 0
        };
      })
    );

    res.json({
      success: true,
      data: {
        users: usersWithCounts,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data user'
    });
  }
};

/**
 * Update user status (Admin)
 */
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { error } = await supabase
      .from('epanen_users')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: `Status user berhasil diperbarui menjadi ${status}`
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengupdate status user'
    });
  }
};
