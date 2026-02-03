<template>
  <div class="space-y-6 animate-fade-in text-gray-800">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2">
      <div>
        <h1 class="text-3xl font-black text-gray-800 tracking-tight">Market Prices</h1>
        <p class="text-gray-500 font-medium tracking-wide">Pantau dan kelola harga komoditas pasar hari ini</p>
      </div>
      <button
        @click="showPriceDialog = true"
        class="bg-gradient-to-r from-epanen-primary to-epanen-secondary text-white px-6 py-3 rounded-2xl hover:shadow-lg transition-all font-bold flex items-center transform hover:scale-105"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Update Harga
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
        <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Komoditas</p>
        <h3 class="text-3xl font-black text-gray-800">{{ prices.length }}</h3>
      </div>
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-purple-500">
        <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Kategori Unik</p>
        <h3 class="text-3xl font-black text-purple-600">{{ uniqueCategories }}</h3>
      </div>
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-red-500">
        <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Tren Naik</p>
        <h3 class="text-3xl font-black text-red-600">{{ upTrend }} <span class="text-sm font-normal text-gray-400">item</span></h3>
      </div>
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-green-500">
        <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Tren Turun</p>
        <h3 class="text-3xl font-black text-green-600">{{ downTrend }} <span class="text-sm font-normal text-gray-400">item</span></h3>
      </div>
    </div>

    <!-- Prices Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="price in prices"
        :key="price.id"
        class="bg-white rounded-[2rem] shadow-sm border border-gray-50 hover:shadow-xl transition-all group relative overflow-hidden flex flex-col"
      >
        <!-- Card Decoration -->
        <div class="absolute -top-12 -right-12 w-24 h-24 bg-gray-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
        
        <div class="p-6 flex-1 flex flex-col relative z-10">
          <div class="flex items-start justify-between mb-4">
            <span class="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-widest italic">
               {{ price.category }}
            </span>
            <div
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center shadow-sm',
                price.trend === 'up' ? 'bg-red-50 text-red-500' :
                price.trend === 'down' ? 'bg-green-50 text-green-500' :
                'bg-gray-50 text-gray-400'
              ]"
            >
              <svg v-if="price.trend === 'up'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <svg v-else-if="price.trend === 'down'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

          <h3 class="font-black text-xl text-gray-800 mb-1 tracking-tight">{{ price.name }}</h3>
          <p class="text-xs text-gray-400 font-bold flex items-center mb-6">
            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ price.location || 'Nasional' }}
          </p>

          <div class="mt-auto bg-gray-50 bg-opacity-50 p-4 rounded-2xl border border-gray-50">
            <p class="text-2xl font-black text-epanen-primary tracking-tighter">
              Rp {{ formatPrice(price.price) }}
            </p>
            <p class="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">per {{ price.unit }}</p>
          </div>
        </div>

        <!-- Hover Actions -->
        <div class="bg-gray-900 bg-opacity-0 group-hover:bg-opacity-5 absolute inset-0 transition-all pointer-events-none"></div>
        <div class="p-3 bg-white border-t border-gray-50 flex justify-end">
          <button
            @click="deletePrice(price)"
            class="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title="Hapus Data"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="prices.length === 0 && !loading" class="py-20 text-center bg-white rounded-[3rem] shadow-sm border border-gray-50">
      <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2zm0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-800 mb-2">Data Harga Kosong</h3>
      <p class="text-gray-400 font-medium mb-8">Anda belum memiliki list harga komoditas pasar.</p>
      <button
        @click="showPriceDialog = true"
        class="bg-epanen-primary text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        + Tambah Data Pertama
      </button>
    </div>


    <!-- Add Price Modal -->
    <div v-if="showPriceDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm" @click="showPriceDialog = false"></div>
      <div class="relative bg-white rounded-[2rem] shadow-2xl max-w-lg w-full flex flex-col animate-scale-in">
        <!-- Modal Header -->
        <div class="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-black text-gray-800 tracking-tight">Update Harga</h2>
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Input data komoditas terbaru</p>
          </div>
          <button @click="showPriceDialog = false" class="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="addPrice" class="p-8 space-y-6">
          <div class="space-y-6">
            <div>
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Nama Komoditas</label>
              <input
                v-model="priceForm.name"
                type="text"
                required
                class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none font-bold text-gray-700"
                placeholder="Contoh: Beras Premium"
              />
            </div>

            <div>
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Kategori</label>
              <select
                v-model="priceForm.category"
                required
                class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm font-bold text-gray-700 appearance-none bg-no-repeat bg-[right_1rem_center]"
                style="background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3E%3Cpath stroke=%22%236b7280%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22m6 8 4 4 4-4%22%2F%3E%3C%2Fsvg%3E')"
              >
                <option value="">Pilih Kategori</option>
                <option value="Bahan Pokok">Bahan Pokok</option>
                <option value="Sayuran">Sayuran</option>
                <option value="Buah">Buah</option>
                <option value="Protein">Protein</option>
                <option value="Rempah">Rempah</option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Harga (Rp)</label>
                <input
                  v-model.number="priceForm.price"
                  type="number"
                  required
                  min="0"
                  class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none font-bold text-gray-700"
                  placeholder="15000"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Satuan</label>
                <input
                  v-model="priceForm.unit"
                  type="text"
                  required
                  class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm text-gray-500 font-bold"
                  placeholder="kg, ton, dll"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Lokasi</label>
                <input
                  v-model="priceForm.location"
                  type="text"
                  class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm text-gray-700"
                  placeholder="Contoh: Jawa Timur"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Tren Harga</label>
                <select
                  v-model="priceForm.trend"
                  class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-sm font-bold text-gray-700 appearance-none bg-no-repeat bg-[right_1rem_center]"
                  style="background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3E%3Cpath stroke=%22%236b7280%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22m6 8 4 4 4-4%22%2F%3E%3C%2Fsvg%3E')"
                >
                  <option value="stable">→ Stabil</option>
                  <option value="up">↑ Naik</option>
                  <option value="down">↓ Turun</option>
                </select>
              </div>
            </div>
          </div>

          <div class="flex space-x-4 pt-4">
            <button
              type="button"
              @click="showPriceDialog = false; resetForm()"
              class="flex-1 py-3 rounded-2xl text-gray-400 font-bold hover:bg-gray-50 transition-all uppercase text-xs tracking-widest"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="flex-1 py-3 bg-gradient-to-r from-epanen-primary to-epanen-secondary text-white rounded-2xl font-black shadow-lg hover:shadow-xl transform hover:scale-105 transition-all uppercase text-xs tracking-widest disabled:opacity-50"
            >
              {{ submitting ? 'Menyimpan...' : 'Simpan Harga' }}
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
const prices = ref([]);
const showPriceDialog = ref(false);
const submitting = ref(false);

const priceForm = ref({
  name: '',
  category: '',
  price: '',
  unit: '',
  location: '',
  trend: 'stable'
});

const uniqueCategories = computed(() => new Set(prices.value.map(p => p.category)).size);
const upTrend = computed(() => prices.value.filter(p => p.trend === 'up').length);
const downTrend = computed(() => prices.value.filter(p => p.trend === 'down').length);

const loadPrices = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${API_BASE}/admin/market/prices`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    prices.value = response.data.data.prices || [];
  } catch (error) {
    console.error('Failed to load prices:', error);
    prices.value = [];
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
    alert('Harga berhasil ditambahkan!');
    showPriceDialog.value = false;
    resetForm();
    loadPrices();
  } catch (error) {
    console.error('Failed to add price:', error);
    alert('Gagal menambahkan harga: ' + (error.response?.data?.message || error.message));
  } finally {
    submitting.value = false;
  }
};

const deletePrice = async (price) => {
  if (!confirm(`Yakin ingin menghapus harga "${price.name}"?`)) return;

  try {
    await axios.delete(`${API_BASE}/admin/market/prices/${price.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Harga berhasil dihapus!');
    loadPrices();
  } catch (error) {
    console.error('Failed to delete price:', error);
    alert('Gagal menghapus harga');
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
