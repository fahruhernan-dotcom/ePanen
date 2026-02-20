<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center h-screen">
      <div class="relative">
        <div class="animate-spin w-20 h-20 border-4 border-epanen-primary/20 border-t-epanen-primary rounded-full"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <svg class="w-8 h-8 text-epanen-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </div>
      <p class="mt-6 text-gray-400 font-medium">Memuat artikel...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex flex-col items-center justify-center h-screen text-center px-6">
      <div class="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center mb-8">
        <svg class="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-gray-800 mb-4">Artikel Tidak Ditemukan</h2>
      <p class="text-gray-500 mb-10 max-w-md text-lg">Maaf, artikel yang Anda cari tidak tersedia atau mungkin telah dihapus.</p>
      <button @click="$router.push('/articles')" class="px-10 py-4 bg-gradient-to-r from-epanen-primary to-epanen-secondary text-white font-bold rounded-2xl shadow-xl shadow-green-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all">
        ← Kembali ke Artikel
      </button>
    </div>

    <!-- Content State -->
    <div v-else-if="article">
      <!-- Back Navigation -->
      <div class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button @click="$router.push('/articles')" class="flex items-center space-x-2 text-gray-500 hover:text-epanen-primary transition-colors group">
            <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span class="font-medium">Kembali</span>
          </button>
          
          <div class="flex items-center space-x-4">
            <span class="px-4 py-1.5 bg-epanen-light text-epanen-primary text-xs font-bold uppercase tracking-wider rounded-full">
              {{ article.category || 'Artikel' }}
            </span>
            <span class="text-sm text-gray-400">{{ readingTime }} menit baca</span>
          </div>
        </div>
      </div>

      <!-- Hero Section -->
      <div class="relative">
        <!-- Image Hero -->
        <div class="h-[50vh] md:h-[60vh] relative overflow-hidden">
          <img 
            v-if="article.image" 
            :src="article.image" 
            :alt="article.title"
            class="w-full h-full object-cover"
            @error="article.image = null"
          />
          <div v-else class="w-full h-full bg-gradient-to-br from-epanen-primary via-green-500 to-epanen-secondary flex items-center justify-center">
            <svg class="w-32 h-32 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        </div>

        <!-- Article Header Card -->
        <div class="max-w-4xl mx-auto px-6 -mt-32 relative z-10">
          <div class="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-8 md:p-12">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
              {{ article.title }}
            </h1>
            
            <!-- Meta Info -->
            <div class="flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-8 border-b border-gray-100">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-epanen-primary to-epanen-secondary flex items-center justify-center text-white font-bold text-lg">
                  {{ (article.author_name || 'A')[0].toUpperCase() }}
                </div>
                <div>
                  <p class="font-semibold text-gray-800">{{ article.author_name || 'Admin ePanen' }}</p>
                  <p class="text-gray-400 text-xs">Penulis</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formatDate(article.created_at) }}</span>
              </div>
              
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{{ article.views || 0 }} dibaca</span>
              </div>
            </div>

            <!-- Excerpt -->
            <p class="text-xl text-gray-600 leading-relaxed mt-8 font-medium">
              {{ article.excerpt }}
            </p>
          </div>
        </div>
      </div>

      <!-- Article Content Section -->
      <div class="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 py-20">
        
        <!-- Reading Progress Bar (Fixed on Top) -->
        <div class="fixed top-0 left-0 w-full h-1 z-[60] bg-gray-100">
          <div id="reading-progress" class="h-full bg-epanen-primary transition-all duration-150" style="width: 0%"></div>
        </div>

        <!-- Sidebar (Visible on Desktop) -->
        <div class="hidden lg:block lg:col-span-1">
          <div class="sticky top-32 flex flex-col space-y-6">
            <button @click="shareToWhatsApp" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-100 text-green-500 hover:bg-green-50 transition-all">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            </button>
            <button @click="copyLink" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-100 text-gray-500 hover:text-epanen-primary transition-all">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
            </button>
          </div>
        </div>

        <!-- Main Content (Narrowed for focus) -->
        <div class="lg:col-span-8 lg:col-start-3">
          <!-- Premium Editorial Content -->
          <article 
            class="article-content prose prose-xl prose-stone max-w-none
              prose-headings:font-black prose-headings:text-[#1A3C15] prose-headings:tracking-tighter
              prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:border-l-4 prose-h2:border-epanen-primary prose-h2:pl-6
              prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-[#2D5A27]
              prose-p:text-gray-700 prose-p:leading-[2] prose-p:mb-10 prose-p:text-lg lg:prose-p:text-xl
              prose-strong:text-gray-900 prose-strong:font-black
              prose-blockquote:border-l-0 prose-blockquote:bg-gray-50 prose-blockquote:rounded-[2.5rem] prose-blockquote:px-12 prose-blockquote:py-10 prose-blockquote:relative prose-blockquote:shadow-inner
              prose-img:rounded-[3rem] prose-img:shadow-2xl prose-img:my-20
              prose-li:text-gray-700 prose-li:mb-4
              prose-ul:marker:text-epanen-primary"
            v-html="renderedContent">
          </article>

          <!-- Dedicated Source Link -->
          <div v-if="sourceLink" class="mt-20 pt-12 border-t border-gray-100">
             <div class="flex flex-col items-center p-12 bg-gradient-to-br from-green-50 to-white rounded-[3rem] border border-green-100 text-center shadow-lg shadow-green-50/50">
                <div class="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-md mb-6 rotate-3">
                   <svg class="w-8 h-8 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                   </svg>
                </div>
                <h4 class="text-2xl font-black text-gray-800 mb-4">Ingin tahu lebih dalam?</h4>
                <p class="text-gray-500 mb-8 max-w-md text-lg">Informasi ini kami rangkum dari riset dan publikasi resmi untuk Anda.</p>
                <a 
                  :href="sourceLink" 
                  target="_blank" 
                  class="inline-flex items-center space-x-3 px-10 py-5 bg-epanen-primary text-white font-black rounded-2xl hover:bg-green-700 transition-all shadow-2xl shadow-green-200 uppercase tracking-widest text-xs"
                >
                   <span>Buka Sumber Referensi</span>
                   <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                   </svg>
                </a>
             </div>
          </div>
        </div>
      </div>

      <!-- Share & Actions -->
      <div class="max-w-3xl mx-auto px-6 pb-16">
        <div class="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-3xl p-8 md:p-12">
          <div class="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Suka artikel ini?</h3>
              <p class="text-gray-500">Bagikan ke teman-teman petani Anda!</p>
            </div>
            
            <div class="flex items-center space-x-3">
              <button @click="shareToWhatsApp" class="p-4 bg-green-500 text-white rounded-2xl hover:bg-green-600 hover:shadow-lg hover:-translate-y-1 transition-all">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </button>
              <button @click="shareToFacebook" class="p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 transition-all">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </button>
              <button @click="copyLink" class="p-4 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 hover:shadow-lg hover:-translate-y-1 transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Articles -->
      <div v-if="relatedArticles.length > 0" class="bg-gray-50 py-16">
        <div class="max-w-6xl mx-auto px-6">
          <div class="flex items-center justify-between mb-10">
            <div>
              <h2 class="text-3xl font-bold text-gray-900">Artikel Terkait</h2>
              <p class="text-gray-500 mt-1">Bacaan lain yang mungkin Anda suka</p>
            </div>
            <router-link to="/articles" class="hidden md:flex items-center space-x-2 text-epanen-primary font-semibold hover:underline">
              <span>Lihat Semua</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <router-link
              v-for="related in relatedArticles"
              :key="related.id"
              :to="`/articles/${related.id}`"
              class="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div class="h-48 relative overflow-hidden">
                <img 
                  v-if="related.image" 
                  :src="related.image" 
                  :alt="related.title"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  @error="related.image = null"
                />
                <div v-else class="w-full h-full bg-gradient-to-br from-epanen-primary/80 to-epanen-secondary/80 flex items-center justify-center">
                  <svg class="w-12 h-12 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div class="p-6">
                <span class="text-xs font-bold text-epanen-primary uppercase tracking-wider">{{ related.category || 'Artikel' }}</span>
                <h3 class="font-bold text-gray-900 mt-2 mb-3 group-hover:text-epanen-primary transition-colors line-clamp-2">{{ related.title }}</h3>
                <p class="text-sm text-gray-400">{{ formatDate(related.created_at) }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="showToast" class="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 z-50">
        <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { marked } from 'marked';

const route = useRoute();
const API_BASE = import.meta.env.VITE_API_BASE || '/api';

const article = ref(null);
const relatedArticles = ref([]);
const loading = ref(true);
const error = ref(false);
const showToast = ref(false);
const toastMessage = ref('');

// Computed property for Markdown rendering
const renderedContent = computed(() => {
  if (!article.value?.content) return '';
  // Remove the source link from the main content to display it separately if we want
  const cleanContent = article.value.content.replace(/\[Baca Artikel Asli\]\(.*?\)/, '');
  return marked(cleanContent);
});

// Extract source link if available
const sourceLink = computed(() => {
  if (!article.value?.content) return null;
  const match = article.value.content.match(/\[Baca Artikel Asli\]\((.*?)\)/);
  return match ? match[1] : null;
});

// Estimate reading time
const readingTime = computed(() => {
  if (!article.value?.content) return 0;
  const words = article.value.content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
});

const updateProgress = () => {
  const scroll = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  if (height === 0) return;
  const progress = (scroll / height) * 100;
  const bar = document.getElementById('reading-progress');
  if (bar) bar.style.width = `${progress}%`;
};

const incrementView = async (id) => {
  try {
    const res = await axios.post(`${API_BASE}/articles/${id}/view`);
    if (res.data.success && article.value) {
      // article.value.views++ // Increment locally for responsiveness
    }
  } catch (err) {
    // Silent fail
  }
};

const loadArticle = async (id) => {
  loading.value = true;
  error.value = false;
  // Use timeout to ensure smooth transition
  setTimeout(async () => {
    try {
      const response = await axios.get(`${API_BASE}/articles/${id}`);
      article.value = response.data.data.article;

      if (article.value?.category) {
        const relatedRes = await axios.get(`${API_BASE}/articles`, {
          params: { category: article.value.category, limit: 4 }
        });
        relatedArticles.value = (relatedRes.data.data.articles || [])
          .filter(a => a.id !== article.value.id)
          .slice(0, 3);
      }
    } catch (err) {
      console.error('Failed to load article:', err);
      error.value = true;
    } finally {
      loading.value = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      incrementView(id);
    }
  }, 300);
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

const showNotification = (message) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => { showToast.value = false; }, 3000);
};

const shareToWhatsApp = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`Baca artikel menarik: ${article.value.title}`);
  window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
};

const shareToFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    showNotification('Link berhasil disalin!');
  } catch {
    showNotification('Gagal menyalin link');
  }
};

watch(() => route.params.id, (newId) => {
  if (newId) loadArticle(newId);
});

onMounted(() => {
  loadArticle(route.params.id);
  window.addEventListener('scroll', updateProgress);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;700;900&display=swap');

div {
  font-family: 'Outfit', sans-serif;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Custom prose overrides for premium look */
.article-content :deep(p:first-of-type)::first-letter {
  float: left;
  font-size: 5rem;
  line-height: 1;
  font-weight: 900;
  margin-right: 1rem;
  margin-top: 0.5rem;
  color: #1A3C15;
  font-family: 'Outfit', sans-serif;
}

:deep(.prose h3) {
  color: #1A3C15;
  font-weight: 900;
  letter-spacing: -0.02em;
}

:deep(.prose p) {
  line-height: 2;
  margin-bottom: 2.5rem;
  color: #374151;
}

:deep(.prose li) {
  margin-bottom: 1.25rem;
}

:deep(.prose strong) {
  color: #111827;
}
</style>
