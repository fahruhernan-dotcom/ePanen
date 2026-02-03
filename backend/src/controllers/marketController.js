import { supabase } from '../config/supabase.js';

/**
 * Get commodity prices
 */
export const getCommodityPrices = async (req, res) => {
  try {
    const { category, location, search } = req.query;

    let query = supabase
      .from('epanen_commodity_prices')
      .select('*');

    if (category) {
      query = query.eq('category', category);
    }

    if (location) {
      query = query.ilike('location', `%${location}%`);
    }

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    const { data: prices, error } = await query.order('date', { ascending: false });

    if (error) throw error;

    // Group by commodity name for latest prices
    const latestPrices = {};
    (prices || []).forEach(price => {
      if (!latestPrices[price.name] || new Date(price.date) > new Date(latestPrices[price.name].date)) {
        latestPrices[price.name] = price;
      }
    });

    res.json({
      success: true,
      data: {
        prices: Object.values(latestPrices)
      }
    });
  } catch (error) {
    console.error('Get prices error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil harga komoditas'
    });
  }
};

/**
 * Add/update commodity price (Admin only)
 */
export const updateCommodityPrice = async (req, res) => {
  try {
    const { name, category, price, unit, location, trend = 'stable' } = req.body;

    const { data: newPrice, error } = await supabase
      .from('epanen_commodity_prices')
      .insert({
        name,
        category,
        price,
        unit,
        location: location || null,
        trend,
        date: new Date().toISOString().split('T')[0]
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Harga komoditas berhasil ditambahkan',
      data: { price: newPrice }
    });
  } catch (error) {
    console.error('Update price error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengupdate harga komoditas'
    });
  }
};

/**
 * Delete commodity price (Admin only)
 */
export const deleteCommodityPrice = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('epanen_commodity_prices')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Harga komoditas berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete price error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus harga komoditas'
    });
  }
};

/**
 * Get price trends for a commodity
 */
export const getPriceTrends = async (req, res) => {
  try {
    const { name } = req.params;
    const { days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const { data: trends, error } = await supabase
      .from('epanen_commodity_prices')
      .select('date, price, location')
      .eq('name', name)
      .gte('date', startDate.toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (error) throw error;

    res.json({
      success: true,
      data: { trends: trends || [] }
    });
  } catch (error) {
    console.error('Get price trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil tren harga'
    });
  }
};
