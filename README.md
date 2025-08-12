# Portfolio Client (Vue.js)

This is the frontend for the Portfolio project, built with Vue.js and Tailwind CSS. It allows users to view, add, edit, and manage their portfolio projects, skills, education, and company information. The client communicates with a NestJS backend via REST APIs.

## Features
- User authentication (login, register, logout)
- View all projects in a grid layout
- Add, edit, and delete projects (admin only)
- Mark projects as important
- Show project details in a modal popup
- Short and full descriptions for projects
- Technologies, status, duration, and links for each project
- Responsive design with Tailwind CSS
- Skills, education, and company sections
- Toast notifications for actions
- Pinia for state management
- API integration via services

## Folder Structure
```
client/
├── public/                # Static files (index.html, favicon, resume PDF)
├── src/
│   ├── api/               # API integration helpers
│   ├── assets/            # Images, styles
│   ├── components/        # Reusable Vue components (Navbar, Footer, Modals, Toasts)
│   ├── router/            # Vue Router setup
│   ├── services/          # API service wrappers
│   ├── stores/            # Pinia stores (auth, user, project, etc.)
│   ├── views/             # Main pages (Home, Projects, About, Resume, etc.)
│   └── App.vue, main.js   # App entry point
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind CSS config
├── README.md              # This file
```

## Project Functionality

### Projects
- View all projects in a responsive grid
- Each project card shows:
  - Title
  - Short description (first 100 chars)
  - Technologies (up to 4 tags)
  - Status (badge)
  - Duration
  - Created date
  - Links to GitHub and Live Demo
  - "See More" button for full details
- Important projects are highlighted and shown in Resume
- Admins can add, edit, or delete projects via modal form
- Project modal form includes:
  - Title
  - Status (starting, ongoing, completed, cancelled)
  - Important (true/false)
  - Duration
  - Image URL
  - GitHub URL
  - Live Demo URL
  - Technologies (comma separated)
  - Short Description
  - Full Description
- Project details modal shows all info, scrollable for long content

### Other Sections
- Skills: Add, edit, delete, and view skills
- Education: Add, edit, delete, and view education records
- Company: Add, edit, delete, and view company info
- About: User profile, image upload
- Resume: Shows important projects, skills, education, and company info

### State Management
- Pinia stores for user, auth, projects, skills, education, notifications
- All CRUD actions update state and UI instantly

### API Integration
- All data is fetched and updated via REST API calls to the backend
- API service handles authentication and error handling

### UI/UX
- Responsive design for desktop and mobile
- Modals for forms and details
- Toast notifications for feedback
- Smooth navigation and scroll-to-card on "See More"

## Getting Started

1. Install dependencies:
```bash
npm install
```
2. Start the development server:
```bash
npm run serve
```
3. Open `http://localhost:8080` in your browser.

## Technologies Used
- Vue.js
- Tailwind CSS
- Pinia
- Vue Router
- REST API

## License
MIT

---
For any issues or contributions, please open an issue or pull request on the repository.
