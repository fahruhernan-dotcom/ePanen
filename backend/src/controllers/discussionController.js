import { supabase } from '../config/supabase.js';

/**
 * Get all discussions
 */
export const getAllDiscussions = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('epanen_discussions')
      .select(`
        *,
        author:epanen_users(name)
      `, { count: 'exact' });

    // If not admin, only show active
    if (!req.user || req.user.role !== 'admin') {
      query = query.eq('status', 'active');
    }

    if (category) {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    const { data: discussions, error, count } = await query
      .order('updated_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    // Get reply counts for each
    const discussionsWithCount = await Promise.all(
      (discussions || []).map(async (d) => {
        const { count: replyCount } = await supabase
          .from('epanen_replies')
          .select('*', { count: 'exact', head: true })
          .eq('discussion_id', d.id);

        return {
          ...d,
          author_name: d.author?.name || 'User',
          reply_count: replyCount || 0
        };
      })
    );

    res.json({
      success: true,
      data: {
        discussions: discussionsWithCount,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get discussions error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil diskusi'
    });
  }
};

/**
 * Get discussion by ID with replies
 */
export const getDiscussionById = async (req, res) => {
  try {
    const { id } = req.params;

    // Increment views
    await supabase.rpc('increment_discussion_views', { discussion_id: id }).catch(() => {
      // Fallback if RPC not available
      supabase.from('epanen_discussions').update({ views: supabase.raw('views + 1') }).eq('id', id).catch(() => { });
    });

    // Get discussion
    const { data: discussion, error } = await supabase
      .from('epanen_discussions')
      .select(`
        *,
        author:epanen_users(name)
      `)
      .eq('id', id)
      .single();

    if (error || !discussion) {
      return res.status(404).json({
        success: false,
        message: 'Diskusi tidak ditemukan'
      });
    }

    // Get replies
    const { data: replies } = await supabase
      .from('epanen_replies')
      .select(`
        *,
        author:epanen_users(name)
      `)
      .eq('discussion_id', id)
      .order('created_at', { ascending: true });

    const formattedDiscussion = {
      ...discussion,
      author_name: discussion.author?.name || 'User'
    };

    const formattedReplies = (replies || []).map(r => ({
      ...r,
      author_name: r.author?.name || 'User'
    }));

    res.json({
      success: true,
      data: {
        discussion: formattedDiscussion,
        replies: formattedReplies
      }
    });
  } catch (error) {
    console.error('Get discussion error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil diskusi'
    });
  }
};

/**
 * Create discussion
 */
export const createDiscussion = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const userId = req.user.id;

    const { data: newDiscussion, error } = await supabase
      .from('epanen_discussions')
      .insert({
        user_id: userId,
        title,
        content,
        category: category || 'general'
      })
      .select(`
        *,
        author:epanen_users(name)
      `)
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Diskusi berhasil dibuat',
      data: {
        discussion: {
          ...newDiscussion,
          author_name: newDiscussion.author?.name || 'User'
        }
      }
    });
  } catch (error) {
    console.error('Create discussion error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat membuat diskusi'
    });
  }
};

/**
 * Update discussion
 */
export const updateDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;
    const userId = req.user.id;

    // Check authorship
    const { data: discussion, error: fetchError } = await supabase
      .from('epanen_discussions')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !discussion) {
      return res.status(404).json({ success: false, message: 'Diskusi tidak ditemukan' });
    }

    if (discussion.user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Tidak memiliki akses untuk mengubah diskusi ini' });
    }

    const { data: updatedDiscussion, error } = await supabase
      .from('epanen_discussions')
      .update({
        title,
        content,
        category,
        is_edited: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        *,
        author:epanen_users(name)
      `)
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Diskusi berhasil diperbarui',
      data: {
        discussion: {
          ...updatedDiscussion,
          author_name: updatedDiscussion.author?.name || 'User'
        }
      }
    });
  } catch (error) {
    console.error('Update discussion error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memperbarui diskusi'
    });
  }
};

/**
 * Get stats for logged in user
 */
export const getMyDiscussionStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const { count, error } = await supabase
      .from('epanen_discussions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (error) throw error;

    res.json({
      success: true,
      data: {
        discussion_count: count || 0
      }
    });
  } catch (error) {
    console.error('Get user discussion stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil statistik diskusi'
    });
  }
};

/**
 * Add reply to discussion
 */
export const addReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const { data: newReply, error } = await supabase
      .from('epanen_replies')
      .insert({
        discussion_id: id,
        user_id: userId,
        content
      })
      .select(`
        *,
        author:epanen_users(name)
      `)
      .single();

    if (error) throw error;

    // Update discussion timestamp
    await supabase
      .from('epanen_discussions')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', id);

    res.status(201).json({
      success: true,
      message: 'Balasan berhasil ditambahkan',
      data: {
        reply: {
          ...newReply,
          author_name: newReply.author?.name || 'User'
        }
      }
    });
  } catch (error) {
    console.error('Add reply error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menambah balasan'
    });
  }
};

/**
 * Delete discussion (Admin or author)
 */
export const deleteDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    // Check if admin or author
    const { data: discussion } = await supabase
      .from('epanen_discussions')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!discussion) {
      return res.status(404).json({ success: false, message: 'Diskusi tidak ditemukan' });
    }

    if (userRole !== 'admin' && discussion.user_id !== userId) {
      return res.status(403).json({ success: false, message: 'Tidak memiliki akses' });
    }

    const { error } = await supabase
      .from('epanen_discussions')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Diskusi berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete discussion error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus diskusi'
    });
  }
};

/**
 * Delete reply
 */
export const deleteReply = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    // Check if admin or author
    const { data: reply } = await supabase
      .from('epanen_replies')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!reply) {
      return res.status(404).json({ success: false, message: 'Balasan tidak ditemukan' });
    }

    if (userRole !== 'admin' && reply.user_id !== userId) {
      return res.status(403).json({ success: false, message: 'Tidak memiliki akses' });
    }

    const { error } = await supabase
      .from('epanen_replies')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Balasan berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete reply error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus balasan'
    });
  }
};
