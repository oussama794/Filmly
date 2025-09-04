# 🎬 Filmly Movie Review App

A responsive web application built with React ⚛️. Users can search movies 🔍, get personalized recommendations 🎯, track recently watched films 📺, and manage their movie experience with user profiles 👤 and watchlist functionality 📝.

## ✨ Features

- 🔍 **Movie Search** - Search by title with real-time results
- 🔐 **User Authentication** - Sign up/login with profile management
- 👤 **User Profiles** - Custom avatar, bio, and social links
- 🎯 **"For You" Recommendations** - Personalized movie suggestions
- 📺 **Recently Watched** - Track and display your viewing history
- 🎭 **Detailed Movie Pages** - Cast information and comprehensive ratings
- 🔧 **Sort & Filter** - Browse by genre, year, and rating
- 📝 **Watchlist** - Save movies for later viewing
- 🌙 **Dark Theme** - Sleek dark mode with yellow accents (#F1C40F)
- 📱 **Mobile-First** - Responsive design with bottom navigation

## 🎨 Design

- 🎨 **Color Scheme**: Dark navy background (#1a202c) with yellow accents (#F1C40F) and green icons (#2ECC71)
- 📱 **Mobile-First**: Bottom tab navigation (🏠 Home, 🔍 Search, 👤 Profile)
- 📐 **Responsive**: Mobile (375px) → Tablet (768px) → Desktop (1024px)
- 🃏 **Cards**: Movie posters with overlay text and ratings

## 🚀 Setup

```bash
git clone https://github.com/oussama794/filmly.git
cd filmly
npm install
```
Add your OMDb API key to `.env`:
```
VITE_OMDB_API_KEY=your_api_key_here 
```

```bash
npm run dev
```

## 🛠️ Tech Stack

- ⚛️ **React 18** + ⚡ **Vite**
- 🎨 **Tailwind CSS**
- 🧭 **React Router**
- 🎬 **OMDb API** (Primary)
- 🎭 **TMDB API** (Backup for cast/recommendations)

## 📁 Project Structure

```
src/
├── 🧩 components/
│   ├── 🔍 SearchBar.jsx
│   ├── 🃏 MovieCard.jsx
│   ├── 🎯 RecommendationSection.jsx
│   ├── 📺 RecentlyWatched.jsx
│   ├── 🎭 CastInfo.jsx
│   └── 🧭 BottomNavigation.jsx
├── 📄 pages/
│   ├── 🏠 Home.jsx
│   ├── 🎬 MovieDetail.jsx
│   ├── 🔐 Auth.jsx
│   └── 👤 Profile.jsx
└── 🏗️ layout/
    ├── 🧭 Navbar.jsx
    └── 📦 Layout.jsx
```

## 📱 Key Pages

- 🔐 **Login**: Clean card overlay with "Your movie journey awaits" tagline
- 🏠 **Home**: Search bar, "For You" recommendations, popular movies
- 🎬 **Movie Detail**: Large poster, cast info, ratings, action buttons
- 👤 **Profile**: User avatar, bio, social links, Top 3 movies, recent watched

## 📅 Development Timeline

- **Week 1** 🏗️: Setup & Authentication
- **Week 2** ⚙️: Core Features (Search, Display, API)
- **Week 3** 🎯: User Experience (Recommendations, Profiles)
- **Week 4** 🎭: Movie Details & Features (Cast, Ratings, Watchlist)
- **Week 5** ✨: Polish & Deploy (Navigation, Theme, Optimization)

## 🔗 API Key

Get your free API key at [OMDb API](https://www.omdbapi.com/apikey.aspx) 🗝️

## 🌐 Live Demo

https://filmly-8arfjbzzk-oussamas-projects-fb0a6107.vercel.app/ 🚀

---

Made with ❤️ and lots of ☕ by [oussama794]