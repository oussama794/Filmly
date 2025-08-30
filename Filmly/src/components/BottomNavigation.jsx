import { NavLink } from "react-router-dom";
import { Home, Search, User } from "lucide-react";

export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#34495e] shadow-lg flex justify-around items-center py-4 z-50">
      {[
        { to: "/home", icon: <Home size={24} />, label: "Home" },
        { to: "/search", icon: <Search size={24} />, label: "Search" },
        { to: "/profile", icon: <User size={24} />, label: "Profile" },
      ].map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center transition-colors ${
              isActive ? "text-[#2ECC71]" : "text-gray-400"
            }`
          }
        >
          {item.icon}
        </NavLink>
      ))}
    </nav>
  );
}