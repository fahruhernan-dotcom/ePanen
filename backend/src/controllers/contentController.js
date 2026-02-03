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

    // Increment views (Simplified for stability)
    // We can add this back later once we confirm the basic fetch works
    // supabase.rpc('increment_article_views', { article_id: id }).catch(console.error);

    let query = supabase
      .from('epanen_articles')
      .select('*'); // Just select all columns

    // Check if id is numeric (ID) or string (slug)
    if (!isNaN(id)) {
      query = query.eq('id', id);
    } else {
      query = query.eq('slug', id);
    }

    const { data: article, error } = await query.maybeSingle();

    if (error) throw error;

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Artikel tidak ditemukan'
      });
    }

    // Assign default author name since we removed the join
    article.author_name = 'Admin ePanen';

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
    const { title, content, excerpt, category_id, category, image, status = 'draft' } = req.body;
    const authorId = req.user.id;

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') + '-' + Date.now().toString().slice(-4);

    const { data: newArticle, error } = await supabase
      .from('epanen_articles')
      .insert({
        title,
        slug,
        content,
        excerpt,
        category, // Use category name directly as schema uses 'category' text column
        author_id: authorId,
        image,
        status
      })
      .select()
      .single();

    if (error) throw error;

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
    const updates = { ...req.body, updated_at: new Date() };

    // Remove fields that shouldn't be updated directly or don't exist
    delete updates.id;
    delete updates.created_at;

    const { data: updatedArticle, error } = await supabase
      .from('epanen_articles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

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

    const { error } = await supabase
      .from('epanen_articles')
      .delete()
      .eq('id', id);

    if (error) throw error;

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
    const { data: categories, error } = await supabase
      .from('epanen_categories')
      .select('id, name, slug, type')
      .order('name', { ascending: true });

    if (error) throw error;

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
