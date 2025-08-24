
<template>
  <nav 
    :class="[
      'h-[70px] fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out',
      isScrolled 
        ? 'bg-white/98 backdrop-blur-xl shadow-lg py-2' 
        : 'bg-white/95 backdrop-blur-xl py-4'
    ]"
  >
    <div class="max-w-6xl mx-auto px-5">
      <div class="flex justify-between items-center h-full">
        <router-link to="/" class="no-underline">
          <span class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
           {--}
          </span>
        </router-link>
        
        <!-- Desktop Navigation Container -->
        <div class="hidden md:flex md:items-center md:gap-8">
          <!-- Desktop Navigation Links -->
          <router-link 
            to="/" 
            class="relative text-gray-800 font-medium transition-all duration-300 py-2 px-1 group no-underline hover:text-blue-600"
          >
            Home
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </router-link>
          
          <router-link 
            to="/about" 
            class="relative text-gray-800 font-medium transition-all duration-300 py-2 px-1 group no-underline hover:text-blue-600"
          >
            About
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </router-link>
          
          <router-link 
            to="/skills" 
            class="relative text-gray-800 font-medium transition-all duration-300 py-2 px-1 group no-underline hover:text-blue-600"
          >
            Skills
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </router-link>
          
          <router-link 
            to="/projects" 
            class="relative text-gray-800 font-medium transition-all duration-300 py-2 px-1 group no-underline hover:text-blue-600"
          >
            Projects
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </router-link>
          
          <router-link 
            to="/contact" 
            class="relative text-gray-800 font-medium transition-all duration-300 py-2 px-1 group no-underline hover:text-blue-600"
          >
            Contact
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </router-link>
          
          <router-link 
            to="/resume" 
            class="relative text-gray-800 font-medium transition-all duration-300 py-2 px-1 group no-underline hover:text-blue-600"
          >
            Resume
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </router-link>
          
          <!-- Desktop Logout Button -->
          <button
            v-if="isAuthenticated"
            @click="handleLogout"
            class="relative text-red-600 font-medium transition-all duration-300 px-3 py-2 group hover:text-red-700 rounded-lg hover:bg-red-50 ml-4"
          >
            <i class="fas fa-sign-out-alt mr-2"></i>Logout
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>
        
        <!-- Mobile Menu Container -->
        <div 
          :class="[
            'md:hidden fixed top-0 h-screen w-4/5 max-w-sm bg-white shadow-2xl flex flex-col justify-center transition-all duration-300 ease-in-out z-[1000] p-8',
            mobileMenuOpen ? 'right-0' : '-right-full'
          ]"
        >
          <!-- Mobile Navigation Links -->
          <router-link 
            to="/" 
            @click="closeMobileMenu"
            class="relative text-gray-800 font-medium transition-all duration-300 py-4 px-1 group text-xl no-underline hover:text-blue-600"
          >
            Home
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </router-link>
          
          <router-link 
            to="/about" 
            @click="closeMobileMenu"
            class="relative text-gray-800 font-medium transition-all duration-300 py-4 px-1 group text-xl no-underline hover:text-blue-600"
          >
            About
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </router-link>
          
          <router-link 
            to="/skills" 
            @click="closeMobileMenu"
            class="relative text-gray-800 font-medium transition-all duration-300 py-4 px-1 group text-xl no-underline hover:text-blue-600"
          >
            Skills
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </router-link>
          
          <router-link 
            to="/projects" 
            @click="closeMobileMenu"
            class="relative text-gray-800 font-medium transition-all duration-300 py-4 px-1 group text-xl no-underline hover:text-blue-600"
          >
            Projects
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </router-link>
          
          <router-link 
            to="/contact" 
            @click="closeMobileMenu"
            class="relative text-gray-800 font-medium transition-all duration-300 py-4 px-1 group text-xl no-underline hover:text-blue-600"
          >
            Contact
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </router-link>
          
          <router-link 
            to="/resume" 
            @click="closeMobileMenu"
            class="relative text-gray-800 font-medium transition-all duration-300 py-4 px-1 group text-xl no-underline hover:text-blue-600"
          >
            Resume
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </router-link>
          
          <!-- Mobile Auth Button -->
          <button
            v-if="isAuthenticated"
            @click="handleLogoutAndCloseMenu"
            class="relative text-red-600 font-medium transition-all duration-300 py-4 px-1 group text-xl hover:text-red-700 text-left"
          >
            <i class="fas fa-sign-out-alt mr-2"></i>Logout
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>
        
        <div 
          :class="[
            'md:hidden flex flex-col cursor-pointer p-2 z-[1001]',
            mobileMenuOpen ? 'fixed right-5 top-5' : ''
          ]"
          @click="toggleMobileMenu"
        >
          <span 
            :class="[
              'w-6 h-0.5 bg-gray-800 my-1 transition-all duration-300 rounded-sm',
              mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            ]"
          ></span>
          <span 
            :class="[
              'w-6 h-0.5 bg-gray-800 my-1 transition-all duration-300 rounded-sm',
              mobileMenuOpen ? 'opacity-0' : ''
            ]"
          ></span>
          <span 
            :class="[
              'w-6 h-0.5 bg-gray-800 my-1 transition-all duration-300 rounded-sm',
              mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            ]"
          ></span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { checkAuthAndMatch } from "@/services/checkLogin";
import { useAuthStore } from "@/stores/auth";
import { useNotificationsStore } from "@/stores/notifications";
import { useRouter } from "vue-router";
import { onMounted, watch, ref, onUnmounted } from "vue";

const authStore = useAuthStore();
const notificationStore = useNotificationsStore();
const router = useRouter();

// Mobile menu state
const isScrolled = ref(false);
const mobileMenuOpen = ref(false);

// Authentication state - using ref for better reactivity
const isAuthenticated = ref(false);

// Update authentication state based on store
const updateAuthState = () => {
  const newAuthState = !!(authStore.isAuthenticated && authStore.user);
  if (isAuthenticated.value !== newAuthState) {
    console.log('Updating auth state:', isAuthenticated.value, '->', newAuthState);
    console.log('Auth store details:', {
      isAuthenticated: authStore.isAuthenticated,
      hasUser: !!authStore.user,
      userEmail: authStore.user?.email
    });
    isAuthenticated.value = newAuthState;
  }
};

// Mobile menu functions
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

// Scroll handler
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// Logout function
const handleLogout = async () => {
  try {
    console.log('Starting logout process...');
    
    // Call auth store logout
    await authStore.logout();
    
    // Force update auth state immediately
    isAuthenticated.value = false;
    
    console.log('Logout completed successfully');
    
    notificationStore.addNotification({
      type: 'success',
      title: 'Success!',
      message: 'Logged out successfully!'
    });
    
    // Redirect to home page
    router.push('/');
    
  } catch (error) {
    console.error('Logout error:', error);
    
    // Even if error, force clear local state
    isAuthenticated.value = false;
    
    notificationStore.addNotification({
      type: 'warning',
      title: 'Logged Out',
      message: 'You have been logged out (with some errors).'
    });
    
    // Still redirect to home
    router.push('/');
  }
};

// Logout function that also closes mobile menu
const handleLogoutAndCloseMenu = async () => {
  console.log('Logout clicked - closing menu and logging out');
  closeMobileMenu();
  await handleLogout();
};

// Also check authentication on mount
onMounted(async () => {
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  try {
    console.log('Navbar mounting - checking auth...');
    const authResult = await checkAuthAndMatch();
    console.log('Navbar auth check result:', authResult);
    console.log('Auth store status before sync:', authStore.isAuthenticated);
    
    // If backend auth passes, sync auth store with backend user data
    if (authResult) {
      // Get fresh user data from backend and update auth store
      try {
        await authStore.checkAuth(); // This will get user from backend and set in auth store
        console.log('Auth store synced with backend');
        console.log('Auth store status after sync:', authStore.isAuthenticated);
      } catch (error) {
        console.error('Failed to sync auth store:', error);
      }
    } else {
      console.log('Backend auth check failed, clearing auth store');
      authStore.setUser(null);
    }
    
    // Force update auth state
    updateAuthState();
  } catch (error) {
    console.error('Navbar auth check error:', error);
  }
});

// Cleanup
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Watch for auth changes
watch(() => authStore.isAuthenticated, (newVal, oldVal) => {
  console.log('Auth store isAuthenticated changed:', oldVal, '->', newVal);
  updateAuthState();
}, { immediate: true });

// Watch for user changes  
watch(() => authStore.user, (newUser, oldUser) => {
  console.log('Auth store user changed:', oldUser?.email || 'null', '->', newUser?.email || 'null');
  updateAuthState();
}, { immediate: true, deep: true });

// Watch for our local auth state changes
watch(isAuthenticated, (newVal, oldVal) => {
  console.log('Navbar isAuthenticated changed:', oldVal, '->', newVal);
}, { immediate: true });
</script>

<style scoped>
/* Active router link styling */
.router-link-active {
  color: #2563eb !important;
}

.router-link-active span {
  width: 100% !important;
}

/* Remove default link styling */
.no-underline {
  text-decoration: none;
}
</style>
