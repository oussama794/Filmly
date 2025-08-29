import { useState } from "react";
import SearchBar from "../components/SearchBar";
import RecommendationSection from "../components/RecommendationSection";
import RecentlyWatched from "../components/RecentlyWatched";
import MovieDetail from "./MovieDetail";

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);

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
        <h1 className="text-3xl font-bold text-[#f6ad55] mb-2">Filmly</h1>
      </div>

      {/* Search Bar */}
      <SearchBar />

      {/* Filter & Sort Tags */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button className="bg-[#f6ad55] text-black px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
          Filter & Sort
        </button>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap hover:bg-gray-700 transition">
          Popular
        </button>
      </div>

      {/* For You Section */}
      <RecommendationSection 
        title="For You" 
        onMovieClick={handleMovieClick}
      />

      {/* Recently Watched */}
      <RecentlyWatched onMovieClick={handleMovieClick} />

      {/* Popular Movies Section */}
      <RecommendationSection 
        title="Popular" 
        onMovieClick={handleMovieClick}
      />
    </div>
  );
}