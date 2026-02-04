<template>
  <div class="space-y-16 md:space-y-28 pb-24 overflow-x-hidden transition-colors duration-300">
    
    <!-- Premium Hero Section -->
    <section class="relative min-h-[85vh] flex items-center pt-10 md:pt-16">
      <div class="container-custom relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <!-- Text Content -->
          <div class="space-y-10 animate-slide-up" style="animation-delay: 0.1s">
            <div class="inline-flex items-center space-x-3 bg-white/80 dark:bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-gray-100 dark:border-white/10 shadow-lg">
              <span class="flex h-3 w-3 relative">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-epanen-secondary opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-epanen-secondary"></span>
              </span>
              <span class="text-[11px] font-black text-epanen-primary dark:text-epanen-accent uppercase tracking-[0.2em]">Platform Tani Digital #1 Indonesia</span>
            </div>

            <h1 class="text-5xl md:text-7xl lg:text-8xl font-black leading-[1] tracking-tight text-main dark:text-white dark:drop-shadow-[0_4px_20px_rgba(255,255,255,0.15)]">
              <span>Revolusi</span> <br/>
              <span class="text-gradient decoration-clone">Pertanian</span>
            </h1>

            <p class="text-xl md:text-2xl text-muted dark:text-emerald-50 max-w-xl leading-relaxed font-bold">
              Berdayakan lahan Anda dengan kecerdasan buatan. Konsultasi AI, pantau harga pasar, dan bangun komunitas petani modern hanya dalam satu genggaman.
            </p>

            <div class="flex flex-wrap gap-6 pt-2">
              <router-link to="/chat" class="px-10 py-5 bg-epanen-primary text-white rounded-[2rem] font-black shadow-2xl hover:bg-epanen-dark transition-all transform hover:-translate-y-2 premium-shadow flex items-center group">
                Konsultasi Nala AI
                <svg class="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </router-link>
              <router-link to="/register" v-if="!isAuthenticated" class="px-10 py-5 bg-white dark:bg-white/5 text-epanen-primary dark:text-white rounded-[2rem] font-black border-2 border-epanen-primary/10 hover:border-epanen-primary transition-all transform hover:-translate-y-2 flex items-center shadow-xl">
                Gabung Gratis
              </router-link>
            </div>

            <!-- Stats Mini -->
            <div class="flex items-center space-x-12 pt-10 border-t-2 border-gray-100 dark:border-white/5">
              <div>
                <p class="text-3xl font-black text-epanen-primary dark:text-epanen-accent tracking-tighter">5,000+</p>
                <p class="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Petani Aktif</p>
              </div>
              <div>
                <p class="text-3xl font-black text-epanen-primary dark:text-epanen-accent tracking-tighter">98%</p>
                <p class="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Akurasi AI</p>
              </div>
            </div>
          </div>

          <!-- Hero Illustration Image -->
          <div class="relative lg:block animate-slide-up" style="animation-delay: 0.3s">
            <div class="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white dark:border-white/10 group">
              <img src="/src/assets/images/hero.png" alt="Futuristic Farming" class="w-full h-auto transform group-hover:scale-105 transition-transform duration-[2s]" />
              <!-- Floating Glass Overlay -->
              <div class="absolute bottom-10 left-10 right-10 glass-panel p-8 rounded-[2.5rem] animate-float shadow-2xl border-2 border-white/50">
                <div class="flex items-center space-x-5">
                  <div class="w-14 h-14 bg-epanen-secondary rounded-2xl flex items-center justify-center shadow-lg">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-[10px] font-black text-epanen-primary uppercase tracking-[0.3em]">Nala AI Pro</p>
                    <p class="text-lg font-black text-gray-900 dark:text-white leading-tight">Analisis Lahan Real-Time Aktif</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Background Blobs -->
            <div class="absolute -top-20 -right-20 w-80 h-80 bg-epanen-accent/30 rounded-full blur-[100px] -z-10 animate-bloom"></div>
            <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-200/40 rounded-full blur-[80px] -z-10"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Essential Features Grid -->
    <section class="container-custom relative">
      <!-- Background Glow for Section -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-epanen-primary/5 rounded-[10rem] blur-[100px] -z-10"></div>

      <div class="text-center space-y-5 mb-20 animate-slide-up">
        <h2 class="text-[12px] font-black text-epanen-secondary uppercase tracking-[0.5em]">Layanan Kami</h2>
        <p class="text-4xl md:text-6xl font-black text-main dark:text-white tracking-tight">Solusi Digital <span class="text-gradient">Terpadu</span></p>
      </div>

      <!-- Feature Cards with Automatic Staggered Slide In & Scale on Click -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Feature 1: AI Chat -->
        <div class="animate-slide-in-right" style="animation-delay: 0.1s">
          <router-link 
            to="/chat" 
            class="bg-white dark:bg-[#0D140D] p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 block hover:-translate-y-4 active:scale-110 group border-2 border-transparent dark:border-white/5 hover:border-epanen-primary/30 animate-float-slow overflow-hidden relative"
            style="animation-delay: 0s"
          >
            <div class="absolute -right-4 -top-4 w-24 h-24 bg-epanen-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <div class="w-20 h-20 bg-gradient-to-br from-epanen-primary to-epanen-secondary rounded-[1.8rem] flex items-center justify-center mb-8 shadow-xl group-hover:rotate-12 transition-all duration-500">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 class="text-2xl font-black text-main dark:text-white mb-4">Nala AI</h3>
            <p class="text-muted dark:text-emerald-100 font-bold leading-relaxed mb-8">Konsultasi cerdas 24 jam untuk menjawab keluhan tanaman Anda.</p>
            <div class="flex items-center text-epanen-primary dark:text-epanen-accent font-black text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
              Mulai Tanya
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 12h14m-7-7l7 7-7 7" stroke-width="3"/></svg>
            </div>
          </router-link>
        </div>

        <!-- Feature 2: Knowledge -->
        <div class="animate-slide-in-right" style="animation-delay: 0.2s">
          <router-link 
            to="/articles" 
            class="bg-white dark:bg-[#0D140D] p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 block hover:-translate-y-4 active:scale-110 group border-2 border-transparent dark:border-white/5 hover:border-amber-500/30 animate-float-slow overflow-hidden relative"
            style="animation-delay: 1s"
          >
            <div class="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <div class="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-[1.8rem] flex items-center justify-center mb-8 shadow-xl group-hover:rotate-12 transition-all duration-500">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-2xl font-black text-main dark:text-white mb-4">Wawasan</h3>
            <p class="text-muted dark:text-emerald-100 font-bold leading-relaxed mb-8">Perdalam ilmu budidaya dari para pakar pertanian Indonesia.</p>
            <div class="flex items-center text-amber-600 dark:text-amber-400 font-black text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
              Baca Artikel
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 12h14m-7-7l7 7-7 7" stroke-width="3"/></svg>
            </div>
          </router-link>
        </div>

        <!-- Feature 3: Prices -->
        <div class="animate-slide-in-right" style="animation-delay: 0.3s">
          <router-link 
            to="/prices" 
            class="bg-white dark:bg-[#0D140D] p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 block hover:-translate-y-4 active:scale-110 group border-2 border-transparent dark:border-white/5 hover:border-blue-500/30 animate-float-slow overflow-hidden relative"
            style="animation-delay: 2s"
          >
            <div class="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-[1.8rem] flex items-center justify-center mb-8 shadow-xl group-hover:rotate-12 transition-all duration-500">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-2xl font-black text-main dark:text-white mb-4">Harga Pasar</h3>
            <p class="text-muted dark:text-emerald-100 font-bold leading-relaxed mb-8">Update harga komoditas terkini untuk transaksi yang adil.</p>
            <div class="flex items-center text-blue-600 dark:text-blue-400 font-black text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
              Cek Harga
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 12h14m-7-7l7 7-7 7" stroke-width="3"/></svg>
            </div>
          </router-link>
        </div>

        <!-- Feature 4: Community -->
        <div class="animate-slide-in-right" style="animation-delay: 0.4s">
          <router-link 
            to="/discussions" 
            class="bg-white dark:bg-[#0D140D] p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 block hover:-translate-y-4 active:scale-110 group border-2 border-transparent dark:border-white/5 hover:border-purple-500/30 animate-float-slow overflow-hidden relative"
            style="animation-delay: 3s"
          >
            <div class="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-[1.8rem] flex items-center justify-center mb-8 shadow-xl group-hover:rotate-12 transition-all duration-500">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-2xl font-black text-main dark:text-white mb-4">Forum</h3>
            <p class="text-muted dark:text-emerald-100 font-bold leading-relaxed mb-8">Ruang diskusi terbuka untuk bertukar pengalaman bertani.</p>
            <div class="flex items-center text-purple-600 dark:text-purple-400 font-black text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
              Gabung Diskusi
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 12h14m-7-7l7 7-7 7" stroke-width="3"/></svg>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Dynamic AI Promo Section -->
    <section class="container-custom">
      <div class="relative bg-gray-900 dark:bg-[#0D140D] rounded-[4rem] overflow-hidden shadow-2xl group border-2 border-white/10">
        <div class="grid grid-cols-1 lg:grid-cols-2 items-center">
          
          <!-- Column 1: Text Content -->
          <div class="p-10 md:p-20 relative z-20 space-y-10">
            <h2 class="text-4xl md:text-6xl font-black text-white leading-[1.1]">
              Ada Keluhan Hama <br/>
              Dan <span class="text-epanen-accent underline decoration-epanen-primary/30">Penyakit?</span>
            </h2>
            <p class="text-xl text-emerald-50/70 font-bold leading-relaxed max-w-xl">
              Nala AI dapat mengenali gejala secara presisi dan memberikan rekomendasi penanganan berbasis sains pertanian secara instan.
            </p>
            <div class="flex flex-col sm:flex-row gap-5">
               <div class="bg-white/10 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/20 text-white font-black flex items-center shadow-lg">
                  <span class="w-2.5 h-2.5 bg-red-500 rounded-full mr-3 animate-pulse"></span> Deteksi Hama Instan
               </div>
               <div class="bg-white/10 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/20 text-white font-black flex items-center shadow-lg">
                  <span class="w-2.5 h-2.5 bg-green-500 rounded-full mr-3 animate-pulse"></span> Solusi Pemupukan
               </div>
            </div>
            <router-link to="/chat" class="inline-flex px-12 py-6 bg-epanen-accent text-epanen-dark rounded-[2.5rem] font-black text-lg shadow-2xl hover:bg-white transition-all transform hover:scale-105 active:scale-95">
              Konsultasi Sekarang
            </router-link>
          </div>

          <!-- Column 2: Image Illustration (Responsive) -->
          <div class="relative h-[400px] lg:h-full lg:min-h-[650px] overflow-hidden">
             <!-- Gradient Overlay to blend with text side -->
             <div class="absolute inset-0 bg-gradient-to-r from-gray-900 dark:from-[#0D140D] via-transparent to-transparent z-10 hidden lg:block"></div>
             <img 
               src="/src/assets/images/ai-avatar.png" 
               alt="Nala AI Robot" 
               class="absolute h-full w-full object-cover object-[center_top] lg:object-center transform group-hover:scale-105 transition-transform duration-[4s]" 
             />
          </div>
        </div>
      </div>
    </section>

    <!-- Beautiful Quote Section -->
    <section class="container-custom pb-16">
       <div class="max-w-5xl mx-auto text-center space-y-10 py-24 px-10 relative bg-epanen-primary/5 dark:bg-white/5 rounded-[5rem] border-2 border-dashed border-epanen-primary/10">
          <div class="absolute -top-12 left-1/2 -translate-x-1/2 text-[15rem] leading-none text-epanen-primary/5 font-serif select-none pointer-events-none">“</div>
          <h2 class="text-3xl md:text-5xl font-black text-epanen-primary dark:text-epanen-accent italic leading-[1.3] relative z-10">
            "Pertanian adalah fondasi peradaban. Dengan teknologi, kita merawat masa depan agar tetap hijau dan berdaya."
          </h2>
          <div class="flex flex-col items-center justify-center space-y-4">
             <div class="w-24 h-1 bg-gradient-to-r from-transparent via-epanen-secondary to-transparent"></div>
             <p class="font-black text-gray-900 dark:text-gray-400 uppercase tracking-[0.4em] text-xs">Innovation for Farmers • ePanen Team</p>
          </div>
       </div>
    </section>

  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useThemeStore } from '../../stores/theme';

const authStore = useAuthStore();
const themeStore = useThemeStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);

onMounted(() => {
  themeStore.initTheme();
});
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #2D5A27 10%, #52A446 90%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dark .text-gradient {
  background: linear-gradient(135deg, #A8D5A2 10%, #52A446 90%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes bloom {
  0% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.1); }
  100% { opacity: 0.3; transform: scale(1); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes floatSwing {
  0% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-10px) translateX(5px); }
  50% { transform: translateY(-15px) translateX(0); }
  75% { transform: translateY(-10px) translateX(-5px); }
  100% { transform: translateY(0) translateX(0); }
}

.animate-bloom {
  animation: bloom 8s ease-in-out infinite;
}

.animate-slide-in-right {
  animation: slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.animate-float-slow {
  animation: floatSwing 8s ease-in-out infinite;
}

/* Explicit Dark Mode Overrides for Maximum Contrast */
:global(.dark) .text-main {
  color: #FFFFFF !important;
}

:global(.dark) .text-muted {
  color: #E2E8F0 !important;
}

.text-main {
  color: var(--text-main);
}

.text-muted {
  color: var(--text-muted);
}
</style>
