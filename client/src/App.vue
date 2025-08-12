
<template>
  <div id="app" class="min-h-screen flex flex-col font-['Poppins'] text-gray-800 leading-relaxed">
    <Navbar />
    <router-view />
    <Footer />
    <ToastNotifications />
    <ConfirmationModal />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ToastNotifications from './components/ToastNotifications.vue'
import ConfirmationModal from './components/ConfirmationModal.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    ToastNotifications,
    ConfirmationModal,
  }
}
</script>

<style>
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #2563eb 0%, #7c3aed 100%);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #7c3aed 0%, #2563eb 100%);
}

/* Global animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom utility classes for gradients and effects */
.primary-gradient {
  background: linear-gradient(45deg, #2563eb 0%, #7c3aed 100%);
}

.primary-gradient-text {
  background: linear-gradient(45deg, #2563eb 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Print styles */
@media print {
  nav, 
  footer,
  .navbar,
  .footer {
    display: none !important;
  }
}

/* Override default link styles */
a {
  text-decoration: none;
}

/* Custom component styles that need global scope */
.container-custom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Section with underline effect */
.section-title-underline::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(45deg, #2563eb 0%, #7c3aed 100%);
  border-radius: 2px;
}
</style>
