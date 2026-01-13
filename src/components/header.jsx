import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken"); // admin token

  const handleSignOut = () => {
    localStorage.removeItem("adminToken"); // remove token
    navigate("/login"); // redirect to login
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          AniRec
        </Link>

        {/* Nav */}
        <nav className="flex gap-6 items-center">
          <Link to="/" className="hover:text-yellow-300 transition-colors">
            Home
          </Link>
          <Link to="/genres" className="hover:text-yellow-300 transition-colors">
            Genres
          </Link>

          {token ? (
            <>
              <Link
                to="/admin"
                className="hover:text-yellow-300 transition-colors"
              >
                Admin Panel
              </Link>
              <button
                onClick={handleSignOut}
                className="hover:text-yellow-300 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="hover:text-yellow-300 transition-colors"
            >
              Admin Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
