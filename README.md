# 🍽️ Namaste Food

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-State%20Management-purple)
![React Router](https://img.shields.io/badge/React%20Router-v6-red)
![Parcel](https://img.shields.io/badge/Parcel-Bundler-orange)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-f38020)
![License](https://img.shields.io/badge/License-MIT-green)

A modern food discovery and restaurant browsing application built with **React 18**, inspired by real-world food delivery platforms. The application fetches live restaurant data, menus, collections, and search results through Swiggy APIs routed via a Cloudflare proxy layer, providing a seamless and responsive user experience.

---

# 🚀 Live Demo

**Website:** https://namaste-food.pages.dev/

---


# ✨ Features

## User Features

* Browse restaurants based on user location
* Explore restaurant collections
* Search restaurants and cuisines
* View detailed restaurant menus
* Add items to cart
* Increase/decrease item quantities
* Remove items from cart
* Clear cart functionality
* Responsive design for mobile, tablet, and desktop
* Offline status detection
* Error handling with retry mechanisms

## Technical Features

* React Context API
* Redux Toolkit state management
* Dynamic routing using React Router
* Location-aware restaurant fetching
* Cloudflare API proxy integration
* Custom hooks implementation
* Centralized API constants
* Reusable component architecture

## Performance Features

* Lazy image loading
* Optimized API parsing
* Efficient Redux state updates
* Dynamic rendering
* Fallback image handling
* Location fallback mechanism
* Debounced search input

---

# 🛠 Tech Stack

## Frontend

* React 18
* React DOM

## State Management

* Redux Toolkit
* React Redux
* React Context API

## Routing

* React Router DOM v6

## Styling

* CSS3
* Component-based CSS architecture

## Icons

* React Icons

## Build Tool

* Parcel Bundler

## Deployment

* Cloudflare Pages

## APIs

* Swiggy Restaurant APIs
* Swiggy Menu APIs
* Swiggy Search APIs

## Additional Utilities

* Custom React Hooks
* Browser Geolocation API

---

# 🏗 Architecture Overview

## Application Flow

```text
User
  │
  ▼
React Components
  │
  ▼
Context Providers
(User + Location)
  │
  ▼
Redux Store (Cart)
  │
  ▼
API Layer (constants.js)
  │
  ▼
Cloudflare Proxy
  │
  ▼
Swiggy APIs
```

## Data Flow

```text
API Request
     │
     ▼
Cloudflare Proxy
     │
     ▼
Component Fetch Logic
     │
     ▼
Local State / Redux Store
     │
     ▼
UI Rendering
```

## Directory Structure

The project has been restructured to separate concerns cleanly into distinct modules:

```text
src/
├── assets/                  # Static assets (images, icons)
├── components/              # Self-contained React components and their CSS files
│   ├── About/               # About page component & styles
│   ├── Body/                # App Body (Listing/Landing) component & styles
│   ├── Cart/                # Cart & Checkout components & styles
│   ├── Collections/         # Collection-based lists component & styles
│   ├── Contact/             # Contact page component & styles
│   ├── Error/               # Error page component & styles
│   ├── Header/              # Navigation bar component & styles
│   ├── MenuCategory/        # Restaurant menu category component & styles
│   ├── MenuItem/            # Individual menu item component & styles
│   ├── MindSection/         # "What's on your mind" section component & styles
│   ├── RestaurantCard/      # Individual restaurant card component & styles
│   ├── RestaurantChain/     # Restaurant chain list component & styles
│   ├── RestaurantInfo/      # Restaurant summary info component & styles
│   ├── RestaurantMenu/      # Detailed restaurant menu component & styles
│   ├── Restaurants/         # Main restaurants container component & styles
│   ├── Search/              # Restaurant/dish search page component & styles
│   └── SignIn/              # User authenticating/signing in component & styles
├── contexts/                # React Contexts (LocationContext, UserContext)
├── hooks/                   # Custom React hooks encapsulating business/fetching logic
└── utils/                   # Redux store & slices, API functions, config, and generic utilities
```

---

# ⚙️ Installation Guide

## Clone Repository

```bash
git clone https://github.com/Patil-K-Bhushan/Namaste-React.git
```

## Navigate to Project

```bash
cd Namaste-Food
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm start
```

## Build Production Version

```bash
npm run build
```

---

# 🔐 Environment Variables

Currently, no environment variables are required.

The application uses:

* Cloudflare Pages Functions
* Proxy configuration
* Swiggy API endpoints routed through `/api`

If environment variables are introduced later:

```env
API_BASE_URL=
SWIGGY_PROXY_URL=
```

---

# 📜 Available Scripts

### Start Development Server

```bash
npm start
```

Runs Parcel development server.

---

### Build Production Application

```bash
npm run build
```

Creates optimized production build and copies routing redirects.

---

### Run Tests

```bash
npm test
```

Runs Jest test suite.

---

# 🔍 Key Functionalities

## Restaurant Listing

* Fetches nearby restaurants using geolocation.
* Displays restaurant cards dynamically.

## Search Functionality

* Real-time search interface.
* Debounced user input.
* Cuisine suggestions.

## Collections

* Dynamic collection-based restaurant listings.

## Restaurant Details

* Detailed restaurant information.
* Category-wise menu organization.

## Cart Management

* Add items
* Remove items
* Quantity management
* Automatic subtotal calculations

## Routing

Implemented using React Router:

```text
/
├── /about
├── /contact
├── /restaurant/:resID
├── /collection/:collectionID/:tag
├── /search
├── /cart
└── /signIn
```

## API Data Fetching

* Restaurant Listing API
* Restaurant Menu API
* Search API
* Collection API

## Error Handling

* HTTP error detection
* Retry actions
* Empty state handling
* Fallback UI rendering

## Loading States

* Loading indicators during API requests
* Safe rendering while location data resolves

---

# ⚡ Performance Optimizations

### Lazy Loading

```jsx
loading="lazy"
```

Used for restaurant and cuisine images.

### Debounced Search

Search requests are delayed to reduce unnecessary API calls.

### Efficient Redux Updates

Redux Toolkit simplifies immutable updates and improves performance.

### Fallback Data Handling

Location fallback prevents application crashes when geolocation is unavailable.

### Robust API Parsing

Restaurant data is extracted based on object structure instead of fixed array indexes to withstand API changes.

### Optimized Rendering

Reusable components reduce duplication and improve maintainability.

---

# 📱 Responsive Design

## Mobile

* Optimized layouts
* Touch-friendly navigation
* Responsive cards

## Tablet

* Adaptive grid layouts
* Improved spacing and readability

## Desktop

* Multi-column restaurant grids
* Expanded content layouts

---

# ☁️ Deployment

## Cloudflare Pages

```bash
npm run build
```

Deploy the generated `dist` folder.

Ensure:

```text
static/_redirects
```

contains:

```text
/* /index.html 200
```

---

## Netlify

```bash
npm run build
```

Deploy:

```text
dist/
```

Add redirects:

```text
/* /index.html 200
```

---

## Vercel

```bash
npm run build
```

Framework Preset:

```text
Other
```

Output Directory:

```text
dist
```

---

# 🎯 Challenges Solved

### CORS Restrictions

Implemented Cloudflare proxy routing for API access.

### Dynamic Swiggy API Structures

Avoided hardcoded card indexes and introduced robust response parsing.

### Location-Based Content

Integrated browser geolocation with fallback coordinates.

### State Synchronization

Managed cart state globally using Redux Toolkit.

### SPA Routing on Deployment

Configured redirects to prevent 404 errors on page refresh.

### API Failure Handling

Graceful error messages and retry functionality.

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

```text
MIT License

Copyright (c) 2026 Bhushan Patil
```

---

# 👨‍💻 Author

### Bhushan Patil

* GitHub: https://github.com/Patil-K-Bhushan
* Repository: https://github.com/Patil-K-Bhushan/Namaste-React
* Live Project: https://namaste-food.pages.dev/

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.

**Made with React, Redux Toolkit, Parcel, and Cloudflare Pages.**
