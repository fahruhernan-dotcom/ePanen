<template>
  <div class="container-custom">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-epanen-primary mb-2">Pengetahuan Pertanian</h1>
      <p class="text-gray-600">Kumpulan artikel dan panduan untuk petani</p>
    </div>

    <!-- Search and Filter -->
    <div class="bg-white rounded-xl p-4 shadow-sm mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <InputText
          v-model="searchQuery"
          placeholder="Cari artikel..."
          class="flex-1"
          @input="searchArticles"
        />
        <Dropdown
          v-model="selectedCategory"
          :options="categories"
          option-label="name"
          option-value="slug"
          placeholder="Semua Kategori"
          class="md:w-64"
          @change="searchArticles"
        />
      </div>
    </div>

    <!-- Articles Grid -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin w-12 h-12 border-4 border-epanen-secondary border-t-transparent rounded-full mx-auto mb-4"></div>
      <p class="text-gray-600">Memuat artikel...</p>
    </div>

    <div v-else-if="articles.length > 0" class="grid md:grid-cols-3 gap-6">
      <router-link
        v-for="article in articles"
        :key="article.id"
        :to="`/articles/${article.id}`"
        class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all card-hover overflow-hidden"
      >
        <div class="h-48 bg-epanen-light flex items-center justify-center">
          <svg class="w-20 h-20 text-epanen-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div class="p-5">
          <span class="text-xs bg-epanen-light text-epanen-primary px-3 py-1 rounded-full">
            {{ article.category || 'Umum' }}
          </span>
          <h3 class="font-semibold text-lg mt-3 mb-2 line-clamp-2">{{ article.title }}</h3>
          <p class="text-sm text-gray-600 line-clamp-3">{{ article.excerpt || article.content?.substring(0, 150) }}...</p>
          <div class="flex items-center justify-between mt-4 text-xs text-gray-500">
            <span>{{ formatDate(article.created_at) }}</span>
            <span>{{ article.views }} dilihat</span>
          </div>
        </div>
      </router-link>
    </div>

    <div v-else class="bg-white rounded-xl p-12 text-center">
      <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-gray-500 text-lg">Tidak ada artikel yang ditemukan</p>
      <p class="text-gray-400 text-sm mt-2">Coba kata kunci atau kategori lain</p>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2 mt-8">
      <Button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="bg-epanen-secondary"
        label="←"
      />
      <span class="text-gray-600">Halaman {{ currentPage }} dari {{ totalPages }}</span>
      <Button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="bg-epanen-secondary"
        label="→"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

const articles = ref([]);
const categories = ref([
  { name: 'Semua Kategori', slug: '' },
  { name: 'Budidaya', slug: 'budidaya' },
  { name: 'Hama & Penyakit', slug: 'hama-penyakit' },
  { name: 'Cuaca & Iklim', slug: 'cuaca-iklim' },
  { name: 'Teknologi', slug: 'teknologi' }
]);

const loading = ref(false);
const searchQuery = ref('');
const selectedCategory = ref('');
const currentPage = ref(1);
const totalPages = ref(1);

const loadArticles = async () => {
  loading.value = true;
  try {
    const params = { page: currentPage.value, limit: 9 };
    if (searchQuery.value) params.search = searchQuery.value;
    if (selectedCategory.value) params.category = selectedCategory.value;

    const response = await axios.get(`${API_BASE}/articles`, { params });
    articles.value = response.data.data.articles;
    totalPages.value = response.data.data.pagination.totalPages;
  } catch (error) {
    console.error('Failed to load articles:', error);
  } finally {
    loading.value = false;
  }
};

const searchArticles = () => {
  currentPage.value = 1;
  loadArticles();
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    loadArticles();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

onMounted(() => {
  loadArticles();
});
</script>
