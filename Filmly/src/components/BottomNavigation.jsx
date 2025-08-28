import { NavLink } from "react-router-dom";
import { Home, Search, User } from "lucide-react";

export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1a202c] shadow-lg flex justify-around md:justify-center md:space-x-32 items-center py-3 z-50">
      {[
        { to: "/home", icon: <Home size={28} />, label: "Home" },
        { to: "/search", icon: <Search size={28} />, label: "Search" },
        { to: "/profile", icon: <User size={28} />, label: "Profile" },
      ].map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-[#f6ad55]" : "text-gray-400"}`
          }
        >
          {item.icon}
          <span className="text-xs md:text-sm mt-1">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
