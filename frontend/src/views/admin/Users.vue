<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-epanen-primary">User Management</h1>
      <p class="text-gray-600 text-sm">Kelola semua pengguna ePanen</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Total Users</p>
            <p class="text-2xl font-bold text-gray-800">{{ pagination.total || 0 }}</p>
          </div>
          <div class="w-11 h-11 bg-blue-50 rounded-lg flex items-center justify-center ml-3">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Active Users</p>
            <p class="text-2xl font-bold text-green-600">{{ activeUsersCount }}</p>
          </div>
          <div class="w-11 h-11 bg-green-50 rounded-lg flex items-center justify-center ml-3">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Suspended</p>
            <p class="text-2xl font-bold text-red-600">{{ suspendedUsersCount }}</p>
          </div>
          <div class="w-11 h-11 bg-red-50 rounded-lg flex items-center justify-center ml-3">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Search & Filter -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 class="font-semibold text-gray-800 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Cari & Filter Users
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="md:col-span-2">
          <input
            v-model="searchQuery"
            @input="debouncedSearch"
            type="text"
            placeholder="Cari berdasarkan nama atau email..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
          />
        </div>
        <select
          v-model="statusFilter"
          @change="searchUsers"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
        >
          <option value="">Semua Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-100">
        <h3 class="font-semibold text-gray-800 flex items-center">
          <svg class="w-5 h-5 mr-2 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Daftar Pengguna
        </h3>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Kontak</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Messages</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
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
            <tr v-else-if="users.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p class="text-sm">Belum ada user</p>
              </td>
            </tr>
            <tr v-else v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gradient-to-br from-epanen-primary to-epanen-secondary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span class="text-white font-bold text-sm">
                      {{ (user.name || 'U').charAt(0).toUpperCase() }}
                    </span>
                  </div>
                  <div class="min-w-0">
                    <p class="font-medium text-gray-800 truncate">{{ user.name || 'Unknown' }}</p>
                    <p class="text-xs text-gray-500 truncate">ID: {{ user.id }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="space-y-1">
                  <p class="text-sm text-gray-800 truncate">{{ user.email }}</p>
                  <p class="text-xs text-gray-500">{{ user.phone || '-' }}</p>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ user.total_messages || 0 }} pesan
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ formatDate(user.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2.5 py-1 rounded-full text-xs font-medium',
                    user.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  ]"
                >
                  {{ user.status === 'active' ? 'Active' : 'Suspended' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-2">
                  <button
                    @click="viewUserChats(user)"
                    class="text-epanen-secondary hover:text-epanen-primary text-sm font-medium transition-colors"
                  >
                    Chats
                  </button>
                  <button
                    @click="toggleUserStatus(user)"
                    :class="[
                      'text-sm font-medium transition-colors',
                      user.status === 'active'
                        ? 'text-red-600 hover:text-red-700'
                        : 'text-green-600 hover:text-green-700'
                    ]"
                  >
                    {{ user.status === 'active' ? 'Suspend' : 'Activate' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.total > 0" class="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <p class="text-sm text-gray-600">
          Menampilkan {{ users.length }} user
          <span v-if="pagination.total > pagination.limit"> (total {{ pagination.total }})</span>
        </p>
        <div class="flex space-x-2">
          <button
            @click="prevPage"
            :disabled="pagination.page === 1"
            class="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>
          <span class="px-3 py-1 text-sm text-gray-600">Hal {{ pagination.page }}</span>
          <button
            @click="nextPage"
            :disabled="users.length < pagination.limit"
            class="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>
    </div>

    <!-- User Chats Modal -->
    <div v-if="showChatsDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black bg-opacity-50" @click="showChatsDialog = false"></div>
      <div class="relative bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-800">Chat History - {{ selectedUser?.name }}</h3>
            <button @click="showChatsDialog = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto p-6 space-y-4">
          <div v-if="userChats.length > 0">
            <div
              v-for="(msg, index) in userChats"
              :key="index"
              :class="[
                'max-w-2xl mx-auto',
                msg.role === 'user' ? 'text-right' : 'text-left'
              ]"
            >
              <div
                :class="[
                  'inline-block px-4 py-3 rounded-2xl',
                  msg.role === 'user'
                    ? 'bg-epanen-primary text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                ]"
              >
                <div class="flex items-center justify-between mb-1 space-x-3">
                  <span class="font-medium text-xs opacity-90">{{ msg.role === 'user' ? 'User' : 'AI' }}</span>
                  <span class="text-xs opacity-70">{{ formatTime(msg.created_at) }}</span>
                </div>
                <p class="whitespace-pre-wrap text-sm">{{ msg.message }}</p>
              </div>
            </div>
          </div>
          <div v-else class="text-center text-gray-500 py-12">
            <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p class="text-sm">Tidak ada chat history</p>
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
const users = ref([]);
const userChats = ref([]);
const selectedUser = ref(null);
const showChatsDialog = ref(false);

const searchQuery = ref('');
const statusFilter = ref('');

const pagination = ref({
  page: 1,
  limit: 25,
  total: 0
});

let searchTimeout = null;

const activeUsersCount = computed(() => {
  return users.value.filter(u => u.status === 'active').length;
});

const suspendedUsersCount = computed(() => {
  return users.value.filter(u => u.status === 'suspended').length;
});

const debouncedSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    searchUsers();
  }, 500);
};

const loadUsers = async () => {
  loading.value = true;
  try {
    const params = {
      page: pagination.value.page,
      limit: pagination.value.limit
    };
    if (searchQuery.value) params.search = searchQuery.value;
    if (statusFilter.value) params.status = statusFilter.value;

    const response = await axios.get(`${API_BASE}/admin/users`, {
      params,
      headers: { Authorization: `Bearer ${token}` }
    });

    users.value = response.data.data.users || [];
    pagination.value.total = response.data.data.pagination?.total || 0;
  } catch (error) {
    console.error('Failed to load users:', error);
    users.value = [];
  } finally {
    loading.value = false;
  }
};

const searchUsers = () => {
  pagination.value.page = 1;
  loadUsers();
};

const prevPage = () => {
  if (pagination.value.page > 1) {
    pagination.value.page--;
    loadUsers();
  }
};

const nextPage = () => {
  pagination.value.page++;
  loadUsers();
};

const viewUserChats = async (user) => {
  selectedUser.value = user;
  try {
    const response = await axios.get(`${API_BASE}/admin/chatlogs/user/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    userChats.value = response.data.data.messages || [];
    showChatsDialog.value = true;
  } catch (error) {
    console.error('Failed to load user chats:', error);
    userChats.value = [];
    showChatsDialog.value = true;
  }
};

const toggleUserStatus = async (user) => {
  const newStatus = user.status === 'active' ? 'suspended' : 'active';
  const confirmed = confirm(`Yakin ingin ${newStatus === 'suspended' ? 'suspend' : 'activate'} user "${user.name}"?`);

  if (!confirmed) return;

  try {
    await axios.put(`${API_BASE}/admin/users/${user.id}/status`, { status: newStatus }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Update local state
    user.status = newStatus;

    // Show success message (simple alert for now)
    alert(`User berhasil di-${newStatus}`);
  } catch (error) {
    console.error('Failed to update user status:', error);
    alert('Gagal mengupdate status user');
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatTime = (dateStr) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
};

onMounted(() => {
  loadUsers();
});
</script>
