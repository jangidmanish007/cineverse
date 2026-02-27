"use client";

import { motion } from "framer-motion";

export default function SkeletonCard({ index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative group"
    >
      {/* Poster Skeleton */}
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800" />
      </div>

      {/* Info Skeleton */}
      <div className="mt-3 space-y-2">
        <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4" />
        <div className="flex items-center gap-2">
          <div className="h-3 bg-gray-800 rounded animate-pulse w-12" />
          <div className="h-3 bg-gray-800 rounded animate-pulse w-16" />
        </div>
      </div>
    </motion.div>
  );
}
