import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Auth from "./pages/Auth";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SearchPage from "./pages/Search";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route element={<Layout />}>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <SearchPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}