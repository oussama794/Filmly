import BottomNavigation from "../components/BottomNavigation";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-textPrimary font-sans">
      <BottomNavigation />

      {/* Main content with responsive padding */}
      <div className="w-full max-w-md mx-auto md:max-w-4xl md:pt-24 pb-20 md:pb-4 safe-area-inset-bottom">
        <Outlet />
      </div>
    </div>
  );
}