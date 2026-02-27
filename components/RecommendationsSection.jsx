"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, History, Heart } from "lucide-react";
import MovieCard from "./MovieCard";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getPersonalizedRecommendations,
  getUserPreferences,
  getWatchHistory
} from "@/lib/recommendations";
import { getWatchlist } from "@/lib/watchlist";

export default function RecommendationsSection({ allMovies = [] }) {
  const [recommendations, setRecommendations] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [watchHistory, setWatchHistory] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const loadRecommendations = () => {
    const recs = getPersonalizedRecommendations(allMovies);
    setRecommendations(recs);
  };

  const loadPreferences = () => {
    const prefs = getUserPreferences();
    setPreferences(prefs);
  };

  const loadHistory = () => {
    const history = getWatchHistory();
    setWatchHistory(history.slice(0, 8));
  };

  const loadWatchlist = () => {
    const list = getWatchlist();
    setWatchlist(list.slice(0, 8));
  };

  useEffect(() => {
    loadRecommendations();
    loadPreferences();
    loadHistory();
    loadWatchlist();
  }, [allMovies]);

  if (!preferences || preferences.totalWatched === 0 && preferences.totalWatchlist === 0) {
    return (
      <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 p-8 text-center">
        <Sparkles className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Start Your Journey</h3>
        <p className="text-gray-400">
          Add movies to your watchlist to get personalized recommendations
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* User Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card className="bg-gradient-to-br from-red-600 to-red-700 border-0 p-6">
          <Heart className="w-8 h-8 text-white mb-2" />
          <div className="text-3xl font-bold text-white">{preferences.totalWatchlist}</div>
          <div className="text-red-100 text-sm">In Watchlist</div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0 p-6">
          <History className="w-8 h-8 text-white mb-2" />
          <div className="text-3xl font-bold text-white">{preferences.totalWatched}</div>
          <div className="text-blue-100 text-sm">Watched</div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600 to-purple-700 border-0 p-6">
          <TrendingUp className="w-8 h-8 text-white mb-2" />
          <div className="text-3xl font-bold text-white">{preferences.favoriteGenres.length}</div>
          <div className="text-purple-100 text-sm">Fav Genres</div>
        </Card>

        <Card className="bg-gradient-to-br from-green-600 to-green-700 border-0 p-6">
          <Sparkles className="w-8 h-8 text-white mb-2" />
          <div className="text-3xl font-bold text-white">{recommendations.length}</div>
          <div className="text-green-100 text-sm">For You</div>
        </Card>
      </motion.div>

      {/* Favorite Genres */}
      {preferences.favoriteGenres.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-500" />
            Your Favorite Genres
          </h3>
          <div className="flex flex-wrap gap-2">
            {preferences.favoriteGenres.map((genre) => (
              <span
                key={genre}
                className="px-4 py-2 bg-red-600 text-white rounded-full font-medium capitalize"
              >
                {genre}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tabs for different sections */}
      <Tabs defaultValue="recommended" className="w-full">
        <TabsList className="bg-gray-800 border border-gray-700">
          <TabsTrigger
            value="recommended"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Recommended
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <History className="w-4 h-4 mr-2" />
            History
          </TabsTrigger>
          <TabsTrigger
            value="watchlist"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <Heart className="w-4 h-4 mr-2" />
            Watchlist
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="mt-6">
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {recommendations.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>
          ) : (
            <Card className="bg-gray-900/50 border-gray-800 p-8 text-center">
              <p className="text-gray-400">No recommendations available yet</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          {watchHistory.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {watchHistory.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>
          ) : (
            <Card className="bg-gray-900/50 border-gray-800 p-8 text-center">
              <History className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No watch history yet</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="watchlist" className="mt-6">
          {watchlist.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {watchlist.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>
          ) : (
            <Card className="bg-gray-900/50 border-gray-800 p-8 text-center">
              <Heart className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">Your watchlist is empty</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
