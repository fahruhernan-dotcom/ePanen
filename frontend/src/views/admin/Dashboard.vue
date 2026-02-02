<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl md:text-3xl font-bold text-epanen-primary">Dashboard</h1>
      <p class="text-gray-600 text-sm md:text-base">Selamat datang di Nala Office - Admin Dashboard</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <!-- Total Users -->
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Total Users</p>
            <p class="text-2xl font-bold text-gray-800">{{ stats.totalUsers || 0 }}</p>
            <p class="text-xs text-green-600 mt-1">
              <span class="font-semibold">+{{ stats.newUsersThisMonth || 0 }}</span> bulan ini
            </p>
          </div>
          <div class="w-11 h-11 bg-blue-50 rounded-lg flex items-center justify-center ml-3">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Questions -->
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Pertanyaan</p>
            <p class="text-2xl font-bold text-gray-800">{{ stats.totalQuestions || 0 }}</p>
            <p class="text-xs text-green-600 mt-1">
              <span class="font-semibold">{{ stats.messagesThisWeek || 0 }}</span> minggu ini
            </p>
          </div>
          <div class="w-11 h-11 bg-green-50 rounded-lg flex items-center justify-center ml-3">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Articles -->
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Artikel</p>
            <p class="text-2xl font-bold text-gray-800">{{ stats.totalArticles || 0 }}</p>
            <p class="text-xs text-gray-500 mt-1">Published</p>
          </div>
          <div class="w-11 h-11 bg-purple-50 rounded-lg flex items-center justify-center ml-3">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Discussions -->
      <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-gray-500 text-xs uppercase tracking-wide mb-1">Diskusi</p>
            <p class="text-2xl font-bold text-gray-800">{{ stats.totalDiscussions || 0 }}</p>
            <p class="text-xs text-gray-500 mt-1">Total thread</p>
          </div>
          <div class="w-11 h-11 bg-orange-50 rounded-lg flex items-center justify-center ml-3">
            <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- AI Usage Chart -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-semibold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          AI Usage - Kategori
        </h3>
        <div class="space-y-3" v-if="aiUsage.byCategory && aiUsage.byCategory.length > 0">
          <div v-for="cat in aiUsage.byCategory" :key="cat.category" class="flex items-center">
            <span class="w-28 text-sm text-gray-600 capitalize truncate">{{ cat.category || 'Umum' }}</span>
            <div class="flex-1 mx-3">
              <div class="h-7 bg-gray-100 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-epanen-primary to-epanen-secondary rounded-full transition-all duration-500"
                  :style="{ width: `${(cat.count / maxAiCount) * 100}%` }"
                ></div>
              </div>
            </div>
            <span class="w-10 text-right font-semibold text-gray-700">{{ cat.count }}</span>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 py-10 bg-gray-50 rounded-lg">
          <svg class="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p class="text-sm">Belum ada data AI</p>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-semibold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Aktivitas Terbaru
        </h3>
        <div class="space-y-3 max-h-72 overflow-y-auto">
          <div v-if="recentActivity.length > 0">
            <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start space-x-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
              <div class="w-8 h-8 bg-epanen-light rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-4 h-4 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-800 truncate">{{ activity.action }}</p>
                <p class="text-xs text-gray-500 mt-0.5">{{ activity.user_name || 'System' }} • {{ formatTime(activity.created_at) }}</p>
              </div>
            </div>
          </div>
          <div v-else class="text-center text-gray-500 py-10 bg-gray-50 rounded-lg">
            <svg class="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm">Belum ada aktivitas</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Content -->
    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Top Articles -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-semibold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Artikel Terpopuler
        </h3>
        <div class="space-y-2" v-if="topContent.articles && topContent.articles.length > 0">
          <div v-for="(article, idx) in topContent.articles.slice(0, 5)" :key="article.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div class="flex items-center space-x-3 flex-1 min-w-0">
              <span class="w-6 h-6 bg-epanen-primary text-white text-xs font-bold rounded flex items-center justify-center flex-shrink-0">{{ idx + 1 }}</span>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-sm text-gray-800 truncate">{{ article.title }}</p>
                <p class="text-xs text-gray-500">{{ article.category || 'Umum' }}</p>
              </div>
            </div>
            <span class="ml-3 text-lg font-bold text-epanen-primary">{{ article.views || 0 }}</span>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 py-10 bg-gray-50 rounded-lg">
          <svg class="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-sm">Belum ada artikel</p>
        </div>
      </div>

      <!-- Popular Discussions -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-semibold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Diskusi Populer
        </h3>
        <div class="space-y-2" v-if="topContent.discussions && topContent.discussions.length > 0">
          <div v-for="(discussion, idx) in topContent.discussions.slice(0, 5)" :key="discussion.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div class="flex items-center space-x-3 flex-1 min-w-0">
              <span class="w-6 h-6 bg-epanen-secondary text-white text-xs font-bold rounded flex items-center justify-center flex-shrink-0">{{ idx + 1 }}</span>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-sm text-gray-800 truncate">{{ discussion.title }}</p>
                <p class="text-xs text-gray-500">{{ discussion.replies || 0 }} balasan</p>
              </div>
            </div>
            <span class="ml-3 text-lg font-bold text-epanen-primary">{{ discussion.views || 0 }}</span>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 py-10 bg-gray-50 rounded-lg">
          <svg class="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p class="text-sm">Belum ada diskusi</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';
const token = localStorage.getItem('epanen_token');

const stats = ref({
  totalUsers: 0,
  activeUsers: 0,
  totalQuestions: 0,
  totalArticles: 0,
  totalDiscussions: 0,
  messagesThisWeek: 0,
  newUsersThisMonth: 0
});

const aiUsage = ref({ byCategory: [] });
const recentActivity = ref([]);
const topContent = ref({ articles: [], discussions: [] });

const maxAiCount = computed(() => {
  if (!aiUsage.value.byCategory?.length) return 1;
  return Math.max(...aiUsage.value.byCategory.map(c => c.count || 0));
});

const loadDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_BASE}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = response.data.data;
    stats.value = data.overview || {};
    aiUsage.value = data.aiUsage || { byCategory: [] };
    recentActivity.value = data.recentActivity || [];
    topContent.value = data.topContent || { articles: [], discussions: [] };
  } catch (error) {
    console.error('Failed to load dashboard stats:', error);
    // Set default values on error
    stats.value = {
      totalUsers: 0,
      totalQuestions: 0,
      totalArticles: 0,
      totalDiscussions: 0,
      messagesThisWeek: 0,
      newUsersThisMonth: 0
    };
  }
};

const formatTime = (dateStr) => {
  if (!dateStr) return 'Unknown';
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now - date;

  if (isNaN(diff)) return 'Unknown';

  if (diff < 60000) return 'Baru saja';
  if (diff < 3600000) return `${Math.floor(diff / 60000)} menit lalu`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} jam lalu`;
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
};

onMounted(() => {
  loadDashboardStats();
});
</script>
