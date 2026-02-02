<template>
  <div class="container-custom max-w-4xl">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-epanen-primary mb-2">Profil Saya</h1>
      <p class="text-gray-600">Kelola informasi profil Anda</p>
    </div>

    <div class="grid md:grid-cols-3 gap-6">
      <!-- Profile Card -->
      <div class="md:col-span-1">
        <div class="bg-white rounded-xl p-6 shadow-sm text-center">
          <div class="w-24 h-24 bg-epanen-light rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-4xl font-bold text-epanen-primary">
              {{ user?.name?.charAt(0).toUpperCase() }}
            </span>
          </div>
          <h2 class="text-xl font-semibold mb-1">{{ user?.name }}</h2>
          <p class="text-gray-600 text-sm mb-4">{{ user?.email }}</p>
          <span class="inline-block bg-epanen-light text-epanen-primary px-4 py-1 rounded-full text-sm">
            Petani
          </span>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm mt-6">
          <h3 class="font-semibold mb-4">Statistik</h3>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Pertanyaan</span>
              <span class="font-semibold">{{ stats.questions }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Diskusi</span>
              <span class="font-semibold">{{ stats.discussions }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Bergabung</span>
              <span class="font-semibold">{{ formatDate(user?.created_at) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Profile Form -->
      <div class="md:col-span-2">
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h3 class="font-semibold text-lg mb-6">Edit Profil</h3>
          <form @submit.prevent="updateProfile" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
              <InputText
                v-model="profile.name"
                type="text"
                class="w-full"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <InputText
                v-model="profile.email"
                type="email"
                class="w-full"
                disabled
              />
              <p class="text-xs text-gray-500 mt-1">Email tidak dapat diubah</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">No. Telepon</label>
              <InputText
                v-model="profile.phone"
                type="tel"
                placeholder="08xxxxxxxxxx"
                class="w-full"
              />
            </div>
            <div class="pt-4">
              <Button
                type="submit"
                :loading="updating"
                label="Simpan Perubahan"
                class="bg-epanen-primary"
              />
            </div>
          </form>
        </div>

        <!-- Chat History -->
        <div class="bg-white rounded-xl p-6 shadow-sm mt-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-lg">Riwayat Chat</h3>
            <button
              @click="clearHistory"
              class="text-red-600 hover:text-red-700 text-sm"
            >
              Hapus Riwayat
            </button>
          </div>
          <div class="max-h-96 overflow-y-auto space-y-3">
            <div v-if="chatHistory.length === 0" class="text-center text-gray-500 py-8">
              Belum ada riwayat chat
            </div>
            <div
              v-for="(msg, index) in chatHistory.slice(-10).reverse()"
              :key="index"
              :class="['p-3 rounded-lg text-sm', msg.role === 'user' ? 'bg-epanen-light text-epanen-primary' : 'bg-gray-50']"
            >
              <p class="font-medium mb-1">{{ msg.role === 'user' ? 'Anda' : 'AI' }}</p>
              <p class="text-gray-700">{{ msg.message }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ formatTime(msg.created_at) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';

const authStore = useAuthStore();
const toast = useToast();
const API_BASE = import.meta.env.VITE_API_BASE || '/api';
const token = localStorage.getItem('epanen_token');

const user = computed(() => authStore.user);
const updating = ref(false);

const profile = ref({
  name: '',
  email: '',
  phone: ''
});

const chatHistory = ref([]);
const stats = ref({
  questions: 0,
  discussions: 0
});

const loadProfileData = async () => {
  profile.value = {
    name: user.value?.name || '',
    email: user.value?.email || '',
    phone: user.value?.phone || ''
  };

  try {
    const [chatRes] = await Promise.all([
      axios.get(`${API_BASE}/chat/history`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    ]);

    chatHistory.value = chatRes.data.data.messages || [];
    stats.value.questions = chatHistory.value.filter(m => m.role === 'user').length;
  } catch (error) {
    console.error('Failed to load profile data:', error);
  }
};

const updateProfile = async () => {
  updating.value = true;
  try {
    await authStore.updateProfile({
      name: profile.value.name,
      phone: profile.value.phone
    });

    toast.add({
      severity: 'success',
      summary: 'Berhasil',
      detail: 'Profil berhasil diperbarui',
      life: 3000
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Gagal',
      detail: 'Gagal memperbarui profil',
      life: 3000
    });
  } finally {
    updating.value = false;
  }
};

const clearHistory = async () => {
  if (!confirm('Hapus semua riwayat chat?')) return;

  try {
    await axios.delete(`${API_BASE}/chat/history`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    chatHistory.value = [];
    stats.value.questions = 0;

    toast.add({
      severity: 'success',
      summary: 'Berhasil',
      detail: 'Riwayat chat berhasil dihapus',
      life: 3000
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Gagal',
      detail: 'Gagal menghapus riwayat',
      life: 3000
    });
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });
};

const formatTime = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
};

onMounted(() => {
  loadProfileData();
});
</script>
