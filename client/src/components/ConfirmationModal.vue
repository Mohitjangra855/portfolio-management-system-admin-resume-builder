<template>
  <teleport to="body" v-if="notificationStore.confirmationModal.isVisible">
    <div 
      class="fixed inset-0 z-[9999] bg-black bg-opacity-60 flex items-center justify-center p-4"
      @click="handleBackdropClick"
    >
      <div 
        class="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="px-6 pt-6 pb-4">
          <div class="flex items-center gap-4 mb-4">
            <div 
              class="w-12 h-12 rounded-full flex items-center justify-center"
              :class="iconClasses"
            >
              <i :class="iconType" class="text-xl"></i>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">
                {{ notificationStore.confirmationModal.title }}
              </h3>
            </div>
          </div>
          
          <p class="text-gray-600 leading-relaxed text-base">
            {{ notificationStore.confirmationModal.message }}
          </p>
        </div>

        <!-- Modal Actions -->
        <div class="px-6 pb-6 flex gap-3 justify-end">
          <button
            @click="notificationStore.cancelAction()"
            class="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
          >
            {{ notificationStore.confirmationModal.cancelText }}
          </button>
          
          <button
            @click="notificationStore.confirmAction()"
            class="px-6 py-2.5 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
            :class="confirmButtonClasses"
          >
            {{ notificationStore.confirmationModal.confirmText }}
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { computed } from 'vue'
import { useNotificationsStore } from '@/stores/notifications'

const notificationStore = useNotificationsStore()

const iconClasses = computed(() => {
  const type = notificationStore.confirmationModal.type
  return {
    'bg-red-100 text-red-600': type === 'danger',
    'bg-yellow-100 text-yellow-600': type === 'warning',
    'bg-blue-100 text-blue-600': type === 'info'
  }
})

const iconType = computed(() => {
  const type = notificationStore.confirmationModal.type
  return {
    'fas fa-exclamation-triangle': type === 'danger',
    'fas fa-exclamation-circle': type === 'warning',
    'fas fa-info-circle': type === 'info'
  }
})

const confirmButtonClasses = computed(() => {
  const type = notificationStore.confirmationModal.type
  return {
    'bg-red-600 hover:bg-red-700': type === 'danger',
    'bg-yellow-600 hover:bg-yellow-700': type === 'warning',
    'bg-blue-600 hover:bg-blue-700': type === 'info'
  }
})

const handleBackdropClick = () => {
  notificationStore.cancelAction()
}
</script>

<style scoped>
/* Custom animations for modal entrance */
@keyframes modalEnter {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.bg-white {
  animation: modalEnter 0.3s ease-out;
}

/* Focus styles */
button:focus {
  outline: 2px solid transparent;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

button:focus:not(:focus-visible) {
  box-shadow: none;
}
</style>
