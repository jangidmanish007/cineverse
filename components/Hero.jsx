"use client";

import { motion } from "framer-motion";
import { Play, Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <div className="relative h-[600px] mt-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920')",
        }}
      />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <Badge className="mb-4 bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg">Featured</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight text-white drop-shadow-lg">
            Premium Video
            <br />
            <span className="bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
              Platform
            </span>
          </h1>
          <p className="text-xl text-gray-100 mb-6 drop-shadow-md">
            Stream and download your favorite content in stunning 4K, 1080p, and 720p quality.
            Unlimited access to thousands of titles.
          </p>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded backdrop-blur-sm">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-lg font-semibold text-yellow-400">8.5</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-gray-100 font-medium">2024</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-100 font-medium">Action, Drama</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 gap-2 text-white font-semibold shadow-lg cursor-pointer">
                <Play className="w-5 h-5" />
                Watch Now
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg cursor-pointer">
                <Download className="w-5 h-5" />
                Download
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
