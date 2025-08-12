import {
  authApi,
} from "@/services/api";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      id: "1",
      name: "Mohit Kumar",
      title: "Full Stack Developer",
      bio: "Passionate developer creating amazing web applications with modern technologies. Experienced in 3.5 years building scalable web solutions.",
      email: "mohit@example.com",
      phone: "+91-9876543210",
      address: "Delhi, India",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      github: "https://github.com/mohit",
      linkedin: "https://linkedin.com/in/mohit",
      age: 25,
      role: "user",
      totalExperience: 3,
      openSourceContributions: 15,
      interestDescription: "Passionate about web development, AI, and open source",
      interests: ["Web Development", "Machine Learning", "Open Source"],
      // Sample data for testing
      skills: [
        {
          id: "1",
          name: "Vue.js",
          description: "Progressive JavaScript framework for building user interfaces",
          proficiency: 90,
          image: "https://vuejs.org/images/logo.png",
          tech: "frontendTech",
          createdAt: "2024-01-15"
        },
        {
          id: "2", 
          name: "Node.js",
          description: "JavaScript runtime for server-side development",
          proficiency: 85,
          image: "https://nodejs.org/static/images/logo.svg",
          tech: "backendTech",
          createdAt: "2024-01-10"
        },
        {
          id: "3",
          name: "MongoDB",
          description: "NoSQL database for modern applications",
          proficiency: 80,
          image: "https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png",
          tech: "databaseTech",
          createdAt: "2024-01-05"
        }
      ],
      projects: [
        {
          id: "1",
          title: "E-commerce Platform",
          description: "Full-stack e-commerce application with payment integration",
          status: "completed",
          technologies: ["Vue.js", "Node.js", "MongoDB"],
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
          liveUrl: "https://example-ecommerce.com",
          githubUrl: "https://github.com/mohit/ecommerce",
          duration: "3 months",
          createdAt: "2024-03-01"
        },
        {
          id: "2",
          title: "Task Management App",
          description: "Collaborative task management application with real-time updates",
          status: "completed",
          technologies: ["React", "Express.js", "PostgreSQL"],
          image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
          liveUrl: "https://example-tasks.com",
          githubUrl: "https://github.com/mohit/task-manager",
          duration: "2 months",
          createdAt: "2024-02-01"
        }
      ],
      companies: [
        {
          id: "1",
          company: "Tech Solutions Inc",
          position: "Senior Full Stack Developer",
          startMonth: 6,
          startYear: 2022,
          endMonth: null,
          endYear: null,
          description: "Leading development of web applications. Working with modern technologies including Vue.js, Node.js, and cloud services. Mentoring junior developers and ensuring code quality."
        },
        {
          id: "2",
          company: "StartupXYZ",
          position: "Frontend Developer",
          startMonth: 3,
          startYear: 2021,
          endMonth: 5,
          endYear: 2022,
          description: "Developed responsive web applications using React and Vue.js. Collaborated with design teams to implement user interfaces. Improved application performance by 40%."
        }
      ],
      education: [
        {
          id: "1",
          degree: "Bachelor of Technology in Computer Science",
          institution: "Delhi Technical University",
          startDate: "2017",
          endDate: "2021",
          description: "Specialized in software engineering and web technologies. Graduated with honors.",
          totalYears: 4
        }
      ]
    },
    loading: false,
    error: null,
  }),
  getters: {
    getUser: (state) => state.user,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
    isLoggedIn: (state) => Object.keys(state.user).length > 0,
  },
  actions: {
    setLoading(loading) {
      this.loading = loading;
    },
    setError(error) {
      this.error = error;
    },
    clearUser() {
      this.user = {
        skills: [],
        projects: [],
        companies: [],
        education: []
      };
      this.error = null;
    },
    async fetchUserData() {
      this.setLoading(true);
      try {
        // Get complete user data with all related info
        let response;
        try {
          response = await authApi.getProfile();
        } catch (profileError) {
          console.log("Profile API failed, trying getUserById with ID 1:", profileError);
          response = await authApi.getUserById("1");
        }

        console.log("Full response:", response);

        // Simple assignment - response.user.data has everything
        if (response?.user) {
          this.user = response.user;
        } else {
          console.warn("No valid user data found in response:", response);
        }

        
        this.error = null;
        return this.user;
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        this.setError(error.message || "Failed to fetch user data");
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    async updateUserProfile(profileData) {
      this.setLoading(true);
      try {
        const response = await authApi.updateUser(this.user.id, profileData);
        if (response.success) {
          // Re-fetch complete data after update
          console.log('successfully updated', response);
          await this.fetchUserData();
          return this.user;
        } else {
          throw new Error("Failed to update profile");
        }
      } catch (error) {
        console.error("Failed to update profile:", error);
        this.setError(error.message || "Failed to update profile");
        throw error;
      } finally {
        this.setLoading(false);
      }
    }
  },
  persist: true,
});
