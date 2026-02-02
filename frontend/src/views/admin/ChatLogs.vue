<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-epanen-primary">Chat Logs</h1>
      <p class="text-gray-600 text-sm">Monitor semua percakapan farmer dengan AI</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Total Messages</p>
            <p class="text-2xl font-bold text-gray-800">{{ chatStats.totalMessages || 0 }}</p>
          </div>
          <div class="w-11 h-11 bg-blue-50 rounded-lg flex items-center justify-center ml-3">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">User Messages</p>
            <p class="text-2xl font-bold text-blue-600">{{ getUserCount('user') }}</p>
          </div>
          <div class="w-11 h-11 bg-green-50 rounded-lg flex items-center justify-center ml-3">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">AI Responses</p>
            <p class="text-2xl font-bold text-green-600">{{ getUserCount('assistant') }}</p>
          </div>
          <div class="w-11 h-11 bg-purple-50 rounded-lg flex items-center justify-center ml-3">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Active Users</p>
            <p class="text-2xl font-bold text-orange-600">{{ chatStats.activeUsers || 0 }}</p>
            <p class="text-xs text-gray-500 mt-1">7 hari terakhir</p>
          </div>
          <div class="w-11 h-11 bg-orange-50 rounded-lg flex items-center justify-center ml-3">
            <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

    <!-- Chat Messages Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-100">
        <h3 class="font-semibold text-gray-800 flex items-center">
          <svg class="w-5 h-5 mr-2 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
          Semua Pesan
        </h3>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Waktu</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pesan</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Kategori</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="loading">
              <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                <svg class="w-8 h-8 mx-auto mb-2 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p>Memuat data...</p>
              </td>
            </tr>
            <tr v-else-if="paginatedLogs.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p class="text-sm">Belum ada chat logs</p>
              </td>
            </tr>
            <tr v-else v-for="log in paginatedLogs" :key="log.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ formatTime(log.created_at) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{{ log.user_name || 'Unknown' }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2.5 py-1 rounded-full text-xs font-medium',
                    log.role === 'user' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  ]"
                >
                  {{ log.role === 'user' ? 'User' : 'AI' }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600 max-w-md truncate">{{ log.message }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span v-if="log.category" class="bg-gray-100 text-gray-700 px-2.5 py-1 rounded text-xs capitalize">
                  {{ log.category }}
                </span>
                <span v-else class="text-gray-400 text-xs">-</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button
                  @click="viewFullMessage(log)"
                  class="text-epanen-secondary hover:text-epanen-primary text-sm font-medium transition-colors"
                >
                  Lihat Detail
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="chatLogs.length > 25" class="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <p class="text-sm text-gray-600">
          Menampilkan {{ (currentPage - 1) * 25 + 1 }} sampai {{ Math.min(currentPage * 25, chatLogs.length) }} dari {{ chatLogs.length }} pesan
        </p>
        <div class="flex space-x-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>
          <span class="px-3 py-1 text-sm text-gray-600">Hal {{ currentPage }} dari {{ totalPages }}</span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>
    </div>

    <!-- Message Detail Modal -->
    <div v-if="showMessageDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black bg-opacity-50" @click="showMessageDialog = false"></div>
      <div class="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-800">Detail Pesan - {{ selectedMessage?.role === 'user' ? 'User' : 'AI' }}</h3>
            <button @click="showMessageDialog = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div v-if="selectedMessage" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">User</p>
                <p class="font-medium text-gray-800">{{ selectedMessage.user_name || 'Unknown' }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Waktu</p>
                <p class="font-medium text-gray-800">{{ formatFullTime(selectedMessage.created_at) }}</p>
              </div>
            </div>

            <div v-if="selectedMessage.category" class="bg-gray-50 p-4 rounded-lg">
              <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Kategori</p>
              <span class="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm capitalize">
                {{ selectedMessage.category }}
              </span>
            </div>

            <div>
              <p class="text-xs text-gray-500 uppercase tracking-wide mb-2">Pesan</p>
              <div class="bg-epanen-light p-4 rounded-lg border-l-4 border-epanen-primary">
                <p class="whitespace-pre-wrap text-gray-800">{{ selectedMessage.message }}</p>
              </div>
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
