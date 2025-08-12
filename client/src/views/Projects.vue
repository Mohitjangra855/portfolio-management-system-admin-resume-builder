<script setup>
import { useUserStore } from "@/stores/userStore";
import { useAuthStore } from "@/stores/auth";
import { useProjectStore } from "@/stores/projectStore";
import { useNotificationsStore } from "@/stores/notifications";
import { nextTick, onMounted, ref } from "vue";

const userStore = useUserStore();
const authStore = useAuthStore();
const projectStore = useProjectStore();
const notificationStore = useNotificationsStore();
const editProjectsToggle = ref(false);
const currentProjectId = ref(null);
const updateProjectForm = ref({});
// This code of detail project popup
const showProjectDetails = ref(false);
const selectedProject = ref({});

const openProjectDetails = (project) => {
  selectedProject.value = project;
  showProjectDetails.value = true;
  nextTick(() => {
    const el = document.getElementById(`project-${project.id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring", "ring-yellow-400");
      setTimeout(() => {
        el.classList.remove("ring", "ring-yellow-400");
      }, 2000);
    }
  });
};

const closeProjectDetails = () => {
  showProjectDetails.value = false;
  selectedProject.value = {};
};

// Projects CRUD Operations
const openEditProjectForm = (project) => {
  updateProjectForm.value = {
    title: project.title || "",
    shortDescription: project.shortDescription || "",
    description: project.description || "",
    image: project.image || "",
    githubUrl: project.githubUrl || "",
    liveUrl: project.liveUrl || "",
    status: project.status || "ongoing",
    duration: project.duration || "",
    technologies: Array.isArray(project.technologies)
      ? project.technologies.join(", ")
      : project.technologies || "",
    important:
      typeof project.important === "boolean" ? project.important : false,
  };
  currentProjectId.value = project.id;
  editProjectsToggle.value = true;
};

const openCreateProjectForm = () => {
  updateProjectForm.value = {
    title: "",
    shortDescription: "",
    description: "",
    image: "",
    githubUrl: "",
    liveUrl: "",
    status: "ongoing",
    duration: "",
    technologies: "",
    important: false,
  };
  currentProjectId.value = null;
  editProjectsToggle.value = true;
};

const updateProjects = async () => {
  try {
    if (!updateProjectForm.value.title) {
      notificationStore.addNotification({
        type: "error",
        title: "Validation Error!",
        message: "Please provide a project title.",
      });
      return;
    }

    if (!updateProjectForm.value.description) {
      notificationStore.addNotification({
        type: "error",
        title: "Validation Error!",
        message: "Please provide a project description.",
      });
      return;
    }

    if (!updateProjectForm.value.technologies) {
      notificationStore.addNotification({
        type: "error",
        title: "Validation Error!",
        message: "Please provide at least one technology.",
      });
      return;
    }

    const formData = {
      ...updateProjectForm.value,
      technologies: updateProjectForm.value.technologies
        ? updateProjectForm.value.technologies
            .split(",")
            .map((tech) => tech.trim())
        : [],
    };

    if (currentProjectId.value) {
      await projectStore.updateProject(currentProjectId.value, formData);
      notificationStore.addNotification({
        type: "success",
        title: "Success!",
        message: "Project updated successfully!",
      });
    } else {
      await projectStore.createProject(formData);
      console.log("thisis data: ", formData);
      notificationStore.addNotification({
        type: "success",
        title: "Success!",
        message: "Project added successfully!",
      });
    }

    editProjectsToggle.value = false;
    currentProjectId.value = null;
  } catch (error) {
    console.error("Error with project operation:", error);
    notificationStore.addNotification({
      type: "error",
      title: "Error!",
      message: "Failed to save project. Please try again.",
    });
  }
};

const deleteProject = async (projectId) => {
  const confirmed = await notificationStore.showConfirmation({
    title: "Delete Project",
    message:
      "Are you sure you want to delete this project? This action cannot be undone.",
    confirmText: "Yes, Delete",
    cancelText: "Cancel",
    type: "danger",
  });

  if (confirmed) {
    try {
      await projectStore.deleteProject(projectId);
      notificationStore.addNotification({
        type: "success",
        title: "Success!",
        message: "Project deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      notificationStore.addNotification({
        type: "error",
        title: "Error!",
        message: "Failed to delete project. Please try again.",
      });
    }
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const handleGlobalClick = (event) => {
  const editButton = event.target.closest(".edit-project-button");
  const addButton = event.target.closest(".add-project-button");
  const seeButton = event.target.closest(".see-project-button");
  // modal
  const modal = event.target.closest(".project-modal");

  const detailModal = event.target.closest(".project-detail-modal");

  if (editProjectsToggle.value && !editButton && !addButton && !modal) {
    editProjectsToggle.value = false;
    currentProjectId.value = null;
  }
  if (showProjectDetails.value && !seeButton && !detailModal) {
    showProjectDetails.value = false;
    selectedProject.value = {};
  }
};

onMounted(async () => {
  await userStore.fetchUserData();

  if (userStore.user.projects && userStore.user.projects.length > 0) {
    projectStore.setProjects(userStore.user.projects);
  }

  document.addEventListener("click", handleGlobalClick);
});
</script>

<template>
  <div class="projects pt-20">
    <!-- Hero Section -->
    <section
      class="projects-hero bg-gradient-to-br from-blue-100/10 via-purple-100/10 to-indigo-100/10 py-16"
    >
      <div class="container max-w-6xl mx-auto px-4 text-center">
        <h1
          class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent"
        >
          My Projects
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          A showcase of my work, from concept to completion
        </p>
        <button
          v-if="authStore.isAuthenticated"
          @click="openCreateProjectForm"
          class="add-project-button inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-sm font-medium"
        >
          <i class="fas fa-plus mr-2"></i>
          Add New Project
        </button>
      </div>
    </section>

    <!-- Projects Grid -->
    <section id="projects" class="projects-grid-section py-16">
      <div class="container max-w-6xl mx-auto px-4">
        <div
          class="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div
            v-for="project in projectStore.getSortedProjects"
            :key="project.id"
            :id="`project-${project.id}`"
            class="project-card bg-white rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:-translate-y-3 hover:shadow-xl relative group"
          >
            <!-- Edit/Delete buttons -->
            <div
              v-if="authStore.isAuthenticated"
              class="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
            >
              <button
                @click="openEditProjectForm(project)"
                class="edit-project-button w-8 h-8 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors duration-200 flex items-center justify-center"
              >
                <i class="fas fa-edit text-xs"></i>
              </button>
              <button
                @click="deleteProject(project.id)"
                class="w-8 h-8 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200 flex items-center justify-center"
              >
                <i class="fas fa-trash text-xs"></i>
              </button>
            </div>

            <div class="project-image relative h-48 overflow-hidden">
              <img
                :src="
                  project?.image ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUhIEOpEBie-LYpu0KOJUPokK5A0qM1wj6iw&s'
                "
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-300"
              />
              <div
                class="project-overlay absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100"
              >
                <div class="project-actions flex gap-4">
                  <a
                    v-if="project.liveUrl"
                    :href="project.liveUrl"
                    class="project-link w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-gray-100 transition-all duration-300"
                    target="_blank"
                    title="Live Demo"
                  >
                    <i class="fas fa-external-link-alt"></i>
                  </a>
                  <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    class="action-btn flex items-center justify-center w-12 h-12 bg-white text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                    target="_blank"
                    title="View Code"
                  >
                    <i class="fab fa-github"></i>
                  </a>
                </div>
              </div>

              <!-- Status Badge -->
              <div class="absolute top-4 right-4">
                <span
                  class="px-3 py-1 text-xs font-medium rounded-full"
                  :class="{
                    'bg-green-100 text-green-800':
                      project.status === 'completed',
                    'bg-blue-100 text-blue-800': project.status === 'ongoing',
                    'bg-yellow-100 text-yellow-800':
                      project.status === 'starting',
                    'bg-red-100 text-red-800': project.status === 'cancelled',
                  }"
                >
                  {{ project.status || "ongoing" }}
                </span>
              </div>
            </div>

            <div class="project-content p-6">
              <h3 class="text-xl font-semibold mb-3 text-gray-800">
                {{ project.title }}
              </h3>
              <p class="text-gray-600 mb-4 leading-relaxed">
                {{ project.description.slice(0, 100)
                }}{{ project.description.length > 100 ? "..." : "" }}
                <button
                  v-if="project.description.length > 100"
                  @click="openProjectDetails(project)"
                  class="ml-2 text-primary underline see-project-button"
                >
                  Read More
                </button>
              </p>

              <div class="project-tech flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.technologies.slice(0, 4)"
                  :key="tech"
                  class="tech-tag bg-gray-100 px-3 py-1 rounded-full text-sm text-primary font-medium"
                >
                  {{ tech }}
                </span>
              </div>

              <div
                class="project-meta w-full absolute bottom-2 left-2 flex justify-between items-center text-sm text-gray-500 box-border px-5"
              >
                <div class="flex items-center gap-2">
                  <i class="fas fa-calendar"></i>
                  <span>{{ formatDate(project.createdAt) }}</span>
                </div>
                <div class="flex items-center gap-2">
                  Duration:
                  <i class="fas fa-clock"></i>

                  <span>{{ project.duration || "1-2 weeks" }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="projectStore.getProjects.length === 0"
          class="no-projects text-center py-16"
        >
          <i class="fas fa-folder-open text-6xl text-gray-300 mb-4"></i>
          <h3 class="text-2xl font-semibold text-gray-600 mb-2">
            No projects found
          </h3>
          <p class="text-gray-500 mb-6">
            Projects will appear here once they are added.
          </p>
          <button
            @click="openCreateProjectForm"
            class="add-project-button inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            <i class="fas fa-plus mr-2"></i>
            Add Your First Project
          </button>
        </div>
      </div>
    </section>

    <!-- Project Modal -->
    <teleport to="body" v-if="editProjectsToggle">
      <section
        class="fixed inset-0 top-[70px] z-[999] bg-black bg-opacity-70 flex justify-center items-start overflow-y-auto pt-8"
      >
        <div
          @click.stop
          class="bg-white p-6 rounded-lg w-full max-w-4xl shadow-lg mx-4 project-modal"
        >
          <h2 class="text-2xl font-bold mb-6 text-gray-800">
            {{ currentProjectId ? "Update Project" : "Add New Project" }}
          </h2>
          <form @submit.prevent="updateProjects" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Project Title -->
              <div class="md:col-span-2">
                <label class="block font-medium mb-1 text-gray-700"
                  >Project Title *</label
                >
                <input
                  type="text"
                  v-model="updateProjectForm.title"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                  placeholder="e.g., E-commerce Website"
                />
              </div>

              <!-- Status -->
              <div>
                <label class="block font-medium mb-1 text-gray-700"
                  >Status *</label
                >
                <select
                  v-model="updateProjectForm.status"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="starting">Starting</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <!-- Important -->
              <div>
                <label class="block font-medium mb-1 text-gray-700"
                  >Important *</label
                >
                <select
                  v-model="updateProjectForm.important"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                >
                  <option :value="false">False</option>
                  <option :value="true">True</option>
                </select>
              </div>

              <!-- Duration -->
              <div>
                <label class="block font-medium mb-1 text-gray-700"
                  >Duration</label
                >
                <input
                  type="text"
                  v-model="updateProjectForm.duration"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., 2-3 weeks, 1 month"
                />
              </div>

              <!-- Image URL -->
              <div class="md:col-span-2">
                <label class="block font-medium mb-1 text-gray-700"
                  >Project Image URL</label
                >
                <input
                  type="url"
                  v-model="updateProjectForm.image"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="https://example.com/project-image.jpg"
                />
              </div>

              <!-- GitHub URL -->
              <div>
                <label class="block font-medium mb-1 text-gray-700"
                  >GitHub URL</label
                >
                <input
                  type="url"
                  v-model="updateProjectForm.githubUrl"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <!-- Live URL -->
              <div>
                <label class="block font-medium mb-1 text-gray-700"
                  >Live Demo URL</label
                >
                <input
                  type="url"
                  v-model="updateProjectForm.liveUrl"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="https://project-demo.com"
                />
              </div>

              <!-- Technologies -->
              <div class="md:col-span-2">
                <label class="block font-medium mb-1 text-gray-700"
                  >Technologies Used (comma separated) *</label
                >
                <input
                  type="text"
                  v-model="updateProjectForm.technologies"
                  class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                  placeholder="React, Node.js, MongoDB, Express"
                />
              </div>
            </div>

            <!-- Short Description -->
            <div>
              <label class="block font-medium mb-1 text-gray-700"
                >Project Short Description *</label
              >
              <textarea
                v-model="updateProjectForm.shortDescription"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                rows="4"
                placeholder="Describe the project, its features, and what you learned..."
              ></textarea>
            </div>
            <!-- Description -->
            <div>
              <label class="block font-medium mb-1 text-gray-700"
                >Project Description *</label
              >
              <textarea
                v-model="updateProjectForm.description"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                rows="4"
                required
                placeholder="Describe the project, its features, and what you learned..."
              ></textarea>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                @click="
                  editProjectsToggle = false;
                  currentProjectId = null;
                "
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
                {{ currentProjectId ? "Update Project" : "Add Project" }}
              </button>
            </div>
          </form>
        </div>
      </section>
    </teleport>

    <!-- Project Details Modal -->
    <teleport to="body" v-if="showProjectDetails">
      <section
        class="fixed inset-0 z-[999] bg-black bg-opacity-70 flex justify-center items-center p-0"
      >
        <div
          @click.stop
          class="project-detail-modal bg-white rounded-2xl w-full max-w-3xl shadow-2xl mx-4 flex flex-col overflow-y-auto"
          style="max-height: 90vh"
        >
          <div class="px-10 pt-10 pb-6 flex flex-col items-center">
            <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">
              {{ selectedProject.title }}
            </h2>
            <img
              v-if="selectedProject.image"
              :src="selectedProject.image"
              :alt="selectedProject.title"
              class="w-full max-h-64 object-cover rounded-xl mb-6 shadow"
            />
          </div>
          <div class="px-10 pb-10 flex flex-col">
            <p class="mb-8 text-gray-700 text-base leading-relaxed">
              {{ selectedProject.description }}
            </p>
            <div class="mb-6">
              <strong class="text-gray-700">Technologies:</strong>
              <div class="flex flex-wrap gap-2 mt-2">
                <span
                  v-for="tech in selectedProject.technologies"
                  :key="tech"
                  class="inline-block bg-gray-100 text-primary px-3 py-1 rounded-full text-sm font-medium"
                  >{{ tech }}</span
                >
              </div>
            </div>
            <div class="mb-4">
              <strong class="text-gray-700">Status:</strong>
              <span class="ml-2">{{ selectedProject.status }}</span>
            </div>
            <div class="mb-4">
              <strong class="text-gray-700">Duration:</strong>
              <span class="ml-2">{{ selectedProject.duration }}</span>
            </div>
            <div class="mb-4" v-if="selectedProject.githubUrl">
              <strong class="text-gray-700">GitHub:</strong>
              <a
                :href="selectedProject.githubUrl"
                target="_blank"
                class="text-primary underline ml-2"
                >View Code</a
              >
            </div>
            <div class="mb-4" v-if="selectedProject.liveUrl">
              <strong class="text-gray-700">Live Demo:</strong>
              <a
                :href="selectedProject.liveUrl"
                target="_blank"
                class="text-primary underline ml-2"
                >View Demo</a
              >
            </div>
            <button
              @click="closeProjectDetails"
              class="mt-8 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-200 self-end"
            >
              Close
            </button>
          </div>
        </div>
      </section>
    </teleport>
  </div>
</template>
