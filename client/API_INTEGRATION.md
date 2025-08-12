# Portfolio API Integration

This document explains how the portfolio frontend integrates with your NestJS backend API.

## API Configuration

The API base URL is configured in `src/services/api.js`. By default, it's set to `http://localhost:3000`.

```javascript
const API_BASE_URL = 'http://localhost:3000'
```

**Important:** Update this URL to match your server configuration.

## Available API Endpoints

### Authentication (`/auth`)

- **POST** `/auth/login` - User login
- **POST** `/auth/register` - User registration  
- **POST** `/auth/logout` - User logout
- **POST** `/auth/refresh` - Refresh access token
- **GET** `/auth/profile` - Get user profile
- **GET** `/auth` - Get all users
- **GET** `/auth/:id` - Get user by ID
- **PATCH** `/auth/:id` - Update user
- **DELETE** `/auth/:id` - Delete user

### Projects (`/project`)

- **GET** `/project` - Get all projects
- **GET** `/project/:id` - Get project by ID
- **POST** `/project` - Create new project (requires auth)
- **PATCH** `/project/:id` - Update project (requires auth)
- **DELETE** `/project/:id` - Delete project (requires auth)

### Contact (`/contact`)

- **GET** `/contact` - Get all contacts
- **GET** `/contact/:id` - Get contact by ID
- **POST** `/contact` - Submit contact form
- **PATCH** `/contact/:id` - Update contact
- **DELETE** `/contact/:id` - Delete contact

## State Management

### Stores Overview

1. **`stores/auth.js`** - Authentication management
2. **`stores/projects.js`** - Project CRUD operations
3. **`stores/contact.js`** - Contact form submissions
4. **`stores/notifications.js`** - Toast notifications

### Authentication Flow

The app uses cookie-based authentication:

1. Login credentials sent to `/auth/login`
2. Server sets httpOnly cookies (`access_token`, `refresh_token`)
3. All subsequent API calls include cookies automatically
4. Token refresh handled automatically via `/auth/refresh`

### Project Management

Projects are managed through the admin panel:

1. **Fetch Projects:** Called automatically on app load
2. **Create Project:** Admin can add new projects
3. **Update Project:** Admin can edit existing projects
4. **Delete Project:** Admin can remove projects

All CRUD operations show toast notifications for user feedback.

### Contact Form

Contact form submissions:

1. Form validation on frontend
2. Data sent to `/contact` endpoint
3. Success/error notifications displayed
4. Form reset on successful submission

## Features

### Toast Notifications

All API operations show appropriate notifications:
- ✅ Success notifications for successful operations
- ❌ Error notifications for failures
- ℹ️ Info notifications for general messages
- ⚠️ Warning notifications for important notices

### Error Handling

- Network errors are caught and displayed to users
- Fallback data is used when API is unavailable
- Authentication errors trigger automatic logout
- Detailed error messages in development

### Loading States

- Loading indicators during API calls
- Disabled buttons to prevent double-submission
- Skeleton loading for better UX

## Usage Examples

### Creating a New Project

```javascript
// In Admin component
const result = await this.projectStore.createProject({
  title: 'My New Project',
  category: 'Web Development',
  status: 'In Progress',
  description: 'Project description here...',
  technologies: 'Vue.js, Node.js, MongoDB'
})

if (result.success) {
  // Success notification automatically shown
  // Modal closed automatically
} else {
  // Error notification automatically shown
}
```

### Submitting Contact Form

```javascript
// In Contact component
const result = await this.contactStore.submitContact({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Project Inquiry',
  message: 'I would like to discuss a project...'
})

if (result.success) {
  // Success notification and form reset
} else {
  // Error notification displayed
}
```

### Authentication

```javascript
// Login
try {
  await this.authStore.login('admin', 'password')
  // Success notification shown automatically
  // User redirected if needed
} catch (error) {
  // Error notification shown automatically
}

// Logout
this.authStore.logout()
// User state cleared and redirected
```

## Server Requirements

Make sure your NestJS server:

1. Has CORS enabled for your frontend domain
2. Uses cookie-based authentication
3. Returns consistent response formats
4. Handles authentication guards properly

## Environment Setup

1. Start your NestJS server on port 3000
2. Update API_BASE_URL if using different port/domain
3. Ensure database is connected and migrations run
4. Start the Vue frontend

## Fallback Behavior

The app includes fallback data for development:

- Sample projects are shown if API fails
- Demo authentication works with `admin/admin123`
- Contact form shows success message even if API fails

This ensures the portfolio is always functional, even during development.

## Production Deployment

For production deployment:

1. Update `API_BASE_URL` to your production server
2. Remove fallback authentication logic
3. Ensure proper SSL certificates
4. Configure CORS for your production domain
5. Set appropriate cookie security settings

## Troubleshooting

### Common Issues

1. **CORS Errors:** Ensure server allows your frontend domain
2. **Authentication Failed:** Check cookie settings and paths
3. **API Not Found:** Verify server is running and URL is correct
4. **Network Errors:** Check server logs and network connectivity

### Debug Mode

Enable debug logging by adding to your API service:

```javascript
console.log('API Request:', endpoint, options)
console.log('API Response:', response)
```

This will help identify API communication issues during development.
