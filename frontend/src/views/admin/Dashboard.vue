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
            <span class="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Kian Office Active</span>
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
          <div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-50 dark:border-white/5">
            <div>
              <h3 class="text-xl font-black text-gray-900 dark:text-white tracking-tight">AI Categorization</h3>
              <p class="text-[10px] font-black text-epanen-primary uppercase tracking-[0.2em]">Kian Engine Intelligence</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-epanen-primary/10 to-epanen-secondary/10 rounded-2xl flex items-center justify-center text-epanen-primary shadow-inner border border-white/20">
              <svg class="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>

          <div class="flex-1 space-y-8" v-if="aiUsage.byCategory && aiUsage.byCategory.length > 0">
            <div v-for="(cat, idx) in aiUsage.byCategory.slice(0, 5)" :key="idx" class="group/cat">
              <div class="flex justify-between items-center mb-3">
                <div class="flex items-center space-x-3">
                  <div :class="['w-8 h-8 rounded-lg flex items-center justify-center shadow-sm border border-black/5 dark:border-white/5 transition-transform group-hover/cat:scale-110', getCategoryStyle(cat.category).bg]">
                     <svg class="w-4 h-4" :class="getCategoryStyle(cat.category).text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" :d="getCategoryStyle(cat.category).icon" />
                     </svg>
                  </div>
                  <span class="text-[11px] font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest tracking-wider capitalize">{{ cat.category || 'Umum' }}</span>
                </div>
                <div class="flex flex-col items-end">
                  <span class="text-[14px] font-black text-gray-900 dark:text-white tracking-tighter">{{ cat.count }}</span>
                  <span class="text-[8px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Responses</span>
                </div>
              </div>
              <div class="h-2.5 bg-gray-50 dark:bg-white/5 rounded-full overflow-hidden relative border border-black/5 dark:border-white/5">
                <div 
                  class="absolute h-full rounded-full transition-all duration-1000 ease-out group-hover/cat:brightness-110 overflow-hidden"
                  :class="getCategoryStyle(cat.category).progress"
                  :style="{ width: `${(cat.count / maxAiCount) * 100}%` }"
                >
                  <!-- Refined Gradient Shine Sweep (No Overlap) -->
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shine-sweep"></div>
                </div>
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
            <p class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Log Aktivitas User</p>
          </div>
          <router-link to="/admin/chatlogs" class="px-5 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">Lihat Semua History</router-link>
        </div>
        
        <div class="flex-1 overflow-y-auto max-h-[500px] px-10 pb-10 custom-scrollbar relative">
          <div v-if="recentActivity.length > 0" class="space-y-4 pt-6">
            <div v-for="act in recentActivity" :key="act.id" class="group flex items-center p-6 bg-gray-50/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 rounded-[2rem] border border-transparent hover:border-gray-100 dark:hover:border-white/10 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-500 cursor-default translate-y-0 hover:-translate-y-1">
              <div class="w-14 h-14 bg-gradient-to-br from-white to-gray-50 dark:from-white/10 dark:to-white/5 rounded-2xl shadow-sm flex items-center justify-center text-epanen-primary font-black text-lg border border-gray-100 dark:border-white/5 group-hover:bg-epanen-primary group-hover:text-white transition-all duration-500">
                {{ (act.user_name || 'S').charAt(0).toUpperCase() }}
              </div>
              <div class="ml-6 flex-1 min-w-0">
                <div class="flex items-center gap-3 mb-1">
                  <h4 class="font-black text-gray-900 dark:text-white text-base truncate">{{ act.user_name || 'System' }}</h4>
                  <span :class="['px-2.5 py-1 text-[9px] font-black uppercase rounded-lg shadow-sm', act.action.toLowerCase().includes('delete') || act.action.toLowerCase().includes('error') ? 'bg-red-500/10 text-red-500' : 'bg-epanen-primary/10 text-epanen-primary']">
                    {{ act.action.toLowerCase().includes('delete') ? 'Removed' : act.action.toLowerCase().includes('update') ? 'Modified' : 'Created' }}
                  </span>
                </div>
                <p class="text-[13px] font-semibold text-gray-500 dark:text-gray-400 line-clamp-1 italic">{{ act.action }}</p>
              </div>
              <div class="text-right ml-4">
                <div class="flex flex-col items-end">
                  <p class="text-[11px] font-black text-gray-900 dark:text-gray-200 uppercase tracking-widest leading-none">{{ formatTime(act.created_at) }}</p>
                  <p class="text-[9px] text-gray-400 dark:text-gray-600 font-bold uppercase tracking-[0.2em] mt-2 flex items-center">
                    <span class="w-1 h-1 bg-epanen-primary rounded-full mr-1.5 animate-pulse"></span>
                    Activity Log
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="h-[400px] flex flex-col items-center justify-center relative group">
             <!-- Monitoring Grid Background Effect -->
             <div class="absolute inset-x-0 h-full overflow-hidden opacity-5 pointer-events-none">
                <div class="grid grid-cols-12 h-full">
                   <div v-for="i in 48" :key="i" class="border-[0.5px] border-gray-900 dark:border-white aspect-square"></div>
                </div>
             </div>
             
             <div class="relative w-24 h-24 mb-6">
                <div class="absolute inset-0 bg-epanen-primary/10 rounded-full animate-ping opacity-20"></div>
                <div class="absolute inset-0 bg-epanen-primary/5 rounded-full animate-pulse"></div>
                <div class="relative w-full h-full bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-xl border border-gray-100 dark:border-white/5">
                   <svg class="w-10 h-10 text-gray-300 dark:text-gray-600 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                </div>
             </div>
             
             <h4 class="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest mb-2">Omnivore Monitoring Active</h4>
             <p class="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-tight text-center max-w-xs leading-relaxed">
               Sistem sedang memantau ekosistem secara real-time. Belum ada aktivitas user yang tercatat dalam log terakhir.
             </p>

             <div class="mt-8 flex space-x-2">
                <div v-for="i in 3" :key="i" class="w-1.5 h-1.5 bg-epanen-primary/30 rounded-full"></div>
             </div>
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
  { label: 'Total User', value: stats.value.totalUsers || 0, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', bg: 'bg-indigo-50 dark:bg-indigo-950/30', text: 'text-indigo-600 dark:text-indigo-400' },
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

const getCategoryStyle = (category) => {
  const cat = (category || 'Umum').toLowerCase();
  const styles = {
    'pasar': { bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'text-emerald-500', progress: 'bg-gradient-to-r from-emerald-500 to-emerald-400', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    'budidaya': { bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-500', progress: 'bg-gradient-to-r from-blue-500 to-blue-400', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    'hama': { bg: 'bg-red-50 dark:bg-red-950/30', text: 'text-red-500', progress: 'bg-gradient-to-r from-red-500 to-red-400', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
    'whatsapp': { bg: 'bg-green-50 dark:bg-green-950/30', text: 'text-green-500', progress: 'bg-gradient-to-r from-green-500 to-green-400', icon: 'M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 2.73 1.984 5.001 4.6 5.591l.369.083.003.002.502 1.374 1.157-1.157.051-.051.458.054c2.16.255 4.31-.63 5.498-2.316 1.188-1.686 1.188-3.922 0-5.608-1.188-1.686-3.338-2.571-5.498-2.316l-.458.054-.051-.051-1.157-1.157-.502 1.374-.003.002-.369.083c-2.616.59-4.601 2.861-4.6 5.591 0 3.18 2.587 5.766 5.768 5.766 2.227 0 4.192-1.251 5.127-3.116.936-1.865.636-4.131-.762-5.608L12.031 6.172z' },
    'umum': { bg: 'bg-gray-50 dark:bg-gray-800', text: 'text-gray-500', progress: 'bg-gradient-to-r from-gray-500 to-gray-400', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
  };
  return styles[cat] || styles['umum'];
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
.animate-fade-in { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

/* Refined Shine Sweep Animation - Smooth & Non-Overlapping */
.animate-shine-sweep { animation: shine-sweep 3.5s infinite ease-in-out; }
@keyframes shine-sweep { 
  0% { transform: translateX(-150%) skewX(-25deg); } 
  30% { transform: translateX(250%) skewX(-25deg); }
  100% { transform: translateX(250%) skewX(-25deg); }
}

.animate-spin-slow { animation: spin 8s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 20px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
</style>
