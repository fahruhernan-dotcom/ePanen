<template>
  <div class="space-y-8 animate-fade-in pb-10">
    <!-- Premium Header -->
    <div class="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-sm border border-gray-50 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors">
      <div>
        <h1 class="text-4xl font-black text-gray-800 dark:text-white tracking-tighter leading-none mb-2">Chat Logs</h1>
        <p class="text-[10px] font-black text-epanen-primary uppercase tracking-[0.3em] opacity-60">Monitor Interaksi Nala AI & Farmer</p>
      </div>
      <div class="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 px-6 py-3 rounded-2xl shadow-inner border border-gray-100 dark:border-gray-700 transition-colors">
         <span class="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
         <span class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Nala System Monitor Live</span>
      </div>
    </div>

    <!-- Live Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
       <div v-for="(stat, idx) in statCards" :key="idx" class="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-50 dark:border-gray-800 flex items-center gap-5 transition-colors">
        <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm', stat.bg]">
          <svg class="w-6 h-6" :class="stat.text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon" /></svg>
        </div>
        <div>
          <p class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-tight">{{ stat.label }}</p>
          <h3 class="text-2xl font-black text-gray-800 dark:text-white tracking-tighter mt-0.5">{{ stat.value }}</h3>
        </div>
      </div>
    </div>

    <!-- Filters Panel -->
    <div class="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm border border-gray-50 dark:border-gray-800 p-8 transition-colors">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">User Identification</label>
          <input
            v-model="filters.userId"
            type="text"
            placeholder="Search by ID/Name..."
            class="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm font-bold shadow-inner text-gray-800 dark:text-white"
          />
        </div>
        <div>
          <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">Topic Category</label>
          <select
            v-model="filters.category"
            class="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-xs font-black text-gray-700 dark:text-gray-300 appearance-none shadow-sm"
          >
            <option value="">Semua Kategori</option>
            <option value="budidaya">Budidaya</option>
            <option value="hama-penyakit">Hama & Penyakit</option>
            <option value="cuaca">Cuaca</option>
            <option value="teknologi">Teknologi</option>
            <option value="pasar">Pasar</option>
            <option value="general">General</option>
          </select>
        </div>
        <div>
          <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">Specific Date</label>
          <input
            v-model="dateFilter"
            type="text"
            placeholder="YYYY-MM-DD"
            class="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm font-bold shadow-inner text-gray-800 dark:text-white"
          />
        </div>
        <div class="flex items-end">
          <button
            @click="applyFilters"
            class="w-full bg-gray-800 dark:bg-white text-white dark:text-black py-4 rounded-2xl hover:bg-black dark:hover:bg-gray-200 transition-all font-black text-[10px] uppercase tracking-widest shadow-lg hover:-translate-y-1"
          >
            Sync Filtered Data
          </button>
        </div>
      </div>
    </div>

    <!-- Chat Logs Panel -->
    <div class="bg-white dark:bg-gray-900 rounded-[3rem] shadow-sm border border-gray-50 dark:border-gray-800 overflow-hidden transition-colors">
      <div class="p-8 border-b border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30 flex items-center justify-between">
        <h3 class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] flex items-center gap-3">
           <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
           Live Interaction Stream
        </h3>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50/50 dark:bg-gray-800/50 text-[10px] uppercase font-black tracking-widest text-gray-400 dark:text-gray-500">
              <th class="px-10 py-5 text-left">Timestamp</th>
              <th class="px-6 py-5 text-left">Initiator</th>
              <th class="px-6 py-5 text-left">Message Payload</th>
              <th class="px-6 py-5 text-center">Topic</th>
              <th class="px-10 py-5 text-right">Details</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-gray-800">
            <tr v-if="loading">
              <td colspan="5" class="px-10 py-24 text-center">
                 <div class="flex flex-col items-center">
                    <div class="w-12 h-12 border-4 border-epanen-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Streaming Packet Data...</p>
                 </div>
              </td>
            </tr>
            <tr v-else-if="paginatedLogs.length === 0" class="group">
              <td colspan="5" class="px-10 py-20 text-center opacity-30">
                 <p class="text-sm font-black uppercase tracking-widest italic text-gray-400">No packets captured in this stream</p>
              </td>
            </tr>
            <tr v-else v-for="log in paginatedLogs" :key="log.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group">
              <td class="px-10 py-6 whitespace-nowrap text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                {{ formatTime(log.created_at) }}
              </td>
              <td class="px-6 py-6 whitespace-nowrap">
                <div class="flex items-center">
                   <div :class="['w-10 h-10 rounded-xl flex items-center justify-center mr-3 font-black text-[10px] shadow-sm', log.role === 'user' ? 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500' : 'bg-green-50 dark:bg-green-950/20 text-green-500']">
                    {{ log.role === 'user' ? 'USR' : 'NLA' }}
                  </div>
                  <div>
                    <span class="text-xs font-black text-gray-700 dark:text-gray-100 block">{{ log.user_name || 'Anonymous' }}</span>
                    <span class="text-[8px] font-black text-gray-400 dark:text-gray-500 mt-0.5 uppercase tracking-tighter">{{ log.role === 'user' ? 'External' : 'System Intelligence' }}</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-6 text-sm text-gray-500 dark:text-gray-400 max-w-md">
                <div class="flex items-center">
                  <div class="mr-4 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                    <svg v-if="log.category === 'whatsapp' || log.whatsapp_number" class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 2.73 1.984 5.001 4.6 5.591l.369.083.003.002.502 1.374 1.157-1.157.051-.051.458.054c2.16.255 4.31-.63 5.498-2.316 1.188-1.686 1.188-3.922 0-5.608-1.188-1.686-3.338-2.571-5.498-2.316l-.458.054-.051-.051-1.157-1.157-.502 1.374-.003.002-.369.083c-2.616.59-4.601 2.861-4.6 5.591 0 3.18 2.587 5.766 5.768 5.766 2.227 0 4.192-1.251 5.127-3.116.936-1.865.636-4.131-.762-5.608L12.031 6.172z"/></svg>
                    <svg v-else class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3.651 9h16.698M3.651 15h16.698M12 3v18M12 3A9.54 9.54 0 018.607 12a9.54 9.54 0 013.393 9m0-18a9.54 9.54 0 003.393 9 9.54 9.54 0 00-3.393 9" /></svg>
                  </div>
                  <p class="truncate font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{{ log.message }}</p>
                </div>
              </td>
              <td class="px-6 py-6 text-center">
                <span v-if="log.category" class="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-gray-200 dark:border-gray-700 group-hover:border-indigo-200 dark:group-hover:border-indigo-900 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all">
                  {{ log.category }}
                </span>
                <span v-else class="text-gray-200 dark:text-gray-700 text-xs">-</span>
              </td>
              <td class="px-10 py-6 text-right">
                <button
                  @click="viewFullMessage(log)"
                  class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 hover:bg-gray-800 dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-gray-800 dark:hover:border-white transition-all shadow-sm"
                >
                  Inspect Packet
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="chatLogs.length > 25" class="px-10 py-8 border-t border-gray-50 flex items-center justify-between bg-gray-50/20">
        <p class="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">
           Showing {{ (currentPage - 1) * 25 + 1 }} - {{ Math.min(currentPage * 25, chatLogs.length) }} of {{ chatLogs.length }} captured intents
        </p>
        <div class="flex space-x-3">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-2xl text-gray-400 hover:bg-white hover:shadow-lg disabled:opacity-20 transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div class="px-6 py-2 bg-white rounded-2xl border border-gray-100 flex items-center shadow-sm">
             <span class="text-[10px] font-black text-gray-700 uppercase tracking-widest">Page {{ currentPage }} / {{ totalPages }}</span>
          </div>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-2xl text-gray-400 hover:bg-white hover:shadow-lg disabled:opacity-20 transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Message Detail Modal (Premium Refresh) -->
    <div v-if="showMessageDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-md" @click="showMessageDialog = false"></div>
      <div class="relative bg-white rounded-[3rem] shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col animate-scale-in border border-white/20">
        <!-- Modal Header -->
        <div class="px-10 py-8 border-b border-gray-50 flex items-center justify-between bg-gradient-to-r from-gray-50/50 to-white">
          <div class="flex items-center gap-5">
             <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center shadow-md', selectedMessage?.role === 'user' ? 'bg-indigo-50 text-indigo-500' : 'bg-green-50 text-green-500']">
                 <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path v-if="selectedMessage?.role === 'user'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                   <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                 </svg>
             </div>
            <div>
              <h3 class="text-2xl font-black text-gray-800 tracking-tighter">{{ selectedMessage?.user_name || 'Anonymous' }}</h3>
              <p class="text-[10px] text-epanen-primary font-black uppercase tracking-[0.2em] mt-0.5">{{ formatFullTime(selectedMessage?.created_at) }}</p>
            </div>
          </div>
          <button @click="showMessageDialog = false" class="w-12 h-12 flex items-center justify-center bg-white shadow-sm hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-2xl transition-all border border-gray-100">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div class="p-10 flex-1 overflow-y-auto space-y-8 custom-scrollbar">
          <div class="flex flex-wrap gap-4">
            <div v-if="selectedMessage?.category" class="bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 flex items-center gap-3">
              <span class="text-[8px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200 pr-3">System Label</span>
              <span class="text-[10px] font-black text-gray-800 uppercase tracking-widest">{{ selectedMessage.category }}</span>
            </div>
             <div class="bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 flex items-center gap-3">
              <span class="text-[8px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200 pr-3">Origin</span>
              <span class="text-[10px] font-black text-gray-800 uppercase tracking-widest">{{ selectedMessage?.whatsapp_number ? 'WhatsApp' : 'Web Hub' }}</span>
            </div>
          </div>

          <div class="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 shadow-inner relative overflow-hidden min-h-[150px]">
             <!-- Watermark Decor -->
             <div class="absolute bottom-6 right-8 opacity-5">
                <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12.5 7h-1v5.62l5 2.98.5-.87-4.5-2.68V7z"/></svg>
             </div>
             <p class="text-base font-bold text-gray-700 leading-relaxed relative z-10 whitespace-pre-wrap">{{ selectedMessage?.message }}</p>
          </div>
        </div>

        <div class="p-10 pt-4 border-t border-gray-50 flex justify-end">
           <button @click="showMessageDialog = false" class="px-12 py-4 bg-gray-800 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-black hover:scale-105 active:scale-95 transition-all">Close Inspector</button>
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

const loading = ref(false);
const chatLogs = ref([]);
const chatStats = ref({
  totalMessages: 0,
  activeUsers: 0,
  byRole: []
});

const filters = ref({
  userId: '',
  category: '',
  date: ''
});

const dateFilter = ref('');
const currentPage = ref(1);
const showMessageDialog = ref(false);
const selectedMessage = ref(null);

const statCards = computed(() => [
  { label: 'Total Handled', value: chatStats.value.totalMessages || 0, icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z', bg: 'bg-blue-50', text: 'text-blue-500' },
  { label: 'Farmer Outreach', value: getUserCount('user'), icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', bg: 'bg-indigo-50', text: 'text-indigo-500' },
  { label: 'AI Intelligence', value: getUserCount('assistant'), icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', bg: 'bg-green-50', text: 'text-green-500' },
  { label: 'Live Sessions', value: chatStats.value.activeUsers || 0, icon: 'M13 10V3L4 14h7v7l9-11h-7z', bg: 'bg-amber-50', text: 'text-amber-500' }
]);

const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * 25;
  const end = start + 25;
  return chatLogs.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(chatLogs.value.length / 25) || 1);

const loadChatLogs = async () => {
  loading.value = true;
  try {
    const params = {};
    if (filters.value.userId) params.userId = filters.value.userId;
    if (filters.value.category) params.category = filters.value.category;
    if (dateFilter.value) params.date = dateFilter.value;

    const [logsRes, statsRes] = await Promise.all([
      axios.get(`${API_BASE}/admin/chatlogs`, { params, headers: { Authorization: `Bearer ${token}` } }),
      axios.get(`${API_BASE}/admin/chatlogs/stats`, { headers: { Authorization: `Bearer ${token}` } })
    ]);

    chatLogs.value = logsRes.data.data.messages || [];
    chatStats.value = statsRes.data.data || { totalMessages: 0, activeUsers: 0, byRole: [] };
    currentPage.value = 1;
  } catch (error) {
    console.error('Failed to load chat logs:', error);
  } finally {
    loading.value = false;
  }
};

const applyFilters = () => loadChatLogs();
const getUserCount = (role) => chatStats.value.byRole?.find(r => r.role === role)?.count || 0;

const viewFullMessage = (message) => {
  selectedMessage.value = message;
  showMessageDialog.value = true;
};

const formatTime = (dateStr) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
};

const formatFullTime = (dateStr) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

onMounted(() => loadChatLogs());
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 20px; }
</style>
