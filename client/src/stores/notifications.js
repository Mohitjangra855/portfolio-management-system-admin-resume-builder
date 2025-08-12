import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [],
    confirmationModal: {
      isVisible: false,
      title: '',
      message: '',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      type: 'danger', // danger, warning, info
      onConfirm: null,
      onCancel: null
    }
  }),
  
  actions: {
    addNotification(notification) {
      const id = Date.now()
      const newNotification = {
        id,
        type: notification.type || 'info', // success, error, warning, info
        title: notification.title || '',
        message: notification.message || '',
        duration: notification.duration || 5000
      }
      
      this.notifications.push(newNotification)
      
      // Auto remove after duration
      setTimeout(() => {
        this.removeNotification(id)
      }, newNotification.duration)
      
      return id
    },
    
    removeNotification(id) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index > -1) {
        this.notifications.splice(index, 1)
      }
    },
    
    clearAll() {
      this.notifications = []
    },

    // Confirmation Modal Methods
    showConfirmation({ title, message, confirmText = 'Delete', cancelText = 'Cancel', type = 'danger' }) {
      return new Promise((resolve) => {
        this.confirmationModal = {
          isVisible: true,
          title,
          message,
          confirmText,
          cancelText,
          type,
          onConfirm: () => {
            this.hideConfirmation()
            resolve(true)
          },
          onCancel: () => {
            this.hideConfirmation()
            resolve(false)
          }
        }
      })
    },

    hideConfirmation() {
      this.confirmationModal.isVisible = false
      this.confirmationModal.onConfirm = null
      this.confirmationModal.onCancel = null
    },

    confirmAction() {
      if (this.confirmationModal.onConfirm) {
        this.confirmationModal.onConfirm()
      }
    },

    cancelAction() {
      if (this.confirmationModal.onCancel) {
        this.confirmationModal.onCancel()
      }
    }
  }
})
