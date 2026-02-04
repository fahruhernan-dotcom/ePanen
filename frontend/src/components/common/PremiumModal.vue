<template>
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="handleCancel"></div>
      
      <!-- Modal Content -->
      <div 
        class="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl max-w-md w-full p-8 border border-white/20 dark:border-gray-800 transform transition-all overflow-hidden"
        :class="type === 'danger' ? 'border-t-8 border-t-red-500' : 'border-t-8 border-t-epanen-primary'"
      >
        <!-- Icon/Illustration -->
        <div class="flex justify-center mb-6">
          <div :class="['w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg', type === 'danger' ? 'bg-red-50 dark:bg-red-900/20 text-red-500' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-500']">
            <svg v-if="type === 'danger'" class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <svg v-else class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div class="text-center">
          <h3 class="text-2xl font-black text-gray-800 dark:text-white mb-2">{{ title }}</h3>
          <p class="text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-8">{{ message }}</p>
        </div>

        <div class="flex gap-4">
          <button 
            @click="handleCancel"
            class="flex-1 px-6 py-4 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            {{ cancelText }}
          </button>
          <button 
            @click="handleConfirm"
            :class="['flex-1 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg transition-all hover:scale-[1.02] active:scale-95 text-white', type === 'danger' ? 'bg-red-500 shadow-red-200 dark:shadow-none' : 'bg-epanen-primary shadow-epanen-primary/20 dark:shadow-none']"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String,
  message: String,
  type: {
    type: String,
    default: 'info'
  },
  confirmText: {
    type: String,
    default: 'Lanjutkan'
  },
  cancelText: {
    type: String,
    default: 'Batal'
  }
});

const emit = defineEmits(['confirm', 'cancel']);

const handleConfirm = () => emit('confirm');
const handleCancel = () => emit('cancel');
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative {
  animation: modal-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-leave-active .relative {
  animation: modal-in 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) reverse;
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>
