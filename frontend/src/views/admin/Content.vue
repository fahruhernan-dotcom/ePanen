<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-epanen-primary">Content Management</h1>
        <p class="text-gray-600 text-sm">Kelola artikel dan konten ePanen</p>
      </div>
      <button
        @click="openCreateDialog"
        class="bg-epanen-primary text-white px-4 py-2 rounded-lg hover:bg-epanen-secondary transition-colors font-medium flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Artikel Baru
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Total Artikel</p>
        <p class="text-2xl font-bold text-gray-800">{{ articles.length }}</p>
      </div>
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Published</p>
        <p class="text-2xl font-bold text-green-600">{{ publishedCount }}</p>
      </div>
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Draft</p>
        <p class="text-2xl font-bold text-yellow-600">{{ draftCount }}</p>
      </div>
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Total Views</p>
        <p class="text-2xl font-bold text-blue-600">{{ totalViews }}</p>
      </div>
    </div>

    <!-- Search & Filter -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          v-model="searchQuery"
          @input="debouncedSearch"
          type="text"
          placeholder="Cari artikel..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
        />
        <select
          v-model="categoryFilter"
          @change="loadArticles"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
        >
          <option value="">Semua Kategori</option>
          <option value="budidaya">Budidaya</option>
          <option value="hama-penyakit">Hama & Penyakit</option>
          <option value="cuaca-iklim">Cuaca & Iklim</option>
          <option value="teknologi">Teknologi</option>
        </select>
        <select
          v-model="statusFilter"
          @change="loadArticles"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
        >
          <option value="">Semua Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>
    </div>

    <!-- Articles Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Title</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Views</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
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
            <tr v-else-if="articles.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="text-sm">Belum ada artikel</p>
              </td>
            </tr>
            <tr v-else v-for="article in articles" :key="article.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <p class="font-medium text-gray-800">{{ article.title }}</p>
                <p class="text-xs text-gray-500 truncate max-w-xs">{{ article.excerpt || 'Tidak ada excerpt' }}</p>
              </td>
              <td class="px-6 py-4">
                <span class="bg-gray-100 text-gray-700 px-2.5 py-1 rounded text-xs capitalize">
                  {{ article.category || 'Umum' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-blue-600 font-semibold">{{ article.views || 0 }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2.5 py-1 rounded-full text-xs font-medium',
                    article.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  ]"
                >
                  {{ article.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ formatDate(article.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-2">
                  <button
                    @click="editArticle(article)"
                    class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteArticle(article)"
                    class="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Hapus
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
      <div class="absolute inset-0 bg-black bg-opacity-50" @click="showArticleDialog = false"></div>
      <div class="relative bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-100">
          <h2 class="text-xl font-bold text-gray-800">{{ isEditing ? 'Edit Artikel' : 'Artikel Baru' }}</h2>
        </div>

        <form @submit.prevent="saveArticle" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              v-model="articleForm.title"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
              placeholder="Masukkan judul artikel"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
            <textarea
              v-model="articleForm.excerpt"
              rows="2"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
              placeholder="Ringkasan artikel (opsional)"
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                v-model="articleForm.category"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
              >
                <option value="">Pilih Kategori</option>
                <option value="budidaya">Budidaya</option>
                <option value="hama-penyakit">Hama & Penyakit</option>
                <option value="cuaca-iklim">Cuaca & Iklim</option>
                <option value="teknologi">Teknologi</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                v-model="articleForm.status"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Content *</label>
            <textarea
              v-model="articleForm.content"
              rows="10"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
              placeholder="Konten artikel lengkap..."
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              v-model="articleForm.image"
              type="url"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              @click="showArticleDialog = false; resetForm()"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="px-4 py-2 bg-epanen-primary text-white rounded-lg hover:bg-epanen-secondary transition-colors disabled:opacity-50"
            >
              {{ submitting ? 'Menyimpan...' : 'Simpan' }}
            </button>
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
