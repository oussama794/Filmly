import { useState } from "react";

export default function MovieCard({ movie, onClick }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      onClick={() => onClick?.(movie)}
      className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
    >
      <div className="aspect-[2/3] bg-gray-700">
        {!imageError && movie.Poster && movie.Poster !== "N/A" ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-4xl">🎬</span>
          </div>
        )}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
          {movie.Title}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-xs">{movie.Year}</span>
          {movie.imdbRating && movie.imdbRating !== "N/A" && (
            <div className="bg-[#f6ad55] text-black px-2 py-1 rounded text-xs font-bold">
              {movie.imdbRating}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}