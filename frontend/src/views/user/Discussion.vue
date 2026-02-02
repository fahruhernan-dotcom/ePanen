<template>
  <div class="container-custom">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold text-epanen-primary mb-2">Komunitas</h1>
        <p class="text-gray-600">Forum diskusi antar petani</p>
      </div>
      <Button
        @click="showNewDiscussion = true"
        class="bg-epanen-primary"
        label="+ Buat Diskusi"
      />
    </div>

    <!-- Discussions List -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin w-12 h-12 border-4 border-epanen-secondary border-t-transparent rounded-full mx-auto"></div>
    </div>

    <div v-else-if="discussions.length > 0" class="space-y-4">
      <div
        v-for="discussion in discussions"
        :key="discussion.id"
        class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
        @click="viewDiscussion(discussion.id)"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="font-semibold text-lg mb-2">{{ discussion.title }}</h3>
            <p class="text-gray-600 text-sm line-clamp-2 mb-3">{{ discussion.content }}</p>
            <div class="flex items-center space-x-4 text-sm text-gray-500">
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {{ discussion.author_name }}
              </span>
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {{ discussion.reply_count || 0 }} balasan
              </span>
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {{ discussion.views }} dilihat
              </span>
            </div>
          </div>
          <span v-if="discussion.category" class="bg-epanen-light text-epanen-primary px-3 py-1 rounded-full text-xs">
            {{ discussion.category }}
          </span>
        </div>
      </div>
    </div>

    <div v-else class="bg-white rounded-xl p-12 text-center">
      <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <p class="text-gray-500 text-lg mb-2">Belum ada diskusi</p>
      <p class="text-gray-400 text-sm">Jadilah yang pertama membuat diskusi!</p>
    </div>

    <!-- New Discussion Dialog -->
    <Dialog
      v-model:visible="showNewDiscussion"
      modal
      header="Buat Diskusi Baru"
      :style="{ width: '500px' }"
    >
      <form @submit.prevent="createDiscussion" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Judul</label>
          <InputText
            v-model="newDiscussion.title"
            placeholder="Judul diskusi..."
            class="w-full"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
          <Dropdown
            v-model="newDiscussion.category"
            :options="categories"
            option-label="name"
            option-value="slug"
            placeholder="Pilih kategori"
            class="w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Isi Diskusi</label>
          <Textarea
            v-model="newDiscussion.content"
            placeholder="Tulis pertanyaan atau topik diskusi..."
            rows="5"
            class="w-full"
            required
          />
        </div>
        <div class="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            @click="showNewDiscussion = false"
            label="Batal"
            class="p-button-text"
          />
          <Button
            type="submit"
            :loading="submitting"
            label="Kirim"
            class="bg-epanen-primary"
          />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';

const router = useRouter();
const toast = useToast();
const API_BASE = import.meta.env.VITE_API_BASE || '/api';
const token = localStorage.getItem('epanen_token');

const discussions = ref([]);
const categories = ref([
  { name: 'Pasar', slug: 'pasar' },
  { name: 'Tanya Jawab', slug: 'tanya-jawab' },
  { name: 'Budidaya', slug: 'budidaya' }
]);

const loading = ref(false);
const showNewDiscussion = ref(false);
const submitting = ref(false);

const newDiscussion = ref({
  title: '',
  content: '',
  category: ''
});

const loadDiscussions = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${API_BASE}/discussions`);
    discussions.value = response.data.data.discussions || [];
  } catch (error) {
    console.error('Failed to load discussions:', error);
  } finally {
    loading.value = false;
  }
};

const createDiscussion = async () => {
  submitting.value = true;
  try {
    await axios.post(`${API_BASE}/discussions`, newDiscussion.value, {
      headers: { Authorization: `Bearer ${token}` }
    });

    toast.add({
      severity: 'success',
      summary: 'Berhasil',
      detail: 'Diskusi berhasil dibuat',
      life: 3000
    });

    showNewDiscussion.value = false;
    newDiscussion.value = { title: '', content: '', category: '' };
    loadDiscussions();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Gagal',
      detail: error.response?.data?.message || 'Gagal membuat diskusi',
      life: 3000
    });
  } finally {
    submitting.value = false;
  }
};

const viewDiscussion = (id) => {
  router.push(`/discussions/${id}`);
};

onMounted(() => {
  loadDiscussions();
});
</script>
