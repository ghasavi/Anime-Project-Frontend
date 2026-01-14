import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/admin/login";
import Home from "./pages/home";
import TestPage from "./pages/testPage";
import AdminDashboard from "./pages/admin/adminDashboard";
import Header from "./components/header";
import RecommendAnime from "./pages/client/recommendAnime";
import AnimeOverview from "./pages/client/animeOverview";
import Genre from "./pages/client/genres";
import Footer from "./components/footer";
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgotPassword from "./pages/admin/forgotPassword";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <GoogleOAuthProvider clientId="1069270040214-st12k2or3352mahnnsf4nqb83tl0i2j1.apps.googleusercontent.com">
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/genres" element={<Genre />} />
          <Route path="/anime/:id" element={<AnimeOverview />} />
          <Route path="/recommend" element={<RecommendAnime />} />

          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <Footer />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
