<template>
  <div class="bg-white rounded-xl shadow-sm">
    <!-- Messages container -->
    <div ref="messagesContainer" class="chat-container p-4 space-y-4 overflow-y-auto" style="min-height: 400px; max-height: 600px;">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['chat-message', msg.role]"
      >
        <p class="text-sm whitespace-pre-wrap">{{ msg.message }}</p>
        <span class="text-xs opacity-70 mt-1 block">{{ formatTime(msg.created_at) }}</span>
      </div>

      <div v-if="isLoading" class="chat-message assistant">
        <div class="flex items-center space-x-2">
          <div class="animate-spin w-4 h-4 border-2 border-epanen-secondary border-t-transparent rounded-full"></div>
          <span class="text-sm">Sedang mengetik...</span>
        </div>
      </div>

      <div v-if="messages.length === 0 && !isLoading" class="text-center text-gray-400 py-12">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <p class="text-lg">Mulai bertanya tentang pertanian</p>
        <p class="text-sm mt-2">Contoh: "Bagaimana cara menanam padi yang baik?"</p>
      </div>
    </div>

    <!-- Input form -->
    <div class="border-t p-4 bg-gray-50 rounded-b-xl">
      <form @submit.prevent="sendMessage" class="flex space-x-3">
        <Textarea
          v-model="newMessage"
          placeholder="Tulis pertanyaan Anda..."
          :auto-resize="false"
          rows="2"
          class="flex-1"
          :disabled="isLoading"
          @keydown.enter.prevent="sendMessage"
        />
        <Button
          type="submit"
          :disabled="!newMessage.trim() || isLoading"
          class="bg-epanen-primary self-end"
          :loading="isLoading"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </Button>
      </form>
      <p class="text-xs text-gray-500 mt-2">Tekan Enter untuk mengirim</p>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';

const props = defineProps({
  messages: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['message-sent']);

const toast = useToast();
const newMessage = ref('');
const isLoading = ref(false);
const messagesContainer = ref(null);

const API_BASE = import.meta.env.VITE_API_BASE || '/api';
const token = localStorage.getItem('epanen_token');

const sendMessage = async () => {
  if (!newMessage.value.trim() || isLoading.value) return;

  const userMessage = newMessage.value;
  newMessage.value = '';
  isLoading.value = true;

  // Add user message immediately
  emit('message-sent', {
    role: 'user',
    message: userMessage,
    created_at: new Date().toISOString()
  });

  try {
    const response = await axios.post(
      `${API_BASE}/chat/message`,
      { message: userMessage },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    emit('message-sent', {
      role: 'assistant',
      message: response.data.data.aiResponse,
      created_at: response.data.data.timestamp
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Gagal',
      detail: error.response?.data?.message || 'Gagal mengirim pesan',
      life: 3000
    });
  } finally {
    isLoading.value = false;
  }
};

const formatTime = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

watch(() => props.messages, () => {
  scrollToBottom();
}, { deep: true });
</script>
