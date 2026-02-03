<template>
  <div class="space-y-6 animate-fade-in text-gray-800">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2">
      <div>
        <h1 class="text-3xl font-black text-gray-800 tracking-tight">Discussion Moderation</h1>
        <p class="text-gray-500 font-medium tracking-wide">Pantau dan moderasi forum diskusi komunitas ePanen</p>
      </div>
      <div class="flex items-center space-x-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
         <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
         <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Forum Active</span>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
        <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Diskusi</p>
        <h3 class="text-3xl font-black text-gray-800">{{ discussions.length }}</h3>
      </div>
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-indigo-500">
        <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Views</p>
        <h3 class="text-3xl font-black text-indigo-600">{{ totalViews }}</h3>
      </div>
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-green-500">
        <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Replies</p>
        <h3 class="text-3xl font-black text-green-600">{{ totalReplies }}</h3>
      </div>
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-purple-500">
        <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Kategori</p>
        <h3 class="text-3xl font-black text-purple-600">{{ uniqueCategories }}</h3>
      </div>
    </div>

    <!-- Discussions List -->
    <div class="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
      <div class="p-8 border-b border-gray-50 bg-gray-50 bg-opacity-30 flex items-center justify-between">
        <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest">Daftar Topik Diskusi</h3>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 bg-opacity-50 text-[10px] uppercase font-black tracking-widest text-gray-400">
              <th class="px-8 py-4 text-left">Topik & Konten</th>
              <th class="px-6 py-4 text-left">Penulis</th>
              <th class="px-6 py-4 text-center">Kategori</th>
              <th class="px-6 py-4 text-center">Popularitas</th>
              <th class="px-6 py-4 text-left">Tgl Posting</th>
              <th class="px-8 py-4 text-right">Moderasi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="loading">
              <td colspan="6" class="px-8 py-16 text-center text-gray-400">
                <div class="flex flex-col items-center">
                  <svg class="w-10 h-10 animate-spin text-epanen-primary mb-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p class="font-bold uppercase text-[10px] tracking-widest">Loading Forum...</p>
                </div>
              </td>
            </tr>
            <tr v-else-if="discussions.length === 0">
              <td colspan="6" class="px-8 py-16 text-center text-gray-300 italic">Belum ada diskusi komunitas</td>
            </tr>
            <tr v-else v-for="discussion in discussions" :key="discussion.id" class="hover:bg-gray-50 transition-colors group">
              <td class="px-8 py-5">
                <p class="font-black text-gray-700 text-sm group-hover:text-epanen-primary transition-colors">{{ discussion.title }}</p>
              </td>
              <td class="px-6 py-5">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center mr-3 font-black text-[10px] text-gray-400">
                    {{ (discussion.author_name || 'U').charAt(0).toUpperCase() }}
                  </div>
                  <span class="text-xs font-bold text-gray-500">{{ discussion.author_name || 'Anonymous' }}</span>
                </div>
              </td>
              <td class="px-6 py-5 text-center">
                <span class="px-3 py-1 bg-indigo-50 text-indigo-500 rounded-lg text-[10px] font-black uppercase tracking-wider">
                  {{ discussion.category || 'Umum' }}
                </span>
              </td>
              <td class="px-6 py-5">
                <div class="flex items-center justify-center space-x-4">
                   <div class="text-center">
                     <p class="text-[10px] font-black text-gray-300 uppercase leading-none">Views</p>
                     <p class="text-sm font-black text-blue-500">{{ discussion.views || 0 }}</p>
                   </div>
                   <div class="text-center">
                     <p class="text-[10px] font-black text-gray-300 uppercase leading-none">Reply</p>
                     <p class="text-sm font-black text-green-500">{{ discussion.reply_count || 0 }}</p>
                   </div>
                </div>
              </td>
              <td class="px-6 py-5 whitespace-nowrap text-xs font-bold text-gray-400">
                {{ formatDate(discussion.created_at) }}
              </td>
              <td class="px-8 py-5 text-right">
                <button
                  @click="deleteDiscussion(discussion)"
                  class="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="Hapus Diskusi"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
const discussions = ref([]);

const totalViews = computed(() => discussions.value.reduce((sum, d) => sum + (d.views || 0), 0));
const totalReplies = computed(() => discussions.value.reduce((sum, d) => sum + (d.reply_count || 0), 0));
const uniqueCategories = computed(() => new Set(discussions.value.map(d => d.category)).size);

const loadDiscussions = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${API_BASE}/admin/discussions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    discussions.value = response.data.data.discussions || [];
  } catch (error) {
    console.error('Failed to load discussions:', error);
    discussions.value = [];
  } finally {
    loading.value = false;
  }
};

const deleteDiscussion = async (discussion) => {
  if (!confirm(`Yakin ingin menghapus diskusi "${discussion.title}"?`)) return;

  try {
    await axios.delete(`${API_BASE}/admin/discussions/${discussion.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Diskusi berhasil dihapus!');
    loadDiscussions();
  } catch (error) {
    console.error('Failed to delete discussion:', error);
    alert('Gagal menghapus diskusi');
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

onMounted(() => {
  loadDiscussions();
});
</script>
