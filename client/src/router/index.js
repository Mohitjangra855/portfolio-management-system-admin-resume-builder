import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import About from "../views/About.vue";
import Skills from "../views/Skills.vue";
import Projects from '../views/Projects.vue'
import Contact from '../views/Contact.vue'
import Resume from '../views/Resume.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/skills",
    name: "Skills",
    component: Skills,
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
      path: '/resume',
      name: 'Resume',
    component: Resume
  },
  {
    path: '/:catchAll(.*)',
    name: 'PageNotFound',
    component: PageNotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      // Handle hash navigation with a delay for DOM rendering
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth',
            top: 0
          });
        }, 500);
      });
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

// Navigation guard for authentication
// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//     const authStore = useAuthStore()
//     authStore.checkAuth()

//     if (!authStore.isAdmin) {
//       // Redirect to home if not authenticated as admin
//       next('/')
//       return
//     }
//   }
//   next()
// })

export default router;
