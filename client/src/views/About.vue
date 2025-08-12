<script setup>
import { useUserStore } from "@/stores/userStore";
import { useAuthStore } from "@/stores/auth";
import { useCompanyStore } from "@/stores/companyStore";
import { useEducationStore } from "@/stores/educationStore";
import { useProjectStore } from "@/stores/projectStore";
import { useNotificationsStore } from "@/stores/notifications";
import { onMounted, onBeforeUnmount, ref, nextTick, computed } from "vue";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const authStore = useAuthStore();
const companyStore = useCompanyStore();
const educationStore = useEducationStore();
const projectStore = useProjectStore();
const notificationStore = useNotificationsStore();
const route = useRoute();

const updateForm = ref({});
const updateCompanyForm = ref({});
const editCompanies = ref(false);
const editProfileToggle = ref(false);
const currentCompanyId = ref(null);
const coffeeCount = ref(500);
const codeLines = ref(100);

const summary = ref(bioFun());
function bioFun() {
  const bio = computed(() => {
    return (
      userStore.user?.bio.replace(/\d+/, totalYearExperience()) ||
      userStore.user?.bio
    );
  });

  return bio;
}

const values = ref([
  {
    id: 1,
    icon: "fas fa-rocket",
    title: "Innovation",
    description:
      "Always exploring new technologies and creative solutions to solve complex problems.",
  },
  {
    id: 2,
    icon: "fas fa-heart",
    title: "Passion",
    description:
      "Genuinely love what I do and put my heart into every project I work on.",
  },
  {
    id: 3,
    icon: "fas fa-handshake",
    title: "Collaboration",
    description:
      "Believe in the power of teamwork and building great products together.",
  },
  {
    id: 4,
    icon: "fas fa-graduation-cap",
    title: "Learning",
    description:
      "Committed to continuous learning and staying updated with industry trends.",
  },
]);

const openEditForm = () => {
  updateForm.value = {
    email: userStore.user.email || "",
    name: userStore.user.name || "",
    age: userStore.user.age || "",
    role: userStore.user.role || "",
    title: userStore.user.title || "",
    image: userStore.user.image || "https://images.seeklogo.com/logo-png/27/2/user-line-logo-png_seeklogo-272581.png",
    bio: userStore.user.bio || "",
    address: userStore.user.address || "",
    phone: userStore.user.phone || "",
    github: userStore.user.github || "",
    linkedin: userStore.user.linkedin || "",
    openSourceContributions: userStore.user.openSourceContributions || 0,
    interestDescription: userStore.user.interestDescription || "",
    interests: Array.isArray(userStore.user.interests)
      ? userStore.user.interests
          .map((interest) => interest.replace(/\n/g, "").trim())
          .join(", ")
      : userStore.user.interests || "",
  };
  editProfileToggle.value = true;
};
const totalYearExperience = () => {
  const companies = companyStore.getCompanies || [];
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
  }
  const month = totalMonth % 12;
  const year = Math.floor(totalMonth / 12);
  if (year === 0 && month === 0) {
    return "No experience";
  } else if (year === 0) {
    return `0.${month}`;
  } else if (month === 0) {
    return year;
  } else {
    return year + "." + month;
  }
};

const createMonthName = (month) => {
  const monthNames = [
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
  return monthNames[month - 1];
};

const calculateDuration = (job) => {
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
};

const makePoints = (text) => {
  if (!text) return [];
  return text.split(".").filter((point) => point.trim().length > 0);
};

const handleGlobalClick = (event) => {
  const editButton = event.target.closest(".edit-button");
  const editCompanyButton = event.target.closest(".edit-company-button");
  const addCompanyButton = event.target.closest(".add-company-button");
  const profileModal = event.target.closest(".profile-modal");
  const companyModal = event.target.closest(".company-modal");

  if (editProfileToggle.value && !editButton && !profileModal) {
    editProfileToggle.value = false;
  }

  if (
    editCompanies.value &&
    !editCompanyButton &&
    !addCompanyButton &&
    !companyModal
  ) {
    editCompanies.value = false;
    currentCompanyId.value = null;
  }
};

const updateProfile = async () => {
  try {
    const processedFormData = {
      ...updateForm.value,
      interests: updateForm.value.interests.split(", "),
    };
    console.log("form data", processedFormData);

    await bioFun();
    await userStore.updateUserProfile(processedFormData);
    console.log("Profile updated successfully");

    notificationStore.addNotification({
      type: "success",
      title: "Success!",
      message: "Profile updated successfully!",
    });

    editProfileToggle.value = false;
  } catch (error) {
    console.error("Error updating profile:", error);
    notificationStore.addNotification({
      type: "error",
      title: "Error!",
      message: "Failed to update profile. Please try again.",
    });
  }
};

const openEditCompanyForm = (company) => {
  updateCompanyForm.value = {
    company: company.company || "",
    position: company.position || "",
    startMonth: company.startMonth || "",
    startYear: company.startYear || "",
    endMonth: company.endMonth || "",
    endYear: company.endYear || "",
    description: company.description || "",
  };
  currentCompanyId.value = company.id;
  editCompanies.value = true;
};

const updateCompanies = async () => {
  try {
    // Convert form data to proper types for backend
    const formData = {
      company: updateCompanyForm.value.company,
      position: updateCompanyForm.value.position,
      startMonth: parseInt(updateCompanyForm.value.startMonth),
      startYear: parseInt(updateCompanyForm.value.startYear),
      endMonth: updateCompanyForm.value.endMonth
        ? parseInt(updateCompanyForm.value.endMonth)
        : null,
      endYear: updateCompanyForm.value.endYear
        ? parseInt(updateCompanyForm.value.endYear)
        : null,
      description: updateCompanyForm.value.description || null,
    };

    // Validate required fields
    if (
      !formData.company ||
      !formData.position ||
      !formData.startMonth ||
      !formData.startYear
    ) {
      notificationStore.addNotification({
        type: "error",
        title: "Validation Error!",
        message:
          "Please fill in all required fields (Company, Position, Start Month, Start Year).",
      });
      return;
    }

    // Validate month ranges
    if (formData.startMonth < 1 || formData.startMonth > 12) {
      notificationStore.addNotification({
        type: "error",
        title: "Validation Error!",
        message: "Start month must be between 1 and 12.",
      });
      return;
    }

    if (
      formData.endMonth &&
      (formData.endMonth < 1 || formData.endMonth > 12)
    ) {
      notificationStore.addNotification({
        type: "error",
        title: "Validation Error!",
        message: "End month must be between 1 and 12.",
      });
      return;
    }

    if (currentCompanyId.value) {
      console.log("Updating company with ID:", currentCompanyId.value);
      console.log("Company data:", formData);

      // Call API to update company
      await companyStore.updateCompany(currentCompanyId.value, formData);
      notificationStore.addNotification({
        type: "success",
        title: "Success!",
        message: "Company updated successfully!",
      });
    } else {
      console.log("Creating new company");
      console.log("Company data:", formData);

      // Call API to create new company
      await companyStore.createCompany(formData);
      notificationStore.addNotification({
        type: "success",
        title: "Success!",
        message: "Company added successfully!",
      });
    }

    // Refresh the user data to get updated companies
    await userStore.fetchUserData();
    if (userStore.user.companies && userStore.user.companies.length > 0) {
      companyStore.setCompanies(userStore.user.companies);
    }

    editCompanies.value = false;
    currentCompanyId.value = null;
  } catch (error) {
    console.error("Error with company operation:", error);
    notificationStore.addNotification({
      type: "error",
      title: "Error!",
      message: "Failed to save company. Please try again.",
    });
  }
};

const deleteExperience = async (companyId) => {
  const confirmed = await notificationStore.showConfirmation({
    title: "Delete Company Experience",
    message:
      "Are you sure you want to delete this company experience? This action cannot be undone.",
    confirmText: "Yes, Delete",
    cancelText: "Cancel",
    type: "danger",
  });

  if (confirmed) {
    try {
      console.log("Deleting company with ID:", companyId);

      // Call API to delete company
      await companyStore.deleteCompany(companyId);
      notificationStore.addNotification({
        type: "success",
        title: "Success!",
        message: "Company experience deleted successfully!",
      });

      // Refresh the user data to get updated companies
      await userStore.fetchUserData();
      if (userStore.user.companies && userStore.user.companies.length > 0) {
        companyStore.setCompanies(userStore.user.companies);
      } else {
        companyStore.setCompanies([]);
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      notificationStore.addNotification({
        type: "error",
        title: "Error!",
        message: "Failed to delete company. Please try again.",
      });
    }
  }
};

const openCreateCompanyForm = () => {
  updateCompanyForm.value = {
    company: "",
    position: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    description: "",
  };
  currentCompanyId.value = null;
  editCompanies.value = true;
};

onMounted(async () => {
  await userStore.fetchUserData();

  if (userStore.user.companies && userStore.user.companies.length > 0) {
    companyStore.setCompanies(userStore.user.companies);
  }

  if (userStore.user.education && userStore.user.education.length > 0) {
    educationStore.setEducation(userStore.user.education);
  }

  if (userStore.user.projects && userStore.user.projects.length > 0) {
    projectStore.setProjects(userStore.user.projects);
  }

  await nextTick();
  setTimeout(() => {
    if (route.hash === "#journey") {
      const element = document.getElementById("journey");
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
  document.addEventListener("click", handleGlobalClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleGlobalClick);
});
</script>

<template>
  <div class="about pt-20">
    <section
      class="about-hero bg-gradient-to-br from-blue-100/10 via-purple-100/10 to-indigo-100/10 py-16"
    >
      <div class="container max-w-6xl mx-auto px-4">
        <div
          class="about-content grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div class="about-text text-center lg:text-left">
            <h1
              class="page-title text-3xl md:text-5xl mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent font-bold"
            >
              About me
            </h1>
            <h2
              class="about-subtitle text-xl md:text-2xl text-gray-800 mb-6 font-normal"
            >
              My Journey in Web Development
            </h2>
            <p
              class="about-description text-lg text-gray-600 leading-relaxed mb-8"
            >
              {{
                summary ||
                "Welcome to my portfolio! I am a passionate developer with expertise in modern web technologies."
              }}
            </p>
            <div class="about-highlights flex flex-col gap-4">
              <div
                class="highlight-item flex items-center gap-4 p-4 bg-white rounded-xl shadow-md"
              >
                <i class="fas fa-code text-primary text-xl"></i>
                <span class="font-medium text-gray-800"
                  >Clean Code Advocate</span
                >
              </div>
              <div
                class="highlight-item flex items-center gap-4 p-4 bg-white rounded-xl shadow-md"
              >
                <i class="fas fa-lightbulb text-primary text-xl"></i>
                <span class="font-medium text-gray-800">Problem Solver</span>
              </div>
              <div
                class="highlight-item flex items-center gap-4 p-4 bg-white rounded-xl shadow-md"
              >
                <i class="fas fa-users text-primary text-xl"></i>
                <span class="font-medium text-gray-800">Team Player</span>
              </div>
            </div>

            <div v-if="authStore.isAuthenticated" class="admin-controls mt-8 pt-8 border-t border-gray-200">
              <button
                @click="openEditForm"
                class="btn btn-outline btn-sm edit-button px-5 py-2 text-sm border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
              >
                <i class="fas fa-edit mr-2"></i>
                Edit Profile
              </button>
            </div>
          </div>
          <div class="about-image">
            <img
              :src="userStore.user.image || ''"
              :alt="`Photo of ${userStore.user.name}`"
              class="w-full rounded-3xl shadow-2xl"
            />
            <div class="contact-info mt-4 p-4 bg-gray-50 rounded-xl">
              <div class="contact-item flex items-center mb-3 text-gray-700">
                <i class="fas fa-envelope text-primary mr-3 w-5"></i>
                <span>{{ userStore.user.email }}</span>
              </div>
              <div
                class="contact-item flex items-center mb-3 text-gray-700"
                v-if="userStore.user.phone"
              >
                <i class="fas fa-phone text-primary mr-3 w-5"></i>
                <span>{{ userStore.user.phone }}</span>
              </div>
              <div
                class="contact-item flex items-center mb-3 text-gray-700"
                v-if="userStore.user.address"
              >
                <i class="fas fa-map-marker-alt text-primary mr-3 w-5"></i>
                <span>{{ userStore.user.address }}</span>
              </div>
              <div class="social-links flex gap-4 mt-4">
                <a
                  v-if="userStore.user.github"
                  :href="userStore.user.github"
                  target="_blank"
                  class="social-link inline-flex items-center justify-center w-10 h-10 bg-primary rounded-full text-white hover:bg-primary-dark transition-all duration-300 hover:-translate-y-1"
                >
                  <i class="fab fa-github"></i>
                </a>
                <a
                  v-if="userStore.user.linkedin"
                  :href="userStore.user.linkedin"
                  target="_blank"
                  class="social-link inline-flex items-center justify-center w-10 h-10 bg-primary rounded-full text-white hover:bg-primary-dark transition-all duration-300 hover:-translate-y-1"
                >
                  <i class="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      id="journey"
      v-if="companyStore.getCompanies.length > 0"
      class="journey py-16 bg-white"
    >
      <div class="container max-w-6xl mx-auto px-4">
        <div
          class="flex flex-col md:flex-row md:justify-between md:items-center mb-8"
        >
          <h2
            class="section-title font-bold text-3xl md:text-4xl text-gray-800 mb-4 md:mb-0"
          >
            My Professional Journey
          </h2>
          <!-- create company button -->
          <button
            v-if="authStore.isAuthenticated"
            @click="openCreateCompanyForm"
            class="add-company-button inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-sm font-medium"
          >
            <i class="fas fa-plus mr-2"></i>
            Add Company
          </button>
        </div>
        <div class="timeline relative max-w-4xl mx-auto">
          <div
            class="timeline-line absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary-dark"
          ></div>
          <div
            v-for="item in companyStore.getSortedCompanies"
            :key="item.id"
            class="timeline-item relative mb-12 pl-15"
          >
            <div
              class="timeline-dot absolute left-2.5 top-0 w-5 h-5 bg-primary rounded-full border-4 border-white shadow-lg"
            ></div>
            <div
              class="timeline-content bg-white p-8 py-12 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group relative"
            >
              <div
                class="flex flex-col md:flex-row md:justify-between md:items-start mb-4"
              >
                <div>
                  <h3 class="font-bold text-xl text-gray-800 mb-2">
                    {{ item.position }}
                  </h3>
                  <p
                    class="timeline-company text-primary font-semibold mb-2 text-lg"
                  >
                    {{ item.company }}
                  </p>
                </div>
                <div class="text-right relative">
                  <!-- Hover Action Buttons -->
                  <div
                    v-if="authStore.isAuthenticated"
                    class="absolute -top-10 right-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0"
                  >
                    <button
                      @click="openEditCompanyForm(item)"
                      class="edit-company-button w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                      title="Edit Company"
                    >
                      <i class="fas fa-edit text-xs"></i>
                    </button>
                    <button
                      @click="deleteExperience(item.id)"
                      class="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                      title="Delete Company"
                    >
                      <i class="fas fa-trash text-xs"></i>
                    </button>
                  </div>

                  <p
                    class="timeline-period font-semibold text-gray-700 text-sm mb-2"
                  >
                    {{ createMonthName(item.startMonth)?.slice(0, 3) }}
                    {{ item.startYear }} -
                    <span v-if="item.endMonth && item.endYear">
                      {{ createMonthName(item.endMonth)?.slice(0, 3) }}
                      {{ item.endYear }}
                    </span>
                    <span v-else>Present</span>
                  </p>
                  <p class="text-gray-500 text-xs">
                    {{ calculateDuration(item) }}
                  </p>
                </div>
              </div>
              <div
                v-if="item.description"
                class="timeline-description text-gray-600 leading-relaxed"
              >
                <ul class="space-y-2">
                  <li
                    v-for="(desc, i) in makePoints(item.description)"
                    :key="i"
                    class="flex items-start"
                  >
                    <span class="text-primary font-bold mr-2 mt-1">▸</span>
                    <span>{{ desc.trim() }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="values py-16 bg-white">
      <div class="container max-w-6xl mx-auto px-4">
        <h2
          class="section-title mb-6 font-bold text-3xl md:text-4xl text-center text-gray-800"
        >
          What Drives Me
        </h2>
        <div
          class="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <div
            v-for="value in values"
            :key="value.id"
            class="value-card bg-white p-8 rounded-2xl text-center transition-all duration-300 shadow-md hover:-translate-y-3 hover:shadow-xl"
          >
            <div
              class="value-icon w-15 h-15 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl"
            >
              <i :class="value.icon"></i>
            </div>
            <h3 class="text-xl font-semibold mb-4 text-gray-800">
              {{ value.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="personal py-16 bg-white">
      <div class="container max-w-6xl mx-auto px-4">
        <div
          class="personal-content grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div class="personal-text">
            <h2 class="text-3xl md:text-4xl mb-6 text-gray-800 font-bold">
              Beyond Code
            </h2>
            <p class="text-gray-600 leading-relaxed mb-8">
              {{
                userStore?.user?.interestDescription ||
                userStore?.user?.bio ||
                "I am a tech enthusiast who loves exploring new technologies and sharing knowledge with the community."
              }}
            </p>
            <div class="interests flex flex-wrap gap-2">
              <span
                v-for="interest in userStore?.user?.interests"
                :key="interest"
                class="interest-tag bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                {{ interest }}
              </span>
            </div>
          </div>
          <div class="personal-stats grid grid-cols-1 gap-8">
            <div class="stat-item text-center p-8 bg-gray-50 rounded-2xl">
              <h3 class="text-4xl text-primary mb-2 font-bold">
                {{ coffeeCount }}+
              </h3>
              <p class="text-gray-600 font-medium">Cups of Coffee</p>
            </div>
            <div class="stat-item text-center p-8 bg-gray-50 rounded-2xl">
              <h3 class="text-4xl text-primary mb-2 font-bold">
                {{ codeLines }}K+
              </h3>
              <p class="text-gray-600 font-medium">Lines of Code</p>
            </div>
            <div class="stat-item text-center p-8 bg-gray-50 rounded-2xl">
              <h3 class="text-4xl text-primary mb-2 font-bold">
                {{ userStore?.user?.openSourceContributions || 0 }}
              </h3>
              <p class="text-gray-600 font-medium">Open Source Contributions</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="featured-projects py-16 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-indigo-50/50"
      v-if="projectStore.getProjects.length > 0"
    >
      <div class="container max-w-6xl mx-auto px-4">
        <h2
          class="section-title mb-6 font-bold text-3xl md:text-4xl text-center text-gray-800"
        >
          Featured Projects
        </h2>
        <div
          class="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          <div
            v-for="project in projectStore.getSortedProjects"
            :key="project.id"
            class="project-card bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-xl"
          >
            <div class="project-image relative h-48 overflow-hidden">
              <img
                :src="project.image || '/api/placeholder/300/200'"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div
                class="project-overlay absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100"
              >
                <div class="project-links flex gap-4">
                  <a
                    v-if="project.liveUrl"
                    :href="project.liveUrl"
                    target="_blank"
                    class="project-link w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-gray-100 transition-all duration-300"
                  >
                    <i class="fas fa-external-link-alt"></i>
                  </a>
                  <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    target="_blank"
                    class="project-link w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-gray-100 transition-all duration-300"
                  >
                    <i class="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="project-content p-6">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-xl font-semibold text-gray-800">
                  {{ project.title || project.name }}
                </h3>
                <span
                  class="px-2 py-1 text-xs font-medium rounded-full capitalize"
                  :class="{
                    'bg-green-100 text-green-800':
                      project.status === 'completed',
                    'bg-blue-100 text-blue-800': project.status === 'ongoing',
                    'bg-yellow-100 text-yellow-800':
                      project.status === 'starting',
                    'bg-red-100 text-red-800': project.status === 'cancelled',
                    'bg-gray-100 text-gray-800': !project.status,
                  }"
                >
                  {{ project.status || "ongoing" }}
                </span>
              </div>
              <p class="text-gray-600 leading-relaxed mb-4">
                {{ project.description.slice(0, 100) }}{{ project.description.length > 100 ? '...' : '' }}
                <span v-if="project.description.length > 100" class="text-primary cursor-pointer">
                  <router-link :to="`/projects#project-${project.id}`">Read More</router-link>
                </span>
              </p>
              <div class="project-tech flex flex-wrap gap-2">
                <span
                  v-for="tech in project.technologies.slice(0,4)"
                  :key="tech"
                  class="tech-tag bg-gray-100 text-primary px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Admin Controls for Projects -->
        <div
          v-if="authStore.isAuthenticated"
          class="admin-controls text-center"
        >
          <router-link
            to="/admin"
            class="btn btn-primary inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <i class="fas fa-cog mr-2"></i>
            Manage Projects
          </router-link>
        </div>
      </div>
    </section>

    <!-- Update Profile Popup -->
    <teleport to="body" v-if="editProfileToggle">
      <section
        class="fixed inset-0 top-[70px] z-[999] bg-black bg-opacity-70 flex justify-center items-start overflow-y-auto pt-8"
      >
        <div
          @click.stop
          class="bg-white p-6 rounded-lg w-full max-w-4xl shadow-lg mx-4 profile-modal"
        >
          <h2 class="text-2xl font-bold my-6">Update Profile</h2>
          <form
            @submit.prevent="updateProfile"
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div class="md:col-span-2">
              <label class="block font-medium mb-1">Email *</label>
              <input
                type="email"
                v-model="updateForm.email"
                class="w-full border rounded p-2"
                required
              />
            </div>


            <!-- Image -->
            <div class="md:col-span-2">
              <label class="block font-medium mb-1">Profile Image URL *</label>
              <input
                type="url"
                v-model="updateForm.image"
                class="w-full border rounded p-2"
                required
                placeholder="Paste image URL here"
              />
            </div>

            <!-- Name -->
            <div>
              <label class="block font-medium mb-1">Name *</label>
              <input
                type="text"
                v-model="updateForm.name"
                class="w-full border rounded p-2"
                required
              />
            </div>

            <!-- Age -->
            <div>
              <label class="block font-medium mb-1">Age *</label>
              <input
                type="number"
                v-model="updateForm.age"
                class="w-full border rounded p-2"
                required
              />
            </div>

            <!-- Role -->
            <div>
              <label class="block font-medium mb-1">Role *</label>
              <input
                type="text"
                v-model="updateForm.role"
                class="w-full border rounded p-2"
                required
              />
            </div>

            <!-- Title -->
            <div>
              <label class="block font-medium mb-1">Title *</label>
              <input
                type="text"
                v-model="updateForm.title"
                class="w-full border rounded p-2"
                required
              />
            </div>

            <!-- Bio -->
            <div class="md:col-span-2">
              <label class="block font-medium mb-1">Bio *</label>
              <textarea
                v-model="updateForm.bio"
                class="w-full border rounded p-2"
                rows="3"
                required
              ></textarea>
            </div>

            <!-- Address -->
            <div>
              <label class="block font-medium mb-1">Address *</label>
              <input
                type="text"
                v-model="updateForm.address"
                class="w-full border rounded p-2"
                required
              />
            </div>

            <!-- Phone -->
            <div>
              <label class="block font-medium mb-1">Phone *</label>
              <input
                type="text"
                v-model="updateForm.phone"
                class="w-full border rounded p-2"
                required
              />
            </div>

            <!-- Github -->
            <div>
              <label class="block font-medium mb-1">Github *</label>
              <input
                type="url"
                v-model="updateForm.github"
                class="w-full border rounded p-2"
                required
              />
            </div>

            <!-- LinkedIn -->
            <div>
              <label class="block font-medium mb-1">LinkedIn *</label>
              <input
                type="url"
                v-model="updateForm.linkedin"
                class="w-full border rounded p-2"
                required
              />
            </div>

            <!-- Open Source Contributions -->
            <div>
              <label class="block font-medium mb-1"
                >Open Source Contributions *</label
              >
              <input
                type="number"
                v-model="updateForm.openSourceContributions"
                class="w-full border rounded p-2"
                required
              />
            </div>

            <!-- Interest Description -->
            <div class="md:col-span-2">
              <label class="block font-medium mb-1"
                >Interest Description *</label
              >
              <textarea
                v-model="updateForm.interestDescription"
                class="w-full border rounded p-2"
                rows="3"
                required
              ></textarea>
            </div>

            <!-- Interests -->
            <div class="md:col-span-2">
              <label class="block font-medium mb-1"
                >Interests (comma separated) *</label
              >
              <input
                type="text"
                v-model="updateForm.interests"
                placeholder="e.g., Coding, Music, Travel"
                class="w-full border rounded p-2"
                required
              />
            </div>

            <!-- Buttons -->
            <div class="md:col-span-2 flex justify-end gap-4 mt-4">
              <button
                type="button"
                @click="editProfileToggle = false"
                class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </section>
    </teleport>

    <!-- Update Company Popup -->
    <teleport to="body" v-if="editCompanies">
      <section
        class="fixed inset-0 top-[70px] z-[999] bg-black bg-opacity-70 flex justify-center items-start overflow-y-auto pt-8"
      >
        <div
          @click.stop
          class="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg mx-4 company-modal"
        >
          <h2 class="text-2xl font-bold mb-6 text-gray-800">
            {{
              currentCompanyId
                ? "Update Company Experience"
                : "Add New Company Experience"
            }}
          </h2>
          <form @submit.prevent="updateCompanies" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Company Name -->
              <div>
                <label class="block font-medium mb-1 text-gray-700"
                  >Company Name *</label
                >
                <input
                  type="text"
                  v-model="updateCompanyForm.company"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter company name"
                />
              </div>

              <!-- Position -->
              <div>
                <label class="block font-medium mb-1 text-gray-700"
                  >Position *</label
                >
                <input
                  type="text"
                  v-model="updateCompanyForm.position"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter position/title"
                />
              </div>

              <!-- Start Month -->
              <div>
                <label class="block font-medium mb-1 text-gray-700"
                  >Start Month *</label
                >
                <select
                  v-model="updateCompanyForm.startMonth"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>

              <!-- Start Year -->
              <div>
                <label class="block font-medium mb-1 text-gray-700"
                  >Start Year *</label
                >
                <input
                  type="number"
                  v-model="updateCompanyForm.startYear"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  min="1990"
                  :max="new Date().getFullYear()"
                  placeholder="e.g., 2023"
                />
              </div>

              <!-- End Month -->
              <div>
                <label class="block font-medium mb-1 text-gray-700"
                  >End Month</label
                >
                <select
                  v-model="updateCompanyForm.endMonth"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Current Job / Select Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>

              <!-- End Year -->
              <div>
                <label class="block font-medium mb-1 text-gray-700"
                  >End Year</label
                >
                <input
                  type="number"
                  v-model="updateCompanyForm.endYear"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1990"
                  :max="new Date().getFullYear() + 1"
                  placeholder="Leave empty for current job"
                />
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block font-medium mb-1 text-gray-700"
                >Job Description</label
              >
              <textarea
                v-model="updateCompanyForm.description"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Describe your role and responsibilities. Separate points with periods."
              ></textarea>
              <p class="text-sm text-gray-500 mt-1">
                Use periods (.) to separate different points for better
                formatting.
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                @click="
                  editCompanies = false;
                  currentCompanyId = null;
                "
                class="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                <i class="fas fa-times mr-2"></i>
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <i class="fas fa-save mr-2"></i>
                {{ currentCompanyId ? "Update Company" : "Add Company" }}
              </button>
            </div>
          </form>
        </div>
      </section>
    </teleport>
  </div>
</template>

<style scoped>
/* Custom styles for hover effects and specific positioning that can't be done with Tailwind alone */
.project-card:hover .project-overlay {
  opacity: 1;
}

/* Custom spacing utilities for timeline */
.pl-15 {
  padding-left: 3.75rem;
}

.timeline-line::before {
  left: 1.25rem;
}

.timeline-dot {
  left: 0.625rem;
}

/* Responsive adjustments for mobile devices */
@media (max-width: 768px) {
  .about-content,
  .personal-content {
    grid-template-columns: 1fr !important;
    text-align: center;
  }

  .timeline-line::before {
    left: 0.9375rem !important;
  }

  .timeline-item {
    padding-left: 2.5rem !important;
  }

  .timeline-dot {
    left: 0.3125rem !important;
  }
}
</style>
