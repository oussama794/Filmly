import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Camera, MapPin, Instagram } from "lucide-react";

export default function UserProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    bio: user?.bio || "",
    location: user?.location || "",
    social: user?.social || ""
  });

  const handleSaveProfile = () => {
    // Update user in localStorage
    const updatedUser = { ...user, ...profile };
    localStorage.setItem("filmlyUser", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="text-center">
      {/* Avatar */}
      <div className="relative inline-block mb-4">
        <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center text-3xl">
          👤
        </div>
        {isEditing && (
          <button className="absolute bottom-0 right-0 bg-[#f6ad55] text-black p-2 rounded-full">
            <Camera size={16} />
          </button>
        )}
      </div>

      {/* Username */}
      <h2 className="text-xl font-bold mb-2">{user?.username}</h2>

      {/* Bio */}
      <div className="mb-4">
        {isEditing ? (
          <textarea
            value={profile.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            placeholder="Tell us about yourself..."
            className="w-full p-2 bg-gray-800 rounded border border-gray-600 text-white resize-none"
            rows="3"
          />
        ) : (
          <p className="text-gray-300 italic">
            {profile.bio || '"Anything"'}
          </p>
        )}
      </div>

      {/* Location */}
      <div className="flex items-center justify-center mb-2 text-[#2ECC71]">
        <MapPin size={16} className="mr-1" />
        {isEditing ? (
          <input
            type="text"
            value={profile.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder="Your location"
            className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm"
          />
        ) : (
          <span className="text-sm">{profile.location || "CasablancA"}</span>
        )}
      </div>

      {/* Social */}
      <div className="flex items-center justify-center mb-6 text-gray-400">
        <Instagram size={16} className="mr-1" />
        {isEditing ? (
          <input
            type="text"
            value={profile.social}
            onChange={(e) => handleInputChange("social", e.target.value)}
            placeholder="Instagram handle"
            className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm"
          />
        ) : (
          <span className="text-sm">{profile.social || "instagram"}</span>
        )}
      </div>

      {/* Edit Button */}
      {isEditing ? (
        <div className="flex gap-2 justify-center mb-6">
          <button
            onClick={handleSaveProfile}
            className="bg-[#f6ad55] text-black px-4 py-2 rounded-lg font-semibold"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg mb-6"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
}