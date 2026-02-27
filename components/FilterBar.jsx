"use client";

import { motion } from "framer-motion";
import { Filter, SortAsc, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FilterBar({ onGenreChange, onSortChange, selectedGenres, sortBy }) {
  const [showFilters, setShowFilters] = useState(false);

  const genres = [
    { id: 28, name: "Action", icon: "💥" },
    { id: 35, name: "Comedy", icon: "😂" },
    { id: 18, name: "Drama", icon: "🎭" },
    { id: 27, name: "Horror", icon: "👻" },
    { id: 10749, name: "Romance", icon: "💕" },
    { id: 878, name: "Sci-Fi", icon: "🚀" },
    { id: 53, name: "Thriller", icon: "😱" },
    { id: 16, name: "Animation", icon: "🎨" },
    { id: 12, name: "Adventure", icon: "🗺️" },
    { id: 14, name: "Fantasy", icon: "🧙" },
  ];

  const sortOptions = [
    { value: "popularity.desc", label: "Most Popular" },
    { value: "vote_average.desc", label: "Highest Rated" },
    { value: "release_date.desc", label: "Newest First" },
    { value: "title.asc", label: "A-Z" },
  ];

  const toggleGenre = (genreId) => {
    const newGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter(id => id !== genreId)
      : [...selectedGenres, genreId];
    onGenreChange(newGenres);
  };

  return (
    <div className="mb-8">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="gap-2 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
        >
          <Filter className="w-4 h-4" />
          Filters {selectedGenres.length > 0 && `(${selectedGenres.length})`}
        </Button>

        {selectedGenres.length > 0 && (
          <Button
            onClick={() => onGenreChange([])}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 space-y-6"
        >
          {/* Genre Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-red-500" />
              <h3 className="font-semibold text-white">Genres</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Badge
                  key={genre.id}
                  onClick={() => toggleGenre(genre.id)}
                  className={`cursor-pointer transition-all ${selectedGenres.includes(genre.id)
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                    }`}
                >
                  <span className="mr-1">{genre.icon}</span>
                  {genre.name}
                  {selectedGenres.includes(genre.id) && (
                    <X className="w-3 h-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <SortAsc className="w-4 h-4 text-red-500" />
              <h3 className="font-semibold text-white">Sort By</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <Badge
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                  className={`cursor-pointer transition-all ${sortBy === option.value
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                    }`}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
