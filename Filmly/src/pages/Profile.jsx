import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { ChevronRight, LogOut } from "lucide-react";
import UserProfile from "../components/UserProfile";
import MovieCard from "../components/MovieCard";
import MovieDetail from "./MovieDetail";

export default function Profile() {
  const { logout } = useAuth();
  const [recentMovies, setRecentMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  // Mock top 3 favorite movies (since we don't have a backend)
  const [topMovies] = useState([
    {
      imdbID: "tt0111161",
      Title: "The Shawshank Redemption",
      Year: "1994",
      Poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg"
    },
    {
      imdbID: "tt0068646", 
      Title: "The Godfather",
      Year: "1972",
      Poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzUwNzIzMzg@._V1_SX300.jpg"
    },
    {
      imdbID: "tt0468569",
      Title: "The Dark Knight", 
      Year: "2008",
      Poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg"
    }
  ]);

  useEffect(() => {
    // Get recently watched movies from localStorage
    const recent = JSON.parse(localStorage.getItem("recentlyWatched") || "[]");
    setRecentMovies(recent.slice(0, 6));
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackFromDetail = () => {
    setSelectedMovie(null);
  };

  const handleLogout = () => {
    logout();
  };

  if (selectedMovie) {
    return <MovieDetail movie={selectedMovie} onBack={handleBackFromDetail} />;
  }

  return (
    <div className="p-4 text-white w-full">
      {/* Header with Settings */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-6" /> {/* Spacer */}
        <h1 className="text-2xl font-bold">Profile</h1>
        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-white p-2"
        >
          <LogOut size={20} />
        </button>
      </div>

      {/* User Profile Section */}
      <UserProfile />

      {/* Top 3 Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">TOP 3</h3>
          <ChevronRight className="text-[#f6ad55]" size={20} />
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {topMovies.map((movie, index) => (
            <div key={movie.imdbID} className="relative">
              <MovieCard movie={movie} onClick={handleMovieClick} />
              <div className="absolute top-2 left-2 bg-[#f6ad55] text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Watched Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">RECENT WATCHED</h3>
          <ChevronRight className="text-[#f6ad55]" size={20} />
        </div>
        
        {recentMovies.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {recentMovies.map((movie, index) => (
              <MovieCard
                key={`recent-${movie.imdbID}-${index}`}
                movie={movie}
                onClick={handleMovieClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8 bg-gray-800 rounded-lg">
            <p>No recent movies</p>
            <p className="text-sm mt-2">Start watching to see your history</p>
          </div>
        )}
      </div>
    </div>
  );
}