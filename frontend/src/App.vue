<template>
  <router-view />
  <Toast />
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import { useThemeStore } from './stores/theme';

const authStore = useAuthStore();
const themeStore = useThemeStore();

onMounted(() => {
  // Check for stored token
  authStore.checkAuth();
  // Initialize theme
  themeStore.initTheme();
});
</script>
