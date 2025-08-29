import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { ChevronRight } from "lucide-react";

export default function RecentlyWatched({ onMovieClick }) {
  const [recentMovies, setRecentMovies] = useState([]);

  useEffect(() => {
    // Get recently watched movies from localStorage
    const getRecentMovies = () => {
      const recent = JSON.parse(localStorage.getItem("recentlyWatched") || "[]");
      setRecentMovies(recent.slice(0, 6)); // Show only first 6
    };

    getRecentMovies();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      getRecentMovies();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Function to add movie to recently watched (to be called when viewing movie details)
  const addToRecentlyWatched = (movie) => {
    const recent = JSON.parse(localStorage.getItem("recentlyWatched") || "[]");
    
    // Remove if already exists
    const filteredRecent = recent.filter(m => m.imdbID !== movie.imdbID);
    
    // Add to beginning
    const updatedRecent = [movie, ...filteredRecent].slice(0, 20); // Keep only 20 recent
    
    localStorage.setItem("recentlyWatched", JSON.stringify(updatedRecent));
    setRecentMovies(updatedRecent.slice(0, 6));
  };

  if (recentMovies.length === 0) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Recently Watched</h2>
          <ChevronRight className="text-[#f6ad55]" size={24} />
        </div>
        <div className="text-center text-gray-400 py-8 bg-gray-800 rounded-lg">
          <p>No recently watched movies</p>
          <p className="text-sm mt-2">Start exploring to see your viewing history</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Recently Watched</h2>
        <ChevronRight className="text-[#f6ad55]" size={24} />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {recentMovies.map((movie, index) => (
          <MovieCard
            key={`recent-${movie.imdbID}-${index}`}
            movie={movie}
            onClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  );
}
