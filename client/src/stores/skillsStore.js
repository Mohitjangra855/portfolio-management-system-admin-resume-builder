import { skillApi } from "@/services/api";
import { defineStore } from "pinia";

export const useSkillsStore = defineStore("skills", {
  state: () => ({
    skills: [],
    loading: false,
    error: null,
  }),
  getters: {
    getSkills: (state) => state.skills,
    // Get skills sorted by latest first (createdAt desc)
    getSortedSkills: (state) => {
      return [...state.skills].sort((a, b) => {
        const aDate = new Date(a.createdAt || a.updatedAt);
        const bDate = new Date(b.createdAt || b.updatedAt);
        return bDate - aDate; // Latest first
      });
    },
    // Get skills by category/type
    getSkillsByCategory: (state) => (category) => {
      return state.skills.filter(skill => skill.category?.toLowerCase() === category.toLowerCase());
    },
    // Get skills by proficiency level
    getSkillsByProficiency: (state) => (level) => {
      return state.skills.filter(skill => skill.proficiency === level);
    },
    // Get programming languages
    getProgrammingSkills: (state) => {
      return state.skills.filter(skill => 
        skill.category?.toLowerCase().includes('programming') || 
        skill.category?.toLowerCase().includes('language')
      );
    },
    // Get frameworks and libraries
    getFrameworkSkills: (state) => {
      return state.skills.filter(skill => 
        skill.category?.toLowerCase().includes('framework') || 
        skill.category?.toLowerCase().includes('library')
      );
    },
    // Get tools and technologies
    getToolSkills: (state) => {
      return state.skills.filter(skill => 
        skill.category?.toLowerCase().includes('tool') || 
        skill.category?.toLowerCase().includes('technology')
      );
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
    setSkills(skills) {
      this.skills = skills || [];
    },
    async fetchSkills() {
      this.setLoading(true);
      try {
        const response = await skillApi.getAll();
        
        let skillsData = [];
        if (response?.skills) {
          skillsData = response.skills;
        } else if (Array.isArray(response)) {
          skillsData = response;
        } else if (response?.data && Array.isArray(response.data)) {
          skillsData = response.data;
        }

        this.setSkills(skillsData);
        this.error = null;
        return skillsData;
      } catch (error) {
        console.error("Failed to fetch skills:", error);
        this.setError(error.message || "Failed to fetch skills");
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    async createSkill(skillData) {
      this.setLoading(true);
      try {
        const response = await skillApi.create(skillData);
        if (response?.success) {
          await this.fetchSkills(); // Refresh list
          return response.data;
        } else {
          throw new Error("Failed to create skill");
        }
      } catch (error) {
        console.error("Failed to create skill:", error);
        this.setError(error.message || "Failed to create skill");
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    async updateSkill(id, skillData) {
      this.setLoading(true);
      try {
        const response = await skillApi.update(id, skillData);
        if (response?.success) {
          await this.fetchSkills(); // Refresh list
          return response.data;
        } else {
          throw new Error("Failed to update skill");
        }
      } catch (error) {
        console.error("Failed to update skill:", error);
        this.setError(error.message || "Failed to update skill");
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    async deleteSkill(id) {
      this.setLoading(true);
      try {
        const response = await skillApi.delete(id);
        if (response?.success) {
          await this.fetchSkills(); // Refresh list
          return true;
        } else {
          throw new Error("Failed to delete skill");
        }
      } catch (error) {
        console.error("Failed to delete skill:", error);
        this.setError(error.message || "Failed to delete skill");
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
  },
  persist: true,
});
