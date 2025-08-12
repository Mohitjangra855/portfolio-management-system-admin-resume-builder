<template>
  <Teleport to="body">
    <div class="fixed top-20 right-4 z-[9999] space-y-3 max-w-sm">
      <TransitionGroup name="toast" tag="div" class="space-y-3">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="[
            'bg-white border rounded-xl shadow-xl p-5 flex items-start space-x-4 min-w-[320px] backdrop-blur-sm',
            {
              'border-green-200 bg-green-50/90': notification.type === 'success',
              'border-red-200 bg-red-50/90': notification.type === 'error',
              'border-yellow-200 bg-yellow-50/90': notification.type === 'warning',
              'border-blue-200 bg-blue-50/90': notification.type === 'info'
            }
          ]"
        >
          <!-- Icon -->
          <div class="flex-shrink-0 mt-0.5">
            <!-- Success Icon -->
            <div
              v-if="notification.type === 'success'"
              class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"
            >
              <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            
            <!-- Error Icon -->
            <div
              v-else-if="notification.type === 'error'"
              class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center"
            >
              <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            
            <!-- Warning Icon -->
            <div
              v-else-if="notification.type === 'warning'"
              class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center"
            >
              <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            
            <!-- Info Icon -->
            <div
              v-else
              class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
            >
              <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          
          <!-- Content -->
          <div class="flex-1 min-w-0">
            <h4
              v-if="notification.title"
              :class="[
                'text-sm font-semibold mb-1',
                {
                  'text-green-800': notification.type === 'success',
                  'text-red-800': notification.type === 'error',
                  'text-yellow-800': notification.type === 'warning',
                  'text-blue-800': notification.type === 'info'
                }
              ]"
            >
              {{ notification.title }}
            </h4>
            <p
              :class="[
                'text-sm leading-relaxed',
                {
                  'text-green-700': notification.type === 'success',
                  'text-red-700': notification.type === 'error',
                  'text-yellow-700': notification.type === 'warning',
                  'text-blue-700': notification.type === 'info'
                }
              ]"
            >
              {{ notification.message }}
            </p>
          </div>
          
          <!-- Close Button -->
          <div class="flex-shrink-0">
            <button
              @click="removeNotification(notification.id)"
              :class="[
                'inline-flex rounded-lg p-2 hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200',
                {
                  'text-green-400 hover:text-green-600 focus:ring-green-500': notification.type === 'success',
                  'text-red-400 hover:text-red-600 focus:ring-red-500': notification.type === 'error',
                  'text-yellow-400 hover:text-yellow-600 focus:ring-yellow-500': notification.type === 'warning',
                  'text-blue-400 hover:text-blue-600 focus:ring-blue-500': notification.type === 'info'
                }
              ]"
            >
              <span class="sr-only">Dismiss</span>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNotificationsStore } from '@/stores/notifications'

const notificationsStore = useNotificationsStore()
const { notifications } = storeToRefs(notificationsStore)
const { removeNotification } = notificationsStore
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-move {
  transition: transform 0.3s ease;
}

/* Enhanced styling for better appearance */
.space-y-3 > * + * {
  margin-top: 0.75rem;
}

/* Custom scrollbar for overflow */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .fixed {
    left: 1rem;
    right: 1rem;
    top: 5rem;
  }
  
  .min-w-\[320px\] {
    min-width: auto;
  }
}
</style>
