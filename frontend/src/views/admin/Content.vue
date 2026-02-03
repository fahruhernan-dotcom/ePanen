<template>
  <div class="space-y-6 animate-fade-in text-gray-800">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2">
      <div>
        <h1 class="text-3xl font-black text-gray-800 tracking-tight">Content Management</h1>
        <p class="text-gray-500 font-medium tracking-wide">Kelola artikel dan konten edukasi ePanen</p>
      </div>
      <button
        @click="openCreateDialog"
        class="bg-gradient-to-r from-epanen-primary to-epanen-secondary text-white px-6 py-3 rounded-2xl hover:shadow-lg transition-all font-bold flex items-center transform hover:scale-105"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Artikel Baru
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
        <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Artikel</p>
        <h3 class="text-3xl font-black text-gray-800">{{ articles.length }}</h3>
      </div>
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-green-500">
        <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Published</p>
        <h3 class="text-3xl font-black text-green-600">{{ publishedCount }}</h3>
      </div>
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-amber-500">
        <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Draft</p>
        <h3 class="text-3xl font-black text-amber-600">{{ draftCount }}</h3>
      </div>
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-indigo-500">
        <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Views</p>
        <h3 class="text-3xl font-black text-indigo-600">{{ totalViews }}</h3>
      </div>
    </div>

    <!-- Filtering & List -->
    <div class="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
      <!-- Search & Filter Bar -->
      <div class="p-6 border-b border-gray-50 bg-gray-50 bg-opacity-30">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              v-model="searchQuery"
              @input="debouncedSearch"
              type="text"
              placeholder="Cari artikel..."
              class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-epanen-primary focus:border-transparent transition-all outline-none text-sm"
            />
          </div>
          <select
            v-model="categoryFilter"
            @change="loadArticles"
            class="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-epanen-primary focus:border-transparent transition-all outline-none text-sm bg-white"
          >
            <option value="">Semua Kategori</option>
            <option v-for="cat in ['budidaya', 'hama-penyakit', 'cuaca-iklim', 'teknologi']" :key="cat" :value="cat" class="capitalize">
              {{ cat.replace('-', ' & ') }}
            </option>
          </select>
          <select
            v-model="statusFilter"
            @change="loadArticles"
            class="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-epanen-primary focus:border-transparent transition-all outline-none text-sm bg-white"
          >
            <option value="">Semua Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <!-- Table Section -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 bg-opacity-50 text-gray-400 text-[10px] uppercase font-black tracking-widest">
              <th class="px-8 py-4 text-left">Konten & Info</th>
              <th class="px-6 py-4 text-left">Kategori</th>
              <th class="px-6 py-4 text-center">Views</th>
              <th class="px-6 py-4 text-center">Status</th>
              <th class="px-6 py-4 text-left">Tgl Rilis</th>
              <th class="px-8 py-4 text-right">Aksi</th>
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
                  <p class="font-bold uppercase text-[10px] tracking-widest">Sedang Memuat...</p>
                </div>
              </td>
            </tr>
            <tr v-else-if="articles.length === 0">
              <td colspan="6" class="px-8 py-16 text-center">
                <div class="flex flex-col items-center">
                   <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                     <svg class="w-8 h-8 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                     </svg>
                   </div>
                   <p class="text-gray-400 font-bold uppercase text-xs tracking-widest">Belum ada artikel</p>
                </div>
              </td>
            </tr>
            <tr v-else v-for="article in articles" :key="article.id" class="hover:bg-gray-50 transition-colors group">
              <td class="px-8 py-5">
                <div class="flex flex-col">
                  <span class="font-bold text-gray-800 text-sm group-hover:text-epanen-primary transition-colors">{{ article.title }}</span>
                  <span class="text-xs text-gray-400 mt-1 line-clamp-1 max-w-md">{{ article.excerpt || 'Tidak ada ringkasan' }}</span>
                </div>
              </td>
              <td class="px-6 py-5">
                <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {{ article.category || 'Umum' }}
                </span>
              </td>
              <td class="px-6 py-5 text-center">
                <span class="font-black text-indigo-600">{{ article.views || 0 }}</span>
              </td>
              <td class="px-6 py-5 text-center">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest',
                    article.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                  ]"
                >
                  {{ article.status }}
                </span>
              </td>
              <td class="px-6 py-5 whitespace-nowrap text-xs font-semibold text-gray-500">
                {{ formatDate(article.created_at) }}
              </td>
              <td class="px-8 py-5 text-right">
                <div class="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="editArticle(article)" class="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button @click="deleteArticle(article)" class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
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
    </div>


    <!-- Article Modal -->
    <div v-if="showArticleDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm" @click="showArticleDialog = false"></div>
      <div class="relative bg-white rounded-[2rem] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
        <!-- Modal Header -->
        <div class="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
          <div>
            <h2 class="text-2xl font-black text-gray-800 tracking-tight">{{ isEditing ? 'Edit Artikel' : 'Buat Artikel Baru' }}</h2>
            <p class="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Lengkapi informasi konten di bawah ini</p>
          </div>
          <button @click="showArticleDialog = false" class="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveArticle" class="flex-1 overflow-y-auto p-8 space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Left Column -->
            <div class="space-y-6">
              <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Judul Artikel</label>
                <input
                  v-model="articleForm.title"
                  type="text"
                  required
                  class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none font-bold text-gray-700"
                  placeholder="Contoh: Rahasia Panen Cabai Melimpah"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Ringkasan (Excerpt)</label>
                <textarea
                  v-model="articleForm.excerpt"
                  rows="3"
                  class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm text-gray-600 leading-relaxed resize-none"
                  placeholder="Tuliskan sedikit gambaran isi artikel..."
                ></textarea>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Kategori</label>
                  <select
                    v-model="articleForm.category"
                    class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm font-bold text-gray-700 appearance-none bg-no-repeat bg-[right_1rem_center]"
                    style="background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3E%3Cpath stroke=%22%236b7280%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22m6 8 4 4 4-4%22%2F%3E%3C%2Fsvg%3E')"
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="budidaya">Budidaya</option>
                    <option value="hama-penyakit">Hama & Penyakit</option>
                    <option value="cuaca-iklim">Cuaca & Iklim</option>
                    <option value="teknologi">Teknologi</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Status Publikasi</label>
                  <select
                    v-model="articleForm.status"
                    class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm font-bold text-gray-700 appearance-none bg-no-repeat bg-[right_1rem_center]"
                    style="background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3E%3Cpath stroke=%22%236b7280%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22m6 8 4 4 4-4%22%2F%3E%3C%2Fsvg%3E')"
                  >
                    <option value="draft">📁 Simpan Draft</option>
                    <option value="published">🚀 Publikasikan</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-6">
              <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Thumbnail URL</label>
                <div class="flex flex-col space-y-3">
                   <input
                    v-model="articleForm.image"
                    type="url"
                    class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm text-gray-600"
                    placeholder="https://images.unsplash.com/..."
                  />
                  <!-- Preview Area -->
                  <div class="aspect-video bg-gray-50 rounded-[1.5rem] border-2 border-dashed border-gray-100 flex items-center justify-center overflow-hidden">
                    <img v-if="articleForm.image" :src="articleForm.image" class="w-full h-full object-cover" @error="articleForm.image = ''" />
                    <div v-else class="text-center p-4">
                      <svg class="w-8 h-8 text-gray-200 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p class="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Preview Gambar</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Waktu Dibuat</label>
                <p class="text-sm font-bold text-gray-400 pl-2">{{ isEditing ? formatDate(articleForm.created_at) : 'Baru akan disimpan...' }}</p>
              </div>
            </div>
          </div>

          <!-- Bottom Row - Full Content -->
          <div>
            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Konten Lengkap (Markdown Supported)</label>
            <div class="relative">
              <textarea
                v-model="articleForm.content"
                rows="12"
                required
                class="w-full px-6 py-5 bg-gray-50 border-none rounded-3xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm text-gray-700 leading-relaxed font-mono"
                placeholder="Tuliskan isi artikel Anda di sini..."
              ></textarea>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="flex items-center justify-between pt-6 border-t border-gray-50">
            <p class="text-xs text-gray-400">* Pastikan semua informasi sudah benar sebelum disimpan.</p>
            <div class="flex space-x-4">
              <button
                type="button"
                @click="showArticleDialog = false; resetForm()"
                class="px-8 py-3 rounded-2xl text-gray-400 font-bold hover:bg-gray-50 transition-all uppercase text-xs tracking-widest"
              >
                Batal
              </button>
              <button
                type="submit"
                :disabled="submitting"
                class="px-10 py-3 bg-gradient-to-r from-epanen-primary to-epanen-secondary text-white rounded-2xl font-black shadow-lg hover:shadow-xl transform hover:scale-105 transition-all uppercase text-xs tracking-widest disabled:opacity-50"
              >
                {{ submitting ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Terbitkan Sekarang') }}
              </button>
            </div>
          </div>
        </form>
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
const articles = ref([]);
const searchQuery = ref('');
const categoryFilter = ref('');
const statusFilter = ref('');
const showArticleDialog = ref(false);
const isEditing = ref(false);
const submitting = ref(false);

const articleForm = ref({
  id: null,
  title: '',
  excerpt: '',
  content: '',
  category: '',
  image: '',
  status: 'draft'
});

let searchTimeout = null;

const publishedCount = computed(() => articles.value.filter(a => a.status === 'published').length);
const draftCount = computed(() => articles.value.filter(a => a.status === 'draft').length);
const totalViews = computed(() => articles.value.reduce((sum, a) => sum + (a.views || 0), 0));

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
    articles.value = [];
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
      alert('Artikel berhasil diupdate!');
    } else {
      await axios.post(`${API_BASE}/admin/articles`, articleForm.value, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Artikel berhasil dibuat!');
    }

    showArticleDialog.value = false;
    resetForm();
    loadArticles();
  } catch (error) {
    console.error('Failed to save article:', error);
    alert('Gagal menyimpan artikel: ' + (error.response?.data?.message || error.message));
  } finally {
    submitting.value = false;
  }
};

const deleteArticle = async (article) => {
  if (!confirm(`Yakin ingin menghapus artikel "${article.title}"?`)) return;

  try {
    await axios.delete(`${API_BASE}/admin/articles/${article.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Artikel berhasil dihapus!');
    loadArticles();
  } catch (error) {
    console.error('Failed to delete article:', error);
    alert('Gagal menghapus artikel');
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
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

onMounted(() => {
  loadArticles();
});
</script>
