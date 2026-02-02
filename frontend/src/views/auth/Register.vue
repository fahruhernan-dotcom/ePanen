<template>
  <div class="min-h-screen bg-epanen-light flex items-center justify-center px-4 py-8">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-epanen-primary mb-2">ePanen</h1>
        <p class="text-epanen-secondary">Platform untuk Petani Indonesia</p>
        <p class="text-sm text-gray-600 mt-2">"Yakin Kita Bisa"</p>
      </div>

      <!-- Simple card without PrimeVue components -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-semibold text-center mb-6">Daftar Akun</h2>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
            <input
              v-model="name"
              type="text"
              placeholder="Masukkan nama lengkap"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="email@contoh.com"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">No. Telepon (Opsional)</label>
            <input
              v-model="phone"
              type="tel"
              placeholder="08xxxxxxxxxx"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="Minimal 6 karakter"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-epanen-primary focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full bg-epanen-primary text-white py-2 rounded-lg hover:bg-epanen-secondary transition-colors disabled:opacity-50"
          >
            {{ authStore.loading ? 'Memuat...' : 'Daftar' }}
          </button>

          <div class="text-center mt-4">
            <p class="text-gray-600">
              Sudah punya akun?
              <router-link to="/login" class="text-epanen-secondary hover:underline font-medium">
                Masuk
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');

const handleRegister = async () => {
  const result = await authStore.register({
    name: name.value,
    email: email.value,
    phone: phone.value || null,
    password: password.value
  });

  if (result.success) {
    toast.add({
      severity: 'success',
      summary: 'Berhasil',
      detail: 'Registrasi berhasil',
      life: 3000
    });
    router.push('/');
  } else {
    toast.add({
      severity: 'error',
      summary: 'Gagal',
      detail: result.message,
      life: 3000
    });
  }
};
</script>
