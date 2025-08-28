import BottomNavigation from "./BottomNavigation";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#1a202c] text-white pb-16 flex flex-col items-center">
      <div className="w-full max-w-4xl px-4">
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  );
}
