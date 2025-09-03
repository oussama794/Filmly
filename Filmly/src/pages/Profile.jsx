import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { ChevronRight, LogOut, Camera, MapPin, Instagram } from "lucide-react";
import MovieCard from "../components/MovieCard";
import MovieDetail from "./MovieDetail";
import { useWatchlist } from "../context/WatchlistContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const [recentMovies, setRecentMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { watchlist } = useWatchlist();
  const [profile, setProfile] = useState({
    bio: user?.bio || "Anything",
    location: user?.location || "Casablanca",
    social: user?.social || "instagram"
  });

  // Mock top 3 favorite movies
  const [topMovies] = useState([
    {
      imdbID: "tt0111161",
      Title: "The Shawshank Redemption",
      Year: "1994",
      Poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg"
    },
    {
      imdbID: "tt0166924",
      Title: "Mulholland Drive",
      Year: "2001",
      Poster: "https://upload.wikimedia.org/wikipedia/en/0/0f/Mulholland.png"
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
    setRecentMovies(recent.slice(0, 3));
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

  const handleSaveProfile = () => {
    const updatedUser = { ...user, ...profile };
    localStorage.setItem("filmlyUser", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  if (selectedMovie) {
    return <MovieDetail movie={selectedMovie} onBack={handleBackFromDetail} />;
  }

  return (
    <div className="text-textPrimary w-full min-h-screen bg-background relative font-sans">
      {/* Header */}
      <div className="flex items-center justify-between p-4 mb-6">
        <div className="w-6" />
        <h1 className="text-xl font-semibold">{user?.username || "User"}</h1>
        <button
          onClick={handleLogout}
          className="text-textPrimary hover:text-primary transition p-1"
        >
          <div className="flex flex-col gap-1">
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
          </div>
        </button>
      </div>

      <div className="px-4">
        {/* User Profile Section */}
        <div className="text-center mb-8">
          {/* Avatar */}
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center text-3xl">
              👤
            </div>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <p className="text-textSecondary italic text-sm">
              "{profile.bio}"
            </p>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center mb-2 text-secondary">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">{profile.location}</span>
          </div>

          {/* Social */}
          <div className="flex items-center justify-center mb-6 text-textSecondary">
            <Instagram size={16} className="mr-1" />
            <span className="text-sm">{profile.social}</span>
          </div>
        </div>

        {/* TOP 3 Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-textPrimary">TOP 3</h3>
            <ChevronRight className="text-primary" size={20} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {topMovies.map((movie, index) => (
              <div key={movie.imdbID} className="relative cursor-pointer" onClick={() => handleMovieClick(movie)}>
                <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div className="absolute top-2 left-2 bg-primary text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT WATCHED Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-textPrimary">RECENT WATCHED</h3>
            <ChevronRight className="text-primary" size={20} />
          </div>

          {recentMovies.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {recentMovies.map((movie, index) => (
                <div key={`recent-${movie.imdbID}-${index}`} className="cursor-pointer" onClick={() => handleMovieClick(movie)}>
                  <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-textSecondary py-8 bg-gray-800/30 rounded-xl border border-gray-700">
              <p className="text-sm">No recent movies</p>
              <p className="text-xs mt-1 opacity-75">Start watching to see your history</p>
            </div>
          )}
        </div>

        {/* WATCHLIST Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-textPrimary">WATCHLIST</h3>
            <ChevronRight className="text-primary" size={20} />
          </div>
          {watchlist.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {watchlist.slice(0, 9).map((movie, index) => (
                <div key={`wl-${movie.imdbID}-${index}`} className="cursor-pointer" onClick={() => handleMovieClick(movie)}>
                  <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-textSecondary py-8 bg-gray-800/30 rounded-xl border border-gray-700">
              <p className="text-sm">No movies in your list</p>
              <p className="text-xs mt-1 opacity-75">Add some from the movie details page</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}