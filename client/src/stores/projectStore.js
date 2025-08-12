import { projectApi } from "@/services/api";
import { defineStore } from "pinia";

export const useProjectStore = defineStore("project", {
  state: () => ({
    projects: [],
    loading: false,
    error: null,
  }),
  getters: {
    getProjects: (state) => state.projects,
    // Get completed projects only
    getCompletedProjects: (state) => state.projects.filter(project => project.status === 'completed'),
    // Get projects sorted by latest first (createdAt desc)
    getSortedProjects: (state) => {
      return [...state.projects].sort((a, b) => {
        const aDate = new Date(a.createdAt || a.updatedAt);
        const bDate = new Date(b.createdAt || b.updatedAt);
        return bDate - aDate; // Latest first
      });
    },
    // Get projects by status
    getProjectsByStatus: (state) => (status) => {
      return state.projects.filter(project => project.status === status);
    },
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
  },
  actions: {
    setLoading(loading) {
      this.loading = loading;
    },
    setError(error) {
      this.error = error;
    },
    setProjects(projects) {
      this.projects = projects || [];
    },
    async fetchProjects() {
      this.setLoading(true);
      try {
        const response = await projectApi.getAll();
        
        let projectsData = [];
        if (response?.projects) {
          projectsData = response.projects;
        } else if (Array.isArray(response)) {
          projectsData = response;
        } else if (response?.data && Array.isArray(response.data)) {
          projectsData = response.data;
        }

        this.setProjects(projectsData);
        this.error = null;
        return projectsData;
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        this.setError(error.message || "Failed to fetch projects");
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    async createProject(projectData) {
      this.setLoading(true);
      try {
        const response = await projectApi.create(projectData);
        if (response?.success) {
          await this.fetchProjects(); // Refresh list
          return response.project;
        } else {
          throw new Error(response?.message || "Failed to create project");
        }
      } catch (error) {
        console.error("Failed to create project:", error);
        this.setError(error.message || "Failed to create project");
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    async updateProject(id, projectData) {
      this.setLoading(true);
      try {
        const response = await projectApi.update(id, projectData);
        if (response?.success) {
          await this.fetchProjects(); // Refresh list
          return response.project;
        } else {
          throw new Error(response?.message || "Failed to update project");
        }
      } catch (error) {
        console.error("Failed to update project:", error);
        this.setError(error.message || "Failed to update project");
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    async deleteProject(id) {
      this.setLoading(true);
      try {
        const response = await projectApi.delete(id);
        if (response?.success) {
          await this.fetchProjects(); // Refresh list
          return true;
        } else {
          throw new Error(response?.message || "Failed to delete project");
        }
      } catch (error) {
        console.error("Failed to delete project:", error);
        this.setError(error.message || "Failed to delete project");
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
  },
  persist: true,
});
