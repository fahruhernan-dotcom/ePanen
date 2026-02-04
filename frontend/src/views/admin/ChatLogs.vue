<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2">
      <div>
        <h1 class="text-3xl font-black text-gray-800 tracking-tight">Chat Logs</h1>
        <p class="text-gray-500 font-medium tracking-wide">Monitor semua percakapan farmer dengan Nala AI</p>
      </div>
      <div class="bg-epanen-primary bg-opacity-10 px-4 py-2 rounded-2xl border border-epanen-primary border-opacity-20 flex items-center">
        <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
        <span class="text-epanen-primary font-bold text-sm">System Live Monitor</span>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Messages -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all border-l-4 border-l-blue-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Pesan</p>
            <h3 class="text-3xl font-black text-gray-800">{{ chatStats.totalMessages || 0 }}</h3>
          </div>
          <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- User Messages -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all border-l-4 border-l-green-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Pesan Farmer</p>
            <h3 class="text-3xl font-black text-green-600">{{ getUserCount('user') }}</h3>
          </div>
          <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- AI Responses -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all border-l-4 border-l-purple-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Respon Nala</p>
            <h3 class="text-3xl font-black text-purple-600">{{ getUserCount('assistant') }}</h3>
          </div>
          <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Active Users -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all border-l-4 border-l-amber-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Farmer Aktif</p>
            <h3 class="text-3xl font-black text-amber-600">{{ chatStats.activeUsers || 0 }}</h3>
          </div>
          <div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>


    <!-- Filters -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 class="font-semibold text-gray-800 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filter Chat Logs
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          v-model="filters.userId"
          type="text"
          placeholder="Cari user ID..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
        />
        <select
          v-model="filters.category"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
        >
          <option value="">Semua Kategori</option>
          <option value="budidaya">Budidaya</option>
          <option value="hama">Hama</option>
          <option value="cuaca">Cuaca</option>
          <option value="teknologi">Teknologi</option>
          <option value="pasar">Pasar</option>
          <option value="general">General</option>
        </select>
        <input
          v-model="dateFilter"
          type="text"
          placeholder="Tanggal (YYYY-MM-DD)"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
        />
        <button
          @click="applyFilters"
          class="w-full bg-epanen-primary text-white py-2 rounded-lg hover:bg-epanen-secondary transition-colors font-medium"
        >
          Terapkan Filter
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-3xl shadow-sm border border-gray-50 p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">User ID</label>
          <input
            v-model="filters.userId"
            type="text"
            placeholder="Filter User..."
            class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm font-bold"
          />
        </div>
        <div>
          <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Kategori</label>
          <select
            v-model="filters.category"
            class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm font-bold appearance-none bg-no-repeat bg-[right_1rem_center]"
            style="background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3E%3Cpath stroke=%22%236b7280%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22m6 8 4 4 4-4%22%2F%3E%3C%2Fsvg%3E')"
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
          <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Tanggal</label>
          <input
            v-model="dateFilter"
            type="text"
            placeholder="YYYY-MM-DD"
            class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm font-bold"
          />
        </div>
        <div class="flex items-end">
          <button
            @click="applyFilters"
            class="w-full bg-gray-800 text-white py-3 rounded-2xl hover:bg-black transition-all font-black text-xs uppercase tracking-widest"
          >
            Cari Data
          </button>
        </div>
      </div>
    </div>

    <!-- Chat Messages Table -->
    <div class="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
      <!-- Table Header -->
      <div class="p-8 border-b border-gray-50 bg-gray-50 bg-opacity-30">
        <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center">
          <span class="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></span>
          Live Stream Pesan
        </h3>
      </div>

      <!-- Table Content -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 bg-opacity-50 text-[10px] uppercase font-black tracking-widest text-gray-400">
              <th class="px-8 py-4 text-left">Waktu</th>
              <th class="px-6 py-4 text-left">Pengirim</th>
              <th class="px-6 py-4 text-left">Pesan</th>
              <th class="px-6 py-4 text-center">Topik</th>
              <th class="px-8 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="loading">
              <td colspan="5" class="px-8 py-16 text-center text-gray-400">
                <div class="flex flex-col items-center">
                  <svg class="w-10 h-10 animate-spin text-epanen-primary mb-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p class="font-bold uppercase text-[10px] tracking-widest">Sinkronisasi Data...</p>
                </div>
              </td>
            </tr>
            <tr v-else-if="paginatedLogs.length === 0">
              <td colspan="5" class="px-8 py-16 text-center text-gray-300">
                 <p class="font-black uppercase text-xs tracking-widest italic">Tidak ada pesan ditemukan</p>
              </td>
            </tr>
            <tr v-else v-for="log in paginatedLogs" :key="log.id" class="hover:bg-gray-50 transition-colors group">
              <td class="px-8 py-5 whitespace-nowrap text-xs font-bold text-gray-400">{{ formatTime(log.created_at) }}</td>
              <td class="px-6 py-5 whitespace-nowrap">
                <div class="flex items-center">
                  <div :class="['w-8 h-8 rounded-full flex items-center justify-center mr-3 font-black text-[10px]', log.role === 'user' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500']">
                    {{ log.role === 'user' ? 'U' : 'AI' }}
                  </div>
                  <span class="text-sm font-black text-gray-700">{{ log.user_name || 'Anonymous' }}</span>
                </div>
              </td>
              <td class="px-6 py-5 text-sm text-gray-500 max-w-md">
                <p class="truncate">{{ log.message }}</p>
              </td>
              <td class="px-6 py-5 text-center">
                <span v-if="log.category" class="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                  {{ log.category }}
                </span>
                <span v-else class="text-gray-200 text-xs">-</span>
              </td>
              <td class="px-8 py-5 text-right">
                <button
                  @click="viewFullMessage(log)"
                  class="bg-gray-50 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-800 hover:text-white transition-all shadow-sm"
                >
                  Inspect
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="chatLogs.length > 25" class="px-8 py-6 border-t border-gray-50 flex items-center justify-between">
        <p class="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">
          Stream {{ (currentPage - 1) * 25 + 1 }} - {{ Math.min(currentPage * 25, chatLogs.length) }} of {{ chatLogs.length }}
        </p>
        <div class="flex space-x-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="p-2 border border-gray-100 rounded-xl text-gray-400 hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span class="px-4 py-2 text-[10px] font-black text-gray-700 uppercase tracking-widest flex items-center">Hal {{ currentPage }}</span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="p-2 border border-gray-100 rounded-xl text-gray-400 hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Message Detail Modal -->
    <div v-if="showMessageDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm" @click="showMessageDialog = false"></div>
      <div class="relative bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
        <div class="p-8 pb-4">
          <div class="flex items-start justify-between">
            <div class="flex items-center">
              <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center mr-4 shadow-sm', selectedMessage?.role === 'user' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500']">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path v-if="selectedMessage?.role === 'user'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                   <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                 </svg>
              </div>
              <div>
                <h3 class="text-2xl font-black text-gray-800 tracking-tight">{{ selectedMessage?.user_name || 'Anonymous' }}</h3>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{{ formatFullTime(selectedMessage?.created_at) }}</p>
              </div>
            </div>
            <button @click="showMessageDialog = false" class="p-2 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div class="p-8 flex-1 overflow-y-auto space-y-6">
          <div v-if="selectedMessage?.category" class="bg-gray-50 px-5 py-4 rounded-3xl inline-flex items-center">
            <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-3 border-r border-gray-200 pr-3">Kategori</span>
            <span class="text-xs font-black text-gray-600 uppercase tracking-widest">{{ selectedMessage.category }}</span>
          </div>

          <div class="bg-gray-50 bg-opacity-50 p-8 rounded-[2rem] border border-gray-50 relative overflow-hidden">
             <!-- Decor -->
             <div class="absolute top-0 right-0 p-4 opacity-5">
               <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H19.017C21.2261 3 23.017 4.79086 23.017 7V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1.017 21L1.017 18C1.017 16.8954 1.91243 16 3.017 16H6.017C6.56928 16 7.017 15.5523 7.017 15V9C7.017 8.44772 6.56928 8 6.017 8H3.017C1.91243 8 1.017 7.10457 1.017 6V5C1.017 3.89543 1.91243 3 3.017 3H6.017C8.22614 3 10.017 4.79086 10.017 7V15C10.017 18.3137 7.33071 21 4.017 21H1.017Z" /></svg>
             </div>
             
             <p class="text-lg font-bold text-gray-700 leading-relaxed relative z-10 whitespace-pre-wrap">{{ selectedMessage?.message }}</p>
          </div>
        </div>

        <div class="p-8 pt-4 border-t border-gray-50 flex justify-end">
           <button @click="showMessageDialog = false" class="bg-gray-800 text-white px-10 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:scale-105">Tutup Log</button>
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

const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * 25;
  const end = start + 25;
  return chatLogs.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(chatLogs.value.length / 25);
});

const loadChatLogs = async () => {
  loading.value = true;
  try {
    const params = {};
    if (filters.value.userId) params.userId = filters.value.userId;
    if (filters.value.category) params.category = filters.value.category;
    if (dateFilter.value) params.date = dateFilter.value;

    const [logsRes, statsRes] = await Promise.all([
      axios.get(`${API_BASE}/admin/chatlogs`, {
        params,
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get(`${API_BASE}/admin/chatlogs/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    ]);

    chatLogs.value = logsRes.data.data.messages || [];
    chatStats.value = statsRes.data.data || { totalMessages: 0, activeUsers: 0, byRole: [] };
    currentPage.value = 1;
  } catch (error) {
    console.error('Failed to load chat logs:', error);
    chatLogs.value = [];
    chatStats.value = { totalMessages: 0, activeUsers: 0, byRole: [] };
  } finally {
    loading.value = false;
  }
};

const applyFilters = () => {
  loadChatLogs();
};

const getUserCount = (role) => {
  const found = chatStats.value.byRole?.find(r => r.role === role);
  return found?.count || 0;
};

const viewFullMessage = (message) => {
  selectedMessage.value = message;
  showMessageDialog.value = true;
};

const formatTime = (dateStr) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatFullTime = (dateStr) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

onMounted(() => {
  loadChatLogs();
});
</script>
