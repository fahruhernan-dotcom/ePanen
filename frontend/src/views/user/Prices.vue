<template>
  <div class="space-y-12 animate-slide-up pb-20">
    <!-- Premium Header -->
    <div class="relative bg-gradient-to-br from-epanen-dark via-epanen-primary to-emerald-900 rounded-[2.5rem] p-10 md:p-20 overflow-hidden shadow-2xl text-white">
      <div class="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-epanen-accent/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-epanen-secondary/20 rounded-full blur-2xl"></div>
      
      <div class="relative z-10 max-w-4xl">
        <div class="flex items-center space-x-3 mb-6">
          <span class="w-12 h-[2px] bg-epanen-accent"></span>
          <span class="text-epanen-accent font-black uppercase tracking-[0.3em] text-xs">Informasi Komoditas</span>
        </div>
        <h1 class="text-4xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
          Pantau Harga <br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-epanen-accent to-white">Pasar Real-Time.</span>
        </h1>
        <p class="text-xl text-emerald-50/80 font-medium leading-relaxed max-w-2xl font-bold">
          Jangan biarkan hasil jerih payah Anda dihargai rendah. Cek referensi harga pasar terkini untuk berbagai komoditas pertanian demi transaksi yang adil.
        </p>
      </div>
    </div>

    <!-- Filter & Search Bar -->
    <div class="glass-card rounded-[2rem] p-4 shadow-xl shadow-blue-900/5 border border-white sticky top-4 z-40 mx-2 md:mx-0">
      <div class="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div class="relative w-full lg:w-[450px]">
          <span class="absolute inset-y-0 left-0 pl-5 flex items-center text-gray-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            v-model="searchQuery" 
            @input="searchPrices"
            type="text" 
            placeholder="Cari komoditas (Cabai, Padi, Jagung)..." 
            class="w-full pl-14 pr-6 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-gray-700 placeholder-gray-400"
          />
        </div>

        <div class="flex flex-wrap lg:flex-nowrap gap-4 items-center">
          <div class="flex gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full lg:w-auto px-2 lg:px-0">
            <button 
              v-for="cat in categories" 
              :key="cat.slug"
              @click="selectCategory(cat.slug)"
              :class="[
                'px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap border-2',
                selectedCategory === cat.slug 
                  ? 'bg-epanen-primary border-epanen-primary text-white shadow-xl shadow-epanen-primary/20' 
                  : 'bg-white dark:bg-white/5 border-gray-100 dark:border-white/5 text-gray-400 hover:border-epanen-primary hover:text-epanen-primary'
              ]"
            >
              {{ cat.name }}
            </button>
          </div>
          
          <button 
            @click="syncPrices"
            :disabled="syncing"
            class="flex items-center space-x-2 px-6 py-4 bg-emerald-50 text-epanen-primary rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-epanen-primary hover:text-white transition-all disabled:opacity-50 border-2 border-emerald-100"
          >
            <svg v-if="syncing" class="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{{ syncing ? 'Singkron...' : 'Update Data' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Prices Grid -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="i in 6" :key="i" class="bg-white rounded-[2.5rem] p-8 shadow-sm h-64 animate-pulse border border-gray-50">
        <div class="flex justify-between mb-8">
          <div class="h-6 bg-gray-100 w-1/2 rounded"></div>
          <div class="h-6 bg-gray-100 w-20 rounded-full"></div>
        </div>
        <div class="h-12 bg-gray-100 w-3/4 rounded mb-4"></div>
        <div class="h-4 bg-gray-100 w-1/4 rounded"></div>
      </div>
    </div>

    <div v-else-if="prices.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="price in prices"
        :key="price.id"
        class="group glass-card p-10 rounded-[3rem] premium-shadow-hover border border-white/40 dark:border-white/10 hover:border-epanen-primary transition-all duration-500 flex flex-col justify-between"
      >
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <span class="px-4 py-1.5 bg-epanen-primary/10 dark:bg-epanen-accent/10 text-epanen-primary dark:text-epanen-accent text-[10px] font-black uppercase tracking-widest rounded-xl">
              {{ price.category }}
            </span>
            
            <div :class="[
              'flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider',
              price.trend === 'up' ? 'bg-emerald-500/10 text-emerald-600' : 
              price.trend === 'down' ? 'bg-rose-500/10 text-rose-600' : 'bg-gray-500/10 text-gray-500'
            ]">
               <span v-if="price.trend === 'up'">▲ Naik</span>
               <span v-else-if="price.trend === 'down'">▼ Turun</span>
               <span v-else>→ Stabil</span>
            </div>
          </div>

          <h3 class="text-3xl font-black text-gray-900 dark:text-white tracking-tight group-hover:text-epanen-primary transition-colors">{{ price.name }}</h3>
          
          <div class="space-y-3">
            <div class="flex flex-col">
              <p class="text-5xl font-black text-epanen-primary dark:text-epanen-accent tracking-tighter shadow-sm flex items-baseline">
                <span class="text-lg font-bold mr-1 italic opacity-60">Rp</span>{{ formatPrice(price.price) }}
              </p>
              <div v-if="price.previous_price" class="flex items-center space-x-2 mt-1">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Kemarin:</span>
                <span class="text-[11px] font-black text-gray-500 flex items-center">
                  Rp {{ formatPrice(price.previous_price) }}
                  <span v-if="price.trend === 'up'" class="ml-1.5 text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md">
                    +{{ Math.round((price.price - price.previous_price) / price.previous_price * 100) }}%
                  </span>
                  <span v-else-if="price.trend === 'down'" class="ml-1.5 text-[9px] text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded-md">
                    {{ Math.round((price.price - price.previous_price) / price.previous_price * 100) }}%
                  </span>
                </span>
              </div>
            </div>
            
            <p class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] pt-1">Estimasi Harga per {{ price.unit }}</p>
          </div>
        </div>

        <div class="mt-10 pt-8 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
          <div class="flex items-center space-x-2 text-gray-400 dark:text-gray-500">
            <svg class="w-5 h-5 text-epanen-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span class="text-[11px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">{{ price.location || 'Nasional' }}</span>
          </div>
          <button class="w-12 h-12 rounded-2xl bg-epanen-primary/5 dark:bg-white/5 text-epanen-primary dark:text-epanen-accent flex items-center justify-center group-hover:bg-epanen-primary group-hover:text-white transition-all transform hover:rotate-45 shadow-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-32 glass-card rounded-[3rem] border border-white mx-4">
      <div class="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
        <svg class="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h3 class="text-2xl font-black text-gray-800 mb-2">Komoditas Tidak Ditemukan</h3>
      <p class="text-gray-400 font-medium tracking-tight">Coba gunakan kata kunci lain untuk mencari harga.</p>
    </div>

    <!-- Disclaimer -->
    <div class="max-w-4xl mx-auto px-6 py-8 bg-blue-50/50 rounded-3xl border border-blue-100/50 text-center animate-pulse">
       <p class="text-[10px] font-black text-blue-900 uppercase tracking-[0.2em] mb-2">Pemberitahuan Data</p>
       <p class="text-sm text-blue-800/70 font-medium">Harga di atas adalah estimasi rata-rata pasar nasional & daerah. Harga aktual di lapangan dapat sedikit bervariasi tergantung kualitas dan volume transaksi.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

const prices = ref([]);
const categories = ref([
  { name: 'Semua Kategori', slug: '' },
  { name: 'Bahan Pokok', slug: 'Bahan Pokok' },
  { name: 'Sayuran', slug: 'Sayuran' },
  { name: 'Buah', slug: 'Buah' },
  { name: 'Protein', slug: 'Protein' }
]);



const syncing = ref(false);
const loading = ref(false);
const searchQuery = ref('');
const selectedCategory = ref('');

const syncPrices = async () => {
  syncing.value = true;
  try {
    const response = await axios.post(`${API_BASE}/market/prices/sync`);
    if (response.data.success) {
      alert(response.data.message);
      await loadPrices();
    }
  } catch (error) {
    console.error('Sync failed:', error);
    alert('Gagal memperbarui data harga. Pastikan server backend berjalan.');
  } finally {
    syncing.value = false;
  }
};

const loadPrices = async () => {
  loading.value = true;
  try {
    const params = {};
    if (searchQuery.value) params.search = searchQuery.value;
    if (selectedCategory.value) params.category = selectedCategory.value;

    const response = await axios.get(`${API_BASE}/market/prices`, { params });
    prices.value = response.data.data.prices || [];
  } catch (error) {
    console.error('Failed to load prices:', error);
  } finally {
    loading.value = false;
  }
};

const searchPrices = () => {
  loadPrices();
};

const selectCategory = (slug) => {
  selectedCategory.value = slug;
  loadPrices();
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price);
};

onMounted(() => {
  loadPrices();
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
