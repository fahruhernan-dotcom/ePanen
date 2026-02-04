<template>
  <div class="space-y-10 animate-fade-in pb-10">
    <!-- Welcome Header Section -->
    <div class="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-[3rem] p-10 text-white shadow-2xl">
      <!-- Decorative background glow -->
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-epanen-primary/10 blur-[120px] rounded-full -mr-40 -mt-40"></div>
      
      <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div class="space-y-4">
          <div class="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
            <span class="w-2 h-2 rounded-full bg-epanen-primary animate-pulse mr-3"></span>
            <span class="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Nala Office Active</span>
          </div>
          <h1 class="text-4xl lg:text-5xl font-black tracking-tighter leading-none">
            Welcome back,<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-epanen-primary to-epanen-secondary">Administrator</span>
          </h1>
          <p class="text-gray-400 font-bold text-sm max-w-md leading-relaxed">
            Monitor ekosistem ePanen hari ini. Anda memiliki <span class="text-white">{{ stats.newUsersThisMonth || 0 }} pengguna baru</span> yang bergabung bulan ini.
          </p>
        </div>

        <div class="flex gap-6">
          <div class="bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 shadow-xl flex flex-col items-center min-w-[160px]">
            <div class="w-12 h-12 bg-epanen-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-epanen-primary/20">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <p class="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Weekly Input</p>
            <p class="text-3xl font-black tracking-tight">{{ stats.messagesThisWeek || 0 }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Premium Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div v-for="(stat, idx) in statCards" :key="idx" class="group bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-sm border border-gray-50 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
        <div class="flex items-center justify-between mb-6">
          <div :class="['w-14 h-14 rounded-3xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-500', stat.bg]">
            <svg class="w-7 h-7" :class="stat.text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon" />
            </svg>
          </div>
          <div class="bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full text-center">
             <span class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Global</span>
          </div>
        </div>
        <p class="text-gray-400 dark:text-gray-500 text-xs font-black uppercase tracking-[0.2em] mb-1">{{ stat.label }}</p>
        <h3 class="text-4xl font-black text-gray-800 dark:text-white tracking-tighter">{{ stat.value }}</h3>
        <div class="mt-4 pt-4 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
           <span class="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase">Live Update</span>
           <svg class="w-4 h-4 text-gray-200 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </div>
      </div>
    </div>

    <!-- Advanced Analysis Section -->
    <div class="grid lg:grid-cols-12 gap-8">
      <!-- AI Intelligence Box -->
      <div class="lg:col-span-4 bg-white dark:bg-gray-900 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-800 p-8 flex flex-col transition-colors">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h3 class="text-xl font-black text-gray-800 dark:text-white tracking-tight">AI Categorization</h3>
              <p class="text-[10px] font-black text-epanen-primary uppercase tracking-widest opacity-60">Nala Engine Analysis</p>
            </div>
            <div class="w-10 h-10 bg-epanen-light dark:bg-epanen-primary/20 rounded-2xl flex items-center justify-center text-epanen-primary transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"/></svg>
            </div>
          </div>

          <div class="flex-1 space-y-6" v-if="aiUsage.byCategory && aiUsage.byCategory.length > 0">
            <div v-for="(cat, idx) in aiUsage.byCategory.slice(0, 5)" :key="idx" class="group">
              <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider capitalize">{{ cat.category || 'Umum' }}</span>
                <span class="text-xs font-bold text-gray-400 dark:text-gray-500">{{ cat.count }} Hits</span>
              </div>
              <div class="h-3 bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700">
                <div 
                  class="h-full bg-gradient-to-r from-epanen-primary to-epanen-secondary rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(45,90,39,0.3)]"
                  :style="{ width: `${(cat.count / maxAiCount) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
          <div v-else class="flex-1 flex flex-col items-center justify-center py-10 opacity-30">
             <div class="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
               <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
             <p class="text-sm font-black uppercase tracking-widest text-gray-400">No Intelligence Data</p>
          </div>
      </div>

      <!-- Live Activities (Premium List) -->
      <div class="lg:col-span-8 bg-white dark:bg-gray-900 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col transition-colors">
        <div class="px-10 py-8 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h3 class="text-xl font-black text-gray-800 dark:text-white tracking-tight leading-none mb-1">Aktivitas Real-time</h3>
            <p class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Log Aktivitas Farmer</p>
          </div>
          <router-link to="/admin/chatlogs" class="px-5 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">Lihat Semua History</router-link>
        </div>
        
        <div class="flex-1 overflow-y-auto max-h-[500px] px-10 pb-10 custom-scrollbar">
          <div v-if="recentActivity.length > 0" class="space-y-4 pt-6">
            <div v-for="act in recentActivity" :key="act.id" class="group flex items-center p-5 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 rounded-3xl border border-transparent hover:border-gray-100 dark:hover:border-gray-700 hover:shadow-xl transition-all cursor-default translate-y-0 hover:-translate-y-1">
              <div class="w-12 h-12 bg-white dark:bg-gray-900 rounded-2xl shadow-sm flex items-center justify-center text-epanen-primary font-black text-sm border border-gray-100 dark:border-gray-800 group-hover:bg-epanen-primary group-hover:text-white transition-all">
                {{ (act.user_name || 'S').charAt(0).toUpperCase() }}
              </div>
              <div class="ml-5 flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <h4 class="font-black text-gray-800 dark:text-white text-sm truncate">{{ act.user_name || 'System' }}</h4>
                  <span class="px-2 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-600 text-[8px] font-black uppercase rounded-md">Success</span>
                </div>
                <p class="text-xs font-bold text-gray-400 dark:text-gray-500 line-clamp-1">{{ act.action }}</p>
              </div>
              <div class="text-right ml-4">
                <p class="text-[10px] font-black text-gray-800 dark:text-gray-200 uppercase tracking-tighter">{{ formatTime(act.created_at) }}</p>
                <p class="text-[8px] text-gray-400 dark:text-gray-600 font-bold uppercase tracking-widest mt-0.5">Time Log</p>
              </div>
            </div>
          </div>
          <div v-else class="h-64 flex flex-col items-center justify-center opacity-20">
             <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             <p class="text-sm font-black uppercase tracking-widest">History is Empty</p>
          </div>
        </div>
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
  totalQuestions: 0,
  totalArticles: 0,
  totalDiscussions: 0,
  messagesThisWeek: 0,
  newUsersThisMonth: 0
});

const statCards = computed(() => [
  { label: 'Total Farmer', value: stats.value.totalUsers || 0, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', bg: 'bg-indigo-50 dark:bg-indigo-950/30', text: 'text-indigo-600 dark:text-indigo-400' },
  { label: 'Interaksi AI', value: stats.value.totalQuestions || 0, icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z', bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'text-emerald-600 dark:text-emerald-400' },
  { label: 'Gudang Artikel', value: stats.value.totalArticles || 0, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-600 dark:text-blue-400' },
  { label: 'Forum Komunitas', value: stats.value.totalDiscussions || 0, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-600 dark:text-amber-400' }
]);

const aiUsage = ref({ byCategory: [] });
const recentActivity = ref([]);

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
  } catch (error) {
    console.error('Failed to load dashboard stats:', error);
  }
};

const formatTime = (dateStr) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  const diff = new Date() - date;
  if (diff < 60000) return 'Just Now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
};

onMounted(() => {
  loadDashboardStats();
});
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 20px; }
</style>
