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
              <span class="text-[11px] font-black text-epanen-primary dark:text-epanen-accent uppercase tracking-[0.2em]">Yakin Kita Bisa #1 Indonesia</span>
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
                Konsultasi Kian AI
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
                  <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                    <img src="@/assets/images/logo.png" alt="ePanen Logo" class="w-full h-full object-contain p-2" />
                  </div>
                  <div>
                    <p class="text-[10px] font-black text-epanen-primary uppercase tracking-[0.3em]">Kian AI Pro</p>
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

      <div class="text-center space-y-4 mb-16 animate-slide-up">
        <h2 class="text-[11px] font-black text-epanen-primary uppercase tracking-[0.6em] mb-3">Layanan Kami</h2>
        <p class="text-4xl md:text-5xl font-black text-main dark:text-white tracking-tight leading-tight">
          Solusi Digital <span class="text-gradient">Terpadu</span>
        </p>
      </div>

      <!-- Feature Cards with Horizontal Scroll (PowerPoint Style) & Infinite Auto-Loop -->
      <!-- Feature Cards with Horizontal Scroll (2 Cards Layout - Aligned) -->
      <div 
        ref="scrollContainer"
        class="max-w-7xl mx-auto flex overflow-x-auto gap-8 md:gap-10 py-16 md:py-20 px-6 md:px-16 no-scrollbar scroll-smooth" 
        style="scrollbar-width: none;"
        @mouseenter="pauseAutoScroll"
        @mouseleave="resumeAutoScroll"
      >
        <div 
          v-for="(feature, index) in displayFeatures" 
          :key="`${feature.title}-${index}`"
          class="min-w-[85vw] md:min-w-[calc(50%-1rem)] flex-shrink-0 animate-slide-in-right flex flex-col justify-between"
          :style="{ animationDelay: `${0.1 * (index % 4 + 1)}s` }"
        >
          <router-link 
            :to="feature.link" 
            :class="[
              'group relative bg-white dark:bg-white/5 rounded-[2.5rem] p-10 md:p-12',
              'hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-none',
              'transition-all duration-700 ease-out',
              'border-2 border-gray-100 dark:border-white/10',
              'hover:-translate-y-2',
              feature.borderClass
            ]"
            :style="{ animationDelay: `${index % 4}s` }"
          >
            <!-- Modern Gradient Glow Background (Replaces 'Chopped' Bubble) -->
            <div :class="['absolute top-0 right-0 w-[120%] h-[120%] bg-gradient-radial opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none -translate-y-1/2 translate-x-1/2', feature.gradientClass]"></div>
            
            <!-- Soft Ambient Orb (Fixed & Safe) -->
            <div :class="['absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-30 transition-transform duration-1000 group-hover:scale-150', feature.bgClass]"></div>

            <div class="relative z-10">
              <div :class="['w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-gray-200/50 dark:shadow-none transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 bg-gradient-to-br overflow-hidden', feature.gradientClass]">
                <img v-if="feature.useLogo" src="@/assets/images/logo.png" alt="ePanen Logo" class="w-full h-full object-contain p-2" />
                <div v-else v-html="feature.iconSvg" class="text-white w-8 h-8 md:w-10 md:h-10 [&>svg]:w-full [&>svg]:h-full drop-shadow-md"></div>
              </div>
              
              <h3 class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-3 md:mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-colors duration-300" :class="feature.textGradientClass">
                {{ feature.title }}
              </h3>
              
              <p class="text-base md:text-lg text-gray-600 dark:text-gray-400 font-semibold leading-relaxed mb-6 md:mb-8">
                {{ feature.description }}
              </p>
            </div>

            <div class="relative z-10 flex items-center font-black text-sm uppercase tracking-widest transition-transform duration-300 group-hover:translate-x-3" :class="feature.textClass">
              {{ feature.ctaText }}
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
              Kian AI dapat mengenali gejala secara presisi dan memberikan rekomendasi penanganan berbasis sains pertanian secara instan.
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
               alt="Kian AI Robot" 
               class="absolute h-full w-full object-cover object-[center_top] lg:object-center transform group-hover:scale-105 transition-transform duration-[4s]" 
             />
          </div>
        </div>
      </div>
    </section>

    <!-- Beautiful Quote Section -->
    <section class="container-custom pb-16">
       <div class="w-full text-center space-y-10 py-24 px-10 relative bg-epanen-primary/5 dark:bg-white/5 rounded-[5rem] border-2 border-dashed border-epanen-primary/10">
          <div class="absolute -top-12 left-1/2 -translate-x-1/2 text-[15rem] leading-none text-epanen-primary/5 font-serif select-none pointer-events-none">“</div>
          <h2 class="text-3xl md:text-5xl font-black text-epanen-primary dark:text-epanen-accent italic leading-[1.3] relative z-10">
            "Pertanian adalah fondasi peradaban. Dengan teknologi, kita merawat masa depan agar tetap hijau dan berdaya."
          </h2>
          <div class="relative z-10">
            <p class="text-sm font-black tracking-[0.3em] uppercase text-gray-400">Innovation for Users • ePanen Team</p>
          </div>
       </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useThemeStore } from '../../stores/theme';

const authStore = useAuthStore();
const themeStore = useThemeStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);

const scrollContainer = ref(null);
let scrollInterval = null;
let isPaused = false;

const features = [
  {
    title: 'Kian AI',
    description: 'Konsultasi cerdas 24 jam untuk menjawab keluhan tanaman Anda.',
    link: '/chat',
    ctaText: 'Mulai Tanya',
    useLogo: true, // Use ePanen logo instead of SVG icon
    iconSvg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>',
    gradientClass: 'from-epanen-primary to-epanen-secondary',
    bgClass: 'bg-epanen-primary',
    borderClass: 'hover:border-epanen-primary/30',
    textClass: 'text-epanen-primary dark:text-epanen-accent',
    textGradientClass: 'from-epanen-primary to-epanen-secondary'
  },
  {
    title: 'Wawasan',
    description: 'Perdalam ilmu budidaya dari para pakar pertanian Indonesia.',
    link: '/articles',
    ctaText: 'Baca Artikel',
    iconSvg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>',
    gradientClass: 'from-amber-400 to-orange-500',
    bgClass: 'bg-amber-500',
    borderClass: 'hover:border-amber-500/30',
    textClass: 'text-amber-600 dark:text-amber-400',
    textGradientClass: 'from-amber-400 to-orange-500'
  },
  {
    title: 'Harga Pasar',
    description: 'Update harga komoditas terkini untuk transaksi yang adil.',
    link: '/prices',
    ctaText: 'Cek Harga',
    iconSvg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    gradientClass: 'from-blue-500 to-cyan-600',
    bgClass: 'bg-blue-500',
    borderClass: 'hover:border-blue-500/30',
    textClass: 'text-blue-600 dark:text-blue-400',
    textGradientClass: 'from-blue-500 to-cyan-600'
  },
  {
    title: 'Forum',
    description: 'Ruang diskusi terbuka untuk bertukar pengalaman bertani.',
    link: '/discussions',
    ctaText: 'Gabung Diskusi',
    iconSvg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',
    gradientClass: 'from-purple-500 to-pink-600',
    bgClass: 'bg-purple-500',
    borderClass: 'hover:border-purple-500/30',
    textClass: 'text-purple-600 dark:text-purple-400',
    textGradientClass: 'from-purple-500 to-pink-600'
  }
];

// Duplicate features for infinite loop effect
// We quintuple the list (5x) to ensure there's always enough content for a truly seamless loop
// This reduces the frequency of position resets, making the infinite scroll feel more natural
const displayFeatures = computed(() => [...features, ...features, ...features, ...features, ...features]);

const smoothScrollTo = (element, target, duration) => {
  const start = element.scrollLeft;
  const change = target - start;
  const startTime = performance.now();

  const animateScroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease-in-out quadratic function for smooth acceleration and deceleration
    const ease = progress < 0.5 
      ? 2 * progress * progress 
      : -1 + (4 - 2 * progress) * progress;

    element.scrollLeft = start + change * ease;

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

const startAutoScroll = () => {
  stopAutoScroll();
  scrollInterval = setInterval(() => {
    if (!scrollContainer.value || isPaused) return;
    
    const container = scrollContainer.value;
    // Calculate width of one card + one gap
    const cardWidth = container.children[0].offsetWidth + (window.innerWidth >= 768 ? 40 : 32); // 40px=gap-10, 32px=gap-8
    
    // For 5x duplication, reset after scrolling past 2 sets (40% of total width)
    // This gives us a comfortable buffer before and after the reset point
    const resetThreshold = (container.scrollWidth / 5) * 2;
    
    // Check if we need to reset position (seamless teleport)
    if (container.scrollLeft >= resetThreshold) {
       // Reset by one full set (20% of total), maintaining visual continuity
       const resetAmount = container.scrollWidth / 5;
       container.scrollTo({ left: container.scrollLeft - resetAmount, behavior: 'instant' });
    }
    
    // Calculate target directly for stability
    const targetScroll = container.scrollLeft + cardWidth;
    
    // Use custom smooth scroll instead of native behavior
    smoothScrollTo(container, targetScroll, 1200);
    
  }, 4000); // 4 seconds interval
};

const stopAutoScroll = () => {
  if (scrollInterval) clearInterval(scrollInterval);
};

const pauseAutoScroll = () => {
  isPaused = true;
};

const resumeAutoScroll = () => {
  isPaused = false;
};

// Check for loop reset on manual scroll as well
const handleScroll = () => {
  if (!scrollContainer.value) return;
  const container = scrollContainer.value;
  
  // For 5x duplication: reset after 2 sets (40%) or before 1 set (20%)
  const oneSetWidth = container.scrollWidth / 5;
  const resetThresholdRight = oneSetWidth * 2;
  const resetThresholdLeft = oneSetWidth * 0.5;
  
  // Reset when scrolling too far right
  if (container.scrollLeft >= resetThresholdRight) {
    container.scrollTo({ left: container.scrollLeft - oneSetWidth, behavior: 'instant' });
  } 
  // Reset when scrolling too far left (for bidirectional infinite scroll)
  else if (container.scrollLeft <= resetThresholdLeft) {
    container.scrollTo({ left: container.scrollLeft + oneSetWidth, behavior: 'instant' });
  }
};

onMounted(() => {
  themeStore.initTheme();
  startAutoScroll();
});

onUnmounted(() => {
  stopAutoScroll();
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

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
