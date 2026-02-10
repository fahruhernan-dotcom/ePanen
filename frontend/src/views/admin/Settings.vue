<template>
  <div class="space-y-8 animate-fade-in pb-10">
    <!-- Premium Header -->
    <div class="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 shadow-sm border border-gray-50 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
      <div class="text-center md:text-left">
        <h1 class="text-4xl font-black text-gray-800 dark:text-white tracking-tighter">Pengaturan Sistem</h1>
        <p class="text-[10px] font-black text-epanen-primary uppercase tracking-[0.3em] mt-1 opacity-60">Pusat Kendali ePanen Kian Office</p>
      </div>
      <div class="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-[2rem] flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-xl shadow-indigo-100 dark:shadow-none transition-transform hover:rotate-12">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" stroke-width="2.5"/><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2.5"/>
        </svg>
      </div>
    </div>

    <!-- Main Settings Card -->
    <div class="bg-white dark:bg-gray-900 rounded-[3rem] shadow-sm border border-gray-50 dark:border-gray-800 overflow-hidden transition-colors">
      <div class="px-10 py-8 border-b border-gray-50 dark:border-gray-800 flex items-center gap-4 bg-gray-50/30 dark:bg-gray-800/30 transition-colors">
        <div class="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center text-epanen-primary shadow-sm">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke-width="2.5"/></svg>
        </div>
        <div>
          <h3 class="font-black text-gray-800 dark:text-white text-lg leading-tight">Keamanan Akun</h3>
          <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Update Kredensial Administrator</p>
        </div>
      </div>

      <div class="p-10">
        <form @submit.prevent="handleChangePassword" class="max-w-2xl space-y-8">
          <div class="group">
            <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">Password Saat Ini</label>
            <div class="relative">
              <input v-model="passwordForm.oldPassword" type="password" class="w-full px-6 py-5 pl-14 bg-gray-50 dark:bg-gray-800 border-none rounded-3xl focus:ring-2 focus:ring-epanen-primary font-bold text-sm text-gray-800 dark:text-white transition-all outline-none shadow-inner" placeholder="••••••••" required />
              <svg class="w-5 h-5 text-gray-300 dark:text-gray-600 absolute left-6 top-1/2 -translate-y-1/2 group-focus-within:text-epanen-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-1.127-3.96a7 7 0 001.328-3.045m0 0a17.214 17.214 0 011.66-3.71m0 0c.957-2.011 2.27-3.481 3.223-4.608a1.205 1.205 0 011.871 1.48M7 11a5 5 0 1110 0 5 5 0 01-10 0z" /></svg>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div class="group">
              <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">Password Baru</label>
              <div class="relative">
                <input v-model="passwordForm.newPassword" type="password" class="w-full px-6 py-5 pl-14 bg-gray-50 dark:bg-gray-800 border-none rounded-3xl focus:ring-2 focus:ring-epanen-primary font-bold text-sm text-gray-800 dark:text-white transition-all outline-none shadow-inner" placeholder="Min. 6 karakter" required />
                <svg class="w-5 h-5 text-gray-300 dark:text-gray-600 absolute left-6 top-1/2 -translate-y-1/2 group-focus-within:text-epanen-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
              </div>
            </div>
            <div class="group">
              <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">Konfirmasi</label>
              <div class="relative">
                <input v-model="passwordForm.confirmPassword" type="password" class="w-full px-6 py-5 pl-14 bg-gray-50 dark:bg-gray-800 border-none rounded-3xl focus:ring-2 focus:ring-epanen-primary font-bold text-sm text-gray-800 dark:text-white transition-all outline-none shadow-inner" placeholder="Ulangi password" required />
                <svg class="w-5 h-5 text-gray-300 dark:text-gray-600 absolute left-6 top-1/2 -translate-y-1/2 group-focus-within:text-epanen-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
            </div>
          </div>

          <div class="pt-6">
            <button :disabled="loading" class="group bg-gradient-to-r from-gray-800 to-black dark:from-white dark:to-gray-200 text-white dark:text-black px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-3">
              <span v-if="!loading">Update Konfigurasi</span>
              <span v-else class="flex items-center gap-2">
                <div class="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
                Menyimpan...
              </span>
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7-7 7" /></svg>
            </button>
          </div>
        </form>
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

<style scoped>
.animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>
