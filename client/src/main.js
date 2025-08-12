import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Import Tailwind CSS
import './assets/styles.css'

// Import Font Awesome CSS
import '@fortawesome/fontawesome-free/css/all.min.css'

// Import Google Fonts
const link = document.createElement('link')
link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
link.rel = 'stylesheet'
document.head.appendChild(link)

// Create Pinia store
const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)

// Initialize auth state after mounting
app.mount('#app')


