import { useState } from "react";
import { Search, Filter } from "lucide-react";
import MovieCard from "../components/MovieCard";
import MovieDetail from "./MovieDetail";

export default function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    year: "",
    type: "movie" // movie, series, episode
  });

  const API_KEY = "81c459b3";

  const handleSearch = async (searchQuery, searchFilters = filters) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}`;

      if (searchFilters.type) {
        url += `&type=${searchFilters.type}`;
      }
      if (searchFilters.year) {
        url += `&y=${searchFilters.year}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search || []);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Debounced search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      if (value.trim()) {
        handleSearch(value, filters);
        fetchSuggestions(value);
      } else {
        setMovies([]);
        setHasSearched(false);
        setSuggestions([]);
      }
    }, 300);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (query.trim()) {
      handleSearch(query, newFilters);
    }
  };

  const fetchSuggestions = async (text) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(text)}&type=${filters.type}&page=1`);
      const data = await response.json();
      if (data.Response === "True") {
        setSuggestions((data.Search || []).slice(0, 5));
      } else {
        setSuggestions([]);
      }
    } catch {
      setSuggestions([]);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackFromDetail = () => {
    setSelectedMovie(null);
  };

  if (selectedMovie) {
    return <MovieDetail movie={selectedMovie} onBack={handleBackFromDetail} />;
  }

  return (
    <div className="text-textPrimary w-full min-h-screen bg-background px-4 pt-6 font-sans">
      {/* Header - Only on mobile */}
      <div className="text-center mb-6 md:hidden">
        <h1 className="text-2xl font-bold text-textPrimary">Search Movies</h1>
      </div>

      {/* Search Bar */}
      <div className="w-full mb-6">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary" size={20} />
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400"
            />
            {suggestions.length > 0 && (
              <div className="absolute z-10 mt-2 w-full bg-card border border-gray-700 rounded-lg shadow-card">
                {suggestions.map((s, idx) => (
                  <button
                    key={`${s.imdbID}-${idx}`}
                    onClick={() => {
                      setQuery(s.Title);
                      setSuggestions([]);
                      handleSearch(s.Title, filters);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-white/5 text-textPrimary"
                  >
                    {s.Title} {s.Year ? `(${s.Year})` : ""}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-3 rounded-lg transition ${isFilterOpen
              ? 'bg-primary text-black'
              : 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700'
              }`}
          >
            <Filter size={20} />
          </button>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-2">
                  Year
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2023"
                  value={filters.year}
                  onChange={(e) => handleFilterChange("year", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textPrimary mb-2">
                  Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="movie">Movie</option>
                  <option value="series">Series</option>
                  <option value="episode">Episode</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="aspect-[2/3] bg-gray-700 rounded-xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && movies.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-textPrimary">
              Results ({movies.length})
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie, index) => (
              <div key={`${movie.imdbID}-${index}`} className="cursor-pointer" onClick={() => handleMovieClick(movie)}>
                <div className="relative bg-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-200 hover:scale-105 shadow-card">
                  <div className="aspect-[2/3] bg-gray-700">
                    {movie.Poster && movie.Poster !== "N/A" ? (
                      <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl" style={{ display: movie.Poster && movie.Poster !== "N/A" ? 'none' : 'flex' }}>
                      🎬
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-textPrimary font-semibold text-sm line-clamp-2 mb-1">
                      {movie.Title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-textSecondary text-xs">{movie.Year}</span>
                      {movie.imdbRating && movie.imdbRating !== "N/A" && (
                        <div className="bg-primary text-black px-2 py-1 rounded text-xs font-bold">
                          {movie.imdbRating}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && hasSearched && movies.length === 0 && (
        <div className="text-center text-textSecondary py-12">
          <div className="text-6xl mb-4">🎬</div>
          <h3 className="text-xl font-semibold mb-2 text-textPrimary">No movies found</h3>
          <p className="text-textSecondary">Try adjusting your search terms or filters</p>
        </div>
      )}

      {/* Initial State */}
      {!loading && !hasSearched && (
        <div className="text-center text-textSecondary py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2 text-textPrimary">Search for movies</h3>
          <p className="text-textSecondary">Enter a movie title to start exploring</p>
        </div>
      )}
    </div>
  );
}