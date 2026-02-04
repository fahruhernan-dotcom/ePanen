<template>
  <div class="space-y-8 animate-fade-in text-gray-800 pb-10">
    <!-- Premium Header -->
    <div class="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-sm border border-gray-50 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors">
      <div>
        <h1 class="text-4xl font-black text-gray-800 dark:text-white tracking-tighter leading-none mb-2">Discussion Moderation</h1>
        <p class="text-[10px] font-black text-epanen-primary uppercase tracking-[0.3em] opacity-60">Pantau & Moderasi Forum Komunitas</p>
      </div>
      <div class="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 px-6 py-3 rounded-2xl shadow-inner border border-gray-100 dark:border-gray-700 transition-colors">
         <span class="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
         <span class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Nala Forum Gatekeeper Active</span>
      </div>
    </div>

    <!-- Stats Grid -->
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

    <!-- Discussions List -->
    <div class="bg-white dark:bg-gray-900 rounded-[3rem] shadow-sm border border-gray-50 dark:border-gray-800 overflow-hidden transition-colors">
      <div class="p-8 border-b border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30 flex items-center justify-between transition-colors">
        <h3 class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] flex items-center gap-3">
           <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994(0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2(0 00-2-2H5a2 2(0 00-2 2v6a2 2(0 002 2h2v4l.586-.586z" /></svg>
           Daftar Topik Diskusi
        </h3>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50/50 dark:bg-gray-800/50 text-[10px] uppercase font-black tracking-widest text-gray-400 dark:text-gray-500">
              <th class="px-10 py-5 text-left">Topik & Konten</th>
              <th class="px-6 py-5 text-left">Penulis</th>
              <th class="px-6 py-5 text-center">Kategori</th>
              <th class="px-6 py-5 text-center">Engagement</th>
              <th class="px-6 py-5 text-left">Tgl Posting</th>
              <th class="px-10 py-5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-gray-800">
            <tr v-if="loading">
              <td colspan="6" class="px-10 py-24 text-center">
                 <div class="flex flex-col items-center">
                   <div class="w-12 h-12 border-4 border-epanen-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                   <p class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Memindai Forum Diskusi...</p>
                 </div>
              </td>
            </tr>
            <tr v-else-if="discussions.length === 0" class="group">
              <td colspan="6" class="px-10 py-20 text-center opacity-30">
                 <p class="text-sm font-black uppercase tracking-widest italic text-gray-400">Belum ada diskusi komunitas</p>
              </td>
            </tr>
            <tr v-else v-for="discussion in discussions" :key="discussion.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group">
              <td class="px-10 py-6">
                <div class="max-w-xs">
                  <p class="font-black text-gray-800 dark:text-gray-100 text-sm group-hover:text-epanen-primary transition-colors leading-snug">{{ discussion.title }}</p>
                </div>
              </td>
              <td class="px-6 py-6">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center mr-3 font-black text-[10px] text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-gray-700 group-hover:bg-epanen-primary group-hover:text-white transition-all shadow-sm">
                    {{ (discussion.author_name || 'U').charAt(0).toUpperCase() }}
                  </div>
                  <div class="min-w-0">
                    <span class="text-xs font-black text-gray-700 dark:text-gray-300 block truncate">{{ discussion.author_name || 'Anonymous' }}</span>
                    <span class="text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-tighter">Verified Person</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-6 text-center">
                <span class="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400 rounded-lg text-[10px] font-black uppercase tracking-wider">
                  {{ discussion.category || 'Umum' }}
                </span>
              </td>
              <td class="px-6 py-6">
                <div class="flex items-center justify-center space-x-6">
                   <div class="text-center">
                     <p class="text-[8px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-tighter mb-0.5">Views</p>
                     <p class="text-xs font-black text-blue-500 dark:text-blue-400">{{ discussion.views || 0 }}</p>
                   </div>
                   <div class="text-center border-l border-gray-100 dark:border-gray-800 pl-6">
                     <p class="text-[8px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-tighter mb-0.5">Replies</p>
                     <p class="text-xs font-black text-green-500 dark:text-green-400">{{ discussion.reply_count || 0 }}</p>
                   </div>
                </div>
              </td>
              <td class="px-6 py-6 whitespace-nowrap text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                {{ formatDate(discussion.created_at) }}
              </td>
              <td class="px-10 py-6 text-right">
                <button
                  @click="confirmDelete(discussion)"
                  class="w-12 h-12 flex items-center justify-center bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white rounded-2xl transition-all shadow-sm group/btn"
                >
                  <svg class="w-6 h-6 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Premium Modals -->
    <PremiumModal 
      :show="modal.show" 
      :title="modal.title" 
      :message="modal.message" 
      :type="modal.type"
      :show-confirm="modal.showConfirm"
      @close="modal.show = false"
      @confirm="executeAction"
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
const discussions = ref([]);

const modal = ref({
  show: false,
  title: '',
  message: '',
  type: 'info',
  showConfirm: false,
  onConfirm: null
});

const statCards = computed(() => [
  { label: 'Active Topics', value: discussions.value.length, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857', bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-500 dark:text-blue-400' },
  { label: 'Global Reach', value: totalViews.value, icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z', bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-500 dark:text-indigo-400' },
  { label: 'Community Feed', value: totalReplies.value, icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-500 dark:text-green-400' },
  { label: 'Topic Clusters', value: uniqueCategories.value, icon: 'M4 6h16M4 10h16M4 14h16', bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-500 dark:text-purple-400' }
]);

const totalViews = computed(() => discussions.value.reduce((sum, d) => sum + (d.views || 0), 0));
const totalReplies = computed(() => discussions.value.reduce((sum, d) => sum + (d.reply_count || 0), 0));
const uniqueCategories = computed(() => new Set(discussions.value.map(d => d.category)).size);

const showPremiumAlert = (title, message, type = 'success') => {
  modal.value = { show: true, title, message, type, showConfirm: false };
};

const showPremiumConfirm = (title, message, onConfirm) => {
  modal.value = { show: true, title, message, type: 'danger', showConfirm: true, onConfirm };
};

const executeAction = () => {
  if (modal.value.onConfirm) modal.value.onConfirm();
  modal.value.show = false;
};

const loadDiscussions = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${API_BASE}/admin/discussions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    discussions.value = response.data.data.discussions || [];
  } catch (error) {
    console.error('Failed to load discussions:', error);
  } finally {
    loading.value = false;
  }
};

const confirmDelete = (discussion) => {
  showPremiumConfirm(
    'Hapus Topik?',
    `Apakah Anda yakin ingin menghapus diskusi "${discussion.title}"? Seluruh balasan di dalamnya juga akan ikut terhapus secara permanen.`,
    () => deleteDiscussion(discussion)
  );
};

const deleteDiscussion = async (discussion) => {
  try {
    await axios.delete(`${API_BASE}/admin/discussions/${discussion.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    showPremiumAlert('Berhasil', 'Topik diskusi dan seluruh balasan telah dibersihkan dari forum');
    loadDiscussions();
  } catch (error) {
    showPremiumAlert('Gagal', 'Moderasi gagal diproses', 'error');
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

onMounted(() => {
  loadDiscussions();
});
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>
