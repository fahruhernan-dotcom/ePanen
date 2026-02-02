<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-epanen-primary">Market Prices</h1>
        <p class="text-gray-600 text-sm">Kelola harga komoditas pertanian</p>
      </div>
      <button
        @click="showPriceDialog = true"
        class="bg-epanen-primary text-white px-4 py-2 rounded-lg hover:bg-epanen-secondary transition-colors font-medium flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Tambah Harga
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Total Komoditas</p>
        <p class="text-2xl font-bold text-gray-800">{{ prices.length }}</p>
      </div>
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Kategori</p>
        <p class="text-2xl font-bold text-purple-600">{{ uniqueCategories }}</p>
      </div>
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Harga Naik</p>
        <p class="text-2xl font-bold text-red-600">{{ upTrend }}</p>
      </div>
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Harga Turun</p>
        <p class="text-2xl font-bold text-green-600">{{ downTrend }}</p>
      </div>
    </div>

    <!-- Prices Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="price in prices"
        :key="price.id"
        class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
      >
        <div class="p-5">
          <div class="flex items-start justify-between mb-4">
            <h3 class="font-semibold text-lg text-gray-800">{{ price.name }}</h3>
            <span
              :class="[
                'px-2.5 py-1 rounded-full text-xs font-medium',
                price.trend === 'up' ? 'bg-red-100 text-red-600' :
                price.trend === 'down' ? 'bg-green-100 text-green-600' :
                'bg-gray-100 text-gray-600'
              ]"
            >
              {{ price.trend === 'up' ? '↑ Naik' : price.trend === 'down' ? '↓ Turun' : '→ Stabil' }}
            </span>
          </div>

          <div class="mb-4">
            <p class="text-3xl font-bold text-epanen-primary">
              Rp {{ formatPrice(price.price) }}
            </p>
            <p class="text-sm text-gray-600">per {{ price.unit }}</p>
          </div>

          <div class="flex items-center justify-between text-sm border-t border-gray-100 pt-4">
            <span class="bg-epanen-light text-epanen-primary px-2.5 py-1 rounded text-xs">
              {{ price.category }}
            </span>
            <span class="text-gray-600 text-xs">{{ price.location || 'Nasional' }}</span>
          </div>

          <div class="mt-4 pt-4 border-t border-gray-100 flex justify-end">
            <button
              @click="deletePrice(price)"
              class="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="prices.length === 0 && !loading" class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
      <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2zm0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-gray-500 mb-2">Belum ada data harga komoditas</p>
      <button
        @click="showPriceDialog = true"
        class="bg-epanen-primary text-white px-4 py-2 rounded-lg hover:bg-epanen-secondary transition-colors"
      >
        + Tambah Harga
      </button>
    </div>

    <!-- Add Price Modal -->
    <div v-if="showPriceDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black bg-opacity-50" @click="showPriceDialog = false"></div>
      <div class="relative bg-white rounded-xl shadow-xl max-w-lg w-full">
        <div class="p-6 border-b border-gray-100">
          <h2 class="text-xl font-bold text-gray-800">Tambah Harga Komoditas</h2>
        </div>

        <form @submit.prevent="addPrice" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Komoditas *</label>
            <input
              v-model="priceForm.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
              placeholder="Contoh: Beras"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
            <select
              v-model="priceForm.category"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
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
              <label class="block text-sm font-medium text-gray-700 mb-2">Harga (Rp) *</label>
              <input
                v-model.number="priceForm.price"
                type="number"
                required
                min="0"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
                placeholder="15000"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Satuan *</label>
              <input
                v-model="priceForm.unit"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
                placeholder="kg, ton, dll"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
              <input
                v-model="priceForm.location"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
                placeholder="Contoh: Jawa Timur"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Trend</label>
              <select
                v-model="priceForm.trend"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
              >
                <option value="stable">Stabil</option>
                <option value="up">Naik</option>
                <option value="down">Turun</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              @click="showPriceDialog = false; resetForm()"
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
