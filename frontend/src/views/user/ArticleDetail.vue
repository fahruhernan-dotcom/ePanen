<template>
  <div class="container-custom">
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin w-12 h-12 border-4 border-epanen-secondary border-t-transparent rounded-full mx-auto"></div>
    </div>

    <div v-else-if="article" class="max-w-4xl mx-auto">
      <!-- Back button -->
      <button
        @click="$router.push('/articles')"
        class="flex items-center text-epanen-secondary hover:text-epanen-primary mb-6"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke daftar artikel
      </button>

      <!-- Article Header -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="h-64 bg-epanen-light flex items-center justify-center">
          <svg class="w-24 h-24 text-epanen-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>

        <div class="p-8">
          <span class="inline-block bg-epanen-light text-epanen-primary px-4 py-1 rounded-full text-sm mb-4">
            {{ article.category || 'Umum' }}
          </span>
          <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ article.title }}</h1>
          <p class="text-gray-600 mb-6">{{ article.excerpt }}</p>

          <div class="flex items-center text-sm text-gray-500 pb-6 border-b">
            <span>{{ formatDate(article.created_at) }}</span>
            <span class="mx-3">•</span>
            <span>{{ article.views }} dilihat</span>
          </div>

          <div class="prose max-w-none mt-8">
            <div class="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {{ article.content }}
            </div>
          </div>
        </div>
      </div>

      <!-- Related Articles -->
      <div class="mt-8">
        <h2 class="text-xl font-bold text-epanen-primary mb-4">Artikel Terkait</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <router-link
            v-for="related in relatedArticles"
            :key="related.id"
            :to="`/articles/${related.id}`"
            class="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <h3 class="font-semibold text-sm mb-1 line-clamp-2">{{ related.title }}</h3>
            <p class="text-xs text-gray-500">{{ formatDate(related.created_at) }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const API_BASE = import.meta.env.VITE_API_BASE || '/api';

const article = ref(null);
const relatedArticles = ref([]);
const loading = ref(true);

const loadArticle = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${API_BASE}/articles/${route.params.id}`);
    article.value = response.data.data.article;

    // Load related articles (same category)
    if (article.value.category) {
      const relatedRes = await axios.get(`${API_BASE}/articles`, {
        params: { category: article.value.category, limit: 3 }
      });
      relatedArticles.value = relatedRes.data.data.articles
        .filter(a => a.id !== article.value.id)
        .slice(0, 3);
    }
  } catch (error) {
    console.error('Failed to load article:', error);
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

onMounted(() => {
  loadArticle();
});
</script>
