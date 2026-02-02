import { supabase } from '../config/supabase.js';

/**
 * Get all articles
 */
export const getAllArticles = async (req, res) => {
  try {
    const { category, status = 'published', page = 1, limit = 20, search } = req.query;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('epanen_articles')
      .select('id, title, slug, excerpt, category, image, views, created_at', { count: 'exact' })
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    const { data: articles, error, count } = await query.range(from, to);

    if (error) throw error;

    res.json({
      success: true,
      data: {
        articles,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          totalPages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil artikel'
    });
  }
};

/**
 * Get article by ID or slug
 */
export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    // Increment views
    await db.run('UPDATE articles SET views = views + 1 WHERE id = ?', [id]);

    const article = await db.get(
      'SELECT * FROM articles WHERE id = ? OR slug = ?',
      [id, id]
    );

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Artikel tidak ditemukan'
      });
    }

    res.json({
      success: true,
      data: { article }
    });
  } catch (error) {
    console.error('Get article error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil artikel'
    });
  }
};

/**
 * Create article (Admin only)
 */
export const createArticle = async (req, res) => {
  try {
    const { title, content, excerpt, category_id, image, status = 'draft' } = req.body;
    const db = getDatabase();
    const adminId = req.user.id;

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const result = await db.run(
      `INSERT INTO articles (title, slug, content, excerpt, category_id, author_id, image, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, content, excerpt || null, category_id || null, adminId, image || null, status]
    );

    const newArticle = await db.get('SELECT * FROM articles WHERE id = ?', [result.lastID]);

    res.status(201).json({
      success: true,
      message: 'Artikel berhasil dibuat',
      data: { article: newArticle }
    });
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat membuat artikel'
    });
  }
};

/**
 * Update article (Admin only)
 */
export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, category_id, image, status } = req.body;
    const db = getDatabase();

    let updateFields = [];
    let updateValues = [];

    if (title) {
      updateFields.push('title = ?');
      updateValues.push(title);
    }

    if (content) {
      updateFields.push('content = ?');
      updateValues.push(content);
    }

    if (excerpt !== undefined) {
      updateFields.push('excerpt = ?');
      updateValues.push(excerpt);
    }

    if (category_id !== undefined) {
      updateFields.push('category_id = ?');
      updateValues.push(category_id);
    }

    if (image !== undefined) {
      updateFields.push('image = ?');
      updateValues.push(image);
    }

    if (status) {
      updateFields.push('status = ?');
      updateValues.push(status);
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateValues.push(id);

    await db.run(
      `UPDATE articles SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    const updatedArticle = await db.get('SELECT * FROM articles WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Artikel berhasil diperbarui',
      data: { article: updatedArticle }
    });
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengupdate artikel'
    });
  }
};

/**
 * Delete article (Admin only)
 */
export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    await db.run('DELETE FROM articles WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Artikel berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus artikel'
    });
  }
};

/**
 * Get all categories
 */
export const getAllCategories = async (req, res) => {
  try {
    const db = getDatabase();

    const categories = await db.all(
      "SELECT id, name, slug, type FROM categories ORDER BY name ASC"
    );

    res.json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil kategori'
    });
  }
};
