import BottomNavigation from "../components/BottomNavigation";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#2c3e50] text-white flex flex-col">
      <div className="flex-1 w-full max-w-md mx-auto">
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  );
}