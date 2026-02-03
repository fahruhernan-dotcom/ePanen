import { supabase } from '../config/supabase.js';

/**
 * Get dashboard statistics (Admin only)
 */
export const getDashboardStats = async (req, res) => {
  try {
    // Total users (farmers only)
    let totalUsers = 0;
    try {
      const { count } = await supabase
        .from('epanen_users')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'farmer');
      totalUsers = count || 0;
    } catch (err) { console.error('Error fetching total users:', err.message); }

    // Active users (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    let activeUsers = 0;
    try {
      const { data: activeUsersData } = await supabase
        .from('epanen_chat_messages')
        .select('user_id')
        .gte('created_at', sevenDaysAgo);
      activeUsers = new Set(activeUsersData?.map(m => m.user_id) || []).size;
    } catch (err) { console.error('Error fetching active users:', err.message); }

    // Total questions asked (user messages)
    let totalQuestions = 0;
    try {
      const { count } = await supabase
        .from('epanen_chat_messages')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'user');
      totalQuestions = count || 0;
    } catch (err) { console.error('Error fetching total questions:', err.message); }

    // Total articles published
    let totalArticles = 0;
    try {
      const { count } = await supabase
        .from('epanen_articles')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'published');
      totalArticles = count || 0;
    } catch (err) { console.error('Error fetching total articles:', err.message); }

    // Total discussions
    let totalDiscussions = 0;
    try {
      const { count } = await supabase
        .from('epanen_discussions')
        .select('*', { count: 'exact', head: true });
      totalDiscussions = count || 0;
    } catch (err) { console.error('Error fetching total discussions:', err.message); }

    // Messages this week
    let messagesThisWeek = 0;
    try {
      const { count } = await supabase
        .from('epanen_chat_messages')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo);
      messagesThisWeek = count || 0;
    } catch (err) { console.error('Error fetching weekly messages:', err.message); }

    // New users this month
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    let newUsersThisMonth = 0;
    try {
      const { count } = await supabase
        .from('epanen_users')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo)
        .eq('role', 'farmer');
      newUsersThisMonth = count || 0;
    } catch (err) { console.error('Error fetching monthly new users:', err.message); }

    // AI usage by category
    let byCategory = [];
    try {
      const { data: aiByCategory } = await supabase
        .from('epanen_chat_messages')
        .select('category')
        .eq('role', 'assistant')
        .not('category', 'is', null);

      const categoryCounts = {};
      (aiByCategory || []).forEach(msg => {
        const cat = msg.category || 'Umum';
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      });

      byCategory = Object.entries(categoryCounts)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count);
    } catch (err) { console.error('Error fetching category stats:', err.message); }

    // Messages per day (last 7 days)
    let messagesPerDayArray = [];
    try {
      const { data: messagesData } = await supabase
        .from('epanen_chat_messages')
        .select('role, created_at')
        .gte('created_at', sevenDaysAgo)
        .order('created_at', { ascending: true });

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

      messagesPerDayArray = Object.values(messagesPerDay)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (err) { console.error('Error fetching daily messages:', err.message); }

    // Top viewed articles
    let topArticles = [];
    try {
      const { data } = await supabase
        .from('epanen_articles')
        .select('id, title, views, category')
        .eq('status', 'published')
        .order('views', { ascending: false })
        .limit(5);
      topArticles = data || [];
    } catch (err) { console.error('Error fetching top articles:', err.message); }

    // Popular discussions
    let discussionsWithReplies = [];
    try {
      const { data: discussionsData } = await supabase
        .from('epanen_discussions')
        .select('id, title, views')
        .eq('status', 'active')
        .order('views', { ascending: false })
        .limit(5);

      discussionsWithReplies = await Promise.all(
        (discussionsData || []).map(async (d) => {
          const { count } = await supabase
            .from('epanen_replies')
            .select('*', { count: 'exact', head: true })
            .eq('discussion_id', d.id);
          return { ...d, replies: count || 0 };
        })
      );
    } catch (err) { console.error('Error fetching top discussions:', err.message); }

    // Recent activity (last 20)
    let formattedActivity = [];
    try {
      const { data: recentActivity } = await supabase
        .from('epanen_activity_logs')
        .select(`
          *,
          user:epanen_users(name)
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      formattedActivity = (recentActivity || []).map(log => ({
        ...log,
        user_name: log.user?.name || 'System'
      }));
    } catch (err) { console.error('Error fetching recent activity:', err.message); }

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
