<template>
  <div :class="['h-screen flex flex-col transition-colors duration-300 overflow-hidden', themeStore.isDarkMode ? 'dark bg-[#060D06]' : 'bg-[#F8FAF8]']">
    
    <!-- Custom Header for Standalone Chat -->
    <header class="glass-panel relative z-50 shadow-xl border-b border-white/10 flex-shrink-0">
      <div class="container-custom h-16 md:h-20 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <router-link to="/" class="p-2.5 bg-epanen-primary/10 hover:bg-epanen-primary/20 rounded-xl transition-all text-epanen-primary dark:text-epanen-accent" title="Kembali ke Beranda">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </router-link>
          <div class="flex items-center space-x-3">
             <div class="w-10 h-10 bg-epanen-primary rounded-xl flex items-center justify-center shadow-lg">
                <img src="/src/assets/images/ai-avatar.png" class="w-8 h-8 object-contain" />
             </div>
             <div>
                <h1 class="text-lg md:text-xl font-black text-gray-900 dark:text-white leading-none">Nala AI</h1>
                <p class="text-[10px] md:text-xs text-epanen-primary dark:text-epanen-accent font-black uppercase tracking-widest mt-1">Pakar Pertanian Digital</p>
             </div>
          </div>
        </div>

        <div class="flex items-center space-x-3">
           <button @click="themeStore.toggleDarkMode" class="p-2.5 bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 rounded-xl transition-all border border-black/5 dark:border-white/5">
              <svg v-if="!themeStore.isDarkMode" class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <svg v-else class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
           </button>
           <div class="w-10 h-10 bg-gradient-to-br from-epanen-primary to-epanen-secondary rounded-xl flex items-center justify-center text-white font-black shadow-md border border-white/20">
              {{ authStore.user?.name?.charAt(0).toUpperCase() || 'P' }}
           </div>
        </div>
      </div>
    </header>

    <main class="flex-1 relative overflow-hidden bg-transparent">
      <!-- Premium Decor Blobs -->
      <div class="blob w-[500px] h-[500px] bg-epanen-primary/5 -top-20 -right-20" style="animation-delay: 0s"></div>
      <div class="blob w-[400px] h-[400px] bg-epanen-accent/10 bottom-20 -left-20" style="animation-delay: -5s"></div>
      <div class="blob w-[300px] h-[300px] bg-emerald-500/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style="animation-delay: -10s"></div>

      <div ref="messagesContainer" class="h-full overflow-y-auto custom-scrollbar scroll-smooth relative z-10">
        <div class="max-w-4xl mx-auto px-4 py-12 space-y-8 pb-48">
          
          <!-- Empty State / Welcome -->
          <div v-if="messages.length === 0 && !isLoading" class="text-center py-20 space-y-10 animate-slide-up">
            <div class="relative inline-block animate-float">
               <div class="w-40 h-40 md:w-56 md:h-56 bg-white/70 shadow-2xl dark:bg-emerald-950/20 rounded-[4rem] p-6 mx-auto mb-8 relative overflow-hidden backdrop-blur-2xl border-2 border-white/20">
                  <img src="/src/assets/images/ai-avatar.png" alt="Nala" class="w-full h-full object-contain filter drop-shadow-2xl" />
               </div>
               <div class="absolute -bottom-2 -right-2 bg-white dark:bg-epanen-dark p-4 rounded-[1.5rem] shadow-2xl border border-gray-100 dark:border-white/5">
                  <span class="flex h-5 w-5 relative">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-5 w-5 bg-green-500"></span>
                  </span>
               </div>
            </div>

            <div class="space-y-6">
              <h2 class="text-5xl md:text-7xl font-black text-gray-900 dark:text-gray-100 tracking-tight italic">Halo, saya Nala! 🌾</h2>
              <p class="text-gray-600 dark:text-gray-300 font-medium max-w-2xl mx-auto text-xl md:text-2xl leading-relaxed">Pakar pertanian digital Anda. Ingin bicara soal bibit, pupuk, atau harga pasar hari ini?</p>
            </div>

            <!-- Quick Suggestions -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto pt-10">
              <button 
                v-for="(q, i) in quickQuestions" 
                :key="i"
                @click="sendQuickQuestion(q.text)"
                class="glass-panel text-left p-6 rounded-[2.5rem] hover:border-epanen-primary transition-all group shadow-xl border-2 border-transparent hover:shadow-epanen-primary/10 hover:bg-white dark:hover:bg-white/5 active:scale-95"
              >
                <div class="flex items-center space-x-6">
                  <div class="w-16 h-16 bg-epanen-primary rounded-[1.5rem] flex-shrink-0 flex items-center justify-center text-white group-hover:bg-epanen-dark transition-all shadow-lg">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span class="text-lg font-black text-gray-700 dark:text-gray-200 leading-tight">{{ q.label }}</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Message Bubbles -->
          <div v-for="(msg, index) in messages" :key="index" class="space-y-4">
            <div :class="['flex w-full', msg.role === 'user' ? 'justify-end' : 'justify-start']">
              <div :class="['flex max-w-[90%] sm:max-w-[80%] items-end space-x-4', msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row']">
                <!-- Avatar Bubble -->
                <div :class="['w-12 h-12 md:w-14 md:h-14 rounded-[1.5rem] flex-shrink-0 shadow-2xl flex items-center justify-center overflow-hidden border-2 transition-transform duration-500 hover:rotate-6 touch-none', msg.role === 'user' ? 'bg-epanen-primary border-white/20' : 'glass-panel border-white/40']">
                   <img v-if="msg.role === 'assistant'" src="/src/assets/images/ai-avatar.png" class="w-full h-full object-cover" />
                   <div v-else class="text-white font-black text-xl uppercase">{{ authStore.user?.name?.charAt(0) || 'P' }}</div>
                </div>
                
                <!-- Content Bubble Wrapper -->
                <div class="space-y-2 w-full group">
                  <div 
                    :class="[
                      'message-bubble px-6 py-5 rounded-[2.5rem] relative transition-all duration-500', 
                      msg.role === 'user' 
                        ? 'user-bubble text-white' 
                        : 'assistant-bubble text-gray-900 dark:text-gray-100'
                    ]"
                  >
                    <!-- Copy Button for AI messages -->
                    <button 
                      v-if="msg.role === 'assistant'"
                      @click="copyMessage(msg.message, index)"
                      :class="['absolute top-4 right-4 p-2 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100', copiedIndex === index ? 'bg-green-500 text-white' : 'bg-white/10 hover:bg-white/20 text-gray-500 dark:text-gray-400']"
                      :title="copiedIndex === index ? 'Copied!' : 'Copy message'"
                    >
                      <svg v-if="copiedIndex !== index" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    
                    <div class="text-base md:text-lg leading-relaxed message-content font-medium" v-html="renderMarkdown(msg.message)"></div>
                  </div>
                  <div :class="['flex items-center space-x-2 px-6 transition-opacity duration-300 opacity-60', msg.role === 'user' ? 'justify-end' : 'justify-start']">
                     <span class="text-[10px] font-black uppercase tracking-widest">{{ formatTime(msg.created_at) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Loading State (Skeleton Loader) -->
          <div v-if="isLoading" class="flex justify-start items-end space-x-4 animate-pulse">
            <div class="w-12 h-12 md:w-14 md:h-14 rounded-[1.5rem] glass-panel border-2 border-white/40 shadow-2xl flex items-center justify-center overflow-hidden">
               <img src="/src/assets/images/ai-avatar.png" class="w-full h-full object-cover grayscale opacity-50" />
            </div>
            <div class="glass-panel px-8 py-8 rounded-[3rem] rounded-tl-sm w-full max-w-md space-y-4 shadow-2xl border-2 border-white/20">
              <div class="skeleton-text h-4 w-3/4 rounded-full"></div>
              <div class="skeleton-text h-4 w-full rounded-full"></div>
              <div class="skeleton-text h-4 w-5/6 rounded-full"></div>
              <div class="flex items-center space-x-3 pt-4">
                 <div class="flex space-x-2">
                    <div class="w-2.5 h-2.5 bg-epanen-primary rounded-full animate-bounce"></div>
                    <div class="w-2.5 h-2.5 bg-epanen-primary rounded-full animate-bounce" style="animation-delay: 200ms"></div>
                    <div class="w-2.5 h-2.5 bg-epanen-primary rounded-full animate-bounce" style="animation-delay: 400ms"></div>
                 </div>
                 <span class="text-[11px] font-black text-epanen-primary dark:text-epanen-accent uppercase tracking-widest">Nala sedang mengetik...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Bottom Command Center - Fixed style -->
    <div class="fixed bottom-0 left-0 w-full p-6 md:p-10 pointer-events-none z-50">
      <div class="max-w-4xl mx-auto relative group pointer-events-auto">
        <form @submit.prevent="sendMessage" class="relative group">
          <!-- Ambient Glow behind input -->
          <div class="absolute -inset-2 bg-gradient-to-r from-epanen-primary/10 to-emerald-500/10 blur-2xl rounded-[4rem] opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
          
          <div class="command-center relative flex items-end rounded-[3.5rem] p-3 transition-all">
            <textarea
              v-model="newMessage"
              rows="1"
              placeholder="Tanya Nala tentang pertanian..."
              class="flex-1 bg-transparent border-none focus:ring-0 px-8 py-5 text-lg md:text-xl font-medium text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none max-h-48 min-h-[72px] custom-scrollbar"
              :disabled="isLoading"
              @keydown.enter.prevent="handleEnter"
              @input="autoResize"
              ref="textarea"
            ></textarea>
            
            <button 
              type="submit" 
              :disabled="!newMessage.trim() || isLoading"
              class="w-16 h-16 bg-epanen-primary text-white rounded-[2rem] flex items-center justify-center transition-all disabled:opacity-30 transform hover:scale-110 active:scale-95 shadow-xl hover:shadow-epanen-primary/40 flex-shrink-0 cursor-pointer"
            >
              <svg v-if="!isLoading" class="w-8 h-8 rotate-45 transform -translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 19l9 2-9-18-9 9 9-2zm0 0v-8" />
              </svg>
              <svg v-else class="animate-spin w-8 h-8" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';
import { useThemeStore } from '../../stores/theme';

const router = useRouter();
const authStore = useAuthStore();
const themeStore = useThemeStore();

const API_BASE = import.meta.env.VITE_API_BASE || '/api';
const GUEST_MESSAGE_LIMIT = 5;

const messages = ref([]);
const newMessage = ref('');
const isLoading = ref(false);
const messagesContainer = ref(null);
const textarea = ref(null);
const currentSessionId = ref(null);
const copiedIndex = ref(null);

const GUEST_CHAT_KEY = 'epanen_guest_chat';
const GUEST_COUNT_KEY = 'epanen_guest_message_count';

const isAuthenticated = computed(() => authStore.isAuthenticated);

const guestMessageCount = computed(() => {
  if (isAuthenticated.value) return 0;
  const count = localStorage.getItem(GUEST_COUNT_KEY);
  return count ? parseInt(count) : 0;
});

const copyMessage = async (text, index) => {
  try {
    // Remove HTML tags for plain text copy
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = renderMarkdown(text);
    const plainText = tempDiv.textContent || tempDiv.innerText || text;
    
    await navigator.clipboard.writeText(plainText);
    copiedIndex.value = index;
    setTimeout(() => {
      copiedIndex.value = null;
    }, 2000);
  } catch (error) {
    console.error('Failed to copy:', error);
  }
};

const quickQuestions = [
  { label: 'Cara Menanam Padi Terbaik', text: 'Bagaimana cara menanam padi yang paling efektif untuk hasil maksimal?' },
  { label: 'Hama Wereng & Solusi', text: 'Apa saja gejala hama wereng dan bagaimana solusi cepat menanganinya secara alami?' },
  { label: 'Update Harga Cabai Hari Ini', text: 'Berapa rata-rata harga pasar cabai merah dan bawang merah hari ini?' },
  { label: 'Panduan Pembuatan Kompos', text: 'Tolong beri saya panduan praktis membuat pupuk kompos dari limbah pertanian.' }
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
      try { messages.value = JSON.parse(savedChat); } catch (e) { messages.value = []; }
    }
  }
};

const saveGuestChat = () => localStorage.setItem(GUEST_CHAT_KEY, JSON.stringify(messages.value));
const incrementGuestCount = () => localStorage.setItem(GUEST_COUNT_KEY, (guestMessageCount.value + 1).toString());

const sendMessage = async () => {
  if (!newMessage.value.trim() || isLoading.value) return;

  const userMessage = newMessage.value.trim();
  newMessage.value = '';
  isLoading.value = true;

  if (textarea.value) textarea.value.style.height = '64px';

  messages.value.push({ role: 'user', message: userMessage, created_at: new Date().toISOString() });
  if (!isAuthenticated.value) { saveGuestChat(); incrementGuestCount(); }
  scrollToBottom();

  try {
    let aiResponse;
    const token = localStorage.getItem('epanen_token');
    
    if (isAuthenticated.value) {
      const response = await axios.post(`${API_BASE}/chat/message`, 
        { message: userMessage, sessionId: currentSessionId.value },
        { headers: { Authorization: `Bearer ${token}` }, timeout: 60000 }
      );
      aiResponse = response.data.data.aiResponse;
      if (response.data.data.sessionId) currentSessionId.value = response.data.data.sessionId;
    } else {
      const response = await axios.post(`${API_BASE}/chat/guest`, { message: userMessage }, { timeout: 60000 });
      aiResponse = response.data.data.aiResponse;
    }

    messages.value.push({ role: 'assistant', message: aiResponse, created_at: new Date().toISOString() });
    if (!isAuthenticated.value) saveGuestChat();
    scrollToBottom();
  } catch (error) {
    console.error('Chat error:', error);
    messages.value.push({ role: 'assistant', message: 'Koneksi terganggu. Nala butuh waktu lebih lama, silakan ulangi pesan Anda.', created_at: new Date().toISOString() });
  } finally {
    isLoading.value = false;
  }
};

const sendQuickQuestion = (question) => { newMessage.value = question; sendMessage(); };

const handleEnter = (e) => { if (!e.shiftKey) { e.preventDefault(); sendMessage(); } };

const autoResize = () => {
  if (textarea.value) {
    textarea.value.style.height = '64px';
    textarea.value.style.height = Math.min(textarea.value.scrollHeight, 160) + 'px';
  }
};

const formatTime = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
};

const renderMarkdown = (text) => {
  if (!text) return '';
  
  // Step 1: Extract and process code blocks BEFORE escaping HTML
  const codeBlocks = [];
  let html = text.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || 'text';
    const placeholder = `___CODE_BLOCK_${codeBlocks.length}___`;
    codeBlocks.push(`<div class="code-block my-2 rounded-xl overflow-hidden border border-white/10">
      <div class="code-header px-3 py-1.5 bg-gray-800 dark:bg-gray-900 text-gray-300 text-[10px] font-bold flex items-center justify-between">
        <span class="uppercase tracking-wider">${language}</span>
        <button onclick="navigator.clipboard.writeText(this.getAttribute('data-code'))" data-code="${code.trim().replace(/"/g, '&quot;')}" class="copy-code-btn px-1.5 py-0.5 bg-white/10 hover:bg-white/20 rounded transition-all" title="Copy code">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      <pre class="code-content p-3 bg-gray-900 dark:bg-black text-gray-100 text-xs overflow-x-auto"><code>${code.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
    </div>`);
    return placeholder;
  });
  
  // Step 2: Extract inline code BEFORE escaping
  const inlineCodes = [];
  html = html.replace(/`([^`]+)`/g, (match, code) => {
    const placeholder = `___INLINE_CODE_${inlineCodes.length}___`;
    inlineCodes.push(`<code class="inline-code px-1.5 py-0.5 bg-gray-800 dark:bg-gray-900 text-emerald-400 rounded text-xs font-mono">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>`);
    return placeholder;
  });
  
  // Step 3: NOW escape HTML in the remaining text
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  // Step 4: Bold (**text** or __text__)
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-black text-emerald-600 dark:text-emerald-400">$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong class="font-black text-emerald-600 dark:text-emerald-400">$1</strong>');
  
  // Step 5: Italic (*text* or _text_)
  html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/_(.+?)_/g, '<em class="italic">$1</em>');
  
  // Step 6: Headings - Tight Premium
  html = html.replace(/^####\s*(.*$)/gm, '<h4 class="text-xl font-black mt-2 mb-0.5 text-gray-900 dark:text-white">$1</h4>');
  html = html.replace(/^###\s*(.*$)/gm, '<h3 class="text-2xl font-black mt-3 mb-1 text-epanen-primary dark:text-epanen-accent">$1</h3>');
  html = html.replace(/^##\s*(.*$)/gm, '<h2 class="text-3xl font-black mt-4 mb-1.5 border-b border-epanen-primary/20 pb-0.5 text-gray-900 dark:text-white">$1</h2>');
  html = html.replace(/^#\s*(.*$)/gm, '<h1 class="text-4xl font-black mt-5 mb-2 text-gray-900 dark:text-white">$1</h1>');
  
  // Step 7: Links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-epanen-primary dark:text-epanen-accent underline hover:no-underline font-bold transition-all hover:px-1 hover:bg-epanen-primary/10 rounded">$1</a>');
  
  // Step 8: Auto-link URLs
  html = html.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-epanen-primary dark:text-epanen-accent underline hover:no-underline break-all">$1</a>');
  
  // Step 9: Blockquotes - tight premium
  html = html.replace(/^&gt;\s*(.+)$/gm, '<blockquote class="border-l-4 border-epanen-primary pl-4 py-1 my-1.5 italic text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-white/5 rounded-r-xl text-base font-medium">$1</blockquote>');
  
  // Step 10: Tables - balanced spacing
  const lines = html.split('\n');
  let inTable = false;
  let tableHeader = '';
  let tableRows = [];
  let result = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('|') && line.trim().startsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableHeader = line;
        tableRows = [];
        continue;
      }
      if (line.includes('---')) continue;
      tableRows.push(line);
      continue;
    }
    if (inTable) {
      inTable = false;
      if (tableHeader && tableRows.length > 0) {
        let tableHtml = '<div class="overflow-x-auto my-2 rounded-2xl border-2 border-white/10 shadow-xl overflow-hidden"><table class="premium-table w-full text-base">';
        const headers = tableHeader.split('|').map(h => h.trim()).filter(h => h);
        tableHtml += '<thead class="bg-epanen-primary text-white"><tr>' + headers.map(h => `<th class="px-4 py-2 text-left font-black tracking-wider uppercase text-xs">${h}</th>`).join('') + '</tr></thead><tbody>';
        tableRows.forEach((row, idx) => {
          const cells = row.split('|').map(c => c.trim()).filter(c => c);
          const rowClass = idx % 2 === 0 ? 'bg-white dark:bg-white/5' : 'bg-gray-50/50 dark:bg-white/10';
          tableHtml += `<tr class="${rowClass} transition-colors hover:bg-epanen-primary/5">` + cells.map(cell => `<td class="px-4 py-2 border-t border-white/5 font-medium">${cell}</td>`).join('') + '</tr>';
        });
        tableHtml += '</tbody></table></div>';
        result.push(tableHtml);
      }
    }
    result.push(line);
  }
  html = result.join('\n');
  
  // Step 11: Lists - Unordered - Premium look
  let listLines = html.split('\n');
  let inList = false;
  let resultList = [];
  for (let line of listLines) {
    const bulletMatch = line.match(/^[\s]*[-*+]\s+(.*)$/);
    if (bulletMatch) {
      if (!inList) {
        inList = true;
        resultList.push('<div class="unordered-list space-y-0.5 my-1.5 ml-1">');
      }
      resultList.push(`<div class="flex items-start text-base text-gray-800 dark:text-gray-200 leading-snug group">
        <span class="mr-2 w-1.5 h-1.5 mt-2 bg-epanen-primary dark:bg-epanen-accent rounded-full transition-transform group-hover:scale-125 shadow-lg flex-shrink-0"></span>
        <span class="flex-1 font-medium">${bulletMatch[1]}</span>
      </div>`);
      continue;
    }
    if (inList) {
      inList = false;
      resultList.push('</div>');
    }
    resultList.push(line);
  }
  if (inList) resultList.push('</div>');
  html = resultList.join('\n');
  
  // Step 12: Numbered lists - tight premium
  html = html.replace(/^(\d+)\.\s+(.+)$/gm, '<div class="numbered-list-item my-1 text-base flex items-start group"><span class="flex items-center justify-center w-5 h-5 rounded-md bg-epanen-primary/10 text-epanen-primary dark:text-epanen-accent font-black text-[10px] mr-2 mt-0.5 transition-colors group-hover:bg-epanen-primary shadow-sm group-hover:text-white flex-shrink-0">$1</span><span class="flex-1 font-medium">${2}</span></div>');
  
  // Step 13: Horizontal rules
  html = html.replace(/^---+$/gm, '<hr class="my-8 border-t-2 border-dashed border-gray-200 dark:border-white/10" />');
  
  // Step 14: Paragraphs - Compact Premium
  html = html.replace(/\n\n+/g, '</p><p class="my-1 leading-snug font-medium">');
  html = '<p class="leading-snug font-medium">' + html + '</p>';
  html = html.replace(/\n/g, '<br/>');
  
  // Step 15: Restore code blocks and inline code
  inlineCodes.forEach((code, i) => {
    html = html.replace(`___INLINE_CODE_${i}___`, code);
  });
  codeBlocks.forEach((block, i) => {
    html = html.replace(`___CODE_BLOCK_${i}___`, block);
  });
  
  return html;
};

const scrollToBottom = () => {
  nextTick(() => { if (messagesContainer.value) messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight; });
};

watch(() => messages.value, () => scrollToBottom(), { deep: true });
onMounted(() => {
  themeStore.initTheme();
  loadChatHistory();
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { 
  background: rgba(0, 0, 0, 0.1); 
  border-radius: 10px;
  transition: background 0.3s;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.2); }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); }
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }

/* Custom Scrollbar - Hidden but scrollable */
.custom-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
.custom-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

/* Base styles */
.message-bubble { 
  word-wrap: break-word; 
  overflow-wrap: break-word;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.message-bubble:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.15);
}

/* User Bubble - Premium Gradient */
.user-bubble {
  background: linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%);
  border-bottom-right-radius: 0.5rem !important;
  box-shadow: 0 10px 20px -5px rgba(27, 67, 50, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Assistant Bubble - Glassmorphism Refined */
.assistant-bubble {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom-left-radius: 0.5rem !important;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
}

.dark .assistant-bubble {
  background: rgba(30, 45, 30, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Message content styling */
.message-content :deep(strong) { font-weight: 800; color: inherit; }
.message-content :deep(p) { line-height: 1.5; margin: 0.15rem 0; }
.message-content :deep(p:first-child) { margin-top: 0; }
.message-content :deep(p:last-child) { margin-bottom: 0; }

/* AI message - themed highlights */
.dark .assistant-bubble .message-content :deep(strong) { color: #A8D5A2 !important; }
.dark .assistant-bubble .message-content :deep(h1),
.dark .assistant-bubble .message-content :deep(h2),
.dark .assistant-bubble .message-content :deep(h3) { color: #A8D5A2 !important; }

/* Input Center - Premium Floating */
.command-center {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 2px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.12);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark .command-center {
  background: rgba(20, 30, 20, 0.7);
  border: 2px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
}

.command-center:focus-within {
  border-color: #1B4332;
  box-shadow: 0 0 0 10px rgba(27, 67, 50, 0.04), 0 30px 60px -15px rgba(0, 0, 0, 0.2);
  transform: translateY(-4px);
}

/* Background Blobs */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  pointer-events: none;
  animation: blob-float 20s infinite alternate;
}

@keyframes blob-float {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(40px, -60px) scale(1.15); }
  66% { transform: translate(-30px, 30px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}

/* Skeleton loader with glass effect */
.skeleton-text {
  background: linear-gradient(90deg, 
    rgba(27, 67, 50, 0.05) 25%, 
    rgba(27, 67, 50, 0.1) 50%, 
    rgba(27, 67, 50, 0.05) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite linear;
}

@keyframes shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}

.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-bloom {
  animation: bloom 10s ease-in-out infinite alternate;
}

@keyframes bloom {
  from { transform: scale(1); opacity: 0.3; }
  to { transform: scale(1.3); opacity: 0.6; }
}

/* Custom code blocks */
.message-content :deep(.code-block) {
  margin: 0.75rem 0;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.message-content :deep(.code-header) {
  background: #1a1a1a;
  padding: 0.5rem 1rem;
}

.message-content :deep(.premium-table) {
  margin: 0.75rem 0;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}
</style>
