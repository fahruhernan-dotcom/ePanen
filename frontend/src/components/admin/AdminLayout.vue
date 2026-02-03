<template>
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-amber-50 flex">
    <!-- Sidebar -->
    <aside class="w-72 min-w-[18rem] flex-shrink-0 bg-gradient-to-b from-epanen-primary via-epanen-secondary to-epanen-primary text-white fixed h-full shadow-2xl overflow-hidden z-20 transition-all duration-300">
      <!-- Decorative farm pattern -->
      <div class="absolute inset-0 opacity-10">
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
        <div class="p-8 border-b border-white border-opacity-10">
          <div class="flex items-center space-x-4 mb-2">
            <div class="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C7.5 2 4 6.5 4 12c0 5.5 3.5 10 8 10s8-4.5 8-10c0-5.5-3.5-10-8-10zm0 18c-3.5 0-6-3.5-6-8s2.5-8 6-8 6 3.5 6 8-2.5 8-6 8z"/>
                <path d="M12 6c-1.5 0-2.5 1.5-2.5 3s1 3 2.5 3 2.5-1.5 2.5-3-1-3-2.5-3z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-black tracking-tight">Nala Office</h1>
              <p class="text-[10px] uppercase font-black tracking-widest text-epanen-accent opacity-80">Management Suite</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 mt-8 space-y-2 px-4 overflow-y-auto custom-scrollbar">
          <router-link
            to="/admin"
            class="flex items-center space-x-4 px-5 py-4 rounded-2xl hover:bg-white hover:bg-opacity-10 transition-all group relative overflow-hidden"
            active-class="bg-white bg-opacity-20 shadow-lg text-white font-black scale-105"
          >
            <svg class="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="text-sm uppercase tracking-widest font-bold">Dashboard</span>
            <div class="absolute left-0 w-1.5 h-8 bg-epanen-accent rounded-r-full transform -translate-x-full transition-transform group-[.router-link-active]:translate-x-0"></div>
          </router-link>

          <router-link
            to="/admin/chatlogs"
            class="flex items-center space-x-4 px-5 py-4 rounded-2xl hover:bg-white hover:bg-opacity-10 transition-all group relative overflow-hidden"
            active-class="bg-white bg-opacity-20 shadow-lg text-white font-black scale-105"
          >
            <svg class="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span class="text-sm uppercase tracking-widest font-bold">Chat Logs</span>
            <div class="absolute left-0 w-1.5 h-8 bg-epanen-accent rounded-r-full transform -translate-x-full transition-transform group-[.router-link-active]:translate-x-0"></div>
          </router-link>

          <router-link
            to="/admin/users"
            class="flex items-center space-x-4 px-5 py-4 rounded-2xl hover:bg-white hover:bg-opacity-10 transition-all group relative overflow-hidden"
            active-class="bg-white bg-opacity-20 shadow-lg text-white font-black scale-105"
          >
            <svg class="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span class="text-sm uppercase tracking-widest font-bold">Users</span>
            <div class="absolute left-0 w-1.5 h-8 bg-epanen-accent rounded-r-full transform -translate-x-full transition-transform group-[.router-link-active]:translate-x-0"></div>
          </router-link>

          <router-link
            to="/admin/content"
            class="flex items-center space-x-4 px-5 py-4 rounded-2xl hover:bg-white hover:bg-opacity-10 transition-all group relative overflow-hidden"
            active-class="bg-white bg-opacity-20 shadow-lg text-white font-black scale-105"
          >
            <svg class="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="text-sm uppercase tracking-widest font-bold">Content</span>
            <div class="absolute left-0 w-1.5 h-8 bg-epanen-accent rounded-r-full transform -translate-x-full transition-transform group-[.router-link-active]:translate-x-0"></div>
          </router-link>

          <router-link
            to="/admin/discussions"
            class="flex items-center space-x-4 px-5 py-4 rounded-2xl hover:bg-white hover:bg-opacity-10 transition-all group relative overflow-hidden"
            active-class="bg-white bg-opacity-20 shadow-lg text-white font-black scale-105"
          >
            <svg class="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="text-sm uppercase tracking-widest font-bold">Discussions</span>
            <div class="absolute left-0 w-1.5 h-8 bg-epanen-accent rounded-r-full transform -translate-x-full transition-transform group-[.router-link-active]:translate-x-0"></div>
          </router-link>

          <router-link
            to="/admin/market"
            class="flex items-center space-x-4 px-5 py-4 rounded-2xl hover:bg-white hover:bg-opacity-10 transition-all group relative overflow-hidden"
            active-class="bg-white bg-opacity-20 shadow-lg text-white font-black scale-105"
          >
            <svg class="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm uppercase tracking-widest font-bold">Market Prices</span>
            <div class="absolute left-0 w-1.5 h-8 bg-epanen-accent rounded-r-full transform -translate-x-full transition-transform group-[.router-link-active]:translate-x-0"></div>
          </router-link>
        </nav>

        <!-- Logout Button -->
        <div class="p-6 border-t border-white border-opacity-10">
          <button
            @click="handleLogout"
            class="flex items-center space-x-4 px-5 py-4 rounded-2xl bg-red-500 bg-opacity-10 hover:bg-opacity-20 transition-all text-red-100 hover:text-white w-full group border border-red-500 border-opacity-20 hover:border-opacity-100"
          >
            <svg class="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span class="text-sm uppercase tracking-widest font-black">Keluar</span>
          </button>
        </div>

        <!-- Tagline -->
        <div class="p-4 text-center">
          <p class="text-xs text-epanen-accent font-medium">"Yakin Kita Bisa"</p>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="ml-72 flex-1 flex flex-col transition-all duration-300">
      <!-- Top Header -->
      <header class="bg-white shadow-sm sticky top-0 z-[1000]">
        <div class="px-8 py-4 flex items-center justify-between">
          <div>
            <h2 class="text-xl font-semibold text-gray-800 flex items-center">
              <svg class="w-5 h-5 mr-2 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {{ pageTitle }}
            </h2>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <p class="text-sm font-medium text-gray-800">{{ authStore.user?.username }}</p>
              <p class="text-xs text-epanen-secondary flex items-center justify-end">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8 6 4 10 4 14c0 4 3.5 8 8 8s8-4 8-8c0-4-4-8-8-12z"/>
                </svg>
                Administrator
              </p>
            </div>
            <div class="w-10 h-10 bg-gradient-to-br from-epanen-secondary to-epanen-accent rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              {{ authStore.user?.username?.charAt(0).toUpperCase() }}
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-8">
        <router-view />
      </main>

      <!-- Footer -->
      <footer class="bg-white border-t mt-auto">
        <div class="px-8 py-4">
          <div class="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <p class="text-sm text-gray-500 flex items-center">
              <svg class="w-4 h-4 mr-2 text-epanen-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8 6 4 10 4 14c0 4 3.5 8 8 8s8-4 8-8c0-4-4-8-8-12z"/>
              </svg>
              © {{ new Date().getFullYear() }} ePanen - Nala Office
            </p>
            <p class="text-sm font-semibold text-epanen-secondary flex items-center">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              "Yakin Kita Bisa"
            </p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const pageTitle = computed(() => {
  const route = router.currentRoute.value;
  const titles = {
    'AdminDashboard': 'Dashboard Overview',
    'ChatLogs': 'Chat Logs',
    'Users': 'User Management',
    'Content': 'Content Management',
    'AdminDiscussions': 'Discussion Moderation',
    'AdminMarket': 'Market Prices'
  };
  return titles[route.name] || 'Dashboard';
});

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>
