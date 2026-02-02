<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-epanen-primary">Discussion Management</h1>
      <p class="text-gray-600 text-sm">Moderasi forum diskusi komunitas</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Total Diskusi</p>
        <p class="text-2xl font-bold text-gray-800">{{ discussions.length }}</p>
      </div>
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Total Views</p>
        <p class="text-2xl font-bold text-blue-600">{{ totalViews }}</p>
      </div>
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Total Replies</p>
        <p class="text-2xl font-bold text-green-600">{{ totalReplies }}</p>
      </div>
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Kategori</p>
        <p class="text-2xl font-bold text-purple-600">{{ uniqueCategories }}</p>
      </div>
    </div>

    <!-- Discussions Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Title</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Author</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Views</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Created</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
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
            <tr v-else-if="discussions.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p class="text-sm">Belum ada diskusi</p>
              </td>
            </tr>
            <tr v-else v-for="discussion in discussions" :key="discussion.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <p class="font-medium text-gray-800">{{ discussion.title }}</p>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-epanen-light rounded-full flex items-center justify-center mr-2">
                    <span class="text-epanen-primary font-bold text-xs">
                      {{ (discussion.author_name || 'U').charAt(0).toUpperCase() }}
                    </span>
                  </div>
                  <span class="text-sm text-gray-600">{{ discussion.author_name || 'Unknown' }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="bg-gray-100 text-gray-700 px-2.5 py-1 rounded text-xs capitalize">
                  {{ discussion.category || 'Umum' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-blue-600 font-semibold">{{ discussion.views || 0 }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ formatDate(discussion.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button
                  @click="deleteDiscussion(discussion)"
                  class="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Hapus
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
