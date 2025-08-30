import { useState, useEffect } from "react";
import { ArrowLeft, Star, Clock, Calendar, User, ChevronRight } from "lucide-react";

export default function MovieDetail({ movie, onBack }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const API_KEY = "81c459b3"; 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&plot=full`
        );
        const data = await response.json();

        if (data.Response === "True") {
          setMovieDetails(data);

          // Save to recently watched
          const recent = JSON.parse(localStorage.getItem("recentlyWatched") || "[]");
          const filteredRecent = recent.filter((m) => m.imdbID !== movie.imdbID);
          const updatedRecent = [movie, ...filteredRecent].slice(0, 20);
          localStorage.setItem("recentlyWatched", JSON.stringify(updatedRecent));
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (movie?.imdbID) {
      fetchMovieDetails();
    }
  }, [movie?.imdbID]);

  const handleImageError = () => {
    setImageError(true);
  };

  // Loading state skeleton
  if (loading) {
    return (
      <div className="text-white w-full min-h-screen bg-[#2c3e50] relative">
        <div className="relative h-96 bg-gray-700 animate-pulse">
          <button
            onClick={onBack}
            className="absolute top-4 left-4 text-white bg-black/50 p-2 rounded-full z-10"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
        <div className="px-4 pt-4 animate-pulse">
          <div className="h-8 bg-gray-700 rounded mb-2 w-3/4" />
          <div className="h-4 bg-gray-700 rounded mb-4 w-1/2" />
        </div>
      </div>
    );
  }

  const details = movieDetails || movie;

  return (
    <div className="text-white w-full min-h-screen bg-[#2c3e50]">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        {!imageError && details.Poster && details.Poster !== "N/A" ? (
          <img
            src={details.Poster}
            alt={details.Title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <span className="text-6xl">🎬</span>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 text-white bg-black/50 p-2 rounded-full z-10"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Movie Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h1 className="text-2xl font-bold mb-2">{details.Title}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
            {details.Year && (
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{details.Year}</span>
              </div>
            )}
            {details.Runtime && (
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{details.Runtime}</span>
              </div>
            )}
            {details.Director && details.Director !== "N/A" && (
              <div className="flex items-center gap-1">
                <User size={16} />
                <span>{details.Director}</span>
              </div>
            )}
          </div>

          {/* Ratings */}
          <div className="flex gap-2 mb-4">
            {details.imdbRating && details.imdbRating !== "N/A" && (
              <div className="flex items-center gap-2 bg-[#f6ad55] text-black px-3 py-1 rounded-full">
                <Star size={16} fill="currentColor" />
                <span className="font-bold">{details.imdbRating}</span>
                <span className="text-xs">IMDb</span>
              </div>
            )}
            {details.Metascore && details.Metascore !== "N/A" && (
              <div className="bg-[#2ECC71] text-white px-3 py-1 rounded-full">
                <span className="font-bold">{details.Metascore}</span>
                <span className="text-xs ml-1">Meta</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 py-6">
        {/* Synopsis */}
        {details.Plot && details.Plot !== "N/A" && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Synopsis</h3>
            <p className="text-gray-300 leading-relaxed text-sm">{details.Plot}</p>
          </div>
        )}

        {/* Genres */}
        {details.Genre && details.Genre !== "N/A" && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {details.Genre.split(", ").map((genre, index) => (
                <span
                  key={index}
                  className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button className="flex-1 bg-white text-black py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
            📝 Log
          </button>
          <button className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
            ⭐ Review
          </button>
          <button className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
            📋 List
          </button>
        </div>

        {/* Cast Section */}
        {details.Actors && details.Actors !== "N/A" && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Cast</h3>
              <ChevronRight className="text-[#f6ad55]" size={20} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {details.Actors.split(", ").slice(0, 6).map((actor, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-xl mx-auto mb-2">
                    👤
                  </div>
                  <p className="text-xs text-white font-medium">{actor.split(" ")[0]}</p>
                  <p className="text-xs text-gray-400">
                    {actor.split(" ").slice(1).join(" ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm">
          {details.Country && details.Country !== "N/A" && (
            <div>
              <span className="text-gray-400">Country:</span>
              <span className="ml-2">{details.Country}</span>
            </div>
          )}
          {details.Language && details.Language !== "N/A" && (
            <div>
              <span className="text-gray-400">Language:</span>
              <span className="ml-2">{details.Language}</span>
            </div>
          )}
          {details.Writer && details.Writer !== "N/A" && (
            <div className="md:col-span-2">
              <span className="text-gray-400">Writer:</span>
              <span className="ml-2">{details.Writer}</span>
            </div>
          )}
          {details.Awards && details.Awards !== "N/A" && (
            <div className="md:col-span-2">
              <span className="text-gray-400">Awards:</span>
              <span className="ml-2">{details.Awards}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
