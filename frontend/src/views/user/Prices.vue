<template>
  <div class="container-custom">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-epanen-primary mb-2">Harga Pasar</h1>
      <p class="text-gray-600">Informasi harga komoditas pertanian terbaru</p>
    </div>

    <!-- Filter -->
    <div class="bg-white rounded-xl p-4 shadow-sm mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <InputText
          v-model="searchQuery"
          placeholder="Cari komoditas..."
          class="flex-1"
          @input="searchPrices"
        />
        <Dropdown
          v-model="selectedCategory"
          :options="categories"
          option-label="name"
          option-value="slug"
          placeholder="Semua Kategori"
          class="md:w-64"
          @change="searchPrices"
        />
      </div>
    </div>

    <!-- Prices List -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin w-12 h-12 border-4 border-epanen-secondary border-t-transparent rounded-full mx-auto"></div>
    </div>

    <div v-else-if="prices.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="price in prices"
        :key="price.id"
        class="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
      >
        <div class="flex items-start justify-between mb-3">
          <h3 class="font-semibold text-lg">{{ price.name }}</h3>
          <span
            v-if="price.trend === 'up'"
            class="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium"
          >
            ▲ Naik
          </span>
          <span
            v-else-if="price.trend === 'down'"
            class="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium"
          >
            ▼ Turun
          </span>
          <span v-else class="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
            → Stabil
          </span>
        </div>
        <p class="text-3xl font-bold text-epanen-primary mb-1">
          Rp {{ formatPrice(price.price) }}
        </p>
        <p class="text-sm text-gray-600 mb-3">per {{ price.unit }}</p>
        <div class="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
          <span class="bg-epanen-light text-epanen-primary px-2 py-1 rounded">{{ price.category }}</span>
          <span>{{ price.location || 'Nasional' }}</span>
        </div>
      </div>
    </div>

    <div v-else class="bg-white rounded-xl p-12 text-center">
      <p class="text-gray-500 text-lg">Tidak ada data harga</p>
    </div>

    <!-- Info -->
    <div class="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
      <h3 class="font-semibold text-blue-900 mb-2">Tentang Data Harga</h3>
      <p class="text-sm text-blue-800">
        Data harga diperbarui secara berkala dan dapat berbeda tergantung lokasi dan kondisi pasar.
        Harga yang ditampilkan adalah rata-rata dari beberapa sumber.
      </p>
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

const loading = ref(false);
const searchQuery = ref('');
const selectedCategory = ref('');

const loadPrices = async () => {
  loading.value = true;
  try {
    const params = {};
    if (searchQuery.value) params.search = searchQuery.value;
    if (selectedCategory.value) params.category = selectedCategory.value;

    const response = await axios.get(`${API_BASE}/market/prices`, { params });
    prices.value = response.data.data.prices;
  } catch (error) {
    console.error('Failed to load prices:', error);
  } finally {
    loading.value = false;
  }
};

const searchPrices = () => {
  loadPrices();
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price);
};

onMounted(() => {
  loadPrices();
});
</script>
