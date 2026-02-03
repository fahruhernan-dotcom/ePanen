<template>
  <div :class="['min-h-screen transition-colors duration-300', themeStore.isDarkMode ? 'dark bg-[#060D06]' : 'bg-[#F8FAF8]']">
    <!-- Header -->
    <header class="glass-panel sticky top-0 z-[1000] shadow-xl border-b border-white/10">
      <!-- Decorative farm pattern -->
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <svg class="w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path d="M0,50 Q100,30 200,50 T400,50 T600,50 T800,50 T1000,50 T1200,50 V100 H0 Z" fill="currentColor"/>
        </svg>
      </div>

      <div class="container-custom relative">
        <div class="flex items-center justify-between h-16 md:h-20">
          <router-link to="/" class="flex items-center space-x-3 group">
            <div class="w-10 h-10 md:w-12 md:h-12 bg-epanen-primary rounded-xl flex items-center justify-center shadow-lg group-hover:bg-epanen-dark transition-all">
              <svg class="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2C7.5 2 4 6.5 4 12c0 5.5 3.5 10 8 10s8-4.5 8-10c0-5.5-3.5-10-8-10zm0 18c-3.5 0-6-3.5-6-8s2.5-8 6-8 6 3.5 6 8-2.5 8-6 8z"/>
              </svg>
            </div>
            <div>
              <span class="text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-white">ePanen</span>
              <p class="text-[10px] md:text-xs text-epanen-primary dark:text-epanen-accent hidden md:block font-black uppercase tracking-widest">Platform Tani Digital</p>
            </div>
          </router-link>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center space-x-1">
            <router-link
              v-for="(link, i) in navLinks"
              :key="i"
              :to="link.to"
              class="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-epanen-light dark:hover:bg-white/5 transition-all font-black text-sm tracking-wide text-gray-700 dark:text-gray-300"
              active-class="bg-epanen-primary !text-white"
            >
              <div v-html="link.iconSvg" class="w-4 h-4"></div>
              <span>{{ link.label }}</span>
            </router-link>
          </nav>

          <!-- Global Actions -->
          <div class="flex items-center space-x-3 md:space-x-5">
            <!-- Global Dark Mode Toggle -->
            <button @click="themeStore.toggleDarkMode" class="p-2.5 bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-all shadow-sm border border-gray-100 dark:border-white/5" :title="themeStore.isDarkMode ? 'Mode Terang' : 'Mode Gelap'">
              <svg v-if="!themeStore.isDarkMode" class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <svg v-else class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>

            <!-- User Dropdown -->
            <div class="relative" ref="menuRef">
              <button
                @click="showMenu = !showMenu"
                class="flex items-center space-x-2 bg-white dark:bg-white/5 px-2 py-1.5 md:px-3 md:py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-all border border-gray-100 dark:border-white/5"
              >
                <div class="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-epanen-primary to-epanen-secondary rounded-lg flex items-center justify-center text-white font-black text-sm shadow-md">
                   {{ authStore.user?.name?.charAt(0).toUpperCase() || 'P' }}
                </div>
                <div class="hidden md:block text-left mr-1">
                   <p class="text-xs font-black tracking-tight text-gray-900 dark:text-white">{{ authStore.user?.name || 'Petani' }}</p>
                   <p class="text-[9px] text-epanen-primary dark:text-epanen-accent opacity-80 uppercase font-black tracking-widest leading-none mt-0.5">Mitra Tani</p>
                </div>
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                v-if="showMenu"
                class="absolute right-0 mt-3 w-56 bg-white dark:bg-[#0D1A0D] rounded-2xl shadow-2xl py-3 z-[9999] border border-gray-100 dark:border-white/10 overflow-hidden animate-slide-up"
              >
                <div class="px-5 py-4 border-b border-gray-50 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 mb-2">
                  <p class="text-sm font-black text-gray-900 dark:text-white">{{ authStore.user?.name }}</p>
                  <p class="text-[10px] text-gray-400 font-bold truncate">{{ authStore.user?.email }}</p>
                </div>
                <router-link
                  to="/profile"
                  class="flex items-center space-x-3 px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-white/5 transition-colors font-black text-sm"
                  @click="showMenu = false"
                >
                  <svg class="w-5 h-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Profil Saya</span>
                </router-link>
                <button
                  @click.stop="handleLogout"
                  class="w-full flex items-center space-x-3 px-5 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left font-black text-sm"
                >
                  <svg class="w-5 h-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Keluar Akun</span>
                </button>
              </div>
            </div>

            <!-- Mobile menu button -->
            <button @click="showMobileMenu = !showMobileMenu" class="lg:hidden p-2 text-gray-600 dark:text-gray-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <transition 
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0"
      >
        <div v-if="showMobileMenu" class="lg:hidden bg-white dark:bg-[#0D1A0D] border-t border-gray-100 dark:border-white/10 px-6 py-6 space-y-3 shadow-2xl">
          <router-link 
            v-for="(link, i) in navLinks"
            :key="i"
            :to="link.to" 
            class="flex items-center space-x-4 py-4 px-5 rounded-2xl hover:bg-green-50 dark:hover:bg-white/5 transition-all font-black text-gray-700 dark:text-gray-300"
            active-class="bg-epanen-primary !text-white"
            @click="showMobileMenu = false"
          >
            <div v-html="link.iconSvg" class="w-5 h-5"></div>
            <span>{{ link.label }}</span>
          </router-link>
        </div>
      </transition>
    </header>

    <!-- Main content -->
    <main class="py-6 md:py-8 container-custom">
      <router-view />
    </main>

    <!-- Footer -->
    <footer :class="['relative overflow-hidden transition-all duration-500 border-t mt-10 shadow-2xl', themeStore.isDarkMode ? 'bg-[#060D06] border-white/5' : 'bg-[#1A2E1A] border-white/10']">
      <div class="absolute inset-0 opacity-10 pointer-events-none text-white">
        <svg class="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,100 Q200,60 400,100 T800,100 T1200,100 V200 H0 Z" fill="currentColor"/>
        </svg>
      </div>

      <div class="container-custom relative pt-24 pb-32">
        <!-- Explicit Vertical Spacer to push content down from the top edge -->
        <div class="h-20 w-full mb-10"></div>
        <div :class="['grid grid-cols-1 md:grid-cols-4 gap-24 border-b pb-20 mb-16', themeStore.isDarkMode ? 'border-white/10' : 'border-gray-100']">
          <div class="space-y-12 col-span-1 md:col-span-2">
            <div class="flex items-center space-x-4">
              <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <svg class="w-8 h-8 text-epanen-accent" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 2v20c-4.4 0-8-3.6-8-8s3.6-8 8-8zM12 2c4.4 0 8 3.6 8 8s-3.6 8-8 8V2z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-3xl font-black text-gray-900 dark:text-white">ePanen</h3>
                <p class="text-xs text-epanen-primary dark:text-epanen-accent font-black uppercase tracking-[0.3em] mt-1">Platform Tani Digital</p>
              </div>
            </div>
            <p class="text-lg text-gray-600 dark:text-emerald-50/70 leading-relaxed font-bold max-w-md">
              Membangun kemandirian pangan Indonesia melalui inovasi kecerdasan buatan dan literasi data untuk petani modern.
            </p>
          </div>

          <div class="space-y-10">
            <h4 class="text-lg font-black uppercase tracking-widest text-epanen-accent border-l-4 border-epanen-accent pl-4">Solusi</h4>
            <nav class="flex flex-col space-y-8 font-bold text-emerald-50/60 text-sm">
               <router-link to="/chat" class="hover:text-epanen-accent transition-colors">Nella AI Assistant</router-link>
               <router-link to="/prices" class="hover:text-epanen-accent transition-colors">Info Harga Pasar</router-link>
               <router-link to="/articles" class="hover:text-epanen-accent transition-colors">Literasi Tani</router-link>
               <router-link to="/discussions" class="hover:text-epanen-accent transition-colors">Forum Komunitas</router-link>
            </nav>
          </div>

          <div class="space-y-10">
            <h4 class="text-lg font-black uppercase tracking-widest text-epanen-accent border-l-4 border-epanen-accent pl-4">Kontak</h4>
            <div class="space-y-8 font-bold text-emerald-50/60 text-sm">
               <p class="flex items-center group cursor-pointer hover:text-white transition-colors">
                 <svg class="w-5 h-5 mr-3 text-epanen-accent group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> 
                 support@epanen.id
               </p>
               <p class="flex items-center group cursor-pointer hover:text-white transition-colors">
                 <svg class="w-5 h-5 mr-3 text-epanen-accent group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> 
                 +62 821-2233-4455
               </p>
            </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row items-center justify-between text-gray-400 font-bold text-xs uppercase tracking-widest">
          <p>© {{ new Date().getFullYear() }} ePanen Team. Berbakti untuk Negeri 🌱</p>
          <div class="flex items-center space-x-6 mt-6 md:mt-0">
             <span class="text-epanen-accent">YAKIN KITA BISA</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useThemeStore } from '../../stores/theme';

const router = useRouter();
const authStore = useAuthStore();
const themeStore = useThemeStore();

const showMenu = ref(false);
const showMobileMenu = ref(false);
const menuRef = ref(null);

const navLinks = [
  { to: '/', label: 'Beranda', iconSvg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>' },
  { to: '/chat', label: 'Nella AI', iconSvg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>' },
  { to: '/articles', label: 'Wawasan', iconSvg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>' },
  { to: '/prices', label: 'Harga', iconSvg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>' },
  { to: '/discussions', label: 'Forum', iconSvg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>' },
];

const handleLogout = () => {
  authStore.logout();
  showMenu.value = false;
  showMobileMenu.value = false;
  router.push('/login');
};

const handleClickOutside = (e) => {
  if (menuRef.value && !menuRef.value.contains(e.target)) {
    showMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  themeStore.initTheme();
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.glass-panel {
  background: var(--card-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-color);
}
.animate-slide-up {
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
