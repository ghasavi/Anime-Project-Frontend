import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminActivity() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);

  const backendURL = "http://localhost:3000/api/admin/active";

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get(backendURL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(data.admins);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch admin activity");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
    const interval = setInterval(fetchAdmins, 15000); // auto refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Activity</h2>

      {loading ? (
        <p>Loading...</p>
      ) : admins.length === 0 ? (
        <p>No admin activity</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Avatar</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Last Active</th>
              </tr>
            </thead>

            <tbody>
              {admins.map((admin, idx) => {
                const isOnline =
                  admin.lastActive &&
                  Date.now() - new Date(admin.lastActive).getTime() < 60000;

                return (
                  <tr key={admin._id} className="hover:bg-gray-50">
                    <td className="p-2 border text-center">{idx + 1}</td>

                    <td className="p-2 border text-center">
                      {admin.img ? (
                        <img
                          src={admin.img}
                          className="w-10 h-10 rounded-full mx-auto"
                        />
                      ) : (
                        "—"
                      )}
                    </td>

                    <td className="p-2 border">{admin.name || "—"}</td>
                    <td className="p-2 border">{admin.email}</td>

                    <td className="p-2 border text-center">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs ${
                          isOnline ? "bg-green-600" : "bg-gray-400"
                        }`}
                      >
                        {isOnline ? "Online" : "Offline"}
                      </span>
                    </td>

                    <td className="p-2 border text-center">
                      {admin.lastActive
                        ? new Date(admin.lastActive).toLocaleString()
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
