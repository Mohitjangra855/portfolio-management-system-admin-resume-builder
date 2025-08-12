<template>
  <div class="resume">
    <!-- Resume Hero -->
    <section
      class="pt-24 pb-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
    >
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h1
          class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Resume
        </h1>
        <p class="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Download my resume or view my professional experience online
        </p>
        <div class="flex justify-center gap-4 flex-wrap">
          <a
            href="/Mohit_Kumar_Resume.pdf"
            download="Mohit_Kumar_Resume.pdf"
            class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:-translate-y-1 shadow-lg"
          >
            <i class="fas fa-download"></i>
            Download PDF
          </a>
          <button
            @click="printResume"
            class="flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
          >
            <i class="fas fa-print"></i>
            Print Resume
          </button>
        </div>
      </div>
    </section>

    <!-- Resume Content -->
    <section class="py-16" id="resume-content">
      <div class="max-w-4xl mx-auto px-4">
        <div
          class="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
          v-if="personalInfo"
        >
          <!-- Header -->
          <div class="text-center mb-8 pb-8 border-b-2 border-gray-100">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {{ personalInfo.name }}
            </h1>
            <h2 class="text-xl text-blue-600 font-medium mb-6">
              {{ personalInfo.title }}
            </h2>
            <div class="flex flex-wrap justify-center gap-6">
              <div
                v-if="personalInfo.email"
                class="flex items-center gap-2 text-gray-600"
              >
                <i class="fas fa-envelope text-blue-600"></i>
                <span>{{ personalInfo.email }}</span>
              </div>
              <div
                v-if="personalInfo.phone"
                class="flex items-center gap-2 text-gray-600"
              >
                <i class="fas fa-phone text-blue-600"></i>
                <span>{{ personalInfo.phone }}</span>
              </div>
              <div
                v-if="personalInfo.location"
                class="flex items-center gap-2 text-gray-600"
              >
                <i class="fas fa-map-marker-alt text-blue-600"></i>
                <span>{{ personalInfo.location }}</span>
              </div>
              <div
                v-if="personalInfo.linkedin"
                class="flex items-center gap-2 text-gray-600"
              >
                <i class="fab fa-linkedin text-blue-600"></i>
                <span>{{ personalInfo.linkedin.slice(28) }}</span>
              </div>
              <div
                v-if="personalInfo.github"
                class="flex items-center gap-2 text-gray-600"
              >
                <i class="fab fa-github text-blue-600"></i>
                <span>@{{ personalInfo.github.slice(19) }}</span>
              </div>
            </div>
          </div>

          <!-- Professional Summary -->
          <div v-if="summary" class="mb-8">
            <h3
              class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600"
            >
              Professional Summary
            </h3>
            <p class="text-gray-700 leading-relaxed">
              {{ summary }}
            </p>
          </div>

          <!-- Experience -->
          <div v-if="experience.length" class="mb-8">
            <h3
              class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600"
            >
              Work Experience
            </h3>
            <div class="space-y-6">
              <div
                v-for="job in experience"
                :key="job.id"
                class="pb-6 border-b border-gray-100 last:border-b-0"
              >
                <div
                  class="flex flex-col md:flex-row md:justify-between md:items-start mb-3"
                >
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900">
                      {{ job.position }}
                    </h4>
                    <h5 class="text-blue-600 font-medium">{{ job.company }}</h5>
                  </div>
                  <div class="text-gray-600 text-sm md:text-right mt-2 md:mt-0">
                    <p class="font-medium">
                      {{ formatJobDuration(job) }}
                    </p>
                    <p v-if="job.location" class="text-gray-500 text-xs">
                      {{ job.location }}
                    </p>
                    <p class="text-gray-400 text-xs">
                      {{ calculateDuration(job) }}
                    </p>
                  </div>
                </div>
                <ul v-if="job.description" class="space-y-2">
                  <li
                    v-for="(desc, i) in makePoints(job.description)"
                    :key="i"
                    class="text-gray-700 pl-6 relative before:content-['▸'] before:absolute before:left-0 before:text-blue-600 before:font-bold"
                  >
                    {{ desc.trim() }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Skills -->
          <div v-if="skillsCategories.length" class="mb-8">
            <h3
              class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600"
            >
              Technical Skills
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="category in skillsCategories"
                :key="category.name"
                class="space-y-3"
              >
                <h4 class="font-semibold text-gray-900">{{ category.name }}</h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in category.skills"
                    :key="skill.id"
                    class="px-3 py-1 bg-gray-100 text-blue-600 text-sm font-medium rounded-full"
                  >
                    {{ skill.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Education -->
          <div class="mb-8">
            <h3
              class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600"
            >
              Education
            </h3>
            <div v-if="education.length === 0" class="text-gray-600 italic">
              No education data available
            </div>
            <div v-else class="space-y-6">
              <div
                v-for="edu in education"
                :key="edu.id"
                class="pb-6 border-b border-gray-100 last:border-b-0"
              >
                <div
                  class="flex flex-col md:flex-row md:justify-between md:items-start mb-3"
                >
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900">
                      {{ edu.degree }}
                    </h4>
                    <h5 class="text-blue-600 font-medium">
                      {{ edu.institution }}
                    </h5>
                  </div>
                  <div class="text-gray-600 text-sm md:text-right mt-2 md:mt-0">
                    <p class="font-medium">
                      {{ formatEducationDuration(edu) }}
                    </p>
                    <p class="text-gray-400 text-xs">
                      {{ calculateEducationDuration(edu) }}
                    </p>
                  </div>
                </div>
                <ul v-if="edu.description" class="space-y-2">
                  <li
                  
                    class="text-gray-700 pl-6 relative before:content-['▸'] before:absolute before:left-0 before:text-blue-600 before:font-bold"
                  >
                    {{ edu.description }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Projects -->
          <div v-if="projects.length" class="mb-8">
            <h3
              class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600"
            >
              Featured Projects
            </h3>
            <div class="space-y-6">
              <div
                v-for="project in projects"
                :key="project.id"
                class="pb-6 border-b border-gray-100 last:border-b-0"
              >
                <div
                v-if="project.important == true"
                  class="flex flex-col md:flex-row md:justify-between md:items-start mb-3"
                >
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <h4 class="text-lg font-semibold text-gray-900">
                        {{ project.name || project.title }}
                      </h4>
                    </div>
                    <p class="text-gray-700 mb-3">{{ project.shortDescription }}</p>
                    <div class="flex flex-wrap gap-2 mb-3">
                      <span
                        v-for="tech in project.technologies"
                        :key="tech"
                        class="px-2 py-1 bg-gray-100 text-blue-600 text-xs font-medium rounded-full"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </div>
                  <div class="flex gap-2 mt-3 md:mt-0 md:ml-4">
                    <a
                      v-if="project.github || project.githubUrl"
                      :href="project.github || project.githubUrl"
                      target="_blank"
                      class="text-gray-600 hover:text-blue-600 transition-colors"
                      title="View Source Code"
                    >
                      <i class="fab fa-github text-lg"></i>
                    </a>
                    <a
                      v-if="project.live || project.liveUrl"
                      :href="project.live || project.liveUrl"
                      target="_blank"
                      class="text-gray-600 hover:text-blue-600 transition-colors"
                      title="View Live Demo"
                    >
                      <i class="fas fa-external-link-alt text-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const summary = computed(() => {
  return userStore.user?.bio.replace(/\d+/, totalExperience.value) || "A passionate Full Stack Developer with expertise in building scalable web applications.";
});
const totalExperience = computed(() => totalYearExperience());
onMounted(async () => {
  await userStore.fetchUserData();
});
const totalYearExperience = () => {
  const companies = userStore.user?.companies || [];
  let totalMonth = 0;
  if (companies) {
    companies.forEach((company) => {
      const startMonth = company.startMonth || 0;
      const startYear = company.startYear || 1;
      const endMonth = company.endMonth || new Date().getMonth() + 1;
      const endYear = company.endYear || new Date().getFullYear();
      const months = (endYear - startYear) * 12 + (endMonth - startMonth);
      totalMonth += months;
    });
    console.log("mohtns", totalMonth);
  }
  const month = totalMonth % 12;
  const year = Math.floor(totalMonth / 12);
  console.log("month and years", month, year);
  if (year === 0 && month === 0) {
    // Experience bilkul nahi
    return "No experience";
  } else if (year === 0) {
      return `0.${month}`;
  } else if (month === 0) {
    return year;
  } else {
    return year + "." + month;
  }
};

function currentYear() {
  return new Date().getFullYear();
}

const personalInfo = computed(() => ({
  name: userStore.user?.name || "Mohit Kumar",
  title: userStore.user?.title || "Full Stack Developer",
  email: userStore.user?.email || "mohit@example.com",
  phone: userStore.user?.phone || "+91-9876543210",
  linkedin: userStore.user?.linkedin || "https://www.linkedin.com/in/mohit-kumar",
  github: userStore.user?.github || "https://github.com/mohit-kumar",
  location: userStore.user?.address || "Delhi, India",
}));

const experience = computed(() => {
  const companies = userStore.user.companies || [];
  // Ensure it's an array before sorting
  if (!Array.isArray(companies)) {
    console.warn("Companies data is not an array:", companies);
    return [];
  }

  // No need to sort here as backend already sends sorted data
  return companies;
});

const education = computed(() => {
  const educationData = userStore.user.education || [];
  console.log("Education data in Resume:", educationData);

  // Ensure it's an array before sorting
  if (!Array.isArray(educationData)) {
    console.warn("Education data is not an array:", educationData);
    return [];
  }

  // No need to sort here as backend already sends sorted data
  return educationData;
});

const projects = computed(() => {
  const projectsData = userStore.user.projects || [];
  console.log("Projects data in Resume:", projectsData);

  // Ensure it's an array before filtering
  if (!Array.isArray(projectsData)) {
    console.warn("Projects data is not an array:", projectsData);
    return [];
  }

  // Filter all projects where important is true
  const importantProjects = projectsData.filter(
    (project) => project.important === true
  );

  console.log("Important projects for Resume:", importantProjects);
  return importantProjects;
});

function numberToMonth(num) {
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
  return months[num - 1] || "";
}

function formatJobDuration(job) {
  const startMonth = numberToMonth(job.startMonth)?.slice(0, 3);
  const startYear = job.startYear;

  if (!job.endMonth || !job.endYear) {
    return `${startMonth} ${startYear} - Present`;
  }

  const endMonth = numberToMonth(job.endMonth)?.slice(0, 3);
  const endYear = job.endYear;

  return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
}

function formatEducationDuration(edu) {
  const startYear = edu.startDate; // Already integer from schema
  const endYear = edu.endDate; // Already integer from schema

  if (!endYear || endYear > currentYear()) {
    return `${startYear} - Present`;
  }

  return `${startYear} - ${endYear}`;
}

function calculateDuration(job) {
  const startYear = job.startYear || 0;
  const startMonth = job.startMonth || 1;
  const endYear = job.endYear || new Date().getFullYear();
  const endMonth = job.endMonth || new Date().getMonth() + 1;

  let totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);

  if (totalMonths < 1) return "Less than 1 month";

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) {
    return `${months} month${months > 1 ? "s" : ""}`;
  } else if (months === 0) {
    return `${years} year${years > 1 ? "s" : ""}`;
  } else {
    return `${years} year${years > 1 ? "s" : ""} ${months} month${
      months > 1 ? "s" : ""
    }`;
  }
}

function makePoints(text) {
  if (!text) return [];
  return text.split(".").filter((point) => point.trim().length > 0);
}

// Skills
const skillsCategories = computed(() => {
  const categoriesMap = {};
  const rawSkills = userStore.user.skills || [];

  rawSkills.forEach((skill) => {
    const techType = skill.tech;
    if (!categoriesMap[techType]) {
      categoriesMap[techType] = {
        name: mapTechToCategory(techType),
        skills: [],
      };
    }
    categoriesMap[techType].skills.push(skill);
  });

  return Object.values(categoriesMap);
});

function mapTechToCategory(tech) {
  switch (tech) {
    case "frontendTech":
      return "Frontend";
    case "backendTech":
      return "Backend";
    case "databaseTech":
      return "Database";
    case "deploymentTech":
      return "DevOps & Deployment";
    case "developmentTools":
      return "Development Tools";
    case "designTools":
      return "Design Tools";
    default:
      return "Other";
  }
}

function calculateEducationDuration(edu) {
  // Use totalYears if available from database
  if (edu.totalYears) {
    return edu.totalYears === 1 ? "1 year" : `${edu.totalYears} years`;
  }

  // Fallback calculation
  const startYear = parseInt(edu.startDate) || 0;
  const endYear = parseInt(edu.endDate) || new Date().getFullYear();

  const duration = endYear - startYear;

  if (duration <= 0) return "";
  if (duration === 1) return "1 year";
  return `${duration} years`;
}

function printResume() {
  window.print();
}
</script>
<script>
export default {
  name: "ResumeView",
};
</script>

<style scoped>
/* Print styles */
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body * {
    visibility: hidden !important;
  }

  #resume-content,
  #resume-content * {
    visibility: visible !important;
  }

  #resume-content {
    position: absolute !important;
    left: 0;
    top: 0;
    width: 100%;
    background: white !important;
    color: black !important;
  }

  /* Hide non-essential elements */
  header,
  footer,
  nav,
  aside {
    display: none !important;
  }

  /* Ensure text visibility */
  #resume-content * {
    color: #000 !important;
    opacity: 1 !important;
  }

  /* Remove shadows and effects for print */
  #resume-content .shadow-2xl {
    box-shadow: none !important;
  }

  #resume-content .rounded-2xl {
    border-radius: 0 !important;
  }
}
</style>
