<template>
  <div class="contact pt-20">
    <!-- Hero Section -->
    <section class="contact-hero bg-gradient-to-br from-blue-100/10 via-purple-100/10 to-indigo-100/10 py-16">
      <div class="container max-w-6xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Contact Me</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          I'd love to hear from you! Whether it's a project idea, a question, or
          just to say hi.
        </p>
      </div>
    </section>

    <!-- Main Contact Grid -->
    <section class="contact-content py-16">
      <div class="container max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <!-- Left: Info -->
          <div class="contact-info">
            <h2 class="text-3xl font-bold mb-6 text-gray-800">Get in Touch</h2>
            <p class="text-gray-600 leading-relaxed mb-8">
              I'm always open to discussing new opportunities, collaborations, or
              just chatting about tech.
            </p>

            <div class="contact-methods mb-12">
              <div
                class="contact-method flex gap-4 mb-6 p-6 bg-white rounded-xl shadow-md hover:-translate-y-1 transition-all duration-300"
                v-for="(item, index) in contactMethods"
                :key="index"
              >
                <div class="method-icon w-12 h-12 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                  <i :class="item.icon"></i>
                </div>
                <div class="method-info">
                  <h4 class="font-semibold text-gray-800 mb-1">{{ item.label }}</h4>
                  <p class="text-gray-600 mb-2">{{ item.detail }}</p>
                  <a
                    :href="item.link"
                    class="text-primary hover:text-primary-dark font-medium text-sm transition-colors"
                    v-if="item.link"
                    target="_blank"
                    >Reach out</a
                  >
                </div>
              </div>
            </div>

            <div class="social-section">
              <h3 class="text-xl font-semibold mb-4 text-gray-800">Follow Me</h3>
              <div class="social-links flex gap-4 flex-wrap">
                <a
                  v-for="(social, index) in socialLinks"
                  :key="index"
                  :href="social.link"
                  target="_blank"
                  class="social-link flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-full hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 font-medium"
                >
                  <i :class="social.icon"></i>
                  {{ social.platform }}
                </a>
              </div>
            </div>
          </div>

          <!-- Right: Form -->
          <div class="form-container bg-white p-8 rounded-2xl shadow-lg">
            <h2 class="text-3xl font-bold mb-6 text-gray-800">Send a Message</h2>
            <p class="text-gray-600 mb-8">
              Use the form below to reach out and I'll get back to you as soon as
              possible.
            </p>

            <form class="contact-form space-y-6" @submit.prevent="submitForm">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="form-group">
                  <label for="name" class="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder="Your Name"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="Your Email"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="subject" class="block text-gray-700 font-medium mb-2">Subject</label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  placeholder="Subject"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div class="form-group">
                <label for="message" class="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  placeholder="Write your message..."
                  rows="5"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors resize-vertical"
                  required
                ></textarea>
              </div>

              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" v-model="form.agree" class="sr-only" />
                <div class="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center transition-all" :class="form.agree ? 'bg-primary border-primary' : ''">
                  <i v-if="form.agree" class="fas fa-check text-white text-xs"></i>
                </div>
                <span class="text-gray-600">I agree to be contacted.</span>
              </label>

              <button 
                type="submit" 
                class="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
                :disabled="isSubmitting"
              >
                <i class="fas fa-paper-plane"></i>
                {{ isSubmitting ? "Sending..." : "Send Message" }}
              </button>

              <div
                v-if="submitStatus"
                class="submit-message p-4 rounded-lg flex items-center gap-2 font-medium"
                :class="{
                  'bg-green-100 text-green-800 border border-green-200': submitStatus === 'success',
                  'bg-red-100 text-red-800 border border-red-200': submitStatus === 'error'
                }"
              >
                <i
                  :class="
                    submitStatus === 'success'
                      ? 'fas fa-check-circle'
                      : 'fas fa-times-circle'
                  "
                ></i>
                {{ submitMessage }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "@/stores/userStore";

// Get store
const userStore = useUserStore();

// Form data
const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
  agree: false,
});

const isSubmitting = ref(false);
const submitStatus = ref("");
const submitMessage = ref("");

// Dummy fallback if userStore doesn't have user yet
const dummyUser = {
  email: "you@example.com",
  phone: "+91 98765 43210",
  address: "123 Main St, City, Country",
};

// Provide computed user (store or fallback)
const user = computed(() => userStore.user || dummyUser);
// Dummy contact methods
const contactMethods = computed(() => [
  {
    label: "Email",
    detail: user.value.email,
    icon: "fas fa-envelope",
    link: `mailto:${user.value.email}`,
  },
  {
    label: "Phone",
    detail: user.value.phone,
    icon: "fas fa-phone",
    link: `tel:${user.value.phone}`,
  },
  {
    label: "Location",
    detail: user.value.address,
    icon: "fas fa-map-marker-alt",
    link: "",
  },
]);

const dummySocialLinks = {
  linkedin: "https://linkedin.com/in/your-profile",
  github: "https://github.com/your-username",
};
const userSocialLinks = computed(() => userStore.user || dummySocialLinks);
const socialLinks = [
  {
    platform: "LinkedIn",
    icon: "fab fa-linkedin",
    link: userSocialLinks.value.linkedin,
  },
  {
    platform: "GitHub",
    icon: "fab fa-github",
    link: userSocialLinks.value.github,
  },
];

// Submit handler
async function submitForm() {
  isSubmitting.value = true;
  submitStatus.value = "";
  submitMessage.value = "";

  try {
    await new Promise((res) => setTimeout(res, 1500)); // simulate delay
    submitStatus.value = "success";
    submitMessage.value = "Message sent successfully!";
    console.log('Form submitted:', form.value);

    form.value = {
      name: "",
      email: "",
      subject: "",
      message: "",
      agree: false,
    };
    setTimeout(() => {
      submitStatus.value = "";
      submitMessage.value = "";
    }, 3000);
  } catch (err) {
    submitStatus.value = "error";
    submitMessage.value = "Something went wrong. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
}

// Load user
onMounted(async () => {
  try {
    await userStore.fetchUserData?.();
  } catch (e) {
    console.warn("Using fallback user");
  }
});
</script>

<style scoped>
/* Minimal custom styles for enhanced interactions */
.contact-method:hover {
  transform: translateY(-4px);
}

.social-link:hover {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .contact-method {
    flex-direction: column;
    text-align: center;
  }
  
  .social-links {
    justify-content: center;
  }
}
</style>
