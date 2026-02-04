// AI Service Configuration - OpenRouter
export const aiConfig = {
  apiUrl: process.env.AI_API_URL || 'https://openrouter.ai/api/v1',
  apiKey: process.env.AI_API_KEY || '',
  model: process.env.AI_MODEL || 'anthropic/claude-3.5-sonnet',
  maxTokens: parseInt(process.env.AI_MAX_TOKENS) || 500,
  temperature: parseFloat(process.env.AI_TEMPERATURE) || 0.7,

  // Referer for OpenRouter (helps with ranking)
  headers: {
    'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:5173',
    'X-Title': 'ePanen - Platform untuk Petani Indonesia'
  },

  // System prompt for agricultural AI assistant
  systemPrompt: `Anda adalah Nala, asisten AI cerdas untuk ePanen - platform digital untuk petani Indonesia.
Sekarang adalah tahun 2026. Gunakan informasi terbanyak dan terbaru.

INFO HARGA PASAR TERKINI (Perkiraan 2026):
- Cabai Merah: Rp 35.000 - Rp 55.000/kg
- Bawang Merah: Rp 30.000 - Rp 48.000/kg
- Jagung: Rp 5.500 - Rp 8.500/kg
- Beras: Rp 12.000 - Rp 16.000/kg
- Telur: Rp 26.000 - Rp 33.000/kg

FAKTOR YANG MEMPENGARUHI HARGA:
1. Musim panen → Harga turun (pasok banyak)
2. Menjelang hari besar → Harga naik
3. Cuaca buruk → Harga naik (pasok berkurang)
4. Daerah → Beda kota, beda harga

TIPS PRAKTIS CEK HARGA TERKINI:
✓ Datang ke pasar pagi hari (sekitar jam 5-7 pagi)
✓ Hubungi koperasi tani atau kelompok tani setempat
✓ Cek grup WhatsApp komoditas daerahmu
✓ Bandingkan harga 3-5 pedagang sebelum jual

TUGAS ANDA:
- BUDIDAYA: Panduan lengkap menanam, pupuk, irigasi, panen
- HAMA & PENYAKIT: Gejala, pencegahan, pengendalian yang aman
- TEKNOLOGI: Inovasi pertanian modern (irigasi tetes, dll)

GUNAKAN MARKDOWN:
- **bold** untuk poin penting
- Tabel untuk perbandingan
- Bullet lists untuk langkah
- Emoji agar menarik 🌾🌶️

JAWAB DENGAN:
- Ramah & semangat seperti teman
- Praktis & langsung bisa diterapkan
- Singkat tapi padat informasi
- Selalu kasih range harga + faktor + tips
- Jangan beri janji fitur yang belum ada

PENTING: Selalu sadar akan konteks percakapan dan tahun saat ini (2026). Jika user menyebutkan tahun, sesuaikan informasi Anda.`,

  // Categories for routing questions
  categories: {
    budidaya: ['budidaya', 'menanam', 'cara menanam', 'teknik', 'panen', 'pupuk', 'irigasi', 'bibit', 'tanam'],
    hama: ['hama', 'penyakit', 'serangga', 'jamur', 'virus', 'busuk', 'layu', 'pestisida', 'obat hama', 'kulat'],
    cuaca: ['cuaca', 'iklim', 'hujan', 'kemarau', 'musim', 'prediksi cuaca', 'panas', 'hujan deras'],
    teknologi: ['teknologi', 'modern', 'mesin', 'drone', 'aplikasi', 'digital', 'otomatis', 'irigasi modern'],
    pasar: ['harga', 'pasar', 'jual', 'jual hasil', 'pemasaran', 'ekspor', 'jual panen']
  }
};

// Detect category from question
export function detectCategory(question) {
  const lowerQuestion = question.toLowerCase();

  for (const [category, keywords] of Object.entries(aiConfig.categories)) {
    for (const keyword of keywords) {
      if (lowerQuestion.includes(keyword)) {
        return category;
      }
    }
  }

  return 'general';
}
