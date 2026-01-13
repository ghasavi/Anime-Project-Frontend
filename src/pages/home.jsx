// src/pages/home.jsx
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
    
      <div className="w-full h-screen flex flex-col justify-center items-center bg-blue-900 text-white p-6 gap-6">
        <h1 className="text-4xl font-bold text-center">Welcome to AniRec</h1>
        <p className="text-center max-w-lg">
          Feeling indecisive? Let us recommend an anime based on your mood!
        </p>
        <button
          onClick={() => navigate("/recommend")}
          className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition"
        >
          Recommend an Anime
        </button>
      </div>
    </>
  );
}
