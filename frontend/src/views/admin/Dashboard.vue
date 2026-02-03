<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Welcome Banner/Hero -->
    <div class="relative overflow-hidden bg-gradient-to-r from-epanen-primary to-epanen-secondary rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-lg">
      <div class="absolute top-0 right-0 -mt-20 -mr-20 opacity-20 pointer-events-none">
        <svg class="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8 6 4 10 4 14c0 4 3.5 8 8 8s8-4 8-8c0-4-4-8-8-12z"/>
        </svg>
      </div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl md:text-4xl font-extrabold mb-2 tracking-tight">Halo, Administrator! 👋</h1>
          <p class="text-white text-opacity-80 text-sm md:text-lg max-w-xl">
            Selamat datang di <span class="font-bold underline">Nala Office</span>. Anda memiliki {{ stats.newUsersThisMonth || 0 }} pengguna baru bulan ini.
          </p>
        </div>
        <div class="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-4 flex items-center space-x-4">
          <div class="bg-white bg-opacity-30 p-3 rounded-xl">
             <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
             </svg>
          </div>
          <div>
            <p class="text-xs font-semibold uppercase opacity-80">Aktivitas Mingguan</p>
            <p class="text-2xl font-black">{{ stats.messagesThisWeek || 0 }} Pesan</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Users -->
      <div class="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Users</p>
            <h3 class="text-3xl font-black text-gray-800 tracking-tight">{{ stats.totalUsers || 0 }}</h3>
          </div>
          <div class="w-14 h-14 bg-indigo-50 group-hover:bg-indigo-600 transition-colors rounded-2xl flex items-center justify-center">
            <svg class="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
        <div class="mt-4 flex items-center text-xs">
          <span class="flex items-center text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full">
            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"/></svg>
            +{{ stats.newUsersThisMonth || 0 }}
          </span>
          <span class="ml-2 text-gray-400">vs bulan lalu</span>
        </div>
      </div>

      <!-- Total AI Chat -->
      <div class="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">AI Chat</p>
            <h3 class="text-3xl font-black text-gray-800 tracking-tight">{{ stats.totalQuestions || 0 }}</h3>
          </div>
          <div class="w-14 h-14 bg-emerald-50 group-hover:bg-emerald-600 transition-colors rounded-2xl flex items-center justify-center">
            <svg class="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        </div>
        <div class="mt-4 flex items-center text-xs">
          <span class="flex items-center text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-full">
            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            {{ stats.messagesThisWeek || 0 }}
          </span>
          <span class="ml-2 text-gray-400">minggu ini</span>
        </div>
      </div>

      <!-- Total Articles -->
      <div class="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Artikel</p>
            <h3 class="text-3xl font-black text-gray-800 tracking-tight">{{ stats.totalArticles || 0 }}</h3>
          </div>
          <div class="w-14 h-14 bg-purple-50 group-hover:bg-purple-600 transition-colors rounded-2xl flex items-center justify-center">
            <svg class="w-7 h-7 text-purple-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <div class="mt-4 flex items-center text-xs">
          <span class="text-purple-600 font-bold bg-purple-50 px-2 py-1 rounded-full">Published</span>
        </div>
      </div>

      <!-- Discussions -->
      <div class="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Forum Thread</p>
            <h3 class="text-3xl font-black text-gray-800 tracking-tight">{{ stats.totalDiscussions || 0 }}</h3>
          </div>
          <div class="w-14 h-14 bg-amber-50 group-hover:bg-amber-600 transition-colors rounded-2xl flex items-center justify-center">
            <svg class="w-7 h-7 text-amber-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <div class="mt-4 flex items-center text-xs">
          <span class="text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded-full">Active Threads</span>
        </div>
      </div>
    </div>

    <!-- Charts & Main Content -->
    <div class="grid lg:grid-cols-12 gap-6">
      <!-- AI Category Analysis (Pie Chart-like visualization) -->
      <div class="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="font-bold text-gray-800 text-lg">Statistik AI</h3>
          <span class="p-2 bg-gray-50 rounded-lg">
            <svg class="w-5 h-5 text-epanen-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"/>
            </svg>
          </span>
        </div>
        <div class="space-y-4" v-if="aiUsage.byCategory && aiUsage.byCategory.length > 0">
          <div v-for="(cat, idx) in aiUsage.byCategory.slice(0, 6)" :key="cat.category" class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="font-semibold text-gray-700 capitalize">{{ cat.category || 'Umum' }}</span>
              <span class="text-gray-500 font-bold">{{ cat.count }}</span>
            </div>
            <div class="h-2 bg-gray-50 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-1000"
                :class="idx % 2 === 0 ? 'bg-epanen-primary' : 'bg-epanen-secondary'"
                :style="{ width: `${(cat.count / maxAiCount) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-12">
          <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-gray-200">
             <svg class="w-8 h-8 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
             </svg>
          </div>
          <p class="text-gray-400 font-medium">Belum ada data</p>
        </div>
      </div>

      <!-- Recent Activity Log (Improved UI) -->
      <div class="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 class="font-bold text-gray-800 text-lg">Aktivitas Terkini</h3>
          <router-link to="/admin/chatlogs" class="text-xs font-bold text-epanen-primary hover:underline">Lihat Semua →</router-link>
        </div>
        <div class="flex-1 overflow-y-auto max-h-[400px]">
          <table class="w-full text-left" v-if="recentActivity.length > 0">
            <thead class="bg-gray-50 bg-opacity-30 text-gray-400 text-[10px] uppercase font-bold tracking-widest">
              <tr>
                <th class="px-6 py-3">User</th>
                <th class="px-6 py-3">Aksi</th>
                <th class="px-6 py-3">Waktu</th>
                <th class="px-6 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="activity in recentActivity" :key="activity.id" class="hover:bg-gray-50 hover:bg-opacity-50 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-epanen-light rounded-lg flex items-center justify-center text-epanen-primary font-bold text-xs">
                      {{ (activity.user_name || 'S').charAt(0) }}
                    </div>
                    <span class="text-sm font-semibold text-gray-800">{{ activity.user_name || 'System' }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-gray-600">{{ activity.action }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-xs text-gray-400">{{ formatTime(activity.created_at) }}</span>
                </td>
                <td class="px-6 py-4 text-right">
                  <span class="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-md tracking-wider">Berhasil</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="flex flex-col items-center justify-center p-20 text-center">
            <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-100 mb-4">
               <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12.5 7h-1v5.62l5 2.98.5-.87-4.5-2.68V7z"/></svg>
            </div>
            <p class="text-gray-300 font-bold uppercase tracking-widest text-xs">Aktivitas Kosong</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Rank (Combined Grid) -->
    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Top Content Table -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-bold text-gray-800 text-lg mb-6 flex items-center">
          <svg class="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Konten Terpopuler
        </h3>
        <div class="space-y-4" v-if="topContent.articles && topContent.articles.length > 0">
           <div v-for="(article, idx) in topContent.articles.slice(0, 4)" :key="article.id" class="group flex items-center p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-epanen-primary hover:bg-white transition-all cursor-default">
             <div class="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center font-black text-epanen-primary text-xl border border-gray-100 group-hover:scale-110 transition-transform">
               {{ idx + 1 }}
             </div>
             <div class="ml-4 flex-1 min-w-0">
               <h4 class="font-bold text-gray-800 text-sm truncate group-hover:text-epanen-primary transition-colors">{{ article.title }}</h4>
               <p class="text-xs text-gray-400 capitalize">{{ article.category || 'General' }}</p>
             </div>
             <div class="text-right ml-4">
               <p class="text-xl font-black text-gray-800">{{ article.views || 0 }}</p>
               <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Views</p>
             </div>
           </div>
        </div>
        <div v-else class="text-center py-12 text-gray-400">Belum ada konten</div>
      </div>

      <!-- Active Discussions -->
       <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-bold text-gray-800 text-lg mb-6 flex items-center text-epanen-secondary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
          Diskusi Terhangat
        </h3>
        <div class="space-y-4" v-if="topContent.discussions && topContent.discussions.length > 0">
           <div v-for="disc in topContent.discussions.slice(0, 4)" :key="disc.id" class="flex items-center justify-between p-4 border border-gray-100 rounded-2xl hover:shadow-md transition-shadow">
             <div class="min-w-0 pr-4">
               <h4 class="font-bold text-gray-800 text-sm truncate">{{ disc.title }}</h4>
               <div class="flex items-center mt-1 space-x-3">
                 <span class="text-[10px] bg-amber-50 rounded-full px-2 py-0.5 font-bold text-amber-600 border border-amber-100">{{ disc.replies || 0 }} Balasan</span>
                 <span class="text-[10px] text-gray-400">{{ formatTime(disc.created_at) }}</span>
               </div>
             </div>
             <div class="flex-shrink-0 flex -space-x-2">
               <div class="w-8 h-8 rounded-full border-2 border-white bg-epanen-primary flex items-center justify-center text-[10px] text-white font-bold">U</div>
               <div class="w-8 h-8 rounded-full border-2 border-white bg-epanen-secondary flex items-center justify-center text-[10px] text-white font-bold shadow-sm">P</div>
             </div>
           </div>
        </div>
        <div v-else class="text-center py-12 text-gray-400">Belum ada diskusi</div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';
const token = localStorage.getItem('epanen_token');

const stats = ref({
  totalUsers: 0,
  activeUsers: 0,
  totalQuestions: 0,
  totalArticles: 0,
  totalDiscussions: 0,
  messagesThisWeek: 0,
  newUsersThisMonth: 0
});

const aiUsage = ref({ byCategory: [] });
const recentActivity = ref([]);
const topContent = ref({ articles: [], discussions: [] });

const maxAiCount = computed(() => {
  if (!aiUsage.value.byCategory?.length) return 1;
  return Math.max(...aiUsage.value.byCategory.map(c => c.count || 0));
});

const loadDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_BASE}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = response.data.data;
    stats.value = data.overview || {};
    aiUsage.value = data.aiUsage || { byCategory: [] };
    recentActivity.value = data.recentActivity || [];
    topContent.value = data.topContent || { articles: [], discussions: [] };
  } catch (error) {
    console.error('Failed to load dashboard stats:', error);
    // Set default values on error
    stats.value = {
      totalUsers: 0,
      totalQuestions: 0,
      totalArticles: 0,
      totalDiscussions: 0,
      messagesThisWeek: 0,
      newUsersThisMonth: 0
    };
  }
};

const formatTime = (dateStr) => {
  if (!dateStr) return 'Unknown';
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now - date;

  if (isNaN(diff)) return 'Unknown';

  if (diff < 60000) return 'Baru saja';
  if (diff < 3600000) return `${Math.floor(diff / 60000)} menit lalu`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} jam lalu`;
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
};

onMounted(() => {
  loadDashboardStats();
});
</script>
