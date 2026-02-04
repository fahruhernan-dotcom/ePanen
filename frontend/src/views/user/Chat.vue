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

    <!-- Chat Viewport -->
    <main class="flex-1 relative overflow-hidden bg-transparent">
      <!-- Decor Blobs -->
      <div class="absolute top-20 right-[-5%] w-96 h-96 bg-epanen-accent/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-20 left-[-5%] w-80 h-80 bg-emerald-100/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div ref="messagesContainer" class="h-full overflow-y-auto custom-scrollbar scroll-smooth">
        <div class="max-w-4xl mx-auto px-4 py-8 space-y-10 pb-32">
          
          <!-- Empty State / Welcome -->
          <div v-if="messages.length === 0 && !isLoading" class="text-center py-20 space-y-8 animate-slide-up">
            <div class="relative inline-block animate-float">
               <div class="w-32 h-32 md:w-48 md:h-48 bg-white/70 shadow-2xl dark:bg-emerald-950/20 rounded-[4rem] p-4 mx-auto mb-6 relative overflow-hidden backdrop-blur-xl border border-white/20">
                  <img src="/src/assets/images/ai-avatar.png" alt="Nala" class="w-full h-full object-contain filter drop-shadow-2xl" />
               </div>
               <div class="absolute -bottom-2 -right-2 bg-white dark:bg-epanen-dark p-3 rounded-2xl shadow-lg border border-gray-100 dark:border-white/5">
                  <span class="flex h-4 w-4 relative">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                  </span>
               </div>
            </div>

            <div class="space-y-4">
              <h2 class="text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-100 tracking-tight italic">Halo, saya Nala! 🌾</h2>
              <p class="text-gray-600 dark:text-gray-300 font-black max-w-xl mx-auto text-xl leading-relaxed">Pakar pertanian Anda siap membantu. Tanyakan apa saja tentang teknik tanam, hama, hingga harga pasar terbaru.</p>
            </div>

            <!-- Quick Suggestions -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto pt-10">
              <button 
                v-for="(q, i) in quickQuestions" 
                :key="i"
                @click="sendQuickQuestion(q.text)"
                class="glass-card text-left p-6 rounded-[2.5rem] hover:border-epanen-primary transition-all group shadow-xl border-2 border-transparent hover:shadow-epanen-primary/10 hover:bg-white dark:hover:bg-white/5 active:scale-95"
              >
                <div class="flex items-center space-x-5">
                  <div class="w-14 h-14 bg-epanen-primary rounded-2xl flex-shrink-0 flex items-center justify-center text-white group-hover:bg-epanen-dark transition-all shadow-md">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span class="text-base font-black text-gray-700 dark:text-gray-200 leading-tight">{{ q.label }}</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Message Bubbles -->
          <div v-for="(msg, index) in messages" :key="index" class="space-y-4">
            <div :class="['flex w-full', msg.role === 'user' ? 'justify-end' : 'justify-start']">
              <div :class="['flex max-w-[95%] sm:max-w-[85%] items-end space-x-3', msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row']">
                <!-- Avatar Bubble -->
                <div :class="['w-10 h-10 md:w-12 md:h-12 rounded-2xl flex-shrink-0 shadow-lg flex items-center justify-center overflow-hidden border-2', msg.role === 'user' ? 'bg-epanen-primary border-white' : 'glass-panel border-white/20 shadow-none']">
                   <img v-if="msg.role === 'assistant'" src="/src/assets/images/ai-avatar.png" class="w-full h-full object-cover" />
                   <svg v-else class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                   </svg>
                </div>
                
                <!-- Content Bubble -->
                <div class="space-y-1 w-full group">
                  <div 
                    :class="[
                      'message-bubble px-6 py-5 rounded-[2.5rem] shadow-2xl transition-all duration-300 border-2', 
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-epanen-primary to-epanen-secondary text-white rounded-tr-sm border-white/20' 
                        : 'glass-panel rounded-tl-sm border-white/20 text-gray-900 dark:text-gray-100'
                    ]"
                  >
                    <div class="text-sm sm:text-lg leading-relaxed message-content font-black" v-html="renderMarkdown(msg.message)"></div>
                  </div>
                  <div :class="['flex items-center space-x-2 px-4 transition-opacity duration-300', msg.role === 'user' ? 'justify-end' : 'justify-start']">
                     <span class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">{{ formatTime(msg.created_at) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Simulated Writing / Skeleton Loader -->
          <div v-if="isLoading" class="flex justify-start items-end space-x-3">
            <div class="w-10 h-10 md:w-12 md:h-12 rounded-2xl glass-panel border-2 border-white/20 shadow-lg flex items-center justify-center overflow-hidden">
               <img src="/src/assets/images/ai-avatar.png" class="w-full h-full object-cover animate-pulse" />
            </div>
            <div class="glass-panel px-8 py-8 rounded-[2.5rem] rounded-tl-sm w-full max-w-md space-y-4 shadow-2xl border-2 border-white/20">
              <div class="skeleton-text h-3 w-3/4 rounded-full"></div>
              <div class="skeleton-text h-3 w-full rounded-full"></div>
              <div class="skeleton-text h-3 w-5/6 rounded-full"></div>
              <div class="flex items-center space-x-3 pt-2">
                 <div class="flex space-x-1.5">
                    <div class="w-2 h-2 bg-epanen-primary rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-epanen-primary rounded-full animate-bounce" style="animation-delay: 200ms"></div>
                    <div class="w-2 h-2 bg-epanen-primary rounded-full animate-bounce" style="animation-delay: 400ms"></div>
                 </div>
                 <span class="text-[10px] font-black text-epanen-primary dark:text-epanen-accent uppercase tracking-[0.2em]">Nala sedang berpikir...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Bottom Input Area - Floating style -->
    <div class="fixed bottom-0 left-0 w-full p-6 md:p-8 pointer-events-none">
      <div class="max-w-4xl mx-auto relative group pointer-events-auto">
        <form @submit.prevent="sendMessage" class="relative group">
          <div class="absolute inset-x-0 bottom-full h-24 bg-gradient-to-t from-[#F8FAF8] dark:from-[#060D06] to-transparent pointer-events-none"></div>
          
          <div class="relative flex items-end glass-panel rounded-[3rem] p-2.5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-2 border-white/20 transition-all focus-within:ring-[12px] focus-within:ring-epanen-primary/5">
            <textarea
              v-model="newMessage"
              rows="1"
               placeholder="Tanya Nala tentang pertanian..."
              class="flex-1 bg-transparent border-none focus:ring-0 px-8 py-5 text-base sm:text-lg font-black text-gray-800 dark:text-gray-100 placeholder-gray-500 resize-none max-h-40 min-h-[64px] custom-scrollbar"
              :disabled="isLoading"
              @keydown.enter.prevent="handleEnter"
              @input="autoResize"
              ref="textarea"
            ></textarea>
            
            <button 
              type="submit" 
              :disabled="!newMessage.trim() || isLoading"
              class="w-14 h-14 sm:w-16 sm:h-16 bg-epanen-primary text-white rounded-[2rem] flex items-center justify-center transition-all disabled:opacity-30 transform hover:scale-110 active:scale-95 shadow-2xl hover:shadow-epanen-primary/40 overflow-hidden flex-shrink-0 mb-0.5 mr-0.5"
            >
              <svg v-if="!isLoading" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 19l9 2-9-18-9 9 9-2zm0 0v-8" />
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

const GUEST_CHAT_KEY = 'epanen_guest_chat';
const GUEST_COUNT_KEY = 'epanen_guest_message_count';

const isAuthenticated = computed(() => authStore.isAuthenticated);

const guestMessageCount = computed(() => {
  if (isAuthenticated.value) return 0;
  const count = localStorage.getItem(GUEST_COUNT_KEY);
  return count ? parseInt(count) : 0;
});

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
  let html = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/^### (.*$)/gm, '<h3 class="text-xl font-black mt-6 mb-3">$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-black mt-8 mb-4 border-b-2 border-white/10 dark:border-white/10 pb-2">$1</h2>');

  const lines = html.split('\n');
  let inTable = false;
  let tableHeader = '';
  let tableRows = [];
  let result = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('|') && line.trim().startsWith('|')) {
      if (!inTable) { inTable = true; tableHeader = line; tableRows = []; continue; }
      if (line.includes('---')) continue;
      tableRows.push(line);
      continue;
    }
    if (inTable) {
      inTable = false;
      if (tableHeader && tableRows.length > 0) {
        let tableHtml = '<div class="overflow-x-auto my-6"><table class="premium-table">';
        const headers = tableHeader.split('|').map(h => h.trim()).filter(h => h);
        tableHtml += '<thead><tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr></thead><tbody>';
        tableRows.forEach((row) => {
          const cells = row.split('|').map(c => c.trim()).filter(c => c);
          tableHtml += '<tr>' + cells.map(cell => `<td>${cell}</td>`).join('') + '</tr>';
        });
        tableHtml += '</tbody></table></div>';
        result.push(tableHtml);
      }
    }
    result.push(line);
  }
  html = result.join('\n');

  let listLines = html.split('\n');
  let inList = false;
  let resultList = [];
  for (let line of listLines) {
    const bulletMatch = line.match(/^[\s]*[-*+]\s+(.*)$/);
    if (bulletMatch) {
      if (!inList) { inList = true; resultList.push('<ul class="list-disc list-inside space-y-3 my-5 font-black ml-2">'); }
      resultList.push(`<li>${bulletMatch[1]}</li>`);
      continue;
    }
    if (inList) { inList = false; resultList.push('</ul>'); }
    resultList.push(line);
  }
  html = resultList.join('\n');
  html = html.replace(/\n\n+/g, '</p><p class="my-5">');
  html = '<p>' + html + '</p>';
  html = html.replace(/\n/g, '<br/>');
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
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.1); border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); }
.message-bubble { word-wrap: break-word; overflow-wrap: break-word; }
.message-content :deep(strong) { font-weight: 900; }
.message-content :deep(p) { line-height: 1.8; }
.bg-gradient-to-br .message-content :deep(*) { color: #FFFFFF !important; }
.dark .glass-panel .message-content :deep(*) { color: #F8FAF8 !important; }
.dark .glass-panel .message-content :deep(strong) { color: #A8D5A2 !important; }

.glass-panel {
  background: var(--card-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-color);
}

.animate-slide-up {
  animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-bloom {
  animation: bloom 8s ease-in-out infinite alternate;
}

@keyframes bloom {
  0% { transform: scale(1); opacity: 0.3; }
  100% { transform: scale(1.2); opacity: 0.6; }
}
</style>
