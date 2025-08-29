import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { ChevronRight } from "lucide-react";

export default function RecommendationSection({ title, onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "81c459b3";

  const getRecommendations = async () => {
    setLoading(true);
    try {
      const searchTerms = ["popular", "action", "drama", "Thriller"];
      const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
      
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${randomTerm}&type=movie&page=1`
      );
      const data = await response.json();
      
      if (data.Response === "True") {
        setMovies(data.Search.slice(0, 6)); // Show first 6 movies
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <ChevronRight className="text-[#f6ad55]" size={24} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="aspect-[2/3] bg-gray-700 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <ChevronRight className="text-[#f6ad55]" size={24} />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto">
        {movies.map((movie, index) => (
          <MovieCard
            key={`${movie.imdbID}-${index}`}
            movie={movie}
            onClick={onMovieClick}
          />
        ))}
      </div>
      
      {movies.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          <p>No recommendations available</p>
        </div>
      )}
    </div>
  );
}