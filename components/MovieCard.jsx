"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Star, Info, Heart } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TrailerPlayer from "./TrailerPlayer";
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from "@/lib/watchlist";

export default function MovieCard({ movie, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isInWatchlist(movie.id));
  }, [movie.id]);

  const toggleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      removeFromWatchlist(movie.id);
      setIsFavorite(false);
    } else {
      addToWatchlist(movie);
      setIsFavorite(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="bg-gray-900 border-gray-700 overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow h-full flex flex-col">
        <div className="relative aspect-[2/2.4] overflow-hidden">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Overlay Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 flex items-center justify-center gap-3"
          >
            {/* Trailer Button */}
            {movie.trailer && (
              <TrailerPlayer
                trailer={movie.trailer}
                movieTitle={movie.title}
                buttonVariant="icon"
              />
            )}

            {/* Info Button */}
            <Link href={`/movie/${movie.id}`}>
              <Button size="icon" variant="outline" className="border-gray-600 bg-gray-800/80 text-white hover:bg-gray-700 shadow-xl cursor-pointer">
                <Info className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Watchlist Heart Button */}
          <motion.button
            onClick={toggleWatchlist}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all z-10 ${isFavorite
              ? 'bg-red-600 text-white'
              : 'bg-black/50 text-white hover:bg-black/70'
              }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
          </motion.button>

          {/* Trailer Badge */}
          {movie.trailer && (
            <Badge className="absolute top-2 left-2 bg-purple-600 text-white font-bold shadow-lg flex items-center gap-1">
              <Play className="w-3 h-3 fill-white" />
              Trailer
            </Badge>
          )}
        </div>

        <Link href={`/movie/${movie.id}`} className="flex-1 flex flex-col">
          <div className="p-4 bg-gray-800 flex-1 flex flex-col">
            <h3 className="font-semibold text-base mb-2 line-clamp-2 text-white leading-tight">{movie.title}</h3>
            <div className="flex items-center justify-between text-sm text-gray-300 mt-auto">
              <span className="font-medium">{movie.year}</span>
              <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-yellow-400 text-xs">{movie.rating}</span>
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs border-gray-600 text-gray-200 bg-gray-700/50">
                {movie.language}
              </Badge>
            </div>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
}

