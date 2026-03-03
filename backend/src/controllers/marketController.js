import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase } from '../config/supabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Get commodity prices
 */
// ... (keep existing getCommodityPrices, updateCommodityPrice, deleteCommodityPrice, getPriceTrends)

/**
 * Internal function to perform the sync
 */
export const performSync = async () => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, '../../scripts/fetch_prices.py');
    console.log(`[Job] Running background sync: python "${scriptPath}"`);

    exec(`python "${scriptPath}"`, async (error, stdout, stderr) => {
      if (error) {
        console.error('[Job] Exec error:', error);
        return reject(error);
      }

      try {
        const prices = JSON.parse(stdout);
        if (prices.error) return reject(new Error(prices.error));

        console.log(`[Job] Fetched ${prices.length} commodities. Updating database...`);

        for (const price of prices) {
          const { data: existing } = await supabase
            .from('epanen_commodity_prices')
            .select('id')
            .match({ name: price.name, date: price.date, location: price.location })
            .maybeSingle();

          if (existing) {
            await supabase
              .from('epanen_commodity_prices')
              .update({
                price: price.price,
                trend: price.trend,
                unit: price.unit
              })
              .eq('id', existing.id);
          } else {
            await supabase
              .from('epanen_commodity_prices')
              .insert(price);
          }
        }
        console.log(`[Job] Background sync completed successfully (${prices.length} items)`);
        resolve(prices.length);
      } catch (parseError) {
        console.error('[Job] Parse error:', parseError);
        reject(parseError);
      }
    });
  });
};

/**
 * Sync commodity prices from external source (Python script)
 */
export const syncCommodityPrices = async (req, res) => {
  try {
    const count = await performSync();
    res.json({
      success: true,
      message: `Berhasil sinkronisasi ${count} data komoditas`,
      count
    });
  } catch (error) {
    console.error('Sync prices error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Terjadi kesalahan saat sinkronisasi harga'
    });
  }
};

// Start background job (every 6 hours)
setInterval(() => {
  performSync().catch(err => console.error('[Job] Scheduled sync failed:', err));
}, 6 * 60 * 60 * 1000);
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

    const isAdminView = req.path.includes('/admin/');

    if (isAdminView) {
      return res.json({
        success: true,
        data: {
          prices: prices || []
        }
      });
    }

    // Group by commodity name for latest prices (for public/farmer view)
    // Since it's ordered by date DESC, the first one for each name is the latest
    const processedPrices = {};
    (prices || []).forEach(price => {
      const key = `${price.name}_${price.location}`; // Group by name and location
      if (!processedPrices[key]) {
        processedPrices[key] = { ...price, previous_price: null };
      } else if (processedPrices[key].previous_price === null) {
        // The second one we encounter is the "yesterday" or previous recorded price
        processedPrices[key].previous_price = price.price;
      }
    });

    res.json({
      success: true,
      data: {
        prices: Object.values(processedPrices)
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
