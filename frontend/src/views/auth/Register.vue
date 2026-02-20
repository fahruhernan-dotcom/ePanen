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
      <router-link to="/" class="inline-flex items-center text-white hover:text-epanen-accent transition-colors bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg font-black text-xs uppercase tracking-widest">
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

    <div class="max-w-md w-full relative z-10 py-10">
      <!-- Logo Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-[2rem] shadow-2xl mb-4 transform hover:scale-110 transition-all duration-700 overflow-hidden group">
          <img src="@/assets/images/logo.png" alt="ePanen" class="w-full h-full object-contain p-3 group-hover:rotate-12 transition-transform" />
        </div>
        <h1 class="text-3xl font-black text-white tracking-tighter mb-1">Daftar Akun</h1>
        <p class="text-[10px] text-epanen-accent font-black uppercase tracking-[0.4em]">Gabung Ekosistem ePanen</p>
      </div>

      <!-- Register Card -->
      <div class="bg-white/95 backdrop-blur-2xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/40 p-1">
        <div class="p-8 md:p-10">
          <form @submit.prevent="handleRegister" class="space-y-5">
            <div>
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Nama Lengkap</label>
              <div class="relative group">
                <input v-model="name" type="text" placeholder="Nama Anda" class="w-full px-6 py-4 pl-14 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary font-bold text-sm transition-all outline-none" required />
                <svg class="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-epanen-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Email</label>
              <div class="relative group">
                <input v-model="email" type="email" placeholder="nama@email.com" class="w-full px-6 py-4 pl-14 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary font-bold text-sm transition-all outline-none" required />
                <svg class="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-epanen-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">WhatsApp (Opsional)</label>
              <div class="relative group">
                <input v-model="phone" type="tel" placeholder="0821xxxxxxxx" class="w-full px-6 py-4 pl-14 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary font-bold text-sm transition-all outline-none" />
                <svg class="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-epanen-primary transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 2.73 1.984 5.001 4.6 5.591l.369.083.003.002.502 1.374 1.157-1.157.051-.051.458.054c2.16.255 4.31-.63 5.498-2.316 1.188-1.686 1.188-3.922 0-5.608-1.188-1.686-3.338-2.571-5.498-2.316l-.458.054-.051-.051-1.157-1.157-.502 1.374-.003.002-.369.083c-2.616.59-4.601 2.861-4.6 5.591 0 3.18 2.587 5.766 5.768 5.766 2.227 0 4.192-1.251 5.127-3.116.936-1.865.636-4.131-.762-5.608L12.031 6.172z"/></svg>
              </div>
            </div>

            <!-- Password -->
            <div>
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Password</label>
              <div class="relative group">
                <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Minimal 6 karakter" class="w-full px-6 py-4 pl-14 pr-14 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary font-bold text-sm transition-all outline-none" required />
                <svg class="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-epanen-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <button type="button" @click="showPassword = !showPassword" class="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-epanen-primary transition-colors focus:outline-none">
                  <!-- Eye open (password hidden) -->
                  <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <!-- Eye closed (password visible) -->
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                </button>
              </div>
            </div>

            <!-- Konfirmasi Password -->
            <div>
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Konfirmasi Password</label>
              <div class="relative group">
                <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" placeholder="Ulangi password Anda" class="w-full px-6 py-4 pl-14 pr-14 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary font-bold text-sm transition-all outline-none" :class="{ 'ring-2 ring-red-400 focus:ring-red-400': confirmPassword && !passwordsMatch }" required />
                <svg class="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-epanen-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-epanen-primary transition-colors focus:outline-none">
                  <svg v-if="!showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                </button>
              </div>
              <!-- Password mismatch error -->
              <transition name="fade">
                <p v-if="confirmPassword && !passwordsMatch" class="text-red-500 text-xs font-bold mt-2 ml-2 flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  Password tidak cocok
                </p>
              </transition>
              <!-- Password match success -->
              <transition name="fade">
                <p v-if="confirmPassword && passwordsMatch" class="text-green-500 text-xs font-bold mt-2 ml-2 flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
                  Password cocok
                </p>
              </transition>
            </div>

            <button :disabled="authStore.loading || !passwordsMatch || !confirmPassword" class="w-full bg-gradient-to-r from-epanen-primary to-epanen-secondary text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-epanen-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-4">
              <span v-if="!authStore.loading">Daftar Sekarang</span>
              <span v-else class="flex items-center justify-center gap-2">
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Memproses...
              </span>
            </button>
          </form>

          <div class="mt-8 text-center">
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Sudah punya akun?
              <router-link to="/login" class="text-epanen-primary hover:text-epanen-secondary transition-colors underline decoration-2 underline-offset-4 ml-1">
                Masuk Disini
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');
const notification = ref(null);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const passwordsMatch = computed(() => password.value === confirmPassword.value);

onMounted(() => {
  if (route.query.phone) {
    phone.value = route.query.phone;
  }
});

const showNotification = (message, type = 'success') => {
  notification.value = { message, type };
  setTimeout(() => notification.value = null, 4000);
};

const handleRegister = async () => {
  if (!passwordsMatch.value) {
    showNotification('Password dan konfirmasi password tidak cocok', 'error');
    return;
  }

  // Strict Email Validation
  if (!email.value.includes('@')) {
    showNotification('Alamat email harus valid (mengandung @)', 'error');
    return;
  }

  const result = await authStore.register({
    name: name.value,
    email: email.value,
    phone: phone.value || null,
    password: password.value
  });

  if (result.success) {
    showNotification('Akun berhasil dibuat! Mengalihkan...', 'success');
    setTimeout(() => router.push('/'), 1500);
  } else {
    showNotification(result.message || 'Gagal mendaftar. Silakan cek data Anda.', 'error');
  }
};
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.toast-enter-from { opacity: 0; transform: translate(-50%, -20px); }
.toast-leave-to { opacity: 0; transform: translate(-50%, 20px); }
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
