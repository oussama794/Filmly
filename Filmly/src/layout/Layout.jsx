import BottomNavigation from "../components/BottomNavigation";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#2c3e50] text-white">
      <BottomNavigation />
      
      {/* Main content with responsive padding */}
      <div className="w-full max-w-md mx-auto md:max-w-4xl md:pt-20 pb-20 md:pb-4">
        <Outlet />
      </div>
    </div>
  );
}