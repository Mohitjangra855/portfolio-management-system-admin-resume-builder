import { companyApi } from "@/services/api";
import { defineStore } from "pinia";

export const useCompanyStore = defineStore("company", {
  state: () => ({
    companies: [],
    loading: false,
    error: null,
  }),
  getters: {
    getCompanies: (state) => state.companies,
    // Get current company (no end date)
    getCurrentCompany: (state) => state.companies.find(company => !company.endYear && !company.endMonth),
    // Get companies sorted by latest first (startYear desc, startMonth desc)
    getSortedCompanies: (state) => {
      return [...state.companies].sort((a, b) => {
        if (a.startYear !== b.startYear) {
          return b.startYear - a.startYear; // Latest year first
        }
        return (b.startMonth || 1) - (a.startMonth || 1); // Latest month first
      });
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
    setCompanies(companies) {
      this.companies = companies || [];
    },
    async fetchCompanies() {
      this.setLoading(true);
      try {
        const response = await companyApi.getAll();
        
        let companiesData = [];
        if (response?.companies) {
          companiesData = response.companies;
        } else if (Array.isArray(response)) {
          companiesData = response;
        } else if (response?.data && Array.isArray(response.data)) {
          companiesData = response.data;
        }

        this.setCompanies(companiesData);
        this.error = null;
        return companiesData;
      } catch (error) {
        console.error("Failed to fetch companies:", error);
        this.setError(error.message || "Failed to fetch companies");
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    async createCompany(companyData) {
      this.setLoading(true);
      try {
        const response = await companyApi.create(companyData);
        if (response?.success) {
          await this.fetchCompanies(); // Refresh list
          return response.data;
        } else {
          throw new Error("Failed to create company");
        }
      } catch (error) {
        console.error("Failed to create company:", error);
        this.setError(error.message || "Failed to create company");
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    async updateCompany(id, companyData) {
      this.setLoading(true);
      try {
        const response = await companyApi.update(id, companyData);
        if (response?.success) {
          await this.fetchCompanies(); // Refresh list
          return response.data;
        } else {
          throw new Error("Failed to update company");
        }
      } catch (error) {
        console.error("Failed to update company:", error);
        this.setError(error.message || "Failed to update company");
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    async deleteCompany(id) {
      this.setLoading(true);
      try {
        const response = await companyApi.delete(id);
        if (response?.success) {
          await this.fetchCompanies(); // Refresh list
          return true;
        } else {
          throw new Error("Failed to delete company");
        }
      } catch (error) {
        console.error("Failed to delete company:", error);
        this.setError(error.message || "Failed to delete company");
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
  },
  persist: true,
});
