<template>
  <div class="space-y-12 animate-fade-in pb-20 px-4 md:px-0">
    <!-- Premium Hero Section -->
    <div class="relative bg-[#1A3C15] rounded-[2.5rem] p-10 md:p-20 overflow-hidden shadow-2xl text-white">
      <!-- Decorative Element -->
      <div class="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-epanen-secondary/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-epanen-primary/30 rounded-full blur-2xl"></div>
      
      <div class="relative z-10 max-w-4xl">
        <div class="flex items-center space-x-3 mb-6">
          <span class="w-12 h-[2px] bg-epanen-accent"></span>
          <span class="text-epanen-accent font-black uppercase tracking-[0.3em] text-xs">Pusat Literasi Tani</span>
        </div>
        <h1 class="text-4xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
          Wawasan Baru untuk <br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-epanen-accent to-green-300">Panen Melimpah.</span>
        </h1>
        <p class="text-xl text-gray-300 font-medium leading-relaxed max-w-2xl">
          Eksplorasi teknik terbaru, riset pasar, dan panduan praktis dari para ahli untuk mendigitalisasi pertanian Anda.
        </p>
      </div>
    </div>

    <!-- Search & Filters -->
    <div class="bg-white rounded-[2rem] p-4 shadow-xl shadow-gray-100 border border-gray-50 sticky top-4 z-40">
      <div class="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div class="relative w-full lg:w-[450px]">
          <span class="absolute inset-y-0 left-0 pl-5 flex items-center text-gray-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            v-model="searchQuery" 
            @input="searchArticles"
            type="text" 
            placeholder="Ketik topik pertanian (misal: Hidroponik, Padi)..." 
            class="w-full pl-14 pr-6 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary outline-none transition-all font-bold text-gray-700 placeholder-gray-400"
          />
        </div>

        <div class="flex gap-3 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full lg:w-auto">
          <button 
            v-for="cat in categories" 
            :key="cat.slug"
            @click="selectCategory(cat.slug)"
            :class="[
              'px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap border-2',
              selectedCategory === cat.slug 
                ? 'bg-epanen-primary border-epanen-primary text-white shadow-xl shadow-green-100' 
                : 'bg-white border-gray-100 text-gray-400 hover:border-epanen-accent hover:text-epanen-primary'
            ]"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Articles Grid -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div v-for="i in 6" :key="i" class="bg-white rounded-[2.5rem] overflow-hidden shadow-sm h-[500px] animate-pulse">
        <div class="h-64 bg-gray-100 w-full"></div>
        <div class="p-8">
           <div class="h-4 bg-gray-50 rounded w-1/4 mb-6"></div>
           <div class="h-8 bg-gray-50 rounded w-3/4 mb-6"></div>
           <div class="h-4 bg-gray-50 rounded w-full mb-3"></div>
           <div class="h-4 bg-gray-50 rounded w-2/3"></div>
        </div>
      </div>
    </div>

    <div v-else-if="articles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <router-link
        v-for="article in articles"
        :key="article.id"
        :to="`/articles/${article.id}`"
        class="group bg-white rounded-[2.5rem] shadow-sm border border-gray-100/50 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden flex flex-col h-full"
      >
        <!-- Premium Image Preview -->
        <div class="relative h-72 w-full overflow-hidden bg-gray-50">
           <img 
             v-if="article.image" 
             :src="article.image" 
             class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
             @error="article.image = null"
           />
           <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-epanen-light to-green-50 text-epanen-accent/30">
              <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
           </div>
           
           <!-- Overlay Badge -->
           <div class="absolute top-6 left-6">
              <span class="px-4 py-2 bg-white/95 backdrop-blur-md text-epanen-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg border border-white/50">
                {{ article.category || 'Wawasan' }}
              </span>
           </div>

           <!-- Gradient Fade -->
           <div class="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <!-- Content Section -->
        <div class="p-8 md:p-10 flex-1 flex flex-col">
          <div class="flex items-center space-x-4 mb-6 text-xs text-gray-400 font-bold uppercase tracking-widest">
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span>{{ formatDate(article.created_at) }}</span>
            </div>
            <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              <span>{{ article.views || 0 }}</span>
            </div>
          </div>

          <h3 class="text-2xl font-black text-gray-800 mb-5 group-hover:text-epanen-primary transition-colors line-clamp-2 leading-[1.3]">
            {{ article.title }}
          </h3>
          
          <p class="text-gray-500 text-base leading-relaxed mb-10 line-clamp-3 font-medium">
            {{ article.excerpt || article.content?.substring(0, 120) + '...' }}
          </p>

          <div class="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
             <div class="flex items-center space-x-2">
                <span class="text-epanen-primary font-black text-sm uppercase tracking-wider">Baca Narasi</span>
                <span class="w-8 h-[2px] bg-epanen-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
             </div>
             <div class="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-epanen-primary group-hover:border-epanen-primary group-hover:text-white transition-all">
                <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
             </div>
          </div>
        </div>
      </router-link>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-32 bg-white rounded-[3rem] shadow-2xl shadow-gray-100 border border-gray-50">
      <div class="w-32 h-32 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
        <svg class="w-16 h-16 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </div>
      <h3 class="text-3xl font-black text-gray-800 mb-3">Tidak Menemukan Apapun</h3>
      <p class="text-gray-400 max-w-sm mx-auto text-lg">Keyword "{{ searchQuery }}" tidak cocok dengan narasi manapun.</p>
    </div>

    <!-- Premium Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center items-center space-x-6 mt-16 pb-10">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="w-16 h-16 rounded-2xl flex items-center justify-center transition-all bg-white border-2 border-gray-100 text-gray-500 hover:border-epanen-primary hover:text-epanen-primary disabled:opacity-30 disabled:cursor-not-allowed group shadow-sm hover:shadow-xl"
      >
        <svg class="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" /></svg>
      </button>
      
      <div class="px-8 py-4 bg-white border-2 border-gray-100 rounded-2xl shadow-sm text-lg font-black text-gray-800">
        <span class="text-epanen-primary">{{ currentPage }}</span> <span class="mx-2 text-gray-300">/</span> {{ totalPages }}
      </div>

      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="w-16 h-16 rounded-2xl flex items-center justify-center transition-all bg-white border-2 border-gray-100 text-gray-500 hover:border-epanen-primary hover:text-epanen-primary disabled:opacity-30 disabled:cursor-not-allowed group shadow-sm hover:shadow-xl"
      >
        <svg class="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

const articles = ref([]);
const categories = ref([
  { name: 'Semua Konten', slug: '' },
  { name: 'Budidaya', slug: 'budidaya' },
  { name: 'Hama & Tikus', slug: 'hama-penyakit' },
  { name: 'Iklim', slug: 'cuaca-iklim' },
  { name: 'Teknologi', slug: 'teknologi' }
]);

const loading = ref(false);
const searchQuery = ref('');
const selectedCategory = ref('');
const currentPage = ref(1);
const totalPages = ref(1);

let searchTimeout = null;

const loadArticles = async () => {
  loading.value = true;
  try {
    const params = { page: currentPage.value, limit: 9 };
    if (searchQuery.value) params.search = searchQuery.value;
    if (selectedCategory.value) params.category = selectedCategory.value;

    const response = await axios.get(`${API_BASE}/articles`, { params });
    articles.value = response.data.data.articles || [];
    totalPages.value = response.data.data.pagination?.totalPages || 1;
  } catch (error) {
    console.error('Failed to load articles:', error);
    articles.value = [];
  } finally {
    loading.value = false;
  }
};

const searchArticles = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentPage.value = 1;
    loadArticles();
  }, 500);
};

const selectCategory = (slug) => {
  selectedCategory.value = slug;
  currentPage.value = 1;
  loadArticles();
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    loadArticles();
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

onMounted(() => {
  loadArticles();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;700;900&display=swap');

div {
  font-family: 'Outfit', sans-serif;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

