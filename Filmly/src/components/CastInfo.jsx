import { ChevronRight } from "lucide-react";

export default function CastInfo({ actors }) {
  if (!actors || actors === "N/A") return null;

  const actorsList = actors.split(", ").slice(0, 6); // Show max 6 actors

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Cast</h3>
        <ChevronRight className="text-[#f6ad55]" size={20} />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {actorsList.map((actor, index) => (
          <div key={index} className="text-center">
            {/* Placeholder avatar */}
            <div className="w-16 h-16 mx-auto mb-2 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <p className="text-sm text-white font-medium line-clamp-2">
              {actor.trim()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}