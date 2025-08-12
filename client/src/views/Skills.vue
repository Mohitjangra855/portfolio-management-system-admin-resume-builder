<template>
  <div class="skills pt-20">
    <!-- Skills Hero -->
    <section class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
      <div class="container max-w-6xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Technical Skills
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
          A comprehensive overview of my technical expertise and proficiency levels
        </p>
        <!-- create skill -->
        <button
          v-if="authStore.isAuthenticated"
          @click="openCreateSkillForm"
          class="add-skill-button inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-sm font-medium"
        >
          <i class="fas fa-plus mr-2"></i>
          Add New Skill
        </button>
      </div>
    </section>

    <!-- Skills Categories -->
    <section id="skills" class="py-20 bg-white">
      <div class="container max-w-7xl mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-4 mb-16">
          <button
            v-for="category in Tech"
            :key="category.id"
            :class="[
              'flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 border-2',
              activeCategory === category.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg transform scale-105'
                : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600 hover:shadow-md hover:-translate-y-1'
            ]"
            @click="activeCategory = category.id"
          >
            <i :class="category.icon" class="text-lg"></i>
            <span>{{ category.name }}</span>
          </button>
        </div>

        <div class="skills-content">
          <transition name="fade" mode="out-in">
            <div :key="activeCategory" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div
                v-for="skill in filteredSkills"
                :key="skill.name"
                class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative group"
              >
                <!-- Edit/Delete buttons -->
                <div v-if="authStore.isAuthenticated" class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    @click="openEditSkillForm(skill)"
                    class="edit-skill-button w-8 h-8 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors duration-200 flex items-center justify-center"
                  >
                    <i class="fas fa-edit text-xs"></i>
                  </button>
                  <button
                    @click="deleteSkill(skill.id)"
                    class="w-8 h-8 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200 flex items-center justify-center"
                  >
                    <i class="fas fa-trash text-xs"></i>
                  </button>
                </div>

                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center gap-4">
                    <img
                      v-if="skill.image"
                      :src="skill.image"
                      :alt="skill.name"
                      class="w-12 h-12 object-contain rounded-lg"
                    />
                    <div v-else class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <i class="fas fa-code text-white text-lg"></i>
                    </div>
                    <div>
                      <h4 class="text-xl font-bold text-gray-800">{{ skill.name }}</h4>
                      <span class="text-sm font-medium text-blue-600">{{ getSkillLevel(skill.proficiency) }}</span>
                    </div>
                  </div>
                  <div class="text-2xl font-bold text-blue-600">{{ skill.proficiency }}%</div>
                </div>

                <div class="mb-6">
                  <div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                      :style="{ width: skill.proficiency + '%' }"
                    ></div>
                  </div>
                </div>

                <p class="text-gray-600 leading-relaxed mb-4">{{ skill.description }}</p>

                <div v-if="skill.projects" class="flex justify-end">
                  <span class="bg-gray-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {{ skill.projects }} projects
                  </span>
                </div>
              </div>
            </div>
          </transition>
          
          <!-- No skills fallback -->
          <div v-if="filteredSkills.length === 0" class="text-center py-16">
            <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-code text-4xl text-gray-400"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-600 mb-2">No skills found in this category</h3>
            <p class="text-gray-500">Skills will appear here once they are added to this category.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section id="education" class="bg-gray-50 py-20">
      <div class="container max-w-7xl mx-auto px-4">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">Education & Qualifications</h2>
          <button
            v-if="authStore.isAuthenticated"
            @click="openCreateEducationForm"
            class="add-education-button inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-sm font-medium"
          >
            <i class="fas fa-plus mr-2"></i>
            Add Education
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="edu in educationStore.getSortedEducation"
            :key="edu.id"
            class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative group"
          >
            <!-- Edit/Delete buttons for education -->
            <div v-if="authStore.isAuthenticated" class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                @click="openEditEducationForm(edu)"
                class="edit-education-button w-8 h-8 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors duration-200 flex items-center justify-center"
              >
                <i class="fas fa-edit text-xs"></i>
              </button>
              <button
                @click="deleteEducation(edu.id)"
                class="w-8 h-8 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200 flex items-center justify-center"
              >
                <i class="fas fa-trash text-xs"></i>
              </button>
            </div>

            <div class="flex flex-col items-center text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <i class="fas fa-graduation-cap text-white text-2xl"></i>
              </div>
              <h4 class="text-xl font-bold text-gray-800 mb-3">{{ edu.degree }}</h4>
              <h5 class="text-lg font-semibold text-blue-600 mb-3">{{ edu.institution }}</h5>
              <div class="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
                <i class="fas fa-calendar-alt"></i>
                <span>{{ edu.startDate }} - {{ edu.endDate > new Date().getFullYear() ? 'Present' : edu.endDate }}</span>
              </div>
              <div class="flex items-center justify-between w-full mb-4 p-3 bg-gray-50 rounded-lg">
                <span class="text-sm font-medium text-gray-600">Duration:</span>
                <span class="text-sm font-bold text-gray-800">{{ calculateEducationDuration(edu) }}</span>
              </div>
              <div v-if="edu.description" class="w-full">
                <p class="text-sm text-gray-600 leading-relaxed">{{ edu.description }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- No education fallback -->
        <div v-if="educationStore.getEducation.length === 0" class="text-center py-16">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="fas fa-graduation-cap text-4xl text-gray-400"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">No education records found</h3>
          <p class="text-gray-500">Education details will appear here once they are added.</p>
        </div>
      </div>
    </section> 

    <!-- Skill Modal -->
    <teleport to="body" v-if="editSkillsToggle">
      <section class="fixed inset-0 top-[70px] z-[999] bg-black bg-opacity-70 flex justify-center items-start overflow-y-auto pt-8">
        <div @click.stop class="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg mx-4 skill-modal">
          <h2 class="text-2xl font-bold mb-6 text-gray-800">
            {{ currentSkillId ? 'Update Skill' : 'Add New Skill' }}
          </h2>
          <form @submit.prevent="updateSkills" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Skill Name -->
              <div>
                <label class="block font-medium mb-1 text-gray-700">Skill Name *</label>
                <input
                  type="text"
                  v-model="updateSkillForm.name"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="e.g., React.js, Node.js"
                />
              </div>

              <!-- Category (Tech) -->
              <div>
                <label class="block font-medium mb-1 text-gray-700">Category *</label>
                <select
                  v-model="updateSkillForm.tech"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="frontendTech">Frontend Technology</option>
                  <option value="backendTech">Backend Technology</option>
                  <option value="databaseTech">Database Technology</option>
                  <option value="deploymentTech">Deployment Technology</option>
                  <option value="developmentTools">Development Tools</option>
                  <option value="designTools">Design Tools</option>
                </select>
              </div>

              <!-- Image URL -->
              <div class="md:col-span-2">
                <label class="block font-medium mb-1 text-gray-700">Image URL *</label>
                <input
                  type="url"
                  v-model="updateSkillForm.image"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="https://example.com/skill-icon.png"
                />
              </div>

              <!-- Proficiency -->
              <div class="md:col-span-2">
                <label class="block font-medium mb-1 text-gray-700">Proficiency Level: {{ updateSkillForm.proficiency }}%</label>
                <input
                  type="range"
                  v-model="updateSkillForm.proficiency"
                  min="0"
                  max="100"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div class="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Beginner (0%)</span>
                  <span>Intermediate (50%)</span>
                  <span>Expert (100%)</span>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block font-medium mb-1 text-gray-700">Description *</label>
              <textarea
                v-model="updateSkillForm.description"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                required
                placeholder="Describe your experience with this skill..."
              ></textarea>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                @click="editSkillsToggle = false; currentSkillId = null"
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
                {{ currentSkillId ? 'Update Skill' : 'Add Skill' }}
              </button>
            </div>
          </form>
        </div>
      </section>
    </teleport>

    <!-- Education Modal -->
    <teleport to="body" v-if="editEducationToggle">
      <section class="fixed inset-0 top-[70px] z-[999] bg-black bg-opacity-70 flex justify-center items-start overflow-y-auto pt-8">
        <div @click.stop class="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg mx-4 education-modal">
          <h2 class="text-2xl font-bold mb-6 text-gray-800">
            {{ currentEducationId ? 'Update Education' : 'Add New Education' }}
          </h2>
          <form @submit.prevent="updateEducation" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Degree -->
              <div>
                <label class="block font-medium mb-1 text-gray-700">Degree/Qualification *</label>
                <input
                  type="text"
                  v-model="updateEducationForm.degree"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                  placeholder="e.g., Bachelor of Technology"
                />
              </div>

              <!-- Institution -->
              <div>
                <label class="block font-medium mb-1 text-gray-700">Institution *</label>
                <input
                  type="text"
                  v-model="updateEducationForm.institution"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                  placeholder="e.g., XYZ University"
                />
              </div>

              <!-- Start Date -->
              <div>
                <label class="block font-medium mb-1 text-gray-700">Start Year *</label>
                <input
                  type="number"
                  v-model="updateEducationForm.startDate"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                  min="1990"
                  :max="new Date().getFullYear()"
                  placeholder="e.g., 2020"
                />
              </div>

              <!-- End Date -->
              <div>
                <label class="block font-medium mb-1 text-gray-700">End Year</label>
                <input
                  type="number"
                  v-model="updateEducationForm.endDate"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  min="1990"
                  :max="new Date().getFullYear() + 10"
                  placeholder="Leave empty if ongoing"
                />
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block font-medium mb-1 text-gray-700">Description (Optional)</label>
              <textarea
                v-model="updateEducationForm.description"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                rows="4"
                placeholder="Additional details about your education, achievements, coursework, etc."
              ></textarea>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                @click="editEducationToggle = false; currentEducationId = null"
                class="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                <i class="fas fa-times mr-2"></i>
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                <i class="fas fa-save mr-2"></i>
                {{ currentEducationId ? 'Update Education' : 'Add Education' }}
              </button>
            </div>
          </form>
        </div>
      </section>
    </teleport>
    
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { useAuthStore } from "@/stores/auth";
import { useSkillsStore } from "@/stores/skillsStore";
import { useEducationStore } from "@/stores/educationStore";
import { useNotificationsStore } from "@/stores/notifications";
import { onMounted, ref, computed, nextTick, watch } from "vue";
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const authStore = useAuthStore();
const skillsStore = useSkillsStore();
const educationStore = useEducationStore();
const notificationStore = useNotificationsStore();
const route = useRoute();

const activeCategory = ref("frontendTech");
const editSkillsToggle = ref(false);
const editEducationToggle = ref(false);
const currentSkillId = ref(null);
const currentEducationId = ref(null);
const updateSkillForm = ref({});
const updateEducationForm = ref({});

const Tech = ref([
  { id: "frontendTech", name: "Frontend", icon: "fas fa-laptop-code" },
  { id: "backendTech", name: "Backend", icon: "fas fa-server" },
  { id: "databaseTech", name: "Database", icon: "fas fa-database" },
  {
    id: "developmentTools",
    name: "Development Tools",
    icon: "fas fa-cloud",
  },
  {
    id: "designTools",
    name: "Designing Tools",
    icon: "fa-brands fa-figma",
  },
  {
    id: "deploymentTech",
    name: "Deployment Tools",
    icon: "fas fa-cloud-upload-alt",
  },
]);

// Calculate education duration
const calculateEducationDuration = (edu) => {
  const startYear = parseInt(edu.startDate) || 0;
  const endYear = parseInt(edu.endDate) || new Date().getFullYear();

  const duration = endYear - startYear;

  if (duration <= 0) return "";
  if (duration === 1) return "1 year";
  return `${duration} years`;
};

// Convert proficiency percentage to level name
const getSkillLevel = (proficiency) => {
  const level = parseInt(proficiency) || 0;
  if (level >= 90) return 'Expert';
  if (level >= 70) return 'Advanced';
  if (level >= 50) return 'Intermediate';
  if (level >= 30) return 'Beginner';
  return 'Novice';
};

// Skills CRUD Operations
const openEditSkillForm = (skill) => {
  updateSkillForm.value = {
    name: skill.name || "",
    tech: skill.tech || "",
    proficiency: skill.proficiency || 50,
    description: skill.description || "",
    image: skill.image || "",
  };
  currentSkillId.value = skill.id;
  editSkillsToggle.value = true;
};

const openCreateSkillForm = () => {
  updateSkillForm.value = {
    name: "",
    tech: "",
    proficiency: 50,
    description: "",
    image: "",
  };
  currentSkillId.value = null;
  editSkillsToggle.value = true;
};

const updateSkills = async () => {
  try {
    if (!updateSkillForm.value.name || !updateSkillForm.value.tech || !updateSkillForm.value.description || !updateSkillForm.value.image) {
      notificationStore.addNotification({
        type: 'error',
        title: 'Validation Error!',
        message: 'Please fill in all required fields (Name, Category, Description, Image).'
      });
      return;
    }

    const proficiency = parseInt(updateSkillForm.value.proficiency);
    if (proficiency < 0 || proficiency > 100) {
      notificationStore.addNotification({
        type: 'error',
        title: 'Validation Error!',
        message: 'Proficiency must be between 0 and 100.'
      });
      return;
    }

    const formData = {
      name: updateSkillForm.value.name,
      tech: updateSkillForm.value.tech,
      proficiency: proficiency,
      description: updateSkillForm.value.description,
      image: updateSkillForm.value.image,
    };

    if (currentSkillId.value) {
      await skillsStore.updateSkill(currentSkillId.value, formData);
      notificationStore.addNotification({
        type: 'success',
        title: 'Success!',
        message: 'Skill updated successfully!'
      });
    } else {
      await skillsStore.createSkill(formData);
      notificationStore.addNotification({
        type: 'success',
        title: 'Success!',
        message: 'Skill added successfully!'
      });
    }
    
    editSkillsToggle.value = false;
    currentSkillId.value = null;
  } catch (error) {
    console.error("Error with skill operation:", error);
    notificationStore.addNotification({
      type: 'error',
      title: 'Error!',
      message: 'Failed to save skill. Please try again.'
    });
  }
};

const deleteSkill = async (skillId) => {
  const confirmed = await notificationStore.showConfirmation({
    title: 'Delete Skill',
    message: 'Are you sure you want to delete this skill? This action cannot be undone.',
    confirmText: 'Yes, Delete',
    cancelText: 'Cancel',
    type: 'danger'
  });

  if (confirmed) {
    try {
      await skillsStore.deleteSkill(skillId);
      notificationStore.addNotification({
        type: 'success',
        title: 'Success!',
        message: 'Skill deleted successfully!'
      });
    } catch (error) {
      console.error("Error deleting skill:", error);
      notificationStore.addNotification({
        type: 'error',
        title: 'Error!',
        message: 'Failed to delete skill. Please try again.'
      });
    }
  }
};

// Education CRUD Operations
const openEditEducationForm = (education) => {
  updateEducationForm.value = {
    degree: education.degree || "",
    institution: education.institution || "",
    startDate: education.startDate || "",
    endDate: education.endDate || null,
    description: education.description || "",
  };
  currentEducationId.value = education.id;
  editEducationToggle.value = true;
};

const openCreateEducationForm = () => {
  updateEducationForm.value = {
    degree: "",
    institution: "",
    startDate: "",
    endDate: "",
    description: "",
  };
  currentEducationId.value = null;
  editEducationToggle.value = true;
};

const updateEducation = async () => {
  try {
    if (!updateEducationForm.value.degree || !updateEducationForm.value.institution || !updateEducationForm.value.startDate) {
      notificationStore.addNotification({
        type: 'error',
        title: 'Validation Error!',
        message: 'Please fill in all required fields (Degree, Institution, Start Date).'
      });
      return;
    }

    if (currentEducationId.value) {
      await educationStore.updateEducation(currentEducationId.value, updateEducationForm.value);
      notificationStore.addNotification({
        type: 'success',
        title: 'Success!',
        message: 'Education updated successfully!'
      });
    } else {
      if(!updateEducationForm.value.endDate){
        updateEducationForm.value.endDate = null;
      }
      await educationStore.createEducation(updateEducationForm.value);
      notificationStore.addNotification({
        type: 'success',
        title: 'Success!',
        message: 'Education added successfully!'
      });
    }
    
    editEducationToggle.value = false;
    currentEducationId.value = null;
  } catch (error) {
    console.error("Error with education operation:", error);
    notificationStore.addNotification({
      type: 'error',
      title: 'Error!',
      message: 'Failed to save education. Please try again.'
    });
  }
};

const deleteEducation = async (educationId) => {
  const confirmed = await notificationStore.showConfirmation({
    title: 'Delete Education',
    message: 'Are you sure you want to delete this education record? This action cannot be undone.',
    confirmText: 'Yes, Delete',
    cancelText: 'Cancel',
    type: 'danger'
  });

  if (confirmed) {
    try {
      await educationStore.deleteEducation(educationId);
      notificationStore.addNotification({
        type: 'success',
        title: 'Success!',
        message: 'Education deleted successfully!'
      });
    } catch (error) {
      console.error("Error deleting education:", error);
      notificationStore.addNotification({
        type: 'error',
        title: 'Error!',
        message: 'Failed to delete education. Please try again.'
      });
    }
  }
};

const handleGlobalClick = (event) => {
  const editSkillButton = event.target.closest(".edit-skill-button");
  const addSkillButton = event.target.closest(".add-skill-button");
  const skillModal = event.target.closest(".skill-modal");
  const editEducationButton = event.target.closest(".edit-education-button");
  const addEducationButton = event.target.closest(".add-education-button");
  const educationModal = event.target.closest(".education-modal");
  
  if (editSkillsToggle.value && !editSkillButton && !addSkillButton && !skillModal) {
    editSkillsToggle.value = false;
    currentSkillId.value = null;
  }
  
  if (editEducationToggle.value && !editEducationButton && !addEducationButton && !educationModal) {
    editEducationToggle.value = false;
    currentEducationId.value = null;
  }
};

const filteredSkills = computed(() => {
  return skillsStore.getSortedSkills.filter((skill) => skill.tech === activeCategory.value);
});

// Helper function to scroll to section
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

// Watch for hash changes
watch(() => route.hash, (newHash) => {
  if (newHash === '#education') {
    setTimeout(() => scrollToSection('education'), 100);
  } else if (newHash === '#skills') {
    setTimeout(() => scrollToSection('skills'), 100);
  }
}, { immediate: true });

onMounted(async () => {
  await userStore.fetchUserData();
  
  // Populate skills store with user data
  if (userStore.user.skills && userStore.user.skills.length > 0) {
    skillsStore.setSkills(userStore.user.skills);
  }
  
  // Populate education store with user data
  if (userStore.user.education && userStore.user.education.length > 0) {
    educationStore.setEducation(userStore.user.education);
  }

  // Handle initial hash scroll after content loads
  await nextTick();
  setTimeout(() => {
    if (route.hash === '#education') {
      scrollToSection('education');
    } else if (route.hash === '#skills') {
      scrollToSection('skills');
    }
  }, 300);

  // Add global click listener
  document.addEventListener("click", handleGlobalClick);
});
</script>

<style scoped>
/* Fade transition for category switching */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
