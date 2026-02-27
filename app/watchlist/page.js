"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { getWatchlist, clearWatchlist } from "@/lib/watchlist";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const loadWatchlist = () => {
    const movies = getWatchlist();
    setWatchlist(movies.sort((a, b) => b.addedAt - a.addedAt));
  };

  useEffect(() => {
    loadWatchlist();

    // Listen for storage changes
    const handleStorageChange = () => {
      loadWatchlist();
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event for same-tab updates
    window.addEventListener('watchlistUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('watchlistUpdated', handleStorageChange);
    };
  }, []);

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear your entire watchlist?')) {
      clearWatchlist();
      loadWatchlist();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-black text-white">
      <Navbar onSearch={setSearchQuery} />

      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Heart className="w-10 h-10 text-red-500 fill-red-500" />
              <div>
                <h1 className="text-4xl font-bold">My Watchlist</h1>
                <p className="text-gray-400 mt-1">
                  {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} saved
                </p>
              </div>
            </div>

            {watchlist.length > 0 && (
              <Button
                onClick={handleClearAll}
                variant="outline"
                className="gap-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-white"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </Button>
            )}
          </div>
        </motion.div>

        {/* Watchlist Grid */}
        {watchlist.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4"
          >
            {watchlist.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Heart className="w-24 h-24 text-gray-700 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Your watchlist is empty</h2>
            <p className="text-gray-400 text-lg mb-8">
              Start adding movies you want to watch by clicking the heart icon
            </p>
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-red-600 hover:bg-red-700"
            >
              Browse Movies
            </Button>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
