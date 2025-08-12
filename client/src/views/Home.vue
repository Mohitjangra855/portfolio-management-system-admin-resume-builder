<template>
  <div class="home">
    <!-- Hero Section -->
    <section
      class="hero min-h-screen flex items-center relative overflow-hidden pt-20"
    >
      <div
        class="hero-background absolute inset-0 bg-gradient-to-br from-blue-100/10 via-purple-100/10 to-indigo-100/10 -z-10"
      >
        <div class="floating-shapes absolute w-full h-full">
          <div
            class="shape shape-1 absolute top-1/5 left-1/10 w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full opacity-10 animate-float"
          ></div>
          <div
            class="shape shape-2 absolute top-3/5 right-1/10 w-15 h-15 bg-gradient-to-br from-primary-dark to-primary rounded-3xl opacity-10 animate-float"
            style="animation-delay: 2s"
          ></div>
          <div
            class="shape shape-3 absolute bottom-1/5 left-1/5 w-25 h-25 bg-gradient-to-br from-primary to-primary-dark rounded-2xl opacity-10 animate-float"
            style="animation-delay: 4s"
          ></div>
          <div
            class="shape shape-4 absolute top-1/3 right-1/3 w-18 h-18 bg-gradient-to-br from-primary-dark to-primary rounded-full opacity-10 animate-float"
            style="animation-delay: 1s"
          ></div>
        </div>
      </div>

      <div class="container">
        <div
          class="hero-content grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]"
        >
          <div class="hero-text text-center lg:text-left">
            <h2 class="hero-greeting text-2xl text-primary mb-4 font-medium">
              Hello, I'm
            </h2>
            <h1
              class="text-primary hero-name text-4xl md:text-6xl mb-4 font-bold"
            >
              {{ user.name }}
            </h1>
            <h3
              class="hero-title text-2xl md:text-3xl text-gray-800 mb-6 font-normal"
            >
              {{ user.title }}
            </h3>
            <p
              class="hero-description text-lg text-gray-600 mb-8 leading-relaxed"
            >
              {{ summary }}
            </p>

            <div
              class="hero-buttons flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start"
            >
              <router-link to="/projects" class="btn btn-primary"
                >View My Work</router-link
              >
              <router-link to="/contact" class="btn btn-outline"
                >Get In Touch</router-link
              >
            </div>

            <div class="hero-social flex gap-4 justify-center lg:justify-start">
              <a
                :href="user.github"
                class="social-icon flex items-center justify-center w-11 h-11 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30"
              >
                <i class="fab fa-github"></i>
              </a>
              <a
                :href="user.linkedin"
                class="social-icon flex items-center justify-center w-11 h-11 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30"
              >
                <i class="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          <div class="hero-image flex justify-center items-center">
            <div
              class="image-container relative w-80 h-96 md:w-96 md:h-[400px]"
            >
              <img
                :src="user.image"
                alt="Profile Picture"
                class="profile-img w-full h-full object-cover rounded-3xl shadow-2xl transition-all duration-300"
              />
              <div
                class="image-decoration absolute -top-5 -right-5 w-25 h-25 bg-gradient-to-r from-primary to-primary-dark rounded-full opacity-80 -z-10 animate-pulse-custom"
              ></div>
            </div>
          </div>
        </div>

        <div
          class="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-custom"
        >
          <div class="scroll-arrow text-primary text-2xl">
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick About Section -->
    <section class="quick-about bg-white py-16">
      <div class="container">
        <div class="quick-about-content">
          <div class="stats grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div class="stat-item">
              <h3 class="text-4xl mb-2">{{ totalUserExperience }}</h3>
              <p class="text-gray-600 font-medium">Years Experience</p>
            </div>
            <div class="stat-item">
              <h3 class="text-4xl mb-2">
                {{ projectStore.getProjects.length }}
              </h3>
              <p class="text-gray-600 font-medium">Projects Completed</p>
            </div>
            <div class="stat-item">
              <h3 class="text-4xl mb-2">{{ skillsStore.getSkills.length }}</h3>
              <p class="text-gray-600 font-medium">Technologies</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Preview -->
    <section class="skills-preview bg-gray-50 py-16">
      <div class="container">
        <h2
          class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
        >
          Technical Skills
        </h2>
        <div
          class="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          <div
            v-for="skill in skillsStore.getSortedSkills.slice(0, 6)"
            :key="skill.id"
            class="skill-card bg-white p-8 rounded-2xl text-center transition-all duration-300 shadow-lg hover:-translate-y-3 hover:shadow-xl"
          >
            <div
              class="skill-icon w-15 h-15 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl"
            >
              <img
                class="w-full h-full object-cover rounded-full"
                :src="skill.image"
                :alt="skill.name"
              />
            </div>
            <h4 class="text-xl font-semibold mb-4 text-gray-800">
              {{ skill.name }}
            </h4>
            <p class="text-gray-600 leading-relaxed">{{ skill.description }}</p>
            <div class="mt-4">
              <div class="bg-gray-200 rounded-full h-2 mb-2">
                <div
                  class="bg-gradient-to-r from-primary to-primary-dark h-2 rounded-full transition-all duration-500"
                  :style="`width: ${skill.proficiency}%`"
                ></div>
              </div>
              <span class="text-sm text-gray-500"
                >{{ skill.proficiency }}% Proficiency</span
              >
            </div>
          </div>
        </div>
        <div class="text-center">
          <router-link to="/skills#skills" class="btn btn-primary"
            >View All Skills</router-link
          >
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="featured-projects py-16">
      <div class="container">
        <h2
          class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
        >
          Featured Projects
        </h2>
        <div
          class="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          <div
            v-for="project in projectStore.getSortedProjects.slice(0, 6)"
            :key="project.id"
            class="project-card relative bg-white rounded-2xl overflow-hidden transition-all duration-300 shadow-xl hover:-translate-y-3 hover:shadow-2xl"
          >
            <div class="project-image relative h-48 overflow-hidden">
              <img
                :src="
                  project.image ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUhIEOpEBie-LYpu0KOJUPokK5A0qM1wj6iw&s'
                "
                :alt="project.title"
                class="w-full h-full object-cover transition-all duration-300"
              />
              <div
                class="project-overlay absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100"
              >
                <div class="project-links flex gap-4">
                  <a
                    v-if="project.liveUrl"
                    :href="project.liveUrl"
                    class="project-link flex items-center justify-center w-10 h-10 bg-white text-primary rounded-full no-underline transition-all duration-300 hover:bg-primary hover:text-white hover:scale-110"
                    target="_blank"
                  >
                    <i class="fas fa-external-link-alt"></i>
                  </a>
                  <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    class="project-link flex items-center justify-center w-10 h-10 bg-white text-primary rounded-full no-underline transition-all duration-300 hover:bg-primary hover:text-white hover:scale-110"
                    target="_blank"
                  >
                    <i class="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="project-content ">
              <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-xl font-semibold text-gray-800">
                    {{ project.title }}
                  </h4>
                  <span
                    class="px-2 py-1 text-xs font-medium rounded-full"
                    :class="{
                      'bg-green-100 text-green-800':
                        project.status === 'completed',
                      'bg-blue-100 text-blue-800': project.status === 'ongoing',
                      'bg-yellow-100 text-yellow-800':
                        project.status === 'starting',
                      'bg-red-100 text-red-800': project.status === 'cancelled',
                    }"
                  >
                    {{ project.status }}
                  </span>
                </div>
                <p class="text-gray-600 mb-4 leading-relaxed">
                  
                    {{ project.description.slice(0, 100)
                   }}{{ project.description.length > 100 ? "..." : "" }}
                   <span v-if="project.description.length > 100">
    ... <router-link :to="`/projects#project-${project.id}`" class="text-primary underline text-xs">See More</router-link>
  </span>
               
                </p>
                <div class="project-tech flex flex-wrap gap-2 mb-3">
                  <span
                    v-for="tech in project.technologies.slice(0,4)"
                    :key="tech"
                    class="tech-tag bg-gray-100 px-3 py-1 rounded-2xl text-sm text-primary font-medium"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <div
                class="text-sm text-gray-500 absolute bottom-4 left-4 right-4"
              >
                <div class="flex justify-between items-center w-full">
                  <span>Duration:</span>
                  <span>{{ project.duration }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <router-link to="/projects#projects" class="btn btn-primary"
            >View All Projects</router-link
          >
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section
      v-if="companyStore.getCompanies.length > 0"
      class="experience bg-gray-50 py-16"
    >
      <div class="container">
        <h2
          class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
        >
          Work Experience
        </h2>
        <div class="experience-timeline max-w-4xl mx-auto">
          <div
            v-for="company in companyStore.getSortedCompanies.slice(0, 3)"
            :key="company.id"
            class="timeline-item relative mb-8 ml-8"
          >
            <div
              class="timeline-marker absolute -left-6 top-0 w-4 h-4 bg-gradient-to-r from-primary to-primary-dark rounded-full border-4 border-white shadow-lg"
            ></div>
            <div class="timeline-content bg-white p-6 rounded-2xl shadow-lg">
              <h4 class="text-xl font-bold text-gray-800 mb-1">
                {{ company.position }}
              </h4>
              <h5 class="text-lg font-semibold text-primary mb-2">
                {{ company.company }}
              </h5>
              <p class="text-sm text-gray-500 mb-3">
                {{ getMonthName(company.startMonth) }} {{ company.startYear }} -
                <span v-if="company.endMonth && company.endYear">
                  {{ getMonthName(company.endMonth) }} {{ company.endYear }}
                </span>
                <span v-else>Present</span><br />
                <span>{{ calculateDuration(company) }}</span>
              </p>
              <p class="text-gray-600 leading-relaxed">
                {{ company.description }}
              </p>
            </div>
          </div>
        </div>
        <div class="text-center mt-8">
          <router-link to="/about#journey" class="btn btn-primary"
            >View Full Experience</router-link
          >
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section
      v-if="educationStore.getEducation.length > 0"
      class="education py-16"
    >
      <div class="container">
        <h2
          class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
        >
          Education
        </h2>
        <div
          class="education-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div
            v-for="edu in educationStore.getSortedEducation.slice(0, 3)"
            :key="edu.id"
            class="education-card bg-white p-6 rounded-2xl transition-all duration-300 shadow-lg hover:-translate-y-2 hover:shadow-xl"
          >
            <div class="education-header mb-4">
              <h4 class="text-xl font-bold text-gray-800 mb-2">
                {{ edu.degree }}
              </h4>
              <h5 class="text-lg font-semibold text-primary mb-2">
                {{ edu.institution }}
              </h5>
              <p class="text-sm text-gray-500">
                {{ edu.startDate }} - {{ edu.endDate }}
              </p>
            </div>
            <div class="education-details">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Duration:</span>
                <span class="text-sm font-medium text-gray-800"
                  >{{ edu.totalYears }} year(s)</span
                >
              </div>
              <div v-if="edu.description" class="mt-3">
                <p class="text-gray-600 text-sm leading-relaxed">
                  {{ edu.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-8">
          <router-link to="/skills#education" class="btn btn-primary"
            >View All Education</router-link
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useCompanyStore } from "@/stores/companyStore";
import { useProjectStore } from "@/stores/projectStore";
import { useSkillsStore } from "@/stores/skillsStore";
import { useEducationStore } from "@/stores/educationStore";
import { checkAuthAndMatch } from "@/services/checkLogin";

const isAuthenticated = ref(false);

const userStore = useUserStore();
const companyStore = useCompanyStore();
const projectStore = useProjectStore();
const skillsStore = useSkillsStore();
const educationStore = useEducationStore();
const totalUserExperience = ref("");
const summary = computed(() => {
  return (
    userStore.user?.bio.replace(/\d+/, totalUserExperience.value) ||
    "A passionate Full Stack Developer with expertise in building scalable web applications."
  );
});
// Computed properties with proper fallbacks
const user = computed(() => {
  // console.log("Computing user data ", userStore.user);
  // console.log("UserStore state:", {
  //   user: userStore.user,
  //   skills: userStore.skills?.length,
  //   projects: userStore.projects?.length,
  //   companies: userStore.companies?.length,
  //   education: userStore.education?.length
  // });

  return userStore.user;
});
// yha pr user ki compines ko console krvana hai isko user.companies likh skte hai kya?
// userStore.user.companies directly use kar rahe hain

// Calculate total experience across all companies
const calculateTotalExperience = () => {
  const companies = companyStore.getCompanies || [];
  let totalMonths = 0;

  companies.forEach((company) => {
    const startYear = company.startYear || 0;
    const startMonth = company.startMonth || 1;
    const endYear = company.endYear || new Date().getFullYear();
    const endMonth = company.endMonth || new Date().getMonth() + 1;

    const companyMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
    totalMonths += companyMonths > 0 ? companyMonths : 0;
  });

  if (totalMonths < 1) {
    totalUserExperience.value = "0.1";
    return "0.1";
  }

  // Convert months to decimal years (e.g., 32 months = 2.7 years)
  const Years = Math.floor(totalMonths / 12);
  const Months = totalMonths % 12;
  console.log("Total Experience in Years and Months: ", Years, Months);
  totalUserExperience.value = `${Years}.${Months}`;
  return totalUserExperience.value;
};

// Calculate duration for individual job (for display in timeline)
const calculateDuration = (job) => {
  const startYear = job.startYear || 0;
  const startMonth = job.startMonth || 1;
  const endYear = job.endYear || new Date().getFullYear();
  const endMonth = job.endMonth || new Date().getMonth() + 1;

  let totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);

  if (totalMonths < 1) return "Less than 1 month";

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years === 0 && months === 0) {
    return "No experience";
  } else if (years === 0) {
    return `${months} month${months > 1 ? "s" : ""}`;
  } else if (months === 0) {
    return `${years} year${years > 1 ? "s" : ""}`;
  } else {
    return `${years} year${years > 1 ? "s" : ""} ${months} month${
      months > 1 ? "s" : ""
    }`;
  }
};
onMounted(async () => {
  try {
    // First fetch user data which contains all the information
    await userStore.fetchUserData();
    console.log("User data fetched successfully:", userStore.user);
    isAuthenticated.value = await checkAuthAndMatch();
    // Populate individual stores with user data if they don't have data
    if (userStore.user.companies && userStore.user.companies.length > 0) {
      companyStore.setCompanies(userStore.user.companies);
    }

    if (userStore.user.projects && userStore.user.projects.length > 0) {
      projectStore.setProjects(userStore.user.projects);
    }

    if (userStore.user.skills && userStore.user.skills.length > 0) {
      skillsStore.setSkills(userStore.user.skills);
    }

    if (userStore.user.education && userStore.user.education.length > 0) {
      educationStore.setEducation(userStore.user.education);
    }

    console.log("All stores populated successfully");
    calculateTotalExperience();
  } catch (error) {
    console.error("Error fetching data in Home:", error);
  }
});

function getMonthName(monthNumber) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthNumber - 1] || "";
}
</script>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
/* Custom styles for hover effects */
.project-card:hover .project-overlay {
  opacity: 1;
}

/* Experience timeline styles */
.experience-timeline {
  position: relative;
}

.experience-timeline::before {
  content: "";
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}

.timeline-marker {
  z-index: 10;
}

/* Education card hover effects */
.education-card:hover {
  transform: translateY(-8px);
}

/* Gradient text utility */
.gradient-text {
  background: linear-gradient(45deg, #2563eb, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
