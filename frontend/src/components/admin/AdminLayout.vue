<template>
  <div class="h-screen bg-[#F9FBF9] dark:bg-gray-950 flex overflow-hidden transition-colors duration-500">
    <!-- Sidebar -->
    <aside class="w-72 min-w-[18rem] flex-shrink-0 bg-gradient-to-b from-epanen-primary via-epanen-secondary to-epanen-primary dark:from-black dark:via-gray-900 dark:to-black text-white h-full shadow-2xl overflow-hidden z-20 relative transition-all duration-300">
      <!-- Decorative farm pattern -->
      <div class="absolute inset-0 opacity-10 dark:opacity-5">
        <svg class="w-full h-full" viewBox="0 0 300 800" preserveAspectRatio="none">
          <!-- Rice field waves -->
          <path d="M0,100 Q75,80 150,100 T300,100 V800 H0 Z" fill="currentColor"/>
          <path d="M0,120 Q75,100 150,120 T300,120 V800 H0 Z" fill="currentColor" opacity="0.5"/>
          <!-- Wheat pattern -->
          <g fill="currentColor">
            <circle cx="30" cy="50" r="6"/>
            <circle cx="90" cy="45" r="5"/>
            <circle cx="150" cy="55" r="6"/>
            <circle cx="210" cy="48" r="5"/>
            <circle cx="270" cy="52" r="6"/>
          </g>
        </svg>
      </div>

      <div class="relative z-10 flex flex-col h-full">
        <!-- Logo Section -->
        <div class="p-8 border-b border-white/10">
          <div class="flex items-center space-x-4 mb-2">
            <div class="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner overflow-hidden border border-white/20">
              <img src="@/assets/images/logo.png" alt="ePanen Logo" class="w-full h-full object-contain p-2" />
            </div>
            <div>
              <h1 class="text-2xl font-black tracking-tight">ePanen</h1>
              <p class="text-[10px] uppercase font-black tracking-widest text-white/60">Internal Suite</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 mt-8 space-y-2 px-4 overflow-y-auto custom-scrollbar">
          <router-link
            to="/admin"
            class="flex items-center space-x-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition-all group relative overflow-hidden"
            exact-active-class="bg-white/20 shadow-lg text-white font-black scale-105"
          >
            <svg class="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="text-sm uppercase tracking-widest font-bold">Dashboard</span>
            <div class="absolute left-0 w-1.5 h-6 bg-epanen-accent rounded-r-full transform -translate-x-full transition-transform group-[.router-link-exact-active]:translate-x-0 top-1/2 -translate-y-1/2"></div>
          </router-link>

          <router-link
            to="/admin/chatlogs"
            class="flex items-center space-x-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition-all group relative overflow-hidden"
            active-class="bg-white/20 shadow-lg text-white font-black scale-105"
          >
            <svg class="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span class="text-sm uppercase tracking-widest font-bold">Chat Logs</span>
            <div class="absolute left-0 w-1.5 h-6 bg-epanen-accent rounded-r-full transform -translate-x-full transition-transform group-[.router-link-active]:translate-x-0 top-1/2 -translate-y-1/2"></div>
          </router-link>

          <router-link
            to="/admin/users"
            class="flex items-center space-x-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition-all group relative overflow-hidden"
            active-class="bg-white/20 shadow-lg text-white font-black scale-105"
          >
            <svg class="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span class="text-sm uppercase tracking-widest font-bold">Users</span>
            <div class="absolute left-0 w-1.5 h-6 bg-epanen-accent rounded-r-full transform -translate-x-full transition-transform group-[.router-link-active]:translate-x-0 top-1/2 -translate-y-1/2"></div>
          </router-link>

          <router-link
            to="/admin/content"
            class="flex items-center space-x-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition-all group relative overflow-hidden"
            active-class="bg-white/20 shadow-lg text-white font-black scale-105"
          >
            <svg class="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="text-sm uppercase tracking-widest font-bold">Content</span>
            <div class="absolute left-0 w-1.5 h-6 bg-epanen-accent rounded-r-full transform -translate-x-full transition-transform group-[.router-link-active]:translate-x-0 top-1/2 -translate-y-1/2"></div>
          </router-link>

          <router-link
            to="/admin/discussions"
            class="flex items-center space-x-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition-all group relative overflow-hidden"
            active-class="bg-white/20 shadow-lg text-white font-black scale-105"
          >
            <svg class="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="text-sm uppercase tracking-widest font-bold">Discussions</span>
            <div class="absolute left-0 w-1.5 h-6 bg-epanen-accent rounded-r-full transform -translate-x-full transition-transform group-[.router-link-active]:translate-x-0 top-1/2 -translate-y-1/2"></div>
          </router-link>

          <router-link
            to="/admin/market"
            class="flex items-center space-x-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition-all group relative overflow-hidden"
            active-class="bg-white/20 shadow-lg text-white font-black scale-105"
          >
            <svg class="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm uppercase tracking-widest font-bold">Market Prices</span>
            <div class="absolute left-0 w-1.5 h-8 bg-epanen-accent rounded-r-full transform -translate-x-full transition-transform group-[.router-link-active]:translate-x-0"></div>
          </router-link>

          <router-link
            to="/admin/whatsapp"
            class="flex items-center space-x-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition-all group relative overflow-hidden"
            active-class="bg-white/20 shadow-lg text-white font-black scale-105"
          >
            <svg class="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 2.73 1.984 5.001 4.6 5.591l.369.083.003.002.502 1.374 1.157-1.157.051-.051.458.054c2.16.255 4.31-.63 5.498-2.316 1.188-1.686 1.188-3.922 0-5.608-1.188-1.686-3.338-2.571-5.498-2.316l-.458.054-.051-.051-1.157-1.157-.502 1.374-.003.002-.369.083c-2.616.59-4.601 2.861-4.6 5.591 0 3.18 2.587 5.766 5.768 5.766 2.227 0 4.192-1.251 5.127-3.116.936-1.865.636-4.131-.762-5.608L12.031 6.172z"/>
            </svg>
            <span class="text-sm uppercase tracking-widest font-bold">WhatsApp Mgmt</span>
            <div class="absolute left-0 w-1.5 h-8 bg-epanen-accent rounded-r-full transform -translate-x-full transition-transform group-[.router-link-active]:translate-x-0"></div>
          </router-link>

          <router-link
            to="/admin/settings"
            class="flex items-center space-x-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition-all group relative overflow-hidden"
            active-class="bg-white/20 shadow-lg text-white font-black scale-105"
          >
            <svg class="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="text-sm uppercase tracking-widest font-bold">Settings</span>
            <div class="absolute left-0 w-1.5 h-8 bg-epanen-accent rounded-r-full transform -translate-x-full transition-transform group-[.router-link-active]:translate-x-0"></div>
          </router-link>
        </nav>

        <!-- Logout Button -->
        <div class="p-6 border-t border-white/10">
          <button
            @click="handleLogout"
            class="flex items-center space-x-4 px-5 py-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 transition-all text-red-100 hover:text-white w-full group border border-red-500/20 hover:border-red-500"
          >
            <svg class="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span class="text-sm uppercase tracking-widest font-black">Keluar</span>
          </button>
        </div>

        <!-- Tagline -->
        <div class="p-4 text-center">
          <p class="text-xs text-white/80 font-black italic tracking-widest uppercase">"Yakin Kita Bisa"</p>
        </div>
      </div>
    </aside>

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col min-w-0 transition-all duration-300">
      <!-- Top Header -->
      <header class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800 z-10 transition-colors duration-500">
        <div class="px-8 py-4 flex items-center justify-between">
          <div>
            <h2 class="text-xl font-black text-gray-800 dark:text-white flex items-center tracking-tight">
              <svg class="w-5 h-5 mr-2 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {{ pageTitle }}
            </h2>
          </div>
          <div class="flex items-center space-x-6">
            <!-- Dark Mode Toggle -->
            <button
              @click="themeStore.toggleDarkMode"
              class="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-amber-400 hover:scale-110 active:scale-95 transition-all shadow-sm"
              title="Toggle Theme"
            >
              <svg v-if="themeStore.isDarkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            <div class="text-right hidden sm:block">
              <p class="text-sm font-black text-gray-900 dark:text-white leading-none">{{ authStore.user?.username }}</p>
              <p class="text-[10px] text-epanen-primary font-black uppercase tracking-widest mt-1">Administrator</p>
            </div>
            <div class="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              <img src="@/assets/images/logo.png" alt="ePanen Logo" class="w-full h-full object-contain p-1.5" />
            </div>
          </div>
        </div>
      </header>

      <!-- Scrollable Area -->
      <div class="flex-1 overflow-y-auto custom-scrollbar bg-[#F9FBF9] dark:bg-gray-950 transition-colors duration-500">
        <main class="p-8 max-w-[1600px] mx-auto min-h-full flex flex-col">
          <router-view />

          <!-- Footer -->
          <footer class="mt-auto pt-16 pb-8">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-gray-400 dark:text-gray-600">
              <p class="text-xs font-bold uppercase tracking-widest flex items-center">
                <svg class="w-4 h-4 mr-2 text-epanen-primary opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8 6 4 10 4 14c0 4 3.5 8 8 8s8-4 8-8c0-4-4-8-8-12z"/>
                </svg>
                © {{ new Date().getFullYear() }} ePanen Kian Office
              </p>
              <p class="text-[10px] font-black text-epanen-secondary uppercase tracking-[0.2em]">
                Yakin Kita Bisa
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useThemeStore } from '../../stores/theme';

const router = useRouter();
const authStore = useAuthStore();
const themeStore = useThemeStore();

const pageTitle = computed(() => {
  const route = router.currentRoute.value;
  const titles = {
    'AdminDashboard': 'Dashboard Overview',
    'ChatLogs': 'Chat Logs',
    'Users': 'User Management',
    'Content': 'Content Management',
    'AdminDiscussions': 'Discussion Moderation',
    'AdminMarket': 'Market Prices',
    'AdminWhatsApp': 'WhatsApp Management',
    'Settings': 'Platform Settings'
  };
  return titles[route.name] || 'Dashboard';
});

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>
