import { getDatabase } from '../config/database.js';

/**
 * Get all discussions
 */
export const getAllDiscussions = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    const db = getDatabase();
    const offset = (page - 1) * limit;

    let query = `
      SELECT d.*, u.name as author_name,
             (SELECT COUNT(*) FROM replies WHERE discussion_id = d.id) as reply_count
      FROM discussions d
      LEFT JOIN users u ON d.user_id = u.id
      WHERE d.status = 'active'
    `;
    const params = [];

    if (category) {
      query += ' AND d.category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (d.title LIKE ? OR d.content LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY d.updated_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const discussions = await db.all(query, params);

    res.json({
      success: true,
      data: { discussions }
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
    const db = getDatabase();

    // Increment views
    await db.run('UPDATE discussions SET views = views + 1 WHERE id = ?', [id]);

    // Get discussion
    const discussion = await db.get(
      `SELECT d.*, u.name as author_name
       FROM discussions d
       LEFT JOIN users u ON d.user_id = u.id
       WHERE d.id = ?`,
      [id]
    );

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: 'Diskusi tidak ditemukan'
      });
    }

    // Get replies
    const replies = await db.all(
      `SELECT r.*, u.name as author_name
       FROM replies r
       LEFT JOIN users u ON r.user_id = u.id
       WHERE r.discussion_id = ?
       ORDER BY r.created_at ASC`,
      [id]
    );

    res.json({
      success: true,
      data: { discussion, replies }
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
    const db = getDatabase();

    const result = await db.run(
      'INSERT INTO discussions (user_id, title, content, category) VALUES (?, ?, ?, ?)',
      [userId, title, content, category || 'general']
    );

    const newDiscussion = await db.get(
      `SELECT d.*, u.name as author_name
       FROM discussions d
       LEFT JOIN users u ON d.user_id = u.id
       WHERE d.id = ?`,
      [result.lastID]
    );

    res.status(201).json({
      success: true,
      message: 'Diskusi berhasil dibuat',
      data: { discussion: newDiscussion }
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
 * Add reply to discussion
 */
export const addReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    const db = getDatabase();

    const result = await db.run(
      'INSERT INTO replies (discussion_id, user_id, content) VALUES (?, ?, ?)',
      [id, userId, content]
    );

    // Update discussion timestamp
    await db.run(
      'UPDATE discussions SET updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [id]
    );

    const newReply = await db.get(
      `SELECT r.*, u.name as author_name
       FROM replies r
       LEFT JOIN users u ON r.user_id = u.id
       WHERE r.id = ?`,
      [result.lastID]
    );

    res.status(201).json({
      success: true,
      message: 'Balasan berhasil ditambahkan',
      data: { reply: newReply }
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
    const db = getDatabase();

    await db.run('DELETE FROM discussions WHERE id = ?', [id]);

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
    const db = getDatabase();

    await db.run('DELETE FROM replies WHERE id = ?', [id]);

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
