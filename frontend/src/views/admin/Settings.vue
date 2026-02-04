<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-black text-gray-800 tracking-tight">Pengaturan Sistem</h1>
        <p class="text-gray-400 text-sm font-bold mt-1 uppercase tracking-widest">Pusat Kendali Keamanan & Konfigurasi</p>
      </div>
      <div class="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" stroke-width="2"/>
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2"/>
        </svg>
      </div>
    </div>

    <div class="grid lg:grid-cols-12 gap-6">
      <!-- Password Change Section -->
      <div class="lg:col-span-12">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="p-6 border-b border-gray-50 bg-gray-50/30">
            <h3 class="font-bold text-gray-800 flex items-center">
              <svg class="w-5 h-5 mr-2 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke-width="2"/>
              </svg>
              Ganti Password Administrator
            </h3>
          </div>
          <div class="p-8">
            <form @submit.prevent="handleChangePassword" class="max-w-xl space-y-6">
              <div class="space-y-2">
                <label class="text-xs font-black text-gray-400 uppercase tracking-wider">Password Lama</label>
                <input
                  v-model="passwordForm.oldPassword"
                  type="password"
                  class="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-epanen-primary focus:ring-0 transition-all font-bold"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-xs font-black text-gray-400 uppercase tracking-wider">Password Baru</label>
                  <input
                    v-model="passwordForm.newPassword"
                    type="password"
                    class="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-epanen-primary focus:ring-0 transition-all font-bold"
                    placeholder="Min. 6 karakter"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-black text-gray-400 uppercase tracking-wider">Konfirmasi Password</label>
                  <input
                    v-model="passwordForm.confirmPassword"
                    type="password"
                    class="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-epanen-primary focus:ring-0 transition-all font-bold"
                    placeholder="Ulangi password baru"
                    required
                  />
                </div>
              </div>

              <div class="pt-4">
                <button
                  type="submit"
                  :disabled="loading"
                  class="bg-epanen-primary text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all disabled:opacity-50"
                >
                  {{ loading ? 'Memproses...' : 'Simpan Password Baru' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const API_BASE = import.meta.env.VITE_API_BASE || '/api';
const token = localStorage.getItem('epanen_token');

const loading = ref(false);
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const handleChangePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    toast.add({
      severity: 'error',
      summary: 'Gagal',
      detail: 'Konfirmasi password tidak cocok',
      life: 3000
    });
    return;
  }

  loading.value = true;
  try {
    await axios.put(`${API_BASE}/auth/change-password`, {
      oldPassword: passwordForm.value.oldPassword,
      newPassword: passwordForm.value.newPassword
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    toast.add({
      severity: 'success',
      summary: 'Berhasil',
      detail: 'Password administrator telah diperbarui',
      life: 3000
    });

    passwordForm.value = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Gagal',
      detail: error.response?.data?.message || 'Terjadi kesalahan pada server',
      life: 3000
    });
  } finally {
    loading.value = false;
  }
};
</script>
