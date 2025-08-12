import { useUserStore } from "@/stores/userStore";
import { useAuthStore } from "@/stores/auth";
import { authApi } from "@/services/api";

// Backend se authentication status check करने के लिए
const checkAuthFromBackend = async () => {
  try {
    // Auth check API call करते हैं जो cookies automatically check करती है
    const response = await authApi.checkAuth();
    if (response?.success && response?.user) {
      console.log("Backend auth check passed:", response.user);
      return response.user;
    }
    return null;
  } catch (error) {
    console.warn("Backend auth check failed:", error);
    return null;
  }
};

export const checkAuthAndMatch = async () => {
  try {
    // 1. Backend से authentication check करते हैं
    const backendUser = await checkAuthFromBackend();
    if (!backendUser) {
      console.warn("Backend authentication failed");
      return false;
    }

    // 2. Auth store में backend user को set करते हैं
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated || authStore.user?.id !== backendUser.id) {
      authStore.setUser(backendUser);
      console.log("Auth store updated with backend user");
    }

    // 3. User store भी sync करते हैं अगर जरूरत हो
    const userStore = useUserStore();
    if (!userStore.user?.id || userStore.user.id !== backendUser.id) {
      // Update userStore with real backend data
      userStore.user = { ...userStore.user, ...backendUser };
      console.log("User store synced with backend user");
    }

    console.log("Authentication check passed - User authenticated");
    return true;
  } catch (error) {
    console.error("Auth check error:", error);
    return false;
  }
};
