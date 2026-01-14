import { useNavigate } from "react-router-dom";

export default function AnimeCard({ anime }) {
  const navigate = useNavigate();

  return (
    <div
      className="group cursor-pointer"
      onClick={() => navigate(`/anime/${anime._id}`)}
    >
      {/* Even Larger Card */}
      <div className="relative w-64 h-96 bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-400 border-2 border-transparent group-hover:border-#1B1A55">
        
        {/* Full height image */}
        <div className="relative h-full w-full">
          <img
            src={anime.image || "/placeholder.png"}
            alt={anime.name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-50 group-hover:blur-[1px]"
          />
          
          {/* Dark purple gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-#070F2B/95 via-#1B1A55/90 to-#535C91/85 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Name overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div className="relative">
              {/* Text shadow for better readability */}
              <div className="absolute inset-0 bg-#070F2B blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <h2 className="relative text-2xl font-extrabold text-white text-center leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105">
                {anime.name}
              </h2>
            </div>
            
            {/* View details text */}
            <p className="text-#9290C3 text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              Click to view details
            </p>
          </div>
          
          {/* Name at bottom (disappears on hover) */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6 group-hover:opacity-0 transition-opacity duration-300">
            <h2 className="text-xl font-bold text-white text-center truncate">
              {anime.name}
            </h2>
          </div>
        </div>
        
        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-6 h-1 rounded-full bg-#535C91 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-4 right-4 w-6 h-1 rounded-full bg-#535C91 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
}