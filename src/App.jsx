import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Login from "./pages/admin/login";
import Home from "./pages/home";
import TestPage from "./pages/testPage";
import AdminDashboard from "./pages/admin/adminDashboard";
import RecommendAnime from "./pages/client/recommendAnime";
import AnimeOverview from "./pages/client/animeOverview";
import Genre from "./pages/client/genres";
import ForgotPassword from "./pages/admin/forgotPassword";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <GoogleOAuthProvider clientId="1069270040214-st12k2or3352mahnnsf4nqb83tl0i2j1.apps.googleusercontent.com">
      <Router>
        <Routes>

          {/* 🌍 PUBLIC ROUTES */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/genres" element={<Genre />} />
            <Route path="/anime/:id" element={<AnimeOverview />} />
            <Route path="/recommend" element={<RecommendAnime />} />
          </Route>

          {/* 🔐 ADMIN ROUTES */}
          <Route element={<AdminLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          </Route>

        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
