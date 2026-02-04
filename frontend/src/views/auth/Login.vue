<template>
  <div class="min-h-screen bg-gradient-to-br from-epanen-primary via-epanen-secondary to-epanen-primary flex items-center justify-center px-4 relative overflow-hidden">
    <!-- Decorative farm pattern -->
    <div class="absolute inset-0 opacity-10">
      <svg class="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <path d="M0,200 Q150,180 300,200 T600,200 T900,200 T1200,200 V800 H0 Z" fill="currentColor"/>
        <path d="M0,240 Q150,220 300,240 T600,240 T900,240 T1200,240 V800 H0 Z" fill="currentColor" opacity="0.5"/>
        <path d="M0,280 Q150,260 300,280 T600,280 T900,280 T1200,280 V800 H0 Z" fill="currentColor" opacity="0.3"/>
        <g fill="currentColor">
          <circle cx="100" cy="150" r="8"/><circle cx="250" cy="120" r="6"/><circle cx="400" cy="140" r="7"/>
          <circle cx="550" cy="130" r="5"/><circle cx="700" cy="145" r="8"/><circle cx="850" cy="125" r="6"/>
        </g>
      </svg>
    </div>

    <!-- Back Button -->
    <div class="absolute top-6 left-6 z-10">
      <router-link to="/" class="inline-flex items-center text-white hover:text-epanen-accent transition-colors bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        Beranda
      </router-link>
    </div>

    <!-- Notification Toast -->
    <transition name="toast">
      <div v-if="notification" class="fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] w-[90%] max-w-sm">
        <div :class="['px-6 py-4 rounded-3xl shadow-2xl flex items-center space-x-4 backdrop-blur-xl border border-white/30 transition-all', notification.type === 'success' ? 'bg-white/90 text-epanen-primary' : 'bg-red-500/95 text-white']">
          <div :class="['w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0', notification.type === 'success' ? 'bg-epanen-light' : 'bg-white/20']">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="notification.type === 'success'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="font-black text-[10px] uppercase tracking-widest">{{ notification.type === 'success' ? 'Berhasil' : 'Gagal' }}</h3>
            <p class="text-xs font-bold leading-tight mt-0.5">{{ notification.message }}</p>
          </div>
        </div>
      </div>
    </transition>

    <div class="max-w-md w-full relative z-10">
      <!-- Logo Section -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-24 h-24 bg-white rounded-[2.5rem] shadow-2xl mb-6 transform hover:scale-110 transition-all duration-700 overflow-hidden group">
          <img src="@/assets/images/logo.png" alt="ePanen" class="w-full h-full object-contain p-4 group-hover:rotate-12 transition-transform" />
        </div>
        <h1 class="text-4xl font-black text-white tracking-tighter mb-1">Nala Office</h1>
        <p class="text-[11px] text-epanen-accent font-black uppercase tracking-[0.4em]">Integrated Farm Meta</p>
      </div>

      <!-- Auth Card -->
      <div class="bg-white/95 backdrop-blur-2xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/40 p-1">
        <div class="p-8 md:p-10">
          
          <!-- STEP 1: LOGIN MODE SELECTION -->
          <div v-if="step === 'choice'" class="space-y-6">
            <h2 class="text-2xl font-black text-gray-800 tracking-tight text-center mb-8">Pilih Metode Masuk</h2>
            
            <button @click="step = 'wa'" class="w-full group bg-green-500 hover:bg-green-600 p-5 rounded-3xl flex items-center justify-between transition-all shadow-lg shadow-green-100 hover:-translate-y-1">
              <div class="flex items-center gap-4 text-white">
                <div class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 2.73 1.984 5.001 4.6 5.591l.369.083.003.002.502 1.374 1.157-1.157.051-.051.458.054c2.16.255 4.31-.63 5.498-2.316 1.188-1.686 1.188-3.922 0-5.608-1.188-1.686-3.338-2.571-5.498-2.316l-.458.054-.051-.051-1.157-1.157-.502 1.374-.003.002-.369.083c-2.616.59-4.601 2.861-4.6 5.591 0 3.18 2.587 5.766 5.768 5.766 2.227 0 4.192-1.251 5.127-3.116.936-1.865.636-4.131-.762-5.608L12.031 6.172z"/></svg>
                </div>
                <div class="text-left">
                  <p class="text-sm font-black uppercase tracking-widest">WhatsApp Auth</p>
                  <p class="text-[10px] text-white/70 font-bold">Akses Aman & Terproteksi</p>
                </div>
              </div>
              <svg class="w-6 h-6 text-white/50 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </button>

            <button @click="step = 'email'" class="w-full group bg-gray-50 hover:bg-white p-5 rounded-3xl flex items-center justify-between transition-all border border-gray-100 hover:shadow-xl hover:-translate-y-1">
              <div class="flex items-center gap-4 text-gray-800">
                <div class="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div class="text-left">
                  <p class="text-sm font-black uppercase tracking-widest">Email & Password</p>
                  <p class="text-[10px] text-gray-400 font-bold">Metode Konvensional</p>
                </div>
              </div>
              <svg class="w-6 h-6 text-gray-200 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          <!-- STEP 2: WHATSAPP INPUT / PASSWORD -->
          <form v-if="step === 'wa'" @submit.prevent="requiresPassword ? handlePhonePasswordLogin() : handleWhatsAppLogin()" class="space-y-6">
            <button @click="resetWA" type="button" class="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1 hover:text-gray-600 transition-colors">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg> Kembali
            </button>
            <h2 class="text-2xl font-black text-gray-800 tracking-tight">{{ requiresPassword ? 'Konfirmasi Password' : 'Login WhatsApp' }}</h2>
            <p class="text-xs text-gray-500 font-bold leading-relaxed">
              {{ requiresPassword ? 'Nomor ditemukan! Masukkan password akun Anda untuk melanjutkan.' : 'Masukkan nomor WhatsApp yang terdaftar di ePanen/Nala Office.' }}
            </p>
            
            <div class="space-y-4">
              <div class="relative group">
                <input v-model="phone" :disabled="requiresPassword" type="tel" placeholder="0821xxxxxxxx" class="w-full px-6 py-5 pl-16 bg-gray-50 border-none rounded-3xl focus:ring-2 focus:ring-green-500 font-bold text-sm transition-all outline-none disabled:opacity-70" required />
                <svg class="w-6 h-6 text-green-500 absolute left-6 top-1/2 -translate-y-1/2 group-focus-within:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 2.73 1.984 5.001 4.6 5.591l.369.083.003.002.502 1.374 1.157-1.157.051-.051.458.054c2.16.255 4.31-.63 5.498-2.316 1.188-1.686 1.188-3.922 0-5.608-1.188-1.686-3.338-2.571-5.498-2.316l-.458.054-.051-.051-1.157-1.157-.502 1.374-.003.002-.369.083c-2.616.59-4.601 2.861-4.6 5.591 0 3.18 2.587 5.766 5.768 5.766 2.227 0 4.192-1.251 5.127-3.116.936-1.865.636-4.131-.762-5.608L12.031 6.172z"/></svg>
              </div>

              <div v-if="requiresPassword" class="relative group animate-fade-in">
                <input v-model="password" type="password" placeholder="Password Anda" class="w-full px-6 py-5 pl-16 bg-gray-50 border-none rounded-3xl focus:ring-2 focus:ring-epanen-primary font-bold text-sm transition-all outline-none" required autoFocus />
                <svg class="w-6 h-6 text-epanen-primary absolute left-6 top-1/2 -translate-y-1/2 group-focus-within:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
            </div>

            <button :disabled="loading" class="w-full bg-green-500 text-white py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-green-100/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
              <span v-if="!loading">{{ requiresPassword ? 'Masuk Sekarang' : 'Verifikasi Nomor' }}</span>
              <span v-else class="flex items-center justify-center gap-2">
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> 
                {{ requiresPassword ? 'Memproses...' : 'Mencari Akun...' }}
              </span>
            </button>
          </form>

          <!-- STEP 3: COMPLETE PROFILE (Still kept for legacy support if needed) -->
          <form v-if="step === 'complete'" @submit.prevent="handleCompleteProfile" class="space-y-6">
            <h2 class="text-2xl font-black text-gray-800 tracking-tight">Hampir Selesai!</h2>
            <p class="text-xs text-gray-500 font-bold leading-relaxed">Nomor ditemukan, silakan masukkan alamat email yang valid untuk mengamankan akun Anda.</p>
            
            <div class="space-y-4">
              <div class="relative">
                <input v-model="email" type="email" placeholder="contoh@gmail.com" class="w-full px-6 py-4 pl-14 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary font-bold text-sm transition-all shadow-inner" required />
                <svg class="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div class="relative">
                <input v-model="password" type="password" placeholder="Buat Password Baru" class="w-full px-6 py-4 pl-14 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary font-bold text-sm transition-all shadow-inner" required />
                <svg class="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
            </div>

            <button :disabled="loading" class="w-full bg-epanen-primary text-white py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-epanen-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
              <span v-if="!loading">Selesaikan Pendaftaran</span>
              <span v-else>Memproses...</span>
            </button>
          </form>

          <!-- CONVENTIONAL EMAIL LOGIN -->
          <form v-if="step === 'email'" @submit.prevent="handleLogin" class="space-y-6">
            <button @click="step = 'choice'" type="button" class="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1 hover:text-gray-600 transition-colors">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg> Kembali
            </button>
            <h2 class="text-2xl font-black text-gray-800 tracking-tight">Login Email</h2>
            
            <div class="space-y-4">
              <input v-model="email" type="email" placeholder="Email Anda" class="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary font-bold text-sm transition-all shadow-inner" required />
              <input v-model="password" type="password" placeholder="Password" class="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary font-bold text-sm transition-all shadow-inner" required />
            </div>

            <button :disabled="loading" class="w-full bg-epanen-primary text-white py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-epanen-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Masuk Sekarang
            </button>
          </form>

          <!-- Register Link -->
          <div v-if="step !== 'complete'" class="mt-8 text-center">
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Belum punya akun?
              <router-link :to="{ path: '/register', query: { phone: phone } }" class="text-epanen-primary hover:text-epanen-secondary transition-colors underline decoration-2 underline-offset-4 ml-1">
                Daftar Sekarang
              </router-link>
            </p>
          </div>

        </div>
      </div>
      
      <!-- Footer Info -->
      <div class="mt-8 flex items-center justify-center gap-6">
        <div class="flex flex-col items-center">
          <p class="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Nala Suite</p>
          <p class="text-[9px] font-bold text-white/20 italic">"Yakin Kita Bisa"</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

const router = useRouter();
const authStore = useAuthStore();
const API_BASE = import.meta.env.VITE_API_BASE || '/api';

const step = ref('choice'); // choice, wa, complete, email
const loading = ref(false);
const email = ref('');
const password = ref('');
const phone = ref('');
const userId = ref(null);
const notification = ref(null);
const requiresPassword = ref(false);

const showNotification = (message, type = 'success') => {
  notification.value = { message, type };
  setTimeout(() => notification.value = null, 4000);
};

const resetWA = () => {
  step.value = 'choice';
  requiresPassword.value = false;
  password.value = '';
};

const handleWhatsAppLogin = async () => {
  loading.value = true;
  try {
    const res = await axios.post(`${API_BASE}/auth/whatsapp-login`, { phone: phone.value });
    
    if (res.data.requires_password) {
      requiresPassword.value = true;
      showNotification(res.data.message);
    } 
  } catch (error) {
    if (error.response?.status === 404) {
      showNotification('Nomor belum terdaftar. Mengalihkan ke halaman pendaftaran...', 'error');
      setTimeout(() => router.push({ path: '/register', query: { phone: phone.value } }), 2000);
    } else {
      showNotification(error.response?.data?.message || 'Terjadi kesalahan sistem', 'error');
    }
  } finally {
    loading.value = false;
  }
};

const handlePhonePasswordLogin = async () => {
  loading.value = true;
  try {
    const res = await axios.post(`${API_BASE}/auth/login`, {
      phone: phone.value,
      password: password.value
    });
    
    if (res.data.success) {
      authStore.setAuth(res.data.data.user, res.data.data.token);
      showNotification('Login Berhasil!', 'success');
      setTimeout(() => router.push(authStore.isAdmin() ? '/admin' : '/'), 1500);
    }
  } catch (error) {
    showNotification(error.response?.data?.message || 'Password salah atau terjadi kesalahan', 'error');
  } finally {
    loading.value = false;
  }
};

const handleCompleteProfile = async () => {
  // Manual Validation for Email
  if (!email.value.includes('@')) {
    showNotification('Email harus valid (mengandung @)', 'error');
    return;
  }

  loading.value = true;
  try {
    const res = await axios.post(`${API_BASE}/auth/whatsapp-complete`, {
      user_id: userId.value,
      email: email.value,
      password: password.value
    });
    
    if (res.data.success) {
      authStore.setAuth(res.data.data.user, res.data.data.token);
      showNotification('Profil Berhasil Dilengkapi!', 'success');
      setTimeout(() => router.push('/'), 1500);
    }
  } catch (error) {
    showNotification(error.response?.data?.message || 'Gagal melengkapi profil', 'error');
  } finally {
    loading.value = false;
  }
};

const handleLogin = async () => {
  loading.value = true;
  const result = await authStore.login({
    email: email.value,
    password: password.value
  });
  loading.value = false;

  if (result.success) {
    showNotification('Login berhasil!', 'success');
    setTimeout(() => router.push(authStore.isAdmin() ? '/admin' : '/'), 1500);
  } else {
    showNotification(result.message || 'Email atau password salah', 'error');
  }
};
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.toast-enter-from { opacity: 0; transform: translate(-50%, -20px); }
.toast-leave-to { opacity: 0; transform: translate(-50%, 20px); }
.animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
