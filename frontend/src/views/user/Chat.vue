<template>
  <div class="h-screen flex flex-col bg-gradient-to-b from-green-50 via-emerald-50 to-amber-50">
    <!-- Agricultural Themed Header -->
    <div class="bg-gradient-to-r from-epanen-primary via-epanen-secondary to-epanen-primary text-white shadow-lg relative overflow-hidden">
      <!-- Decorative farm pattern -->
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" viewBox="0 0 1200 80" preserveAspectRatio="none">
          <!-- Rice field waves -->
          <path d="M0,40 Q150,20 300,40 T600,40 T900,40 T1200,40 V80 H0 Z" fill="currentColor"/>
          <path d="M0,50 Q150,30 300,50 T600,50 T900,50 T1200,50 V80 H0 Z" fill="currentColor" opacity="0.5"/>
          <!-- Wheat dots -->
          <g fill="currentColor">
            <circle cx="100" cy="25" r="4"/>
            <circle cx="300" cy="20" r="5"/>
            <circle cx="500" cy="28" r="4"/>
            <circle cx="700" cy="22" r="5"/>
            <circle cx="900" cy="26" r="4"/>
            <circle cx="1100" cy="24" r="5"/>
          </g>
        </svg>
      </div>

      <div class="relative px-4 md:px-6 py-3 md:py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2 md:space-x-3">
            <router-link to="/" class="flex items-center space-x-2 md:space-x-3 group">
              <div class="relative">
                <div class="w-10 h-10 md:w-12 md:h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-opacity-30 transition-all shadow-lg">
                  <svg class="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <!-- Small wheat decoration -->
                <div class="absolute -top-1 -right-1 w-4 h-4 bg-epanen-accent rounded-full flex items-center justify-center shadow-md">
                  <svg class="w-2.5 h-2.5 text-epanen-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8 6 4 10 4 14c0 4 3.5 8 8 8s8-4 8-8c0-4-4-8-8-12z"/>
                  </svg>
                </div>
              </div>
              <div>
                <h1 class="text-base md:text-lg font-bold">Nella AI</h1>
                <p class="text-[10px] md:text-xs text-epanen-accent hidden sm:block">Asisten Pertanian Cerdas</p>
              </div>
            </router-link>
          </div>

          <div class="flex items-center space-x-1 md:space-x-2">
            <router-link
              to="/"
              class="text-xs md:text-sm text-white hover:text-epanen-accent px-2 md:px-3 py-1.5 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all flex items-center"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span class="hidden sm:inline">Beranda</span>
            </router-link>
            <button
              @click="clearChat"
              class="text-xs md:text-sm text-white hover:text-epanen-accent px-2 md:px-3 py-1.5 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all flex items-center"
            >
              <svg class="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <svg class="w-4 h-4 hidden sm:block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span class="hidden sm:inline">Chat Baru</span>
            </button>
            <router-link
              v-if="!isAuthenticated"
              to="/login"
              class="text-xs md:text-sm bg-white text-epanen-primary px-3 md:px-4 py-1.5 rounded-xl hover:bg-gray-100 transition-all font-bold shadow-md hover:shadow-lg"
            >
              Masuk
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Area -->
    <div class="flex-1 overflow-hidden flex">
      <div class="flex-1 flex flex-col">
        <!-- Messages -->
        <div ref="messagesContainer" class="flex-1 overflow-y-auto">
          <div class="max-w-4xl mx-auto px-3 md:px-4 py-4 md:py-6">
            <!-- Welcome / Quick Questions -->
            <div v-if="messages.length === 0 && !isLoading" class="text-center py-8 md:py-12">
              <!-- AI Avatar with Agricultural Theme -->
              <div class="mb-6 md:mb-8">
                <div class="relative inline-block">
                  <div class="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-epanen-primary to-epanen-secondary rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-2xl relative overflow-hidden">
                    <!-- Decorative pattern -->
                    <div class="absolute inset-0 opacity-20">
                      <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <circle cx="20" cy="20" r="15" fill="currentColor"/>
                        <circle cx="80" cy="20" r="12" fill="currentColor"/>
                        <circle cx="50" cy="80" r="18" fill="currentColor"/>
                        <path d="M10,50 Q50,30 90,50" stroke="currentColor" stroke-width="3" fill="none"/>
                      </svg>
                    </div>
                    <svg class="w-10 h-10 md:w-12 md:h-12 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.3"/>
                    </svg>
                  </div>
                  <!-- Status indicator -->
                  <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-md flex items-center justify-center">
                    <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>

                <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Halo! Saya Nella 🌾</h2>
                <p class="text-sm md:text-base text-gray-600 mb-4">Ada yang bisa saya bantu hari ini? Tanya apa saja tentang pertanian!</p>
                <p v-if="!isAuthenticated" class="text-xs md:text-sm text-epanen-primary mt-2 font-medium inline-flex items-center px-4 py-2 bg-green-50 rounded-xl border border-green-200">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  {{ GUEST_MESSAGE_LIMIT - guestMessageCount }} pertanyaan gratis tersedia
                </p>
              </div>

              <!-- Quick Questions with Agricultural Theme -->
              <div class="text-left max-w-2xl mx-auto">
                <p class="text-xs md:text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <svg class="w-4 h-4 md:w-5 md:h-5 mr-1 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Pertanyaan Populer:
                </p>
                <div class="grid grid-cols-1 gap-2 md:gap-3">
                  <button
                    v-for="(q, i) in quickQuestions"
                    :key="i"
                    @click="sendQuickQuestion(q.text)"
                    :disabled="!isAuthenticated && guestMessageCount >= GUEST_MESSAGE_LIMIT"
                    class="group text-left px-4 md:px-5 py-3 md:py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-epanen-primary hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    <!-- Hover background gradient -->
                    <div class="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="relative flex items-center space-x-3">
                      <span class="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-epanen-light to-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                        <svg class="w-4 h-4 md:w-5 md:h-5 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </span>
                      <span class="text-xs md:text-sm font-semibold text-gray-700 group-hover:text-gray-900 flex-1">{{ q.label }}</span>
                      <svg class="w-5 h-5 text-gray-400 group-hover:text-epanen-primary group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <!-- Messages List -->
            <div v-else class="space-y-4 md:space-y-6">
              <!-- Guest Limit Warning -->
              <div
                v-if="!isAuthenticated && guestMessageCount >= GUEST_MESSAGE_LIMIT"
                class="bg-gradient-to-r from-epanen-primary to-epanen-secondary rounded-2xl p-5 md:p-7 text-white shadow-xl relative overflow-hidden"
              >
                <!-- Decorative pattern -->
                <div class="absolute inset-0 opacity-10">
                  <svg class="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    <path d="M0,100 Q100,60 200,100 T400,100 V200 H0 Z" fill="currentColor"/>
                    <circle cx="50" cy="80" r="30" fill="currentColor" opacity="0.5"/>
                    <circle cx="350" cy="60" r="25" fill="currentColor" opacity="0.5"/>
                  </svg>
                </div>
                <div class="relative flex items-start space-x-3 md:space-x-4">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 md:w-12 md:h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-bold text-base md:text-lg mb-1">Batas Pertanyaan Tercapai</h3>
                    <p class="text-xs md:text-sm opacity-90 mb-3 md:mb-4">
                      Anda telah menggunakan {{ GUEST_MESSAGE_LIMIT }} pertanyaan gratis. Daftar sekarang untuk chat tanpa batas dengan AI Pakar Pertanian!
                    </p>
                    <div class="flex flex-wrap gap-2">
                      <router-link
                        to="/register"
                        class="inline-flex items-center px-4 md:px-5 py-2 bg-white text-epanen-primary rounded-xl font-bold hover:bg-gray-100 transition-all shadow-md hover:shadow-lg text-sm"
                      >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Daftar Gratis
                      </router-link>
                      <router-link
                        to="/login"
                        class="inline-flex items-center px-4 md:px-5 py-2 bg-epanen-accent text-epanen-primary rounded-xl font-bold hover:bg-opacity-80 transition-all shadow-md text-sm"
                      >
                        Masuk
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-for="(msg, index) in messages"
                :key="index"
                :class="[
                  'flex gap-2 md:gap-4',
                  msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                ]"
              >
                <!-- Avatar -->
                <div
                  :class="[
                    'flex-shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center shadow-md',
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-epanen-primary to-epanen-secondary'
                      : 'bg-white border-2 border-gray-200'
                  ]"
                >
                  <svg v-if="msg.role === 'user'" class="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <svg v-else class="w-5 h-5 md:w-6 md:h-6 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <!-- Message Content -->
                <div
                  :class="[
                    'flex-1 max-w-[85%] md:max-w-[80%]',
                    msg.role === 'user' ? 'text-right' : 'text-left'
                  ]"
                >
                  <div class="mb-1">
                    <span class="text-[10px] md:text-xs font-semibold text-gray-700">
                      {{ msg.role === 'user' ? 'Anda' : 'Nella' }}
                    </span>
                    <span class="text-[10px] md:text-xs text-gray-400 ml-2">{{ formatTime(msg.created_at) }}</span>
                  </div>
                  <div
                    :class="[
                      'px-4 md:px-5 py-3 rounded-2xl text-left shadow-md',
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-epanen-primary to-epanen-secondary text-white rounded-tr-sm'
                        : 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-epanen-accent text-gray-800 rounded-tl-sm'
                    ]"
                  >
                    <div class="text-sm md:text-base leading-relaxed message-content" v-html="renderMarkdown(msg.message)"></div>
                  </div>
                </div>
              </div>

              <!-- Loading Indicator with Farm Theme -->
              <div v-if="isLoading" class="flex gap-2 md:gap-4">
                <div class="flex-shrink-0 w-9 h-9 md:w-11 md:h-11 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-md">
                  <svg class="w-5 h-5 md:w-6 md:h-6 text-epanen-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="flex-1 max-w-[85%] md:max-w-[80%]">
                  <div class="px-4 md:px-5 py-3 md:py-4 bg-white border-2 border-gray-200 rounded-2xl rounded-tl-sm shadow-md inline-block">
                    <div class="flex items-center space-x-2 md:space-x-3">
                      <div class="flex space-x-1">
                        <div class="w-2 h-2 bg-epanen-primary rounded-full animate-bounce shadow-sm" style="animation-delay: 0ms"></div>
                        <div class="w-2 h-2 bg-epanen-secondary rounded-full animate-bounce shadow-sm" style="animation-delay: 150ms"></div>
                        <div class="w-2 h-2 bg-epanen-accent rounded-full animate-bounce shadow-sm" style="animation-delay: 300ms"></div>
                      </div>
                      <span class="text-xs md:text-sm text-gray-600 font-medium">AI sedang berpikir...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area with Agricultural Theme -->
        <div class="border-t-2 border-gray-200 bg-white px-3 md:px-4 py-3 md:py-4 shadow-lg">
          <div class="max-w-4xl mx-auto">
            <!-- Guest Limit Notice -->
            <div
              v-if="!isAuthenticated && guestMessageCount >= GUEST_MESSAGE_LIMIT"
              class="mb-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-epanen-primary rounded-xl text-center"
            >
              <p class="text-xs md:text-sm text-epanen-primary font-bold flex items-center justify-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Daftar sekarang untuk chat tanpa batas dengan AI Pakar Pertanian!
              </p>
            </div>

            <!-- Remaining messages for guest -->
            <div
              v-else-if="!isAuthenticated && guestMessageCount < GUEST_MESSAGE_LIMIT"
              class="mb-3 text-center"
            >
              <p class="text-xs text-gray-500 flex items-center justify-center">
                <svg class="w-4 h-4 mr-1 text-epanen-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {{ GUEST_MESSAGE_LIMIT - guestMessageCount }} pertanyaan gratis tersedia
              </p>
            </div>

            <form @submit.prevent="sendMessage" class="relative">
              <div class="flex items-end space-x-2 md:space-x-3">
                <div class="flex-1 relative">
                  <textarea
                    v-model="newMessage"
                    rows="1"
                    placeholder="Tanya apa saja tentang pertanian... 🌾"
                    class="w-full px-4 py-3 pr-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-epanen-primary focus:border-epanen-primary resize-none text-sm shadow-sm"
                    :disabled="isLoading || (!isAuthenticated && guestMessageCount >= GUEST_MESSAGE_LIMIT)"
                    @keydown.enter.prevent="handleEnter"
                    @input="autoResize"
                    style="max-height: 120px; min-height: 44px;"
                    ref="textarea"
                  ></textarea>
                  <!-- Wheat icon decoration -->
                  <div class="absolute right-3 bottom-3 text-gray-400 pointer-events-none">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8 6 4 10 4 14c0 4 3.5 8 8 8s8-4 8-8c0-4-4-8-8-12z" opacity="0.3"/>
                    </svg>
                  </div>
                </div>
                <button
                  type="submit"
                  :disabled="!newMessage.trim() || isLoading || (!isAuthenticated && guestMessageCount >= GUEST_MESSAGE_LIMIT)"
                  class="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br from-epanen-primary to-epanen-secondary text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-xl transform hover:scale-105"
                >
                  <svg v-if="!isLoading" class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 9 9-2zm0 0v-8" />
                  </svg>
                  <svg v-else class="animate-spin w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </button>
              </div>
              <p class="text-[10px] md:text-xs text-gray-400 mt-2 text-center flex items-center justify-center">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tekan <kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 font-mono text-[10px] border border-gray-300">Enter</kbd> untuk kirim
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const API_BASE = import.meta.env.VITE_API_BASE || '/api';
const GUEST_MESSAGE_LIMIT = 3;

const messages = ref([]);
const newMessage = ref('');
const isLoading = ref(false);
const messagesContainer = ref(null);
const textarea = ref(null);

const GUEST_CHAT_KEY = 'epanen_guest_chat';
const GUEST_COUNT_KEY = 'epanen_guest_message_count';

const isAuthenticated = computed(() => authStore.isAuthenticated);

const guestMessageCount = computed(() => {
  if (isAuthenticated.value) return 0;
  const count = localStorage.getItem(GUEST_COUNT_KEY);
  return count ? parseInt(count) : 0;
});

const quickQuestions = [
  { label: 'Cara menanam padi yang baik dan benar', text: 'Bagaimana cara menanam padi yang baik dan benar?' },
  { label: 'Gejala hama wereng pada tanaman cabai', text: 'Apa saja gejala hama wereng pada tanaman cabai?' },
  { label: 'Waktu yang tepat untuk tanam jagung', text: 'Kapan waktu yang tepat untuk tanam jagung?' },
  { label: 'Cara membuat pupuk kompos dari limbah', text: 'Bagaimana cara membuat pupuk kompos dari limbah pertanian?' },
  { label: 'Harga jual cabai merah saat ini', text: 'Berapa harga jual cabai merah saat ini?' },
  { label: 'Mengendalikan hama ulat pada padi', text: 'Bagaimana cara mengendalikan hama ulat pada padi?' }
];

const loadChatHistory = async () => {
  if (isAuthenticated.value) {
    try {
      const token = localStorage.getItem('epanen_token');
      const response = await axios.get(`${API_BASE}/chat/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      messages.value = response.data.data.messages || [];
    } catch (error) {
      console.error('Failed to load chat history:', error);
      messages.value = [];
    }
  } else {
    const savedChat = localStorage.getItem(GUEST_CHAT_KEY);
    if (savedChat) {
      try {
        messages.value = JSON.parse(savedChat);
      } catch (e) {
        messages.value = [];
      }
    }
  }
};

const saveGuestChat = () => {
  localStorage.setItem(GUEST_CHAT_KEY, JSON.stringify(messages.value));
};

const incrementGuestCount = () => {
  const currentCount = guestMessageCount.value;
  localStorage.setItem(GUEST_COUNT_KEY, (currentCount + 1).toString());
};

const sendMessage = async () => {
  if (!newMessage.value.trim() || isLoading.value) return;

  if (!isAuthenticated.value && guestMessageCount.value >= GUEST_MESSAGE_LIMIT) {
    return;
  }

  const userMessage = newMessage.value.trim();
  newMessage.value = '';
  isLoading.value = true;

  if (textarea.value) {
    textarea.value.style.height = '44px';
  }

  const userMsg = {
    role: 'user',
    message: userMessage,
    created_at: new Date().toISOString()
  };
  messages.value.push(userMsg);

  if (!isAuthenticated.value) {
    saveGuestChat();
    incrementGuestCount();
  }

  scrollToBottom();

  try {
    let aiResponse;

    if (isAuthenticated.value) {
      const token = localStorage.getItem('epanen_token');
      const response = await axios.post(
        `${API_BASE}/chat/message`,
        { message: userMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 60000
        }
      );
      aiResponse = response.data.data.aiResponse || 'Maaf, saat ini AI belum tersedia.';
    } else {
      const response = await axios.post(
        `${API_BASE}/chat/guest`,
        { message: userMessage },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 60000
        }
      );
      aiResponse = response.data.data.aiResponse || 'Maaf, saat ini AI belum tersedia.';
    }

    const aiMsg = {
      role: 'assistant',
      message: aiResponse,
      created_at: new Date().toISOString()
    };
    messages.value.push(aiMsg);

    if (!isAuthenticated.value) {
      saveGuestChat();
    }

    scrollToBottom();
  } catch (error) {
    console.error('Failed to send message:', error);
    const errorMsg = {
      role: 'assistant',
      message: 'Maaf, terjadi kesalahan. Pastikan backend berjalan.',
      created_at: new Date().toISOString()
    };
    messages.value.push(errorMsg);

    if (!isAuthenticated.value) {
      saveGuestChat();
    }

    scrollToBottom();
  } finally {
    isLoading.value = false;
  }
};

const sendQuickQuestion = (question) => {
  newMessage.value = question;
  sendMessage();
};

const clearChat = () => {
  if (confirm('Mulai chat baru?')) {
    messages.value = [];
    if (!isAuthenticated.value) {
      localStorage.removeItem(GUEST_CHAT_KEY);
      localStorage.removeItem(GUEST_COUNT_KEY);
    }
  }
};

const handleEnter = (e) => {
  if (e.shiftKey) {
    return;
  }
  e.preventDefault();
  sendMessage();
};

const autoResize = () => {
  if (textarea.value) {
    textarea.value.style.height = '44px';
    const scrollHeight = textarea.value.scrollHeight;
    if (scrollHeight > 44) {
      textarea.value.style.height = Math.min(scrollHeight, 120) + 'px';
    }
  }
};

const formatTime = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Baru saja';
  if (diffMins < 60) return `${diffMins}m`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}j`;

  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
};

// Render markdown to HTML
const renderMarkdown = (text) => {
  if (!text) return '';

  let html = text;

  // Escape HTML first to prevent XSS
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code blocks (must be first before other processing)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre class="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto my-3 text-sm"><code>${code}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm text-red-600">$1</code>');

  // Bold (with emphasis)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>');

  // Headers
  html = html.replace(/^#### (.*$)/gm, '<h4 class="text-base font-bold text-gray-800 mt-3 mb-2">$1</h4>');
  html = html.replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold text-epanen-primary mt-4 mb-2">$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-epanen-primary mt-5 mb-3 pb-2 border-b-2 border-epanen-accent">$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-epanen-primary mt-5 mb-4 pb-2 border-b-2 border-epanen-accent">$1</h1>');

  // Process tables line by line
  const lines = html.split('\n');
  let inTable = false;
  let tableHeader = '';
  let tableRows = [];
  let result = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this is a table row (contains |)
    if (line.includes('|') && line.trim().startsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableHeader = line;
        tableRows = [];
        continue;
      }

      // Check if separator row (contains dashes)
      if (line.includes('---') || /^\|[\s\-:|]+\|$/.test(line)) {
        continue;
      }

      tableRows.push(line);
      continue;
    }

    // If we were in a table and now we're not, build the table
    if (inTable) {
      inTable = false;

      if (tableHeader && tableRows.length > 0) {
        let tableHtml = '<div class="overflow-x-auto my-4 rounded-lg border border-gray-200 shadow-sm">';

        // Parse header
        const headers = tableHeader.split('|')
          .map(h => h.trim())
          .filter(h => h);

        tableHtml += '<table class="min-w-full bg-white"><thead class="bg-gradient-to-r from-epanen-primary to-epanen-secondary"><tr>';
        headers.forEach(h => {
          tableHtml += `<th class="px-4 py-3 text-left text-sm font-bold text-white border-b border-gray-200">${h}</th>`;
        });
        tableHtml += '</tr></thead><tbody>';

        // Parse rows
        tableRows.forEach((row, idx) => {
          const cells = row.split('|')
            .map(c => c.trim())
            .filter(c => c);

          tableHtml += `<tr class="${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}">`;
          cells.forEach(cell => {
            tableHtml += `<td class="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">${cell}</td>`;
          });
          tableHtml += '</tr>';
        });

        tableHtml += '</tbody></table></div>';

        result.push(tableHtml);
        tableHeader = '';
        tableRows = [];
      }
    }

    result.push(line);
  }

  html = result.join('\n');

  // Process lists - bullet and numbered
  let lines2 = html.split('\n');
  let inList = false;
  let listType = null;
  let listItems = [];
  let result2 = [];

  for (let line of lines2) {
    // Bullet list
    const bulletMatch = line.match(/^[\s]*[-*+]\s+(.*)$/);
    // Numbered list
    const numberMatch = line.match(/^[\s]*(\d+)\.\s+(.*)$/);

    if (bulletMatch || numberMatch) {
      if (!inList) {
        inList = true;
        listType = bulletMatch ? 'ul' : 'ol';
        listItems = [];
      }

      const content = bulletMatch ? bulletMatch[1] : numberMatch[2];
      // Process inline formatting in list items
      const processedContent = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');

      listItems.push(processedContent);
      continue;
    }

    if (inList) {
      inList = false;

      if (listItems.length > 0) {
        if (listType === 'ul') {
          result2.push('<ul class="list-disc list-inside my-3 ml-6 space-y-1">');
          listItems.forEach(item => result2.push(`<li class="text-gray-700">${item}</li>`));
          result2.push('</ul>');
        } else {
          result2.push('<ol class="list-decimal list-inside my-3 ml-6 space-y-1">');
          listItems.forEach(item => result2.push(`<li class="text-gray-700">${item}</li>`));
          result2.push('</ol>');
        }
        listItems = [];
      }
    }

    result2.push(line);
  }

  html = result2.join('\n');

  // Line breaks and paragraphs
  html = html.replace(/\n\n+/g, '</p><p class="my-2 text-gray-700 leading-relaxed">');
  html = '<p class="my-2 text-gray-700 leading-relaxed">' + html + '</p>';

  // Clean up empty paragraphs
  html = html.replace(/<p class="my-2 text-gray-700 leading-relaxed"><\/p>/g, '');
  html = html.replace(/<p class="my-2 text-gray-700 leading-relaxed">\s*<\/p>/g, '');

  // Remove extra line breaks within paragraphs
  html = html.replace(/\n(?=<\/p>)/g, '');

  return html;
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

watch(() => messages.value, () => {
  scrollToBottom();
}, { deep: true });

onMounted(() => {
  loadChatHistory();
});
</script>

<style scoped>
.message-content {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.message-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
}

.message-content :deep(th) {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 2px solid #2D5A27;
}

.message-content :deep(td) {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.message-content :deep(tr:last-child td) {
  border-bottom: none;
}

.message-content :deep(code) {
  font-family: 'Courier New', monospace;
}

.message-content :deep(pre) {
  white-space: pre-wrap;
  word-break: break-word;
}

.message-content :deep(ul),
.message-content :deep(ol) {
  margin: 0.5rem 0;
}

.message-content :deep(li) {
  margin: 0.25rem 0;
}
</style>
