
// Use VUE_APP_BACKEND_URL (Vue CLI).
const API_BASE_URL = process.env.VUE_APP_BACKEND_URL



// API Service class for making HTTP requests
class ApiService {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config = {
      credentials: 'include', // Include cookies for authentication
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      throw error
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' })
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // PATCH request
  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }
}

// Create API service instance
const apiService = new ApiService()

// Project API methods
export const projectApi = {
  // Get all projects
  getAll: () => apiService.get('/project'),
  
  // Get project by ID
  getById: (id) => apiService.get(`/project/${id}`),
  
  // Create new project
  create: (projectData) => apiService.post('/project', projectData),
  
  // Update project
  update: (id, projectData) => apiService.patch(`/project/${id}`, projectData),
  
  // Delete project
  delete: (id) => apiService.delete(`/project/${id}`)
}

// Auth API methods
export const authApi = {
  // Login
  login: (credentials) => apiService.post('/auth/login', credentials),
  
  // Register
  register: (userData) => apiService.post('/auth/register', userData),
  
  // Logout
  logout: () => apiService.post('/auth/logout'),
  
  // Refresh token
  refresh: () => apiService.post('/auth/refresh'),

  // Check authentication status
  checkAuth: () => apiService.get('/auth/check'),

  // Get user profile (public)
  getProfile: () => apiService.get('/auth/profile'),

  // Get user by ID
  getUserById: (id) => apiService.get(`/auth/${id}`),

  // Update user
  updateUser: (id, userData) => apiService.patch(`/auth/${id}`, userData),
  
  // Delete user
  deleteUser: (id) => apiService.delete(`/auth/${id}`)
}

// Skill API methods
export const skillApi = {
  // Get all skills
  getAll: () => apiService.get('/skill'),

  // Get skill by ID
  getById: (id) => apiService.get(`/skill/${id}`),
  // Create new skill
  create: (skillData) => apiService.post('/skill', skillData),
  // Update skill
  update: (id, skillData) => apiService.patch(`/skill/${id}`, skillData),
  // Delete skill
  delete: (id) => apiService.delete(`/skill/${id}`),

}

//Company API methods
export const companyApi = {
  // Get all companies
  getAll: () => apiService.get('/company'),

  // Create new company
  create: (companyData) => apiService.post('/company', companyData),

  // Update company
  update: (id, companyData) => apiService.patch(`/company/${id}`, companyData),
  
  // Delete company
  delete: (id) => apiService.delete(`/company/${id}`)
}

// Education API methods
export const educationApi = {
  // Get all education records
  getAll: () => apiService.get('/education'),
  // Get education by ID
  getById: (id) => apiService.get(`/education/${id}`),
  // Create new education
  create: (educationData) => apiService.post('/education', educationData),
  // Update education
  update: (id, educationData) => apiService.patch(`/education/${id}`, educationData),
  // Delete education
  delete: (id) => apiService.delete(`/education/${id}`)
}

export const sendEmail = {
  send: (emailData) => apiService.post('/contact', emailData)
}
 
export default apiService
