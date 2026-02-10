<template>
  <div class="space-y-8 animate-fade-in pb-10">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 p-2 transition-colors">
      <div>
        <h1 class="text-4xl font-black text-gray-800 dark:text-white tracking-tight mb-2">User Management</h1>
        <p class="text-gray-500 dark:text-gray-400 font-bold tracking-wide uppercase text-[10px] flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-epanen-primary animate-pulse"></span>
          Kelola dan monitor semua pengguna ePanen Kian Office
        </p>
      </div>
      <div class="flex items-center space-x-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
         <svg class="w-5 h-5 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
         </svg>
         <span class="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Database Farmer</span>
      </div>
    </div>

    <!-- Stats Dashboard Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <div class="group bg-white dark:bg-gray-900 rounded-[2rem] p-8 shadow-sm border border-gray-50 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-1 transition-all">
        <div class="flex items-center justify-between mb-4">
          <p class="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-widest">Total Farmer</p>
          <div class="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
        <h3 class="text-4xl font-black text-gray-800 dark:text-white tracking-tight">{{ pagination.total || 0 }}</h3>
      </div>

      <div class="group bg-white dark:bg-gray-900 rounded-[2rem] p-8 shadow-sm border border-gray-50 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-1 transition-all">
        <div class="flex items-center justify-between mb-4">
          <p class="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-widest">Aktif Sekarang</p>
          <div class="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h3 class="text-4xl font-black text-green-600 tracking-tight">{{ activeUsersCount }}</h3>
      </div>

      <div class="group bg-white dark:bg-gray-900 rounded-[2rem] p-8 shadow-sm border border-gray-50 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-1 transition-all">
        <div class="flex items-center justify-between mb-4">
          <p class="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-widest">Status Suspended</p>
          <div class="w-12 h-12 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        </div>
        <h3 class="text-4xl font-black text-red-600 tracking-tight">{{ suspendedUsersCount }}</h3>
      </div>
    </div>

    <!-- Filter Section (Premium Box) -->
    <div class="bg-gradient-to-br from-gray-800 to-black rounded-[2.5rem] p-8 text-white shadow-xl">
      <div class="flex flex-col lg:flex-row items-center gap-6">
        <div class="flex-1 w-full relative">
          <span class="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            @input="debouncedSearch"
            type="text"
            placeholder="Cari Farmer via Nama atau Email..."
            class="w-full pl-16 pr-6 py-5 bg-white/10 border-none rounded-3xl focus:ring-2 focus:ring-epanen-primary placeholder-gray-500 text-sm font-bold transition-all outline-none"
          />
        </div>
        <div class="w-full lg:w-64">
          <select
            v-model="statusFilter"
            @change="searchUsers"
            class="w-full px-6 py-5 bg-white/10 border-none rounded-3xl focus:ring-2 focus:ring-epanen-primary text-sm font-bold transition-all outline-none appearance-none"
          >
            <option value="" class="bg-gray-800">Semua Status</option>
            <option value="active" class="bg-gray-800">Active Only</option>
            <option value="suspended" class="bg-gray-800">Suspended Only</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Users Table (Refined Design) -->
    <div class="bg-white dark:bg-gray-900 rounded-[3rem] shadow-sm border border-gray-50 dark:border-gray-800 overflow-hidden transition-colors">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50/50 dark:bg-gray-800/50 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
              <th class="px-8 py-6 text-left">Farmer Profile</th>
              <th class="px-8 py-6 text-left">Contact & Info</th>
              <th class="px-8 py-6 text-left">AI Activity</th>
              <th class="px-8 py-6 text-left">Joined Date</th>
              <th class="px-8 py-6 text-left">Account Status</th>
              <th class="px-8 py-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-gray-800">
            <tr v-if="loading">
              <td colspan="6" class="px-8 py-20 text-center">
                <div class="inline-block w-10 h-10 border-4 border-epanen-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p class="text-gray-400 dark:text-gray-500 font-bold tracking-widest text-[10px] uppercase">Sinkronisasi Data...</p>
              </td>
            </tr>
            <tr v-else-if="users.length === 0" class="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
              <td colspan="6" class="px-8 py-20 text-center">
                <div class="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-10 h-10 text-gray-200 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <p class="text-gray-400 font-black text-xs uppercase tracking-widest">No users found</p>
              </td>
            </tr>
            <tr v-else v-for="user in users" :key="user.id" class="group hover:bg-gray-50/30 dark:hover:bg-gray-800/30 transition-all border-l-4 border-l-transparent hover:border-l-epanen-primary">
              <td class="px-8 py-6">
                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center text-gray-400 dark:text-gray-600 font-black text-xl group-hover:from-epanen-primary group-hover:to-epanen-secondary group-hover:text-white transition-all shadow-sm">
                    {{ (user.name || 'U').charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <h4 class="font-black text-gray-800 dark:text-gray-100 text-base leading-none mb-1">{{ user.name || 'Unknown' }}</h4>
                    <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tighter">Farmer ID: #{{ user.id.toString().padStart(4, '0') }}</p>
                  </div>
                </div>
              </td>
              <td class="px-8 py-6">
                <div class="space-y-1">
                  <p class="text-sm font-bold text-gray-700 dark:text-gray-300">{{ user.email }}</p>
                  <p class="text-[11px] font-mono font-bold text-blue-500">{{ user.phone || 'No Phone Registered' }}</p>
                </div>
              </td>
              <td class="px-8 py-6">
                <div class="flex flex-col items-start gap-1">
                  <span class="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap whitespace-nowrap">
                    {{ user.total_messages || 0 }} Messages
                  </span>
                </div>
              </td>
              <td class="px-8 py-6">
                <p class="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">{{ formatDate(user.created_at) }}</p>
              </td>
              <td class="px-8 py-6">
                <div :class="['inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest', user.status === 'active' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400']">
                  <span :class="['w-2 h-2 rounded-full', user.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500']"></span>
                  {{ user.status }}
                </div>
              </td>
              <td class="px-8 py-6">
                <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                  <button
                    @click="viewUserChats(user)"
                    class="w-10 h-10 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-lg transition-all"
                    title="View Chat Logs"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </button>
                  <button
                    @click="initToggleStatus(user)"
                    :class="['w-10 h-10 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl flex items-center justify-center transition-all hover:shadow-lg', 
                      user.status === 'active' ? 'text-amber-500 hover:bg-amber-500 hover:text-white' : 'text-green-500 hover:bg-green-500 hover:text-white']"
                    :title="user.status === 'active' ? 'Suspend Farmer' : 'Activate Farmer'"
                  >
                    <svg v-if="user.status === 'active'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button
                    @click="initDeleteUser(user)"
                    class="w-10 h-10 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg transition-all"
                    title="Delete Farmer Forever"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination (Premium Style) -->
      <div v-if="pagination.total > 0" class="px-8 py-8 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between bg-gray-50/20 dark:bg-gray-800/20 transition-colors">
        <p class="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
          Showing {{ users.length }} of {{ pagination.total }} Farmers
        </p>
        <div class="flex gap-4">
          <button
            @click="prevPage"
            :disabled="pagination.page === 1"
            class="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            ← Previous
          </button>
          <div class="bg-gray-800 dark:bg-white text-white dark:text-black px-6 py-3 rounded-2xl font-black text-[10px] flex items-center shadow-lg transition-colors">
            Page {{ pagination.page }}
          </div>
          <button
            @click="nextPage"
            :disabled="users.length < pagination.limit"
            class="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Next →
          </button>
        </div>
      </div>
    </div>

    <!-- User Chats Modal (Glassmorphic) -->
    <Transition name="modal">
      <div v-if="showChatsDialog" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-md" @click="showChatsDialog = false"></div>
        <div class="relative bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col transform transition-all border border-white/20 dark:border-gray-800 transition-colors">
          <div class="p-10 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between transition-colors">
            <div>
              <h3 class="text-3xl font-black text-gray-800 dark:text-white tracking-tight leading-none mb-2">Interaksi Farmer</h3>
              <p class="text-blue-500 font-bold text-xs uppercase tracking-widest">{{ selectedUser?.name }} • Database Log</p>
            </div>
            <button @click="showChatsDialog = false" class="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-gray-800 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-10 space-y-6 bg-gray-50/50 dark:bg-gray-800/50">
            <div v-for="(msg, index) in userChats" :key="index" :class="['flex', msg.role === 'user' ? 'justify-end' : 'justify-start']">
              <div :class="['max-w-[75%] rounded-[2rem] p-6 shadow-sm', msg.role === 'user' ? 'bg-epanen-primary text-white rounded-br-none' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-100 dark:border-gray-700 transition-colors']">
                <div class="flex items-center justify-between mb-2 gap-4">
                  <span class="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">{{ msg.role === 'user' ? 'Farmer Input' : 'Kian AI Response' }}</span>
                  <span class="text-[9px] font-bold opacity-40">{{ formatTime(msg.created_at) }}</span>
                </div>
                <p class="text-sm font-bold leading-relaxed whitespace-pre-wrap">{{ msg.message }}</p>
              </div>
            </div>
            
            <div v-if="userChats.length === 0" class="text-center py-20">
              <div class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-4 text-gray-300 dark:text-gray-600 transition-colors">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <p class="text-gray-400 font-black text-xs uppercase tracking-widest">Belum ada riwayat aktivitas</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Global Premium Modal Component -->
    <PremiumModal 
      :show="premiumModal.show"
      :title="premiumModal.title"
      :message="premiumModal.message"
      :type="premiumModal.type"
      :confirm-text="premiumModal.confirmText"
      @confirm="premiumModal.onConfirm"
      @cancel="premiumModal.show = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import PremiumModal from '@/components/common/PremiumModal.vue';

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

// Premium Modal State
const premiumModal = ref({
  show: false,
  title: '',
  message: '',
  type: 'info',
  confirmText: 'Lanjutkan',
  onConfirm: () => {}
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

const initToggleStatus = (user) => {
  const newStatus = user.status === 'active' ? 'suspended' : 'active';
  premiumModal.value = {
    show: true,
    title: newStatus === 'suspended' ? 'Suspend Farmer?' : 'Aktifkan Farmer?',
    message: `Anda akan mengubah status farmer "${user.name}" menjadi ${newStatus}. Akun ${newStatus === 'suspended' ? 'tidak bisa login' : 'akan pulih'}.`,
    type: newStatus === 'suspended' ? 'danger' : 'info',
    confirmText: 'Ya, Update Status',
    onConfirm: () => toggleUserStatus(user, newStatus)
  };
};

const toggleUserStatus = async (user, newStatus) => {
  premiumModal.value.show = false;
  try {
    await axios.put(`${API_BASE}/admin/users/${user.id}/status`, { status: newStatus }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    user.status = newStatus;
  } catch (error) {
    console.error('Failed to update user status:', error);
    alert('Gagal mengupdate status user');
  }
};

const initDeleteUser = (user) => {
  premiumModal.value = {
    show: true,
    title: 'Hapus Farmer Permanen?',
    message: `PERINGATAN KRITIKAL: Akun "${user.name}" akan dihapus selamanya dari database ePanen. Seluruh riwayat chat dan memori AI terkait akan ikut musnah.`,
    type: 'danger',
    confirmText: 'YA, HAPUS PERMANEN',
    onConfirm: () => deleteUser(user)
  };
};

const deleteUser = async (user) => {
  premiumModal.value.show = false;
  try {
    await axios.delete(`${API_BASE}/admin/users/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    loadUsers();
  } catch (error) {
    console.error('Failed to delete user:', error);
    alert('Gagal menghapus user');
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

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div:last-child {
  animation: modal-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
