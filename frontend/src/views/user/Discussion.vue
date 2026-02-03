<template>
  <div class="space-y-8 animate-fade-in pb-12">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-r from-epanen-primary to-epanen-secondary rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl text-white">
      <div class="absolute top-0 right-0 -mt-16 -mr-16 opacity-10 pointer-events-none">
        <svg class="w-96 h-96" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m8-2a4 4 0 014-4h4a4 4 0 014 4v2m-6-4a4 4 0 014-4h4a4 4 0 014 4v2M5 11V5a2 2 0 012-2h10a2 2 0 012 2v6M9 11h6" />
        </svg>
      </div>
      
      <div class="relative z-10 max-w-3xl">
        <h1 class="text-3xl md:text-5xl font-black tracking-tight mb-4">Forum Komunitas</h1>
        <p class="text-lg text-white text-opacity-90 font-medium leading-relaxed mb-8">
          Wadah diskusi petani Indonesia. Bagikan pengalaman, tanyakan masalah, dan temukan solusi bersama pakar dan sesama petani.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4">
          <button 
            @click="showNewDiscussion = true"
            class="px-8 py-4 bg-white text-epanen-primary font-black rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center uppercase tracking-widest text-xs"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Mulai Diskusi Baru
          </button>
        </div>
      </div>
    </div>

    <!-- Search & Filters -->
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="relative w-full md:w-96">
        <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Cari topik diskusi..." 
          class="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-epanen-primary focus:border-transparent outline-none transition-all font-medium text-gray-600"
        />
      </div>

      <div class="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
        <button 
          v-for="cat in ['Semua', 'Pasar', 'Tanya Jawab', 'Budidaya', 'Teknologi']" 
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap',
            selectedCategory === cat 
              ? 'bg-epanen-primary text-white shadow-lg shadow-green-200' 
              : 'bg-white text-gray-400 hover:bg-gray-50 border border-gray-100'
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Discussions Grid -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="i in 4" :key="i" class="bg-white rounded-3xl p-8 h-64 animate-pulse">
        <div class="h-4 bg-gray-100 rounded w-1/3 mb-4"></div>
        <div class="h-8 bg-gray-100 rounded w-3/4 mb-6"></div>
        <div class="space-y-2">
          <div class="h-4 bg-gray-100 rounded w-full"></div>
          <div class="h-4 bg-gray-100 rounded w-full"></div>
        </div>
      </div>
    </div>

    <div v-else-if="filteredDiscussions.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="discussion in filteredDiscussions"
        :key="discussion.id"
        class="group bg-white rounded-3xl p-8 shadow-sm border border-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden"
        @click="openDetail(discussion)"
      >
        <div class="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
           <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
             <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
           </svg>
        </div>

        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
             <span class="px-4 py-1.5 rounded-full bg-epanen-light text-epanen-primary text-[10px] font-black uppercase tracking-widest">
               {{ discussion.category || 'Umum' }}
             </span>
             <span class="text-xs font-bold text-gray-400">{{ formatDate(discussion.created_at) }}</span>
          </div>

          <h3 class="text-xl md:text-2xl font-black text-gray-800 mb-3 leading-tight group-hover:text-epanen-primary transition-colors">
            {{ discussion.title }}
          </h3>
          
          <p class="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
            {{ discussion.content }}
          </p>

          <div class="flex items-center justify-between pt-6 border-t border-gray-100">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xs font-bold text-gray-600 uppercase">
                {{ discussion.author_name?.[0] || 'U' }}
              </div>
              <span class="text-sm font-bold text-gray-700">{{ discussion.author_name || 'Anonymous' }}</span>
            </div>
            
            <div class="flex items-center space-x-4 text-gray-400">
              <div class="flex items-center space-x-1" title="Views">
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                 </svg>
                 <span class="text-xs font-bold">{{ discussion.views || 0 }}</span>
              </div>
              <div class="flex items-center space-x-1" title="Balasan">
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                 </svg>
                 <span class="text-xs font-bold">{{ discussion.reply_count || 0 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-24 bg-white rounded-[2.5rem] shadow-sm border border-gray-100">
      <div class="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </div>
      <h3 class="text-xl font-black text-gray-800 mb-2">Belum Ada Diskusi</h3>
      <p class="text-gray-400 max-w-sm mx-auto mb-8">Jadilah yang pertama membuka topik menarik di komunitas kami!</p>
      <button 
        @click="showNewDiscussion = true"
        class="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors"
      >
        Mulai Diskusi Sekarang
      </button>
    </div>

    <!-- Create Discussion Modal -->
    <div v-if="showNewDiscussion" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm" @click="showNewDiscussion = false"></div>
      <div class="relative bg-white rounded-[2rem] shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in">
        <div class="p-8 border-b border-gray-100">
          <h2 class="text-2xl font-black text-gray-800">Buat Diskusi Baru</h2>
          <p class="text-sm text-gray-500 mt-1">Sampaikan pertanyaan atau ide Anda kepada komunitas.</p>
        </div>
        
        <form @submit.prevent="createDiscussion" class="p-8 space-y-6">
          <div>
            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Judul</label>
            <input
              v-model="newDiscussion.title"
              type="text"
              required
              class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none font-bold text-gray-700"
              placeholder="Apa yang ingin Anda bahas?"
            />
          </div>
          
          <div>
            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Kategori</label>
             <select
                v-model="newDiscussion.category"
                class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm font-bold text-gray-700 appearance-none"
              >
                <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">{{ cat.name }}</option>
              </select>
          </div>

          <div>
             <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Isi Diskusi</label>
             <textarea
                v-model="newDiscussion.content"
                rows="5"
                required
                class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm text-gray-700 leading-relaxed resize-none"
                placeholder="Ceritakan detailnya..."
             ></textarea>
          </div>

          <div class="flex justify-end gap-3 pt-4">
             <button type="button" @click="showNewDiscussion = false" class="px-6 py-3 rounded-xl font-bold text-gray-400 hover:bg-gray-50 transition-colors uppercase text-xs tracking-widest">Batal</button>
             <button type="submit" :disabled="submitting" class="px-8 py-3 bg-epanen-primary text-white rounded-xl font-black hover:bg-epanen-secondary transition-colors uppercase text-xs tracking-widest shadow-lg">
               {{ submitting ? 'Mengirim...' : 'Terbitkan' }}
             </button>
          </div>
        </form>
      </div>
    </div>

    <!-- View Detail Modal -->
    <div v-if="selectedDiscussion" class="fixed inset-0 z-50 flex items-center justify-center p-4">
       <div class="absolute inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm" @click="selectedDiscussion = null"></div>
       <div class="relative bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
          <!-- Modal Header -->
          <div class="p-8 pb-4 border-b border-gray-100 flex justify-between items-start">
             <div>
                <span class="inline-block px-3 py-1 rounded-full bg-epanen-light text-epanen-primary text-[10px] font-black uppercase tracking-widest mb-3">
                  {{ selectedDiscussion.category }}
                </span>
                <h2 class="text-2xl font-black text-gray-800 leading-tight">{{ selectedDiscussion.title }}</h2>
                <div class="flex items-center space-x-2 mt-2">
                   <span class="text-xs font-bold text-gray-500">Oleh {{ selectedDiscussion.author_name || 'Anonymous' }}</span>
                   <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                   <span class="text-xs text-gray-400">{{ formatDate(selectedDiscussion.created_at) }}</span>
                </div>
             </div>
             <button @click="selectedDiscussion = null" class="p-2 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
             </button>
          </div>

          <!-- Content -->
          <div class="p-8 overflow-y-auto">
             <div class="prose prose-green max-w-none text-gray-600 leading-relaxed mb-8">
                {{ selectedDiscussion.content }}
             </div>
             
             <!-- Comments Section (Placeholder for now) -->
             <div class="bg-gray-50 rounded-2xl p-6">
                <h4 class="font-black text-gray-800 mb-4 flex items-center">
                   <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                   Komentar
                </h4>
                <div class="text-center py-8 text-gray-400">
                   <p class="text-sm">Fitur komentar akan segera hadir!</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
// Removed specific primevue imports as we are using custom UI now to match style
import axios from 'axios';

const router = useRouter();
const API_BASE = import.meta.env.VITE_API_BASE || '/api';
const token = localStorage.getItem('epanen_token');

const discussions = ref([]);
const searchQuery = ref('');
const selectedCategory = ref('Semua');
const showNewDiscussion = ref(false);
const submitting = ref(false);
const loading = ref(false);
const selectedDiscussion = ref(null);

const categories = ref([
  { name: 'Pasar', slug: 'pasar' },
  { name: 'Tanya Jawab', slug: 'tanya-jawab' },
  { name: 'Budidaya', slug: 'budidaya' },
  { name: 'Teknologi', slug: 'teknologi' }
]);

const newDiscussion = ref({
  title: '',
  content: '',
  category: 'tanya-jawab'
});

const filteredDiscussions = computed(() => {
  return discussions.value.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          d.content.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCat = selectedCategory.value === 'Semua' || 
                       (d.category && d.category.toLowerCase() === selectedCategory.value.toLowerCase());
    return matchesSearch && matchesCat;
  });
});

const loadDiscussions = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${API_BASE}/discussions`);
    discussions.value = response.data.data.discussions || [];
  } catch (error) {
    console.error('Failed to load discussions:', error);
  } finally {
    loading.value = false;
  }
};

const createDiscussion = async () => {
  submitting.value = true;
  try {
    await axios.post(`${API_BASE}/discussions`, newDiscussion.value, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert('Diskusi berhasil dibuat!'); // Simple alert for now, replacing toast
    showNewDiscussion.value = false;
    newDiscussion.value = { title: '', content: '', category: 'tanya-jawab' };
    loadDiscussions();
  } catch (error) {
    alert(error.response?.data?.message || 'Gagal membuat diskusi');
  } finally {
    submitting.value = false;
  }
};

const openDetail = (discussion) => {
   selectedDiscussion.value = discussion;
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

onMounted(() => {
  loadDiscussions();
});
</script>

