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
    <div className="text-textPrimary w-full min-h-screen bg-background px-4 pt-6 font-sans">
      {/* Header with App Title - Only on mobile */}
      <div className="text-center mb-6 md:hidden">
        <h1 className="text-4xl font-bold text-primary mb-6">Filmly</h1>
      </div>



      {/* Popular Movies Horizontal Scroll */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-primary text-lg font-bold">Popular</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="min-w-[40%] sm:min-w-[200px] aspect-[2/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer snap-start">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg"
              alt="The Dark Knight"
              className="w-full h-full object-cover hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://via.assets.so/img.jpg?w=300&h=450&tc=white&bg=111827&text=No+Poster"; }}
            />
          </div>
          <div className="min-w-[40%] sm:min-w-[200px] aspect-[2/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer snap-start">
            <img
              src="https://m.media-amazon.com/images/M/MV5BNDc5ZDQwMjUtYzFjNi00N2U4LWEwMzEtZGY5ZDA3ZGQ2YzU0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
              alt="Mulholland Drive"
              className="w-full h-full object-cover hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://via.assets.so/img.jpg?w=300&h=450&tc=white&bg=111827&text=No+Poster"; }}
            />
          </div>
          <div className="min-w-[40%] sm:min-w-[200px] aspect-[2/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer snap-start">
            <img
              src="https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg"
              alt="The Shawshank Redemption"
              className="w-full h-full object-cover hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://via.assets.so/img.jpg?w=300&h=450&tc=white&bg=111827&text=No+Poster"; }}
            />
          </div>
        </div>
      </div>

      {/* For You Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-primary text-lg font-bold">For you</h2>
          <span className="text-primary text-lg font-bold cursor-pointer hover:opacity-80">&gt;</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory mb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="min-w-[40%] sm:min-w-[200px] aspect-[2/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer snap-start">
            <img
              src="https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LWE3NzUtYzVkNjNkZWI0OTEyXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg"
              alt="Movie"
              className="w-full h-full object-cover hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
          <div className="min-w-[40%] sm:min-w-[200px] aspect-[2/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer snap-start">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_SX300.jpg"
              alt="Movie"
              className="w-full h-full object-cover hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
          <div className="min-w-[40%] sm:min-w-[200px] aspect-[2/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer snap-start">
            <img
              src="https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
              alt="Movie"
              className="w-full h-full object-cover hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Content Sections */}
      <div className="space-y-8">
        <RecommendationSection
          title="Recommended"
          onMovieClick={handleMovieClick}
        />

        <RecentlyWatched onMovieClick={handleMovieClick} />
      </div>
    </div>
  );
}