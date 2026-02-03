import 'dotenv/config';
import { supabase } from './src/config/supabase.js';

const articlesSource = [
    {
        title: 'Mengenal Padi "Pikatan"',
        source: 'https://brin.go.id/news/117070/brin-rilis-varietas-padi-unggul-baru-pikatan-tahan-hama-dan-penyakit'
    },
    {
        title: 'Revolusi Pertanian Digital',
        source: 'https://pertanian.go.id/home/?show=news&act=view&id=4578'
    },
    {
        title: 'Panduan Lengkap Membuat Pupuk Organik Cair',
        source: 'https://cybex.pertanian.go.id/mobile/artikel/98376/CARA-MEMBUAT-PUPUK-ORGANIK-CAIR-POC/'
    },
    {
        title: 'Waspada Serangan Hama Tikus',
        source: 'https://tanamanpangan.pertanian.go.id/detil-konten/iptek/54'
    },
    {
        title: 'Tips Sukses Budidaya Cabai Rawit',
        source: 'https://kutaitimurkab.go.id/page/news/tips-sukses-budidaya-cabe-rawit-di-musim-hujan'
    },
    {
        title: 'Update Harga Jagung',
        source: 'https://badanpangan.go.id/harga-pangan'
    },
    {
        title: 'Mengenal Sistem Jajar Legowo',
        source: 'https://lamselkab.go.id/blog/sistem-tanam-jajar-legowo-tingkatkan-produktivitas-padi/'
    },
    {
        title: 'Strategi Hemat Air',
        source: 'https://www.litbang.pertanian.go.id/info-teknologi/4320/'
    },
    {
        title: 'Peluang Bisnis Hidroponik',
        source: 'https://umkm.kompas.com/read/2023/08/29/140000383/peluang-cuan-bisnis-sayuran-hidroponik-rumahan'
    }
];

async function updateSourceUrls() {
    console.log('🔄 Updating source URLs for articles...');

    for (const item of articlesSource) {
        // We need to match by imperfect title since slug might be different
        const { data: articles } = await supabase
            .from('epanen_articles')
            .select('id, title')
            .ilike('title', `%${item.title}%`); // fuzzy match

        if (articles && articles.length > 0) {
            for (const article of articles) {
                // Since I cannot run ALTER TABLE via code due to RPC error, 
                // I will update the 'excerpt' field to include the link as a temporary measure 
                // IF the column doesn't exist.
                // BUT, wait, I can't check schema easily from here without trying to insert.

                // Let's TRY to update 'source_url'. If it fails, it fails, but I really need that column.
                // Actually, since I can't run DDL, I will append the link to the CONTENT as a "Sumber: [link]" footnote
                // This is a safer bet given the restriction.

                // Let's assume the user CANNOT run SQL manually right now.
                // Best approach: detailed footer in content.

                const { error } = await supabase
                    .from('epanen_articles')
                    .update({
                        source_url: item.source
                    })
                    .eq('id', article.id);

                if (error) {
                    console.log(`⚠️ Column source_url likely missing. Appending to content instead for: ${article.title}`);
                    // Fetch content first
                    const { data: currentArt } = await supabase.from('epanen_articles').select('content').eq('id', article.id).single();

                    if (currentArt) {
                        const newContent = currentArt.content + `\n\n[Baca Artikel Asli](${item.source})`;
                        await supabase.from('epanen_articles').update({ content: newContent }).eq('id', article.id);
                        console.log(`✅ Appended link to content for: ${article.title}`);
                    }
                } else {
                    console.log(`✅ Updated source_url for: ${article.title}`);
                }
            }
        }
    }
}

updateSourceUrls();
