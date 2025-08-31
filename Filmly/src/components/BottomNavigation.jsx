import { NavLink } from "react-router-dom";
import { Home, Search, User } from "lucide-react";

export default function BottomNavigation() {
  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#34495e] shadow-lg flex justify-center items-center py-3 z-50 border-t border-gray-600">
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
                `flex flex-col items-center transition-colors p-2 ${
                  isActive ? "text-[#2ECC71]" : "text-white"
                }`
              }
            >
              {item.icon}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Desktop Top Navigation */}
      <nav className="hidden md:flex bg-[#34495e] shadow-lg justify-center items-center py-4 z-50 border-b border-gray-600 fixed top-0 left-0 right-0">
        <div className="flex justify-between items-center w-full max-w-md px-8">
          <div className="text-2xl font-bold text-[#f6ad55]">Filmly</div>
          <div className="flex gap-8">
            {[
              { to: "/home", icon: <Home size={24} />, label: "Home" },
              { to: "/search", icon: <Search size={24} />, label: "Search" },
              { to: "/profile", icon: <User size={24} />, label: "Profile" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 transition-colors px-3 py-2 rounded-lg ${
                    isActive 
                      ? "text-[#2ECC71] bg-[#2ECC71]/10" 
                      : "text-white hover:text-[#f6ad55]"
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