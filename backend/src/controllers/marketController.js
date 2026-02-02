import { getDatabase } from '../config/database.js';

/**
 * Get commodity prices
 */
export const getCommodityPrices = async (req, res) => {
  try {
    const { category, location, search } = req.query;
    const db = getDatabase();

    let query = 'SELECT * FROM commodity_prices WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (location) {
      query += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }

    if (search) {
      query += ' AND name LIKE ?';
      params.push(`%${search}%`);
    }

    query += ' ORDER BY date DESC';

    const prices = await db.all(query, params);

    // Group by commodity name for latest prices
    const latestPrices = {};
    prices.forEach(price => {
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
    const db = getDatabase();

    const result = await db.run(
      `INSERT INTO commodity_prices (name, category, price, unit, location, trend, date)
       VALUES (?, ?, ?, ?, ?, ?, CURRENT_DATE)`,
      [name, category, price, unit, location || null, trend]
    );

    const newPrice = await db.get('SELECT * FROM commodity_prices WHERE id = ?', [result.lastID]);

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
    const db = getDatabase();

    await db.run('DELETE FROM commodity_prices WHERE id = ?', [id]);

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
    const db = getDatabase();

    const trends = await db.all(
      `SELECT date, price, location
       FROM commodity_prices
       WHERE name = ?
       AND date >= date('now', '-${days} days')
       ORDER BY date ASC`,
      [name]
    );

    res.json({
      success: true,
      data: { trends }
    });
  } catch (error) {
    console.error('Get price trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil tren harga'
    });
  }
};
