import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";

export default function SearchBar({ onSearch, onFilter, showFilter = false }) {
  const [query, setQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    year: "",
    type: "movie" // movie, series, episode
  });

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.trim()) {
        onSearch?.(query, filters);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query, filters, onSearch]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  return (
    <div className="w-full mb-6">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary" size={20} />
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {showFilter && (
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="bg-primary text-black p-3 rounded-lg hover:opacity-90 transition"
          >
            <Filter size={20} />
          </button>
        )}
      </div>

      {showFilter && isFilterOpen && (
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
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
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
  );
}