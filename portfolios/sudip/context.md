# Project Context: Portfolio Website for Sudeep Basnet

## Overview
This project is a personal portfolio and professional coaching website for Mr. Sudeep Basnet, built using modern web technologies. The website presents his services, trainings, coaching philosophy, testimonials, and gallery. It also features an integrated Admin Dashboard to allow content updates directly on the site.

## Tech Stack
- **Frontend Framework**: React (v19) with Vite
- **Styling**: Tailwind CSS (v4)
- **Animations**: Framer Motion
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React

## Project Structure
- `src/App.jsx`: Main entry point defining all the routes for both the public-facing site and the admin panel.
- `src/components/`: Contains reusable UI components (`Navbar.jsx`, `Footer.jsx`, `AnimatedSection.jsx`, `Counter.jsx`, etc.).
- `src/pages/`: Contains all the public pages (`Home.jsx`, `About.jsx`, `Trainings.jsx`, `Coaching.jsx`, `Contact.jsx`, `Events.jsx`, etc.).
- `src/admin/`: Contains the Admin Dashboard components (`AdminLayout.jsx`, `Dashboard.jsx`, `GenericEditor.jsx`, `Login.jsx`).
- `src/context/`: Context API implementations, likely for managing state across the admin panel (`AdminContext.jsx`).
- `src/data/`: Stores the static content or initial state for the website (`content.js`).

## Key Features
1. **Public Portfolio Site**: A fully responsive, animated, and beautifully designed website with sections spanning from Home, About, specific Trainings (Manager as Coach, Leadership Development, etc.), Coaching services, Events, and more.
2. **Admin Panel (`/admin`)**: A dedicated route protected by authentication (`Login.jsx`). It provides a dashboard to edit various pages' content using a `GenericEditor.jsx`.
3. **Smooth Navigation**: Included a `ScrollToTop` component to ensure clean page transitions.

## Notes
- Some script files (`get-images.cjs`, `update-overlay.cjs`, `update-overlay-2.cjs`) used during the development phase for bulk CSS updates and image scraping have been removed as they were no longer necessary for production and could have caused clutter.
- The project is configured to use Vercel for deployment as indicated by `vercel.json`.
- The ESLint setup ensures code quality is maintained across the repository (`eslint.config.js`).
