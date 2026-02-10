<template>
  <div class="space-y-8 animate-fade-in text-gray-800 pb-10">
    <!-- Premium Header -->
    <div class="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-sm border border-gray-50 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors">
      <div>
        <h1 class="text-4xl font-black text-gray-800 dark:text-white tracking-tighter leading-none mb-2">Market Prices</h1>
        <p class="text-[10px] font-black text-epanen-primary uppercase tracking-[0.3em] opacity-60">Monitoring Komoditas Real-time</p>
      </div>
      <button
        @click="showPriceDialog = true"
        class="bg-gradient-to-r from-epanen-primary to-epanen-secondary text-white px-8 py-4 rounded-2xl shadow-xl shadow-epanen-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all font-black text-xs uppercase tracking-widest flex items-center"
      >
        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" />
        </svg>
        Update Harga
      </button>
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

    <!-- Prices Grid -->
    <div v-if="prices.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <div
        v-for="price in prices"
        :key="price.id"
        class="group bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm border border-gray-50 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col"
      >
        <!-- Background Decor -->
        <div class="absolute -top-12 -right-12 w-32 h-32 bg-gray-50 dark:bg-gray-800 rounded-full group-hover:bg-epanen-primary/5 transition-colors duration-500"></div>
        
        <div class="p-8 flex-1 flex flex-col relative z-10">
          <div class="flex items-start justify-between mb-6">
            <span class="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-[10px] font-black text-gray-500 dark:text-gray-400 rounded-lg uppercase tracking-widest transition-colors">
               {{ price.category }}
            </span>
            <div
              :class="[
                'w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:rotate-12 duration-500',
                price.trend === 'up' ? 'bg-red-50 dark:bg-red-900/20 text-red-500' :
                price.trend === 'down' ? 'bg-green-50 dark:bg-green-900/20 text-green-500' :
                'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              ]"
            >
              <svg v-if="price.trend === 'up'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              <svg v-else-if="price.trend === 'down'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" /></svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
          </div>

          <h3 class="text-2xl font-black text-gray-800 dark:text-white mb-1 tracking-tighter group-hover:text-epanen-primary transition-colors">{{ price.name }}</h3>
          <div class="flex items-center text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-8">
            <svg class="w-3.5 h-3.5 mr-1.5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {{ price.location || 'Nasional' }}
          </div>

          <div class="mt-auto bg-gray-50 dark:bg-gray-800 rounded-[1.5rem] p-5 border border-gray-100 dark:border-gray-700 group-hover:bg-white dark:group-hover:bg-gray-900 group-hover:shadow-inner transition-all duration-500">
            <div class="flex items-baseline justify-between mb-1">
              <span class="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Rate (IDR)</span>
              <span class="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">/ {{ price.unit }}</span>
            </div>
            <p class="text-3xl font-black text-gray-800 dark:text-white tracking-tighter transition-colors">
              Rp {{ formatPrice(price.price) }}
            </p>
          </div>
        </div>

        <div class="px-8 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-50 dark:border-gray-800 flex justify-end group-hover:bg-white dark:group-hover:bg-gray-900 transition-colors">
          <button
            @click="confirmDelete(price)"
            class="p-2 text-gray-300 dark:text-gray-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
            title="Hapus Data"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading" class="py-24 text-center bg-white dark:bg-gray-900 rounded-[3rem] shadow-sm border border-gray-50 dark:border-gray-800 px-10 transition-colors">
      <div class="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner transition-colors">
        <svg class="w-10 h-10 text-gray-200 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2zm0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
      <h3 class="text-2xl font-black text-gray-800 dark:text-white mb-3 tracking-tighter">Data Harga Kosong</h3>
      <p class="text-gray-400 dark:text-gray-500 font-bold text-sm mb-10 max-w-sm mx-auto">Anda belum menginput data komoditas. Tambahkan data pertama untuk memantau tren pasar.</p>
      <button
        @click="showPriceDialog = true"
        class="bg-gray-800 dark:bg-white text-white dark:text-black px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-black dark:hover:bg-gray-200 hover:-translate-y-1 transition-all"
      >
        + Add Market Logic
      </button>
    </div>

    <!-- Add Price Modal -->
    <div v-if="showPriceDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-md" @click="showPriceDialog = false"></div>
      <div class="relative bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl max-w-lg w-full flex flex-col animate-scale-in border border-white/20 dark:border-gray-800 transition-colors">
        <!-- Modal Header -->
        <div class="px-10 py-8 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors">
          <div>
            <h2 class="text-3xl font-black text-gray-800 dark:text-white tracking-tighter text-left">Update Harga</h2>
            <p class="text-[10px] text-epanen-primary font-black uppercase tracking-[0.3em] mt-1 space-x-1">Kian Market Intelligence</p>
          </div>
          <button @click="showPriceDialog = false" class="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 rounded-2xl transition-all border border-gray-100 dark:border-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form @submit.prevent="addPrice" class="p-10 space-y-6">
          <div class="space-y-6">
            <div class="group">
              <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">Nama Komoditas</label>
              <input v-model="priceForm.name" type="text" required class="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-[1.5rem] focus:ring-2 focus:ring-epanen-primary transition-all outline-none font-black text-sm text-gray-800 dark:text-white shadow-inner" placeholder="Beras, Cabai, dll..." />
            </div>

            <div class="group">
              <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">Kategori</label>
              <select v-model="priceForm.category" required class="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-[1.5rem] focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-xs font-black text-gray-700 dark:text-gray-300 appearance-none shadow-sm">
                <option value="" class="bg-white dark:bg-gray-800">Pilih</option>
                <option value="Bahan Pokok" class="bg-white dark:bg-gray-800">Bahan Pokok</option>
                <option value="Sayuran" class="bg-white dark:bg-gray-800">Sayuran</option>
                <option value="Buah" class="bg-white dark:bg-gray-800">Buah</option>
                <option value="Protein" class="bg-white dark:bg-gray-800">Protein</option>
                <option value="Rempah" class="bg-white dark:bg-gray-800">Rempah</option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div class="group">
                <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">Harga (Rp)</label>
                <input v-model.number="priceForm.price" type="number" required class="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-[1.5rem] focus:ring-2 focus:ring-epanen-primary transition-all outline-none font-black text-sm text-gray-800 dark:text-white shadow-inner" placeholder="0" />
              </div>
              <div class="group">
                <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">Satuan</label>
                <input v-model="priceForm.unit" type="text" required class="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-[1.5rem] focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-xs font-black text-gray-500 dark:text-gray-400 shadow-inner" placeholder="kg/ton" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div class="group">
                <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">Lokasi Pasar</label>
                <input v-model="priceForm.location" type="text" class="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-[1.5rem] focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-xs font-bold text-gray-600 dark:text-gray-300 shadow-inner" placeholder="Jawa Timur, dll" />
              </div>
              <div class="group">
                <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">Indikator Tren</label>
                <select v-model="priceForm.trend" class="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-[1.5rem] focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-xs font-black text-gray-700 dark:text-gray-300 appearance-none shadow-sm">
                  <option value="stable" class="bg-white dark:bg-gray-800">→ Stabil</option>
                  <option value="up" class="bg-white dark:bg-gray-800">↑ Naik</option>
                  <option value="down" class="bg-white dark:bg-gray-800">↓ Turun</option>
                </select>
              </div>
            </div>
          </div>

          <div class="flex gap-4 pt-10">
            <button type="button" @click="showPriceDialog = false" class="flex-1 py-4 rounded-2xl text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">Cancel</button>
            <button type="submit" :disabled="submitting" class="flex-1 py-4 bg-gray-800 dark:bg-white text-white dark:text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-black dark:hover:bg-gray-200 hover:-translate-y-1 transition-all disabled:opacity-50">
              {{ submitting ? 'Syncing...' : 'Update Data' }}
            </button>
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
const prices = ref([]);
const showPriceDialog = ref(false);
const submitting = ref(false);

const modal = ref({
  show: false,
  title: '',
  message: '',
  type: 'info',
  showConfirm: false,
  onConfirm: null
});

const priceForm = ref({
  name: '',
  category: '',
  price: '',
  unit: '',
  location: '',
  trend: 'stable'
});

const statCards = computed(() => [
  { label: 'Total Komoditas', value: prices.value.length, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2', bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-500 dark:text-blue-400' },
  { label: 'Kategori Pasar', value: uniqueCategories.value, icon: 'M4 6h16M4 10h16M4 14h16M4 18h16', bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-500 dark:text-indigo-400' },
  { label: 'Bahan Pokok (Up)', value: upTrend.value, icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-500 dark:text-red-400' },
  { label: 'Bahan Pokok (Down)', value: downTrend.value, icon: 'M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6', bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-500 dark:text-green-400' }
]);

const uniqueCategories = computed(() => new Set(prices.value.map(p => p.category)).size);
const upTrend = computed(() => prices.value.filter(p => p.trend === 'up').length);
const downTrend = computed(() => prices.value.filter(p => p.trend === 'down').length);

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

const loadPrices = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${API_BASE}/admin/market/prices`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    prices.value = response.data.data.prices || [];
  } catch (error) {
    console.error('Failed to load prices:', error);
  } finally {
    loading.value = false;
  }
};

const addPrice = async () => {
  submitting.value = true;
  try {
    await axios.post(`${API_BASE}/admin/market/prices`, priceForm.value, {
      headers: { Authorization: `Bearer ${token}` }
    });
    showPremiumAlert('Sync Berhasil', 'Data harga komoditas terbaru telah disebarkan ke seluruh ekosistem');
    showPriceDialog.value = false;
    resetForm();
    loadPrices();
  } catch (error) {
    showPremiumAlert('Sync Gagal', error.response?.data?.message || 'Kesalahan sistem intelijen pasar', 'error');
  } finally {
    submitting.value = false;
  }
};

const confirmDelete = (price) => {
  showPremiumConfirm(
    'Hapus Data?',
    `Hapus data harga "${price.name}" dari sistem monitor?`,
    () => deletePrice(price)
  );
};

const deletePrice = async (price) => {
  try {
    await axios.delete(`${API_BASE}/admin/market/prices/${price.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    showPremiumAlert('Berhasil', 'Data telah dihapus dari monitor market');
    loadPrices();
  } catch (error) {
    showPremiumAlert('Gagal', 'Gagal memproses penghapusan data', 'error');
  }
};

const resetForm = () => {
  priceForm.value = {
    name: '',
    category: '',
    price: '',
    unit: '',
    location: '',
    trend: 'stable'
  };
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price);
};

onMounted(() => {
  loadPrices();
});
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
</style>
