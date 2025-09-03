import { useState, useEffect } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useWatchlist } from "../context/WatchlistContext";

export default function MovieDetail({ movie, onBack }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);
  const { toggleWatchlist, isInWatchlist } = useWatchlist();

  const API_KEY = "81c459b3"; // OMDb API (from info.json features)

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
        <div className="relative h-[70vh] bg-gray-700 animate-pulse">
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
    <div className="text-textPrimary w-full min-h-screen bg-background relative font-sans">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        {!imageError && details.Poster && details.Poster !== "N/A" ? (
          <img
            src={details.Poster}
            alt={details.Title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <span className="text-6xl">🎬</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 text-white bg-black/50 p-2 rounded-full z-10 hover:bg-black/70 transition"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Movie Info Overlay - Bottom positioned */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#2c3e50] to-transparent pt-16">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-textPrimary mb-1">{details.Title}</h1>
            <div className="flex items-center gap-2 text-sm text-textSecondary">
              {details.Year && <span>{details.Year}</span>}
              {details.Runtime && (
                <>
                  <span>•</span>
                  <span>{details.Runtime}</span>
                </>
              )}
            </div>
            {details.Director && details.Director !== "N/A" && (
              <p className="text-sm text-textSecondary mt-1">Dir {details.Director}</p>
            )}
          </div>

          {/* Ratings */}
          <div className="flex gap-2 mb-4">
            {details.imdbRating && details.imdbRating !== "N/A" && (
              <div className="bg-primary text-black px-3 py-1 rounded-full text-sm font-bold">
                ★ {details.imdbRating}
              </div>
            )}
            {(() => {
              const rt = details.Ratings?.find((r) => r.Source === "Rotten Tomatoes");
              return rt ? (
                <div className="bg-primary text-black px-3 py-1 rounded-full text-sm font-bold">
                  🍅 {rt.Value}
                </div>
              ) : null;
            })()}
            {details.Metascore && details.Metascore !== "N/A" && (
              <div className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-bold">
                {details.Metascore}
              </div>
            )}
          </div>

          {/* Brief description */}
          {details.Plot && details.Plot !== "N/A" && (
            <>
              <p className={`text-sm text-textSecondary leading-relaxed ${isSynopsisExpanded ? "" : "line-clamp-3"} mb-2`}>
                {details.Plot}
              </p>
              <button
                onClick={() => setIsSynopsisExpanded(!isSynopsisExpanded)}
                className="text-primary text-sm font-semibold"
              >
                {isSynopsisExpanded ? "Show less" : "Read more"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons - the Log, Review, List */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button className="bg-white text-black py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition">
            📝 Log
          </button>
          <button className="bg-gray-700 text-white py-3 rounded-lg font-semibold text-sm hover:bg-gray-600 transition">
            ⭐ Review
          </button>
          <button
            onClick={() => toggleWatchlist(details)}
            className={`py-3 rounded-lg font-semibold text-sm transition ${isInWatchlist(details.imdbID)
              ? "bg-primary text-black hover:opacity-90"
              : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
          >
            📋 {isInWatchlist(details.imdbID) ? "In List" : "List"}
          </button>
        </div>

        {/* Synopsis (full on larger screens) */}
        {details.Plot && details.Plot !== "N/A" && (
          <div className="mb-6 hidden md:block">
            <p className="text-textSecondary leading-relaxed text-sm">{details.Plot}</p>
          </div>
        )}

        {/* Cast Section */}
        {details.Actors && details.Actors !== "N/A" && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-textPrimary">Cast</h3>
              <ChevronRight className="text-primary" size={20} />
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {details.Actors.split(", ").slice(0, 10).map((actor, index) => (
                <div key={index} className="text-center min-w-[90px] snap-start">
                  <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-xl mx-auto mb-2 flex-shrink-0">
                    👤
                  </div>
                  <p className="text-xs text-textPrimary font-medium leading-tight">
                    {actor.trim()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Genres */}
        {details.Genre && details.Genre !== "N/A" && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-textPrimary">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {details.Genre.split(", ").map((genre, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-textPrimary px-3 py-1 rounded-full text-sm border border-gray-600"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Additional Movie Info */}
        <div className="space-y-3 text-sm">
          {details.Country && details.Country !== "N/A" && (
            <div className="flex justify-between">
              <span className="text-textSecondary">Country:</span>
              <span className="text-textPrimary">{details.Country}</span>
            </div>
          )}
          {details.Language && details.Language !== "N/A" && (
            <div className="flex justify-between">
              <span className="text-textSecondary">Language:</span>
              <span className="text-textPrimary">{details.Language}</span>
            </div>
          )}
          {details.Writer && details.Writer !== "N/A" && (
            <div className="flex justify-between">
              <span className="text-textSecondary">Writer:</span>
              <span className="text-textPrimary text-right max-w-[60%]">{details.Writer}</span>
            </div>
          )}
          {details.Awards && details.Awards !== "N/A" && (
            <div className="flex justify-between">
              <span className="text-textSecondary">Awards:</span>
              <span className="text-textPrimary text-right max-w-[60%]">{details.Awards}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}