<template>
  <div class="space-y-8 animate-fade-in pb-20">
    <!-- Premium Header -->
    <div class="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-sm border border-gray-50 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors">
      <div>
        <h1 class="text-4xl font-black text-gray-800 dark:text-white tracking-tighter leading-none mb-2">WhatsApp Manager</h1>
        <p class="text-[10px] font-black text-epanen-primary uppercase tracking-[0.3em] opacity-60">Sync Akun Web & Database Customer</p>
      </div>
      <div class="flex gap-4">
        <button 
          @click="handleSync"
          :disabled="syncing"
          class="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-4 shadow-sm border border-amber-100 dark:border-amber-800 group transition-all hover:bg-amber-500"
        >
          <div v-if="syncing" class="w-6 h-6 border-3 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <svg v-else class="w-6 h-6 text-amber-500 dark:text-amber-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </button>
        <button 
          @click="showLinkDialog = true"
          class="bg-gradient-to-r from-epanen-primary to-epanen-secondary text-white px-8 py-4 rounded-2xl shadow-xl shadow-epanen-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all font-black text-xs uppercase tracking-widest flex items-center"
        >
          <span class="mr-3 font-bold text-lg">+</span> Hubungkan Akun
        </button>
      </div>
    </div>

    <!-- Stats Card -->
    <div class="bg-gradient-to-br from-gray-900 to-black rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
      <!-- Decorative pattern -->
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 L100 100 M-20 20 L80 120 M20 -20 L120 80" stroke="white" stroke-width="0.5" />
        </svg>
      </div>

      <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
        <div class="max-w-xl text-center md:text-left">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-epanen-primary/20 rounded-full border border-epanen-primary/30 mb-6">
            <span class="w-2 h-2 bg-epanen-primary rounded-full animate-pulse"></span>
            <span class="text-[10px] font-black uppercase tracking-widest text-epanen-primary">Intelligent CRM Hub</span>
          </div>
          <h2 class="text-4xl font-black mb-4 tracking-tighter">CRM Integration v2</h2>
          <p class="text-gray-400 text-sm leading-relaxed font-bold opacity-80">
            Sistem sekarang terhubung langsung ke tabel <span class="text-white">Customer Intelligence</span>. Anda dapat memantau Lead Score, lokasi presisi, dan segmentasi minat setiap farmer secara real-time.
          </p>
        </div>
        
        <div class="flex gap-6">
          <div class="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 text-center min-w-[160px] shadow-2xl shadow-black/50">
            <p class="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Total Contacts</p>
            <p class="text-4xl font-black tracking-tighter">{{ links.length }}</p>
          </div>
          <div class="bg-epanen-primary/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-epanen-primary/20 text-center min-w-[160px] shadow-2xl shadow-epanen-primary/10">
            <p class="text-[10px] font-black uppercase tracking-widest text-epanen-primary mb-2">Linked to Web</p>
            <p class="text-4xl font-black text-white tracking-tighter">{{ linkedCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search & Filters -->
    <div class="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm border border-gray-50 dark:border-gray-800 p-8 flex flex-wrap gap-6 items-center justify-between transition-colors">
      <div class="relative flex-1 min-w-[300px] group">
        <span class="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600 group-focus-within:text-epanen-primary transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </span>
        <input 
          v-model="search"
          type="text" 
          placeholder="Cari berdasarkan Nama, WhatsAppID, atau Lokasi..." 
          class="w-full pl-14 pr-8 py-5 bg-gray-50 dark:bg-gray-800 border-none rounded-[2rem] focus:ring-2 focus:ring-epanen-primary transition-all outline-none font-bold text-sm text-gray-800 dark:text-white shadow-inner"
        />
      </div>
      <div class="flex bg-gray-50 dark:bg-gray-800 p-2 rounded-2xl border border-gray-100 dark:border-gray-700 transition-colors">
        <button 
          @click="filterType = 'all'" 
          :class="['px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all', filterType === 'all' ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300']"
        >Semua Data</button>
        <button 
          @click="filterType = 'unlinked'" 
          :class="['px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all', filterType === 'unlinked' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300']"
        >Not Linked</button>
      </div>
    </div>

    <!-- Cards Grid -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="i in 6" :key="i" class="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-50 dark:border-gray-800 animate-pulse transition-colors">
        <div class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-6"></div>
        <div class="h-6 bg-gray-50 dark:bg-gray-800 rounded-full w-2/3 mb-4"></div>
        <div class="h-4 bg-gray-50 dark:bg-gray-800 rounded-full w-full opacity-50"></div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="link in filteredLinks" :key="link.id" class="group bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-50 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
        
        <!-- Hover Background Decor -->
        <div class="absolute -bottom-10 -right-10 w-32 h-32 rounded-full transition-all duration-700 bg-gray-50 dark:bg-gray-800 group-hover:bg-epanen-primary/5 group-hover:scale-150 opacity-50 dark:opacity-20"></div>

        <div class="flex items-start justify-between mb-8 relative z-10">
          <div :class="['w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-700 shadow-sm', link.user_id ? 'bg-green-50 dark:bg-green-900/20 text-green-500 dark:text-green-400 group-hover:bg-green-500 dark:group-hover:bg-green-500 group-hover:text-white transition-colors' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-500 dark:text-amber-400 group-hover:bg-amber-500 dark:group-hover:bg-amber-500 group-hover:text-white transition-colors']">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 2.73 1.984 5.001 4.6 5.591l.369.083.003.002.502 1.374 1.157-1.157.051-.051.458.054c2.16.255 4.31-.63 5.498-2.316 1.188-1.686 1.188-3.922 0-5.608-1.188-1.686-3.338-2.571-5.498-2.316l-.458.054-.051-.051-1.157-1.157-.502 1.374-.003.002-.369.083c-2.616.59-4.601 2.861-4.6 5.591 0 3.18 2.587 5.766 5.768 5.766 2.227 0 4.192-1.251 5.127-3.116.936-1.865.636-4.131-.762-5.608L12.031 6.172z"/>
            </svg>
          </div>
          <div class="flex flex-col items-end gap-2">
            <div class="px-4 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-gray-700">
              L-Score: {{ link.lead_score || 0 }}
            </div>
            <span :class="['text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg shadow-sm', link.user_id ? 'bg-green-500 text-white' : 'bg-amber-500 text-white']">
              {{ link.user_id ? 'Identified' : 'Prospect' }}
            </span>
          </div>
        </div>

        <div class="space-y-6 flex-1 relative z-10">
          <div>
            <h4 class="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 opacity-60">Customer Name</h4>
            <p class="text-2xl font-black text-gray-800 dark:text-white leading-tight tracking-tighter transition-colors">{{ link.customer_name || 'Anonymous User' }}</p>
            <p class="text-[10px] font-black text-gray-400 dark:text-gray-500 mt-2 flex items-center bg-gray-50 dark:bg-gray-800 w-fit px-3 py-1 rounded-lg transition-colors">
              <svg class="w-3 h-3 mr-2 opacity-40 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
              {{ link.location || 'Surrounding Region' }}
            </p>
          </div>

          <div>
             <h4 class="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 opacity-60">WhatsApp Identity</h4>
             <div class="bg-gray-50 dark:bg-gray-800 flex items-baseline justify-between p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-inner transition-colors">
                <p class="text-sm font-black text-gray-600 dark:text-gray-300 font-mono tracking-tight transition-colors">{{ link.wa_identity }}</p>
                <span class="text-[8px] font-black text-gray-300 dark:text-gray-600 uppercase">Encrypted ID</span>
             </div>
          </div>

          <div v-if="link.user_id" class="animate-fade-in bg-indigo-50/40 dark:bg-indigo-900/10 p-5 rounded-[1.5rem] border border-indigo-100/50 dark:border-indigo-800/50 relative overflow-hidden group/link transition-colors">
            <div class="absolute -right-4 -top-4 opacity-[0.05] group-hover/link:opacity-20 transition-opacity">
               <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <h4 class="text-[9px] font-black text-indigo-400 dark:text-indigo-500 uppercase tracking-widest mb-2 transition-colors">Web Account Link</h4>
            <div class="flex items-center">
               <div class="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-[8px] font-black mr-2">
                 {{ link.user_name?.charAt(0) }}
               </div>
               <p class="text-xs font-black text-indigo-700 dark:text-indigo-400 truncate tracking-tight transition-colors">{{ link.user_name }}</p>
            </div>
          </div>
        </div>

        <div class="pt-8 mt-8 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between relative z-10 transition-colors">
          <div class="flex flex-col">
             <span class="text-[8px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest">Added to CRM</span>
             <span class="text-[10px] font-black text-gray-400 dark:text-gray-500">{{ formatDate(link.created_at) }}</span>
          </div>
          <div class="flex gap-4">
            <button 
              v-if="!link.user_id"
              @click="prepareLink(link)"
              class="px-6 py-2.5 bg-gray-800 dark:bg-white text-white dark:text-black rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-gray-200 dark:shadow-none hover:bg-black dark:hover:bg-gray-200 hover:scale-105 transition-all"
            >Link Now</button>
            <button 
              v-else
              @click="confirmUnlink(link)"
              class="px-6 py-2.5 text-[10px] font-black text-red-300 dark:text-red-500 uppercase tracking-widest hover:text-white hover:bg-red-500 rounded-xl transition-all border border-red-50 dark:border-red-900/30"
            >Disconnect</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredLinks.length === 0 && !loading" class="py-32 text-center bg-white dark:bg-gray-900 rounded-[3rem] shadow-sm border border-gray-50 dark:border-gray-800 transition-colors">
       <div class="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner transition-colors">
          <svg class="w-10 h-10 text-gray-200 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
       </div>
       <h3 class="text-2xl font-black text-gray-800 dark:text-white tracking-tighter mb-2">No Connections Found</h3>
       <p class="text-gray-400 dark:text-gray-500 font-bold text-sm max-w-xs mx-auto">Kami tidak menemukan data customer yang sesuai dengan filter Anda.</p>
    </div>

    <!-- Link Modal -->
    <div v-if="showLinkDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-md" @click="showLinkDialog = false"></div>
      <div class="relative bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl max-w-lg w-full p-10 animate-scale-in border border-white/20 dark:border-gray-800 transition-colors">
        <div class="header mb-10">
          <h2 class="text-3xl font-black text-gray-800 dark:text-white tracking-tighter mb-2 transition-colors">Relasikan Akun</h2>
          <p class="text-[10px] font-black text-epanen-primary uppercase tracking-[0.3em] opacity-60">Nala Intelligence Mapping</p>
        </div>
        
        <form @submit.prevent="handleLink" class="space-y-8">
          <div class="group">
            <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">Customer Identifier</label>
            <input 
              v-model="newLink.wa_identity"
              type="text" 
              placeholder="WhatsApp ID..."
              class="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none font-black text-sm text-gray-700 dark:text-white shadow-inner"
              :readonly="!!preSelectedCustomer"
            />
          </div>

          <div class="group">
            <label class="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 ml-2">Target Web Account</label>
            <div class="relative">
              <select 
                v-model="newLink.user_id"
                class="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-epanen-primary transition-all outline-none text-xs font-black text-gray-700 dark:text-gray-200 appearance-none shadow-sm"
                required
              >
                <option value="" disabled class="bg-white dark:bg-gray-800">Pilih Farmer Destination...</option>
                <option v-for="user in users" :key="user.id" :value="user.id" class="bg-white dark:bg-gray-800">{{ user.name }} ({{ user.email }})</option>
              </select>
              <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none opacity-30">
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div class="flex gap-4 pt-6">
            <button type="button" @click="showLinkDialog = false" class="flex-1 py-4 rounded-2xl text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">Cancel</button>
            <button type="submit" :disabled="saving" class="flex-1 py-4 bg-gray-800 dark:bg-white text-white dark:text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-black dark:hover:bg-gray-200 hover:-translate-y-1 transition-all disabled:opacity-50">
              {{ saving ? 'Syncing...' : 'Build Bridge' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Premium Modal Component Integration -->
    <PremiumModal 
      :show="premiumModal.show"
      :title="premiumModal.title"
      :message="premiumModal.message"
      :type="premiumModal.type"
      :confirm-text="premiumModal.confirmText"
      :show-confirm="premiumModal.showConfirm"
      @confirm="executeModalConfirm"
      @close="premiumModal.show = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import PremiumModal from '@/components/common/PremiumModal.vue';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';
const token = localStorage.getItem('epanen_token');

const loading = ref(false);
const saving = ref(false);
const syncing = ref(false);
const search = ref('');
const filterType = ref('all');
const links = ref([]);
const users = ref([]);
const preSelectedCustomer = ref(null);
const showLinkDialog = ref(false);
const newLink = ref({ user_id: '', wa_identity: '' });

// Premium Modal State Refined
const premiumModal = ref({
  show: false,
  title: '',
  message: '',
  type: 'info',
  confirmText: 'Lanjutkan',
  showConfirm: false,
  onConfirm: null
});

const linkedCount = computed(() => links.value.filter(l => l.user_id).length);

const filteredLinks = computed(() => {
  let result = links.value;
  if (filterType.value === 'unlinked') result = result.filter(l => !l.user_id);
  if (search.value) {
    const s = search.value.toLowerCase();
    result = result.filter(l => 
      l.customer_name?.toLowerCase().includes(s) || 
      l.wa_identity?.toLowerCase().includes(s) ||
      l.location?.toLowerCase().includes(s)
    );
  }
  return result;
});

const showPremiumAlert = (title, message, type = 'success') => {
  premiumModal.value = { show: true, title, message, type, showConfirm: false };
};

const showPremiumConfirm = (title, message, onConfirm, type = 'danger') => {
  premiumModal.value = { show: true, title, message, type, showConfirm: true, onConfirm, confirmText: 'Lanjutkan' };
};

const executeModalConfirm = () => {
  if (premiumModal.value.onConfirm) premiumModal.value.onConfirm();
  premiumModal.value.show = false;
};

const loadData = async () => {
  loading.value = true;
  try {
    const [linksRes, usersRes] = await Promise.all([
      axios.get(`${API_BASE}/admin/whatsapp/links`, { headers: { Authorization: `Bearer ${token}` } }),
      axios.get(`${API_BASE}/admin/users`, { headers: { Authorization: `Bearer ${token}` } })
    ]);
    links.value = linksRes.data.data || [];
    users.value = usersRes.data.data.filter(u => u.role === 'farmer') || [];
  } catch (error) {
    console.error('Failed to load data:', error);
  } finally {
    loading.value = false;
  }
};

const prepareLink = (customer) => {
  preSelectedCustomer.value = customer;
  newLink.value = { user_id: '', wa_identity: customer.wa_identity };
  showLinkDialog.value = true;
};

const handleSync = async () => {
  syncing.value = true;
  try {
    const res = await axios.post(`${API_BASE}/admin/whatsapp/sync`, {}, { headers: { Authorization: `Bearer ${token}` } });
    showPremiumAlert('Sync Selesai', res.data.message || 'Basis data customer telah diperbarui');
    loadData();
  } catch (error) {
    showPremiumAlert('Sync Gagal', 'Gagal menyinkronkan data dengan CRM eksternal', 'error');
  } finally {
    syncing.value = false;
  }
};

const handleLink = async () => {
  saving.value = true;
  try {
    await axios.post(`${API_BASE}/admin/whatsapp/link`, newLink.value, { headers: { Authorization: `Bearer ${token}` } });
    showPremiumAlert('Bridge Built', 'Identitas WhatsApp kini terhubung dengan akun web farmer');
    showLinkDialog.value = false;
    newLink.value = { user_id: '', wa_identity: '' };
    loadData();
  } catch (error) {
    showPremiumAlert('Bridge Failed', error.response?.data?.message || 'Gagal membangun koneksi akun', 'error');
  } finally {
    saving.value = false;
  }
};

const confirmUnlink = (link) => {
  showPremiumConfirm(
    'Hapus Relasi?',
    `Apakah Anda yakin ingin memutuskan hubungan antara Farmer "${link.user_name}" dengan WhatsApp identitas ini? Data history tidak akan hilang, namun akses login otomatis akan terputus.`,
    () => handleUnlink(link)
  );
};

const handleUnlink = async (link) => {
  try {
    await axios.delete(`${API_BASE}/admin/whatsapp/links/${link.id}`, { headers: { Authorization: `Bearer ${token}` } });
    showPremiumAlert('Disconnected', 'Hubungan akun telah berhasil diputuskan');
    loadData();
  } catch (error) {
    showPremiumAlert('Gagal', 'Sistem gagal memproses permintaan disconnect', 'error');
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

onMounted(() => loadData());
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
</style>
