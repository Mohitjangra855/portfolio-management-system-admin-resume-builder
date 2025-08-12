import { educationApi } from "@/services/api";
import { defineStore } from "pinia";

export const useEducationStore = defineStore("education", {
  state: () => ({
    education: [],
    loading: false,
    error: null,
  }),
  getters: {
    getEducation: (state) => state.education,
    // Get education sorted by latest first (endDate desc, startDate desc)
    getSortedEducation: (state) => {
      return [...state.education].sort((a, b) => {
        // First sort by endDate (latest first)
        const aEndDate = new Date(a.endDate || a.createdAt);
        const bEndDate = new Date(b.endDate || b.createdAt);
        if (aEndDate !== bEndDate) {
          return bEndDate - aEndDate;
        }
        // If endDate is same, sort by startDate (latest first)
        const aStartDate = new Date(a.startDate || a.createdAt);
        const bStartDate = new Date(b.startDate || b.createdAt);
        return bStartDate - aStartDate;
      });
    },
    // Get education by degree type
    getEducationByDegree: (state) => (degree) => {
      return state.education.filter(edu => edu.degree?.toLowerCase().includes(degree.toLowerCase()));
    },
    // Get completed education only
    getCompletedEducation: (state) => {
      return state.education.filter(edu => edu.endDate && new Date(edu.endDate) <= new Date());
    },
    // Get current/ongoing education
    getCurrentEducation: (state) => {
      return state.education.filter(edu => !edu.endDate || new Date(edu.endDate) > new Date());
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
    setEducation(education) {
      this.education = education || [];
    },
    async fetchEducation() {
      this.setLoading(true);
      try {
        const response = await educationApi.getAll();
        
        let educationData = [];
        if (response?.education) {
          educationData = response.education;
        } else if (Array.isArray(response)) {
          educationData = response;
        } else if (response?.data && Array.isArray(response.data)) {
          educationData = response.data;
        }

        this.setEducation(educationData);
        this.error = null;
        return educationData;
      } catch (error) {
        console.error("Failed to fetch education:", error);
        this.setError(error.message || "Failed to fetch education");
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    async createEducation(educationData) {
      this.setLoading(true);
      try {
        const response = await educationApi.create(educationData);
        if (response?.success) {
          await this.fetchEducation(); // Refresh list
          return response.data;
        } else {
          throw new Error("Failed to create education");
        }
      } catch (error) {
        console.error("Failed to create education:", error);
        this.setError(error.message || "Failed to create education");
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    async updateEducation(id, educationData) {
      this.setLoading(true);
      try {
        const response = await educationApi.update(id, educationData);
        if (response?.success) {
          await this.fetchEducation(); // Refresh list
          return response.data;
        } else {
          throw new Error("Failed to update education");
        }
      } catch (error) {
        console.error("Failed to update education:", error);
        this.setError(error.message || "Failed to update education");
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    async deleteEducation(id) {
      this.setLoading(true);
      try {
        const response = await educationApi.delete(id);
        if (response?.success) {
          await this.fetchEducation(); // Refresh list
          return true;
        } else {
          throw new Error("Failed to delete education");
        }
      } catch (error) {
        console.error("Failed to delete education:", error);
        this.setError(error.message || "Failed to delete education");
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
  },
  persist: true,
});
