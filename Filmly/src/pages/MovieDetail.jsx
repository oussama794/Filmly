import { useState, useEffect } from "react";
import { ArrowLeft, Star, Clock, Calendar, User } from "lucide-react";
// import CastInfo from "../components/CastInfo";

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
          
          // Add to recently watched
          const recent = JSON.parse(localStorage.getItem("recentlyWatched") || "[]");
          const filteredRecent = recent.filter(m => m.imdbID !== movie.imdbID);
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

  if (loading) {
    return (
      <div className="p-4 text-white w-full">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="text-[#f6ad55] mr-4">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Loading...</h1>
        </div>
        <div className="animate-pulse">
          <div className="aspect-[2/3] bg-gray-700 rounded-lg mb-4 max-w-sm mx-auto" />
          <div className="h-6 bg-gray-700 rounded mb-2" />
          <div className="h-4 bg-gray-700 rounded mb-4 w-3/4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded" />
            <div className="h-4 bg-gray-700 rounded" />
            <div className="h-4 bg-gray-700 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  const details = movieDetails || movie;

  return (
    <div className="p-4 text-white w-full">
      {/* Header with Back Button */}
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="text-[#f6ad55] mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold line-clamp-1">{details.Title}</h1>
      </div>

      {/* Movie Poster and Basic Info */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="w-full md:w-1/3 max-w-sm mx-auto md:mx-0">
          {!imageError && details.Poster && details.Poster !== "N/A" ? (
            <img
              src={details.Poster}
              alt={details.Title}
              className="w-full aspect-[2/3] object-cover rounded-lg"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full aspect-[2/3] bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-6xl">🎬</span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{details.Title}</h2>
          
          {/* Movie Info Row */}
          <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-4">
            {details.Year && (
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span className="text-sm">{details.Year}</span>
              </div>
            )}
            {details.Runtime && (
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span className="text-sm">{details.Runtime}</span>
              </div>
            )}
            {details.Director && details.Director !== "N/A" && (
              <div className="flex items-center gap-1">
                <User size={16} />
                <span className="text-sm">{details.Director}</span>
              </div>
            )}
          </div>

          {/* Ratings */}
          {details.imdbRating && details.imdbRating !== "N/A" && (
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 bg-[#f6ad55] text-black px-3 py-1 rounded-full">
                <Star size={16} fill="currentColor" />
                <span className="font-bold">{details.imdbRating}</span>
                <span className="text-sm">IMDb</span>
              </div>
              {details.Metascore && details.Metascore !== "N/A" && (
                <div className="bg-[#2ECC71] text-white px-3 py-1 rounded-full">
                  <span className="font-bold">{details.Metascore}</span>
                  <span className="text-sm ml-1">Meta</span>
                </div>
              )}
            </div>
          )}

          {/* Genres */}
          {details.Genre && details.Genre !== "N/A" && (
            <div className="mb-4">
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
          <div className="flex gap-2 mb-6">
            <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold">
              Log
            </button>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">
              Review
            </button>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">
              List
            </button>
          </div>
        </div>
      </div>

      {/* Plot */}
      {details.Plot && details.Plot !== "N/A" && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Synopsis</h3>
          <p className="text-gray-300 leading-relaxed">{details.Plot}</p>
        </div>
      )}

      {/* Cast Section */}
      {details.Actors && details.Actors !== "N/A" && (
        <CastInfo actors={details.Actors} />
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
  );
}