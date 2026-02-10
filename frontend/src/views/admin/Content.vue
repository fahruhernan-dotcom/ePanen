<template>
  <div class="space-y-8 animate-fade-in text-gray-800 pb-10">
    <!-- Premium Header -->
    <div class="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-sm border border-gray-50 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors">
      <div>
        <h1 class="text-4xl font-black text-gray-800 dark:text-white tracking-tighter leading-none mb-2">Content Management</h1>
        <p class="text-[10px] font-black text-epanen-primary uppercase tracking-[0.3em] opacity-60">Kurasi Artikel & Edukasi Petani</p>
      </div>
      <button
        @click="openCreateDialog"
        class="bg-gradient-to-r from-epanen-primary to-epanen-secondary text-white px-8 py-4 rounded-2xl shadow-xl shadow-epanen-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all font-black text-xs uppercase tracking-widest flex items-center"
      >
        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" />
        </svg>
        Artikel Baru
      </button>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="(stat, idx) in statsCards" :key="idx" class="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-50 dark:border-gray-800 flex items-center gap-5 transition-colors">
        <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm', stat.bg]">
          <svg class="w-6 h-6" :class="stat.text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon" /></svg>
        </div>
        <div>
          <p class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-tight">{{ stat.label }}</p>
          <h3 class="text-2xl font-black text-gray-800 dark:text-white tracking-tighter mt-0.5">{{ stat.value }}</h3>
        </div>
      </div>
    </div>

    <!-- Filtering & List -->
    <div class="bg-white dark:bg-gray-900 rounded-[3rem] shadow-sm border border-gray-50 dark:border-gray-800 overflow-hidden transition-colors">
      <!-- Search & Filter Bar -->
      <div class="p-8 border-b border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30 transition-colors">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="relative group">
            <span class="absolute inset-y-0 left-0 pl-5 flex items-center text-gray-400 group-focus-within:text-epanen-primary transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </span>
            <input
              v-model="searchQuery"
              @input="debouncedSearch"
              type="text"
              placeholder="Cari judul artikel..."
              class="w-full pl-14 pr-6 py-4 bg-white dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm font-bold shadow-sm text-gray-800 dark:text-white"
            />
          </div>
          <div class="relative">
            <select
              v-model="categoryFilter"
              @change="loadArticles"
              class="w-full px-6 py-4 bg-white dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm font-bold shadow-sm appearance-none text-gray-800 dark:text-gray-300"
            >
              <option value="">Semua Kategori</option>
              <option v-for="cat in ['budidaya', 'hama-penyakit', 'cuaca-iklim', 'teknologi']" :key="cat" :value="cat" class="capitalize bg-white dark:bg-gray-800">
                {{ cat.replace('-', ' & ') }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none opacity-30">
               <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
          <div class="relative">
            <select
              v-model="statusFilter"
              @change="loadArticles"
              class="w-full px-6 py-4 bg-white dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm font-bold shadow-sm appearance-none text-gray-800 dark:text-gray-300"
            >
              <option value="">Semua Status</option>
              <option value="published" class="bg-white dark:bg-gray-800">🚀 Published</option>
              <option value="draft" class="bg-white dark:bg-gray-800">📁 Draft</option>
            </select>
            <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none opacity-30">
               <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Table Section -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50/50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500 text-[10px] uppercase font-black tracking-[0.2em]">
              <th class="px-10 py-5 text-left">Konten & Info</th>
              <th class="px-6 py-5 text-left">Kategori</th>
              <th class="px-6 py-5 text-center">Views</th>
              <th class="px-6 py-5 text-center">Status</th>
              <th class="px-6 py-5 text-left">Publikasi</th>
              <th class="px-10 py-5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-gray-800">
            <tr v-if="loading">
              <td colspan="6" class="px-10 py-20 text-center">
                 <div class="flex flex-col items-center">
                   <div class="w-12 h-12 border-4 border-epanen-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                   <p class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Sinkronisasi Konten...</p>
                 </div>
              </td>
            </tr>
            <tr v-else-if="articles.length === 0" class="group">
              <td colspan="6" class="px-10 py-20 text-center opacity-30">
                 <p class="text-sm font-black uppercase tracking-widest italic text-gray-400">Belum ada konten artikel</p>
              </td>
            </tr>
            <tr v-else v-for="article in articles" :key="article.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group">
              <td class="px-10 py-6">
                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <img v-if="article.image" :src="article.image" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  </div>
                  <div class="min-w-0">
                    <h4 class="font-black text-gray-800 dark:text-gray-100 text-sm truncate group-hover:text-epanen-primary transition-colors">{{ article.title }}</h4>
                    <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 line-clamp-1 mt-0.5">{{ article.excerpt || 'Tanpa ringkasan' }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-6">
                <span class="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400 rounded-lg text-[10px] font-black uppercase tracking-wider">
                  {{ article.category || 'Umum' }}
                </span>
              </td>
              <td class="px-6 py-6 text-center">
                <span class="text-sm font-black text-gray-800 dark:text-gray-200">{{ article.views || 0 }}</span>
              </td>
              <td class="px-6 py-6 text-center">
                <span
                  :class="[
                    'px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest',
                    article.status === 'published' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                  ]"
                >
                  {{ article.status }}
                </span>
              </td>
              <td class="px-6 py-6 whitespace-nowrap text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                {{ formatDate(article.created_at) }}
              </td>
              <td class="px-10 py-6 text-right">
                <div class="flex items-center justify-end space-x-2">
                  <button @click="editArticle(article)" class="w-10 h-10 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white rounded-xl transition-all shadow-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button @click="confirmDelete(article)" class="w-10 h-10 flex items-center justify-center bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Article Editor Modal (Premium Overhaul) -->
    <div v-if="showArticleDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-md" @click="showArticleDialog = false"></div>
      <div class="relative bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col animate-scale-in border border-white/20 dark:border-gray-800 transition-colors">
        <!-- Modal Header -->
        <div class="px-10 py-8 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors">
          <div>
            <h2 class="text-3xl font-black text-gray-800 dark:text-white tracking-tighter">{{ isEditing ? 'Edit Content' : 'Compose New Article' }}</h2>
            <p class="text-[10px] text-epanen-primary font-black uppercase tracking-[0.3em] mt-1">Kian Office Editorial Suite</p>
          </div>
          <button @click="showArticleDialog = false" class="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 rounded-2xl transition-all border border-gray-100 dark:border-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form @submit.prevent="saveArticle" class="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <!-- Left Metadata -->
            <div class="lg:col-span-5 space-y-6">
              <div class="group">
                <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">Judul Artikel</label>
                <input v-model="articleForm.title" type="text" required class="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-[1.5rem] focus:ring-2 focus:ring-epanen-primary transition-all outline-none font-black text-sm text-gray-800 dark:text-white shadow-inner" placeholder="Pancing minat pembaca..." />
              </div>

              <div class="group">
                <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">Ringkasan Eksekutif</label>
                <textarea v-model="articleForm.excerpt" rows="4" class="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-[1.5rem] focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-xs font-bold text-gray-500 dark:text-gray-400 leading-relaxed resize-none shadow-inner" placeholder="Tuliskan 1-2 kalimat gambaran isi..."></textarea>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="group">
                  <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">Kategori</label>
                  <select v-model="articleForm.category" class="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-[1.5rem] focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-xs font-black text-gray-700 dark:text-gray-300 appearance-none shadow-sm">
                    <option value="" class="bg-white dark:bg-gray-800">Pilih</option>
                    <option value="budidaya" class="bg-white dark:bg-gray-800">Budidaya</option>
                    <option value="hama-penyakit" class="bg-white dark:bg-gray-800">Hama & Penyakit</option>
                    <option value="cuaca-iklim" class="bg-white dark:bg-gray-800">Cuaca & Iklim</option>
                    <option value="teknologi" class="bg-white dark:bg-gray-800">Teknologi</option>
                  </select>
                </div>
                <div class="group">
                  <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">Status</label>
                  <select v-model="articleForm.status" class="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-[1.5rem] focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-xs font-black text-gray-700 dark:text-gray-300 appearance-none shadow-sm">
                    <option value="draft" class="bg-white dark:bg-gray-800">📁 Draft</option>
                    <option value="published" class="bg-white dark:bg-gray-800">🚀 Published</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Right Visuals -->
            <div class="lg:col-span-7 space-y-6">
              <div class="group">
                <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">Cover Image (URL Unsplash/CDN)</label>
                <input v-model="articleForm.image" type="url" class="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-[1.5rem] focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-xs font-bold text-gray-400 dark:text-gray-500 mb-4 shadow-inner" placeholder="https://images.unsplash.com/..." />
                
                <div class="aspect-[16/9] bg-gray-50 dark:bg-gray-800 rounded-[2rem] border-2 border-dashed border-gray-100 dark:border-gray-700 flex items-center justify-center overflow-hidden relative group/preview transition-colors">
                  <img v-if="articleForm.image" :src="articleForm.image" class="w-full h-full object-cover transition-transform duration-700 group-hover/preview:scale-110" @error="articleForm.image = ''" />
                  <div v-else class="text-center">
                    <div class="w-16 h-16 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm transition-colors">
                       <svg class="w-8 h-8 text-gray-200 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <p class="text-[10px] text-gray-300 dark:text-gray-600 font-black uppercase tracking-widest">Image Preview Area</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Full Content Editor -->
            <div class="lg:col-span-12">
               <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">Full Content (Markdown)</label>
               <textarea v-model="articleForm.content" rows="12" required class="w-full px-8 py-8 bg-gray-50 dark:bg-gray-800 border-none rounded-[2.5rem] focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm text-gray-700 dark:text-gray-200 leading-relaxed font-mono shadow-inner" placeholder="Tuliskan pengetahuan berharga Anda di sini..."></textarea>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="flex items-center justify-between pt-10 border-t border-gray-50 dark:border-gray-800">
             <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-epanen-primary animate-pulse"></span>
                <p class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest italic">All set to sync</p>
             </div>
             <div class="flex items-center gap-4">
                <button type="button" @click="showArticleDialog = false" class="px-8 py-4 rounded-2xl text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">Cancel</button>
                <button type="submit" :disabled="submitting" class="px-12 py-4 bg-gray-800 dark:bg-white text-white dark:text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-black dark:hover:bg-gray-200 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50">
                   {{ submitting ? 'Syncing...' : (isEditing ? 'Update Content' : 'Push to Live') }}
                </button>
             </div>
          </div>
        </form>
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
const articles = ref([]);
const searchQuery = ref('');
const categoryFilter = ref('');
const statusFilter = ref('');
const showArticleDialog = ref(false);
const isEditing = ref(false);
const submitting = ref(false);

const modal = ref({
  show: false,
  title: '',
  message: '',
  type: 'info',
  showConfirm: false,
  onConfirm: null
});

const articleForm = ref({
  id: null,
  title: '',
  excerpt: '',
  content: '',
  category: '',
  image: '',
  status: 'draft'
});

const statsCards = computed(() => [
  { label: 'Total Content', value: articles.value.length, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-500 dark:text-blue-400' },
  { label: 'Live Articles', value: publishedCount.value, icon: 'M5 13l4 4L19 7', bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-500 dark:text-green-400' },
  { label: 'Drafted', value: draftCount.value, icon: 'M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2', bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-500 dark:text-amber-400' },
  { label: 'Global Readers', value: totalViews.value, icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z', bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-500 dark:text-indigo-400' }
]);

let searchTimeout = null;

const publishedCount = computed(() => articles.value.filter(a => a.status === 'published').length);
const draftCount = computed(() => articles.value.filter(a => a.status === 'draft').length);
const totalViews = computed(() => articles.value.reduce((sum, a) => sum + (a.views || 0), 0));

const showPremiumAlert = (title, message, type = 'success') => {
  modal.value = { show: true, title, message, type, showConfirm: false };
};

const showPremiumConfirm = (title, message, onConfirm) => {
  modal.value = { show: true, title, message, type: 'warning', showConfirm: true, onConfirm };
};

const executeAction = () => {
  if (modal.value.onConfirm) modal.value.onConfirm();
  modal.value.show = false;
};

const debouncedSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    loadArticles();
  }, 500);
};

const loadArticles = async () => {
  loading.value = true;
  try {
    const params = {};
    if (searchQuery.value) params.search = searchQuery.value;
    if (categoryFilter.value) params.category = categoryFilter.value;
    if (statusFilter.value) params.status = statusFilter.value;

    const response = await axios.get(`${API_BASE}/admin/articles`, {
      params,
      headers: { Authorization: `Bearer ${token}` }
    });

    articles.value = response.data.data.articles || [];
  } catch (error) {
    console.error('Failed to load articles:', error);
  } finally {
    loading.value = false;
  }
};

const openCreateDialog = () => {
  resetForm();
  isEditing.value = false;
  showArticleDialog.value = true;
};

const editArticle = (article) => {
  articleForm.value = { ...article };
  isEditing.value = true;
  showArticleDialog.value = true;
};

const saveArticle = async () => {
  submitting.value = true;
  try {
    if (isEditing.value) {
      await axios.put(`${API_BASE}/admin/articles/${articleForm.value.id}`, articleForm.value, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showPremiumAlert('Berhasil', 'Konten telah diperbarui di database Kian Office');
    } else {
      await axios.post(`${API_BASE}/admin/articles`, articleForm.value, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showPremiumAlert('Berhasil', 'Konten baru telah berhasil dipublikasikan');
    }

    showArticleDialog.value = false;
    resetForm();
    loadArticles();
  } catch (error) {
    showPremiumAlert('Gagal', error.response?.data?.message || 'Terjadi kesalahan sistem', 'error');
  } finally {
    submitting.value = false;
  }
};

const confirmDelete = (article) => {
  showPremiumConfirm(
    'Hapus Konten?',
    `Apakah Anda yakin ingin menghapus artikel "${article.title}" secara permanen?`,
    () => deleteArticle(article)
  );
};

const deleteArticle = async (article) => {
  try {
    await axios.delete(`${API_BASE}/admin/articles/${article.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    showPremiumAlert('Terhapus', 'Konten telah dibersihkan dari ekosistem');
    loadArticles();
  } catch (error) {
    showPremiumAlert('Gagal', 'Gagal memproses penghapusan data', 'error');
  }
};

const resetForm = () => {
  articleForm.value = {
    id: null,
    title: '',
    excerpt: '',
    content: '',
    category: '',
    image: '',
    status: 'draft'
  };
};

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

onMounted(() => {
  loadArticles();
});
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
