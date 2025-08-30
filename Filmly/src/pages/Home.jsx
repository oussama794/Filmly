import { useState } from "react";
import { Search, Filter } from "lucide-react";
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
    <div className="text-white w-full min-h-screen bg-[#2c3e50] pt-4">
      {/* Header with App Title */}
      <div className="text-center mb-6 px-4">
        <h1 className="text-4xl font-bold text-[#f6ad55] mb-6">Filmly</h1>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-12 pr-12 py-3 bg-white text-black rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#f6ad55]"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex gap-3 mb-6 px-4 overflow-x-auto">
        <button className="bg-[#f6ad55] text-black px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-2">
          Filter & Sort
          <span className="text-xs">▼</span>
        </button>
        <button className="bg-[#f6ad55] text-black px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-2">
          Popular
          <span className="text-xs">&gt;</span>
        </button>
      </div>

      {/* Movies Grid */}
      <div className="px-4">
        {/* Popular Movies Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="aspect-[2/3] rounded-lg overflow-hidden">
            <img src="https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg" alt="Movie" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-[2/3] rounded-lg overflow-hidden">
            <img src="https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzUwNzIzMzg@._V1_SX300.jpg" alt="Movie" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-[2/3] rounded-lg overflow-hidden">
            <img src="https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg" alt="Movie" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* For You Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-[#f6ad55] text-lg font-bold">For you</h2>
            <span className="text-[#f6ad55] text-sm">&gt;</span>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-[2/3] rounded-lg overflow-hidden">
              <img src="https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LWE3NzUtYzVkNjNkZWI0OTEyXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg" alt="Movie" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[2/3] rounded-lg overflow-hidden">
              <img src="https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_SX300.jpg" alt="Movie" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[2/3] rounded-lg overflow-hidden">
              <img src="https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" alt="Movie" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Dynamic Content */}
        <RecommendationSection 
          title="Recommended" 
          onMovieClick={handleMovieClick}
        />
        
        <RecentlyWatched onMovieClick={handleMovieClick} />
      </div>
    </div>
  );
}