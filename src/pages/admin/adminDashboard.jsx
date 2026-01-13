import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ManageAnime from "./manageAnime";
import AddAnime from "./addAnime";
import ManageAdmins from "./manageAdmins";
import EditAnime from "./editAnime";
import api from "../../utils/axios";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  // Admin authentication check
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/admin/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        if (res.status === 200) setIsAdmin(true);
        else navigate("/login");
      } catch {
        navigate("/login");
      }
    })();
  }, [navigate]);

  if (!isAdmin) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* LEFT SIDEBAR */}
      <aside className="relative h-screen w-64 bg-white p-6 shadow-lg flex flex-col">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <ul className="space-y-4 flex-1">
          <li>
            <Link
              to="/admin"
              className={`block p-2 rounded ${
                location.pathname === "/admin" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-anime"
              className={`block p-2 rounded ${
                location.pathname === "/admin/manage-anime" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
            >
              Manage Anime
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-admins"
              className={`block p-2 rounded ${
                location.pathname === "/admin/manage-admins" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
            >
              Manage Admins
            </Link>
          </li>
        </ul>

        <Link to="/login" className="mt-auto">
          <p className="bg-red-400 text-white text-center p-2 rounded hover:bg-red-500">
            Sign Out
          </p>
        </Link>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <Routes>
          {/* Dashboard home */}
          <Route path="" element={<div>Welcome to Admin Dashboard</div>} />
          {/* Manage Anime table */}
          <Route path="manage-anime" element={<ManageAnime />} />
          {/* Add Anime form */}
          <Route path="add-anime" element={<AddAnime />} />
          <Route path="manage-admins" element={<ManageAdmins />} />
          <Route path="edit-anime/:id" element={<EditAnime />} />
          {/* Optional: catch-all for undefined nested routes */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}
