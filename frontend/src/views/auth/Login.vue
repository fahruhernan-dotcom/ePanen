<template>
  <div class="min-h-screen bg-gradient-to-br from-epanen-primary via-epanen-secondary to-epanen-primary flex items-center justify-center px-4 relative overflow-hidden">
    <!-- Decorative farm pattern -->
    <div class="absolute inset-0 opacity-10">
      <svg class="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <!-- Rice field waves -->
        <path d="M0,200 Q150,180 300,200 T600,200 T900,200 T1200,200 V800 H0 Z" fill="currentColor"/>
        <path d="M0,240 Q150,220 300,240 T600,240 T900,240 T1200,240 V800 H0 Z" fill="currentColor" opacity="0.5"/>
        <path d="M0,280 Q150,260 300,280 T600,280 T900,280 T1200,280 V800 H0 Z" fill="currentColor" opacity="0.3"/>
        <!-- Wheat patterns -->
        <g fill="currentColor">
          <circle cx="100" cy="150" r="8"/>
          <circle cx="250" cy="120" r="6"/>
          <circle cx="400" cy="140" r="7"/>
          <circle cx="550" cy="130" r="5"/>
          <circle cx="700" cy="145" r="8"/>
          <circle cx="850" cy="125" r="6"/>
          <circle cx="1000" cy="135" r="7"/>
          <circle cx="1100" cy="145" r="5"/>
        </g>
      </svg>
    </div>

    <!-- Back Button -->
    <div class="absolute top-6 left-6 z-10">
      <router-link
        to="/"
        class="inline-flex items-center text-white hover:text-epanen-accent transition-colors bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-opacity-30 shadow-lg"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Beranda
      </router-link>
    </div>

    <!-- Success/Error Notification Toast -->
    <transition name="toast">
      <div v-if="notification" class="fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] w-[90%] max-w-sm">
        <div 
          :class="[
            'px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-4 backdrop-blur-xl border border-white border-opacity-30 transition-all duration-300',
            notification.type === 'success' ? 'bg-white bg-opacity-90' : 'bg-red-500 bg-opacity-95'
          ]"
        >
          <div 
            :class="[
              'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
              notification.type === 'success' ? 'bg-epanen-light text-epanen-primary' : 'bg-white bg-opacity-20 text-white'
            ]"
          >
            <svg v-if="notification.type === 'success'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="flex-1">
            <h3 :class="['font-black text-sm uppercase tracking-widest', notification.type === 'success' ? 'text-epanen-primary' : 'text-white']">
              {{ notification.type === 'success' ? 'Berhasil' : 'Gagal' }}
            </h3>
            <p :class="['text-xs font-bold leading-tight mt-0.5', notification.type === 'success' ? 'text-gray-600' : 'text-red-50']">
              {{ notification.message }}
            </p>
          </div>
        </div>
      </div>
    </transition>

    <div class="max-w-md w-full relative z-10">
      <!-- Logo Section with Animation -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-2xl mb-4 transform hover:scale-105 transition-transform overflow-hidden">
          <img src="@/assets/images/logo.png" alt="ePanen Logo" class="w-full h-full object-contain p-3" />
        </div>
        <h1 class="text-3xl font-bold text-white mb-1">ePanen</h1>
        <p class="text-sm text-epanen-accent font-medium">Solusi Tani Cerdas</p>
        <p class="text-xs text-white text-opacity-80 mt-1 italic">"Yakin Kita Bisa"</p>
      </div>

      <!-- Login Card with Glass Effect -->
      <div class="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white border-opacity-30">
        <div class="p-6 md:p-8">
          <div class="flex items-center space-x-4 mb-10 group cursor-pointer" @click="router.push('/')">
            <div class="w-14 h-14 bg-gradient-to-br from-epanen-primary to-epanen-secondary rounded-[1.25rem] flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(45,90,39,0.4)] overflow-hidden group-hover:scale-110 transition-transform duration-500">
              <img src="@/assets/images/logo.png" alt="ePanen Logo" class="w-full h-full object-contain p-2" />
            </div>
            <div>
              <h1 class="text-2xl font-black text-gray-900 tracking-tighter leading-none">ePanen</h1>
              <p class="text-[10px] font-black text-epanen-primary uppercase tracking-[0.3em] mt-1 opacity-60">Digital Modern</p>
            </div>
          </div>
          <form @submit.prevent="handleLogin" class="space-y-5">
            <!-- Email Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </span>
              </label>
              <div class="relative">
                <input
                  v-model="email"
                  type="email"
                  placeholder="nama@email.com"
                  class="w-full px-4 py-3 pl-11 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-epanen-primary focus:border-epanen-primary transition-all text-sm"
                  required
                />
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <!-- Password Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Password
                </span>
              </label>
              <div class="relative">
                <input
                  v-model="password"
                  type="password"
                  placeholder="Masukkan password"
                  class="w-full px-4 py-3 pl-11 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-epanen-primary focus:border-epanen-primary transition-all text-sm"
                  required
                />
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            <!-- Login Button -->
            <button
              type="submit"
              :disabled="authStore.loading"
              class="w-full bg-gradient-to-r from-epanen-primary to-epanen-secondary text-white py-3.5 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 font-medium text-sm transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
            >
              <span v-if="!authStore.loading" class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Masuk
              </span>
              <span v-else class="flex items-center">
                <svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memuat...
              </span>
            </button>
          </form>

          <!-- Register Link -->
          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Belum punya akun?
              <router-link to="/register" class="text-epanen-primary hover:text-epanen-secondary font-bold ml-1 inline-flex items-center">
                Daftar Sekarang
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </router-link>
            </p>
          </div>

          <!-- Feature Highlights -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <div class="grid grid-cols-3 gap-3 text-center">
              <div class="bg-green-50 rounded-lg p-3">
                <svg class="w-6 h-6 mx-auto mb-1 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p class="text-xs font-medium text-gray-700">Nala AI 24/7</p>
              </div>
              <div class="bg-amber-50 rounded-lg p-3">
                <svg class="w-6 h-6 mx-auto mb-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-xs font-medium text-gray-700">Harga Pasar</p>
              </div>
              <div class="bg-blue-50 rounded-lg p-3">
                <svg class="w-6 h-6 mx-auto mb-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p class="text-xs font-medium text-gray-700">Komunitas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Tagline -->
      <p class="text-center text-white text-opacity-80 text-sm mt-6 flex items-center justify-center">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        Solusi Tani Cerdas untuk Indonesia
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const notification = ref(null);

const showNotification = (message, type = 'success') => {
  notification.value = { message, type };
  setTimeout(() => {
    notification.value = null;
  }, 4000);
};

const handleLogin = async () => {
  const result = await authStore.login({
    email: email.value,
    password: password.value
  });

  if (result.success) {
    showNotification('Halo Petani! Login berhasil, mengalihkan...', 'success');
    
    // Smooth delay for user to read the success message
    setTimeout(() => {
      if (authStore.isAdmin()) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }, 1500);
  } else {
    showNotification(result.message || 'Email atau password salah. Silakan coba lagi.', 'error');
  }
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, -20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
