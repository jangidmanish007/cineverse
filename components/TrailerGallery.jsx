"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TrailerGallery({ videos = [], movieTitle }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter and categorize videos
  const trailers = videos.filter(v => v.type === "Trailer");
  const teasers = videos.filter(v => v.type === "Teaser");
  const clips = videos.filter(v => v.type === "Clip");
  const behindScenes = videos.filter(v => v.type === "Behind the Scenes");
  const featurettes = videos.filter(v => v.type === "Featurette");

  // Limit to maximum 9 videos (prioritize trailers, then teasers, then others)
  const allVideos = [...trailers, ...teasers, ...clips, ...behindScenes, ...featurettes].slice(0, 9);

  if (allVideos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <Film className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No trailers or videos available</p>
      </div>
    );
  }

  const openVideo = (video, index) => {
    setSelectedVideo(video);
    setCurrentIndex(index);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const nextVideo = () => {
    const newIndex = (currentIndex + 1) % allVideos.length;
    setCurrentIndex(newIndex);
    setSelectedVideo(allVideos[newIndex]);
  };

  const prevVideo = () => {
    const newIndex = (currentIndex - 1 + allVideos.length) % allVideos.length;
    setCurrentIndex(newIndex);
    setSelectedVideo(allVideos[newIndex]);
  };

  const getVideoTypeColor = (type) => {
    const colors = {
      "Trailer": "bg-red-600",
      "Teaser": "bg-orange-600",
      "Clip": "bg-blue-600",
      "Behind the Scenes": "bg-purple-600",
      "Featurette": "bg-green-600",
    };
    return colors[type] || "bg-gray-600";
  };

  return (
    <div className="space-y-6">
      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allVideos.map((video, index) => (
          <motion.div
            key={video.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative aspect-video rounded-lg overflow-hidden bg-gray-800 cursor-pointer"
            onClick={() => openVideo(video, index)}
          >
            {/* Thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
              alt={video.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-red-600 rounded-full p-4">
                <Play className="w-8 h-8 fill-white" />
              </div>
            </div>

            {/* Video Info */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
              <Badge className={`${getVideoTypeColor(video.type)} text-white text-xs mb-1`}>
                {video.type}
              </Badge>
              <p className="text-white text-sm font-medium line-clamp-2">{video.name}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:bg-white/20"
                onClick={closeVideo}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Navigation Buttons */}
              {allVideos.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white hover:bg-white/20"
                    onClick={prevVideo}
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white hover:bg-white/20"
                    onClick={nextVideo}
                  >
                    <ChevronRight className="w-8 h-8" />
                  </Button>
                </>
              )}

              {/* Video Player */}
              <div className="aspect-video rounded-lg overflow-hidden bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1`}
                  title={selectedVideo.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Video Info */}
              <div className="mt-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`${getVideoTypeColor(selectedVideo.type)} text-white`}>
                    {selectedVideo.type}
                  </Badge>
                  <span className="text-sm text-gray-400">
                    {currentIndex + 1} / {allVideos.length}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{selectedVideo.name}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
