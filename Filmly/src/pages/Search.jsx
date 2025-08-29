import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import MovieDetail from "./MovieDetail";

export default function Search() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const API_KEY = "81c459b3"; 

  const handleSearch = async (query, filters = {}) => {
    if (!query.trim()) {
      setMovies([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;
      
      if (filters.type) {
        url += `&type=${filters.type}`;
      }
      if (filters.year) {
        url += `&y=${filters.year}`;
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
    <div className="p-4 text-white w-full">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Search Movies</h1>
      </div>

      {/* Search Bar with Filters */}
      <SearchBar 
        onSearch={handleSearch}
        showFilter={true}
      />

      {/* Results */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="aspect-[2/3] bg-gray-700 rounded-lg animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie, index) => (
            <MovieCard
              key={`${movie.imdbID}-${index}`}
              movie={movie}
              onClick={handleMovieClick}
            />
          ))}
        </div>
      )}

      {!loading && hasSearched && movies.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          <div className="text-6xl mb-4">🎬</div>
          <h3 className="text-xl font-semibold mb-2">No movies found</h3>
          <p>Try adjusting your search terms or filters</p>
        </div>
      )}

      {!loading && !hasSearched && (
        <div className="text-center text-gray-400 py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Search for movies</h3>
          <p>Enter a movie title to start exploring</p>
        </div>
      )}
    </div>
  );
}