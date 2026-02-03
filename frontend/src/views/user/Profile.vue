<template>
  <div class="space-y-12 pb-24 animate-slide-up">
    <!-- Premium Header -->
    <div class="relative overflow-hidden p-10 md:p-16 rounded-[4rem] bg-gradient-to-br from-epanen-primary to-epanen-dark shadow-2xl">
      <!-- Background Decorative Elements -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-epanen-accent/20 rounded-full blur-[80px] pointer-events-none"></div>
      
      <div class="relative z-10">
        <div class="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20 mb-8">
          <span class="w-2.5 h-2.5 bg-epanen-accent rounded-full animate-pulse"></span>
          <span class="text-[10px] font-black text-white uppercase tracking-[0.2em]">Pusat Kendali Petani</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">Profil Saya</h1>
        <p class="text-emerald-100/70 text-lg font-bold max-w-xl leading-relaxed">
          Kelola informasi identitas Anda dan pantau riwayat interaksi cerdas bersama Nella AI.
        </p>
      </div>
    </div>

    <div class="grid lg:grid-cols-12 gap-10">
      <!-- Profile Card & Stats (Left Column) -->
      <div class="lg:col-span-4 space-y-10">
        <!-- Identity Card -->
        <div class="glass-card rounded-[3rem] p-10 text-center relative overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-500">
          <div class="absolute -top-10 -right-10 w-32 h-32 bg-epanen-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
          
          <div class="relative mb-8">
            <div class="w-32 h-32 bg-gradient-to-br from-epanen-primary to-epanen-secondary rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl rotate-3 group-hover:rotate-12 transition-all duration-500">
              <span class="text-5xl font-black text-white">
                {{ user?.name?.charAt(0).toUpperCase() }}
              </span>
            </div>
            <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-epanen-accent rounded-xl flex items-center justify-center border-4 border-white dark:border-[#0D1A0D] shadow-lg">
               <svg class="w-5 h-5 text-epanen-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
               </svg>
            </div>
          </div>
          
          <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-2 leading-tight">{{ user?.name }}</h2>
          <p class="text-muted dark:text-emerald-100/60 font-bold mb-6 truncate">{{ user?.email }}</p>
          
          <div class="inline-flex items-center px-6 py-2 bg-epanen-primary/10 dark:bg-epanen-accent/10 text-epanen-primary dark:text-epanen-accent rounded-full text-xs font-black uppercase tracking-widest border border-epanen-primary/20">
            Anggota Platinum
          </div>
        </div>

        <!-- Interactive Stats -->
        <div class="bg-white dark:bg-[#0D140D] rounded-[3rem] p-10 border-2 border-gray-100 dark:border-white/5 shadow-xl">
          <h3 class="text-lg font-black text-gray-900 dark:text-white mb-8 border-l-4 border-epanen-primary pl-4">Statistik</h3>
          <div class="space-y-8">
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
              <div class="flex items-center space-x-4">
                <div class="p-3 bg-blue-500/10 text-blue-500 rounded-xl"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" stroke-width="2.5"/></svg></div>
                <span class="text-muted dark:text-gray-400 font-bold">Tanya AI</span>
              </div>
              <span class="text-xl font-black text-gray-900 dark:text-white">{{ stats.questions }}</span>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
              <div class="flex items-center space-x-4">
                <div class="p-3 bg-purple-500/10 text-purple-500 rounded-xl"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke-width="2.5"/></svg></div>
                <span class="text-muted dark:text-gray-400 font-bold">Diskusi</span>
              </div>
              <span class="text-xl font-black text-gray-900 dark:text-white">{{ stats.discussions }}</span>
            </div>

            <div class="flex items-center justify-between p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
              <div class="flex items-center space-x-4">
                <div class="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-width="2.5"/></svg></div>
                <span class="text-muted dark:text-gray-400 font-bold">Bergabung Sejak</span>
              </div>
              <span class="text-[11px] font-black uppercase text-epanen-primary dark:text-epanen-accent">{{ formatDate(user?.created_at) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Forms & History (Right Column) -->
      <div class="lg:col-span-8 space-y-10">
        <!-- Edit Form -->
        <div class="bg-white dark:bg-[#0D140D] rounded-[3rem] p-10 md:p-14 border-2 border-gray-100 dark:border-white/5 shadow-xl">
          <div class="flex items-center justify-between mb-12">
            <h3 class="text-2xl font-black text-gray-900 dark:text-white">Pengaturan Dasar</h3>
            <span class="w-12 h-1 bg-epanen-primary/20 rounded-full"></span>
          </div>

          <form @submit.prevent="updateProfile" class="space-y-8">
            <div class="grid md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <label class="block text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest pl-2">Nama Lengkap</label>
                <InputText
                  v-model="profile.name"
                  type="text"
                  class="w-full !rounded-2xl !p-4 !bg-gray-50 dark:!bg-white/5 !border-0 focus:!ring-2 focus:!ring-epanen-primary transition-all font-bold"
                  placeholder="Masukkan nama Anda"
                  required
                />
              </div>

              <div class="space-y-4">
                <label class="block text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest pl-2">Email (ID Utama)</label>
                <InputText
                  v-model="profile.email"
                  type="email"
                  class="w-full !rounded-2xl !p-4 !bg-gray-100 dark:!bg-white/10 !border-0 !cursor-not-allowed font-bold"
                  disabled
                />
              </div>

              <div class="space-y-4 md:col-span-2">
                <label class="block text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest pl-2">Nomor WhatsApp Aktif</label>
                <InputText
                  v-model="profile.phone"
                  type="tel"
                  placeholder="Contoh: 08123456789"
                  class="w-full !rounded-2xl !p-4 !bg-gray-50 dark:!bg-white/5 !border-0 focus:!ring-2 focus:!ring-epanen-primary transition-all font-bold"
                />
              </div>
            </div>

            <div class="pt-6">
              <Button
                type="submit"
                :loading="updating"
                class="!bg-epanen-primary !text-white !px-12 !py-5 !rounded-3xl !font-black !w-full md:!w-auto !shadow-xl hover:!scale-105 transition-all"
              >
                <template #default>
                   <span class="flex items-center">
                     Simpan Detail Profil
                     <svg class="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke-width="3"/></svg>
                   </span>
                </template>
              </Button>
            </div>
          </form>
        </div>

        <!-- Professional Chat History -->
        <div class="bg-white dark:bg-[#0D140D] rounded-[3rem] p-10 border-2 border-gray-100 dark:border-white/5 shadow-xl overflow-hidden">
          <div class="flex items-center justify-between mb-10">
            <div>
              <h3 class="text-2xl font-black text-gray-900 dark:text-white">Log Interaksi</h3>
              <p class="text-sm text-muted dark:text-gray-500 font-bold">Pantau pertanyaan terakhir Anda ke Nella AI</p>
            </div>
            <button
              @click="clearHistory"
              class="px-5 py-2.5 text-red-600 bg-red-50 dark:bg-red-500/10 rounded-xl hover:bg-red-100 transition-all font-black text-[11px] uppercase tracking-widest"
            >
              Reset Log
            </button>
          </div>

          <div class="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            <div v-if="chatHistory.length === 0" class="flex flex-col items-center justify-center py-20 text-center space-y-4">
              <div class="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center text-gray-300">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke-width="2.5"/></svg>
              </div>
              <p class="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Belum ada riwayat dialog</p>
            </div>

            <div
              v-for="(msg, index) in chatHistory.slice(-10).reverse()"
              :key="index"
              class="group relative p-6 rounded-[2rem] border transition-all duration-300"
              :class="msg.role === 'user' 
                ? 'bg-emerald-500/5 border-emerald-500/10 hover:border-emerald-500/30' 
                : 'bg-gray-50 dark:bg-white/5 border-transparent'"
            >
              <div class="flex items-start justify-between mb-3">
                 <span :class="['text-[10px] font-black uppercase tracking-[0.3em]', msg.role === 'user' ? 'text-epanen-primary dark:text-epanen-accent' : 'text-gray-400']">
                   {{ msg.role === 'user' ? 'Pertanyaan Anda' : 'Respon Nella AI' }}
                 </span>
                 <span class="text-[9px] font-black text-gray-400 uppercase">{{ formatTime(msg.created_at) }}</span>
              </div>
              <p :class="['text-sm leading-relaxed font-bold', msg.role === 'user' ? 'text-gray-900 dark:text-emerald-50' : 'text-gray-600 dark:text-gray-400']">
                {{ msg.message }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useThemeStore } from '../../stores/theme';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';

const authStore = useAuthStore();
const themeStore = useThemeStore();
const toast = useToast();
const API_BASE = import.meta.env.VITE_API_BASE || '/api';

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
  const token = localStorage.getItem('epanen_token');
  if (!token) return;

  profile.value = {
    name: user.value?.name || '',
    email: user.value?.email || '',
    phone: user.value?.phone || ''
  };

  try {
    const [chatRes, discRes] = await Promise.all([
      axios.get(`${API_BASE}/chat/history`, {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get(`${API_BASE}/discussions/me/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    ]);

    chatHistory.value = chatRes.data.data.messages || [];
    stats.value.questions = chatHistory.value.filter(m => m.role === 'user').length;
    stats.value.discussions = discRes.data.data.discussion_count || 0;
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
      summary: 'Profil Diperbarui',
      detail: 'Data identitas Anda telah berhasil disimpan.',
      life: 3000
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Update Gagal',
      detail: error.response?.data?.message || 'Gagal sinkronisasi data ke server.',
      life: 3000
    });
  } finally {
    updating.value = false;
  }
};

const clearHistory = async () => {
  const token = localStorage.getItem('epanen_token');
  if (!token || !confirm('Hapus semua riwayat interaksi AI? Tindakan ini permanen.')) return;

  try {
    await axios.delete(`${API_BASE}/chat/history`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    chatHistory.value = [];
    stats.value.questions = 0;

    toast.add({
      severity: 'success',
      summary: 'Log Dibersihkan',
      detail: 'Seluruh riwayat obrolan Anda telah dihapus.',
      life: 3000
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Aksi Gagal',
      detail: 'Gagal menghapus log riwayat.',
      life: 3000
    });
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return 'Status Tidak Diketahui';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
};

const formatTime = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Re-sync local profile state when authStore user updates
watch(user, (newUser) => {
  if (newUser) {
    profile.value.name = newUser.name || '';
    profile.value.phone = newUser.phone || '';
    profile.value.email = newUser.email || '';
  }
}, { immediate: true });

onMounted(() => {
  loadProfileData();
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #2D5A2720;
  border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #A8D5A220;
}

:global(.dark) .text-muted {
  color: #9CA3AF !important;
}
</style>
