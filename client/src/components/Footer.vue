<template>
  <footer class="bg-gradient-to-br from-blue-600 to-purple-600 text-white mt-auto">
    <div class="max-w-6xl mx-auto px-5">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
        <div class="text-center md:text-left">
          <h3 class="text-2xl font-semibold mb-4 text-white">Portfolio</h3>
          <p class="mb-4 opacity-90 leading-relaxed">Creating beautiful and functional web experiences.</p>
          <div class="flex gap-4 justify-center md:justify-start mt-4">
            <a 
              href="#" 
              class="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full text-white no-underline transition-all duration-300 backdrop-blur-sm hover:bg-white/20 hover:-translate-y-1 hover:shadow-lg"
            >
              <i class="fab fa-github"></i>
            </a>
            <a 
              href="#" 
              class="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full text-white no-underline transition-all duration-300 backdrop-blur-sm hover:bg-white/20 hover:-translate-y-1 hover:shadow-lg"
            >
              <i class="fab fa-linkedin"></i>
            </a>
            <a 
              href="#" 
              class="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full text-white no-underline transition-all duration-300 backdrop-blur-sm hover:bg-white/20 hover:-translate-y-1 hover:shadow-lg"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a 
              href="#" 
              class="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full text-white no-underline transition-all duration-300 backdrop-blur-sm hover:bg-white/20 hover:-translate-y-1 hover:shadow-lg"
            >
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        
        <div class="text-center md:text-left">
          <h4 class="text-lg font-semibold mb-4 text-white">Quick Links</h4>
          <ul class="space-y-2">
            <li>
              <router-link 
                to="/" 
                class="text-white opacity-90 no-underline transition-all duration-300 hover:opacity-100 hover:text-yellow-300"
              >
                Home
              </router-link>
            </li>
            <li>
              <router-link 
                to="/about" 
                class="text-white opacity-90 no-underline transition-all duration-300 hover:opacity-100 hover:text-yellow-300"
              >
                About
              </router-link>
            </li>
            <li>
              <router-link 
                to="/skills" 
                class="text-white opacity-90 no-underline transition-all duration-300 hover:opacity-100 hover:text-yellow-300"
              >
                Skills
              </router-link>
            </li>
            <li>
              <router-link 
                to="/projects" 
                class="text-white opacity-90 no-underline transition-all duration-300 hover:opacity-100 hover:text-yellow-300"
              >
                Projects
              </router-link>
            </li>
          </ul>
        </div>
        
        <div class="text-center md:text-left">
          <h4 class="text-lg font-semibold mb-4 text-white">Services</h4>
          <ul class="space-y-2">
            <li class="opacity-90 transition-opacity duration-300 hover:opacity-100">Web Development</li>
            <li class="opacity-90 transition-opacity duration-300 hover:opacity-100">UI/UX Design</li>
            <li class="opacity-90 transition-opacity duration-300 hover:opacity-100">Mobile Development</li>
            <li class="opacity-90 transition-opacity duration-300 hover:opacity-100">Consulting</li>
          </ul>
        </div>
        
        <div class="text-center md:text-left">
          <h4 class="text-lg font-semibold mb-4 text-white">Contact Info</h4>
          <ul class="space-y-2">
            <li class="flex items-center justify-center md:justify-start opacity-90 transition-opacity duration-300 hover:opacity-100">
              <i class="fas fa-envelope mr-2 w-4"></i> 
              {{ userStore.user.email }}
            </li>
            <li class="flex items-center justify-center md:justify-start opacity-90 transition-opacity duration-300 hover:opacity-100">
              <i class="fas fa-phone mr-2 w-4"></i> 
              {{ userStore.user.phone }}
            </li>
            <li class="flex items-center justify-center md:justify-start opacity-90 transition-opacity duration-300 hover:opacity-100">
              <i class="fas fa-map-marker-alt mr-2 w-4"></i> 
              {{ userStore.user.address }}
            </li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-white/10 py-6 text-center">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 opacity-80">
          <p class="m-0">&copy; {{ currentYear }} Portfolio. All rights reserved.</p>
          <p class="m-0">Made with ❤️ using Vue.js</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
import { onMounted, computed } from 'vue';

const userStore = useUserStore();

const currentYear = computed(() => {
  return new Date().getFullYear();
});

onMounted(async() => {
  await userStore.fetchUserData();
});
</script>

<style scoped>
.no-underline {
  text-decoration: none;
}
</style>
