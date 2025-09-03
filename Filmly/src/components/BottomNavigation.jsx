import { NavLink } from "react-router-dom";
import { Home, Search, User } from "lucide-react";

export default function BottomNavigation() {
  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card shadow-lg flex justify-center items-center py-3 z-50 border-t border-gray-700 safe-area-inset-bottom">
        <div className="flex justify-between items-center w-full max-w-xs px-8">
          {[
            { to: "/home", icon: <Home size={28} />, label: "Home" },
            { to: "/search", icon: <Search size={28} />, label: "Search" },
            { to: "/profile", icon: <User size={28} />, label: "Profile" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center transition-colors p-2 ${isActive ? "text-secondary" : "text-textPrimary"
                }`
              }
            >
              {item.icon}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Desktop Top Navigation */}
      <nav className="hidden md:flex bg-card shadow-lg justify-center items-center z-50 border-b border-gray-700 fixed top-0 left-0 right-0">
        <div className="w-full max-w-4xl px-6 py-2">
          <div className="text-2xl font-bold text-primary text-center mb-1">Filmly</div>
          <div className="flex justify-center gap-6 py-1">
            {[
              { to: "/home", icon: <Home size={24} />, label: "Home" },
              { to: "/search", icon: <Search size={24} />, label: "Search" },
              { to: "/profile", icon: <User size={24} />, label: "Profile" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 transition-colors px-3 py-2 rounded-lg ${isActive
                    ? "text-secondary bg-secondary/10"
                    : "text-textPrimary hover:text-secondary"
                  }`
                }
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}