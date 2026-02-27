"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export default function TrailerPlayer({ trailer, movieTitle, buttonVariant = "default" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!trailer) return null;

  const getEmbedUrl = () => {
    if (trailer.site === 'YouTube') {
      return `https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0&modestbranding=1&mute=${isMuted ? 1 : 0}`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl();
  if (!embedUrl) return null;

  const toggleFullscreen = () => {
    const elem = document.getElementById('trailer-container');
    if (!document.fullscreenElement) {
      elem?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleClose = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsOpen(false);
    setIsFullscreen(false);
  };

  // Button variants
  const buttonStyles = {
    default: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 gap-2 text-white font-semibold shadow-lg",
    icon: "bg-red-600 hover:bg-red-700 shadow-xl",
    hero: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 gap-2 text-white font-semibold shadow-lg"
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {buttonVariant === "icon" ? (
          <Button size="icon" className={`${buttonStyles.icon} cursor-pointer`}>
            <Play className="w-5 h-5 fill-white" />
          </Button>
        ) : (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button size="lg" className={`${buttonStyles[buttonVariant] || buttonStyles.default} cursor-pointer`}>
              <Play className="w-5 h-5" />
              Watch Trailer
            </Button>
          </motion.div>
        )}
      </DialogTrigger>

      <AnimatePresence>
        <DialogContent
          className="max-w-[600px] w-[600px] h-[500px] bg-black border-none p-0 overflow-hidden flex flex-col"
          onEscapeKeyDown={handleClose}
        >
          <VisuallyHidden.Root>
            <DialogTitle>{movieTitle} - Trailer</DialogTitle>
          </VisuallyHidden.Root>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            id="trailer-container"
            className="relative flex-1 flex flex-col"
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={handleClose}
              className="absolute -top-14 right-0 z-50 text-white hover:text-red-500 transition-all bg-black/70 hover:bg-black/90 rounded-full p-3 backdrop-blur-md shadow-2xl cursor-pointer"
            >
              <X className="w-7 h-7" />
            </motion.button>

            {/* Video Player - Takes full available space */}
            <div className="relative flex-1 bg-black">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={embedUrl}
                title={`${movieTitle} - Trailer`}
                frameBorder="0"
                width={600}
                height={500}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>

            {/* Control Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-t from-black via-black/98 to-black/95 p-6 border-t border-gray-800/50"
            >
              <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Trailer Info */}
                <div className="flex-1">
                  <h3 className="text-white font-bold text-2xl mb-2">{movieTitle}</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-300 font-medium line-clamp-2">{trailer.name || 'Official Trailer'}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400">{trailer.type}</span>
                    <span className="text-gray-600">•</span>
                    <div className="flex items-center gap-2 bg-red-600/20 px-3 py-1 rounded-full">
                      <Play className="w-4 h-4 text-red-500 fill-red-500" />
                      <span className="text-red-400 font-medium">{trailer.site}</span>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-white hover:bg-white/10 hover:text-white cursor-pointer"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-white hover:bg-white/10 hover:text-white cursor-pointer"
                    onClick={toggleFullscreen}
                  >
                    {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </DialogContent>
      </AnimatePresence>
    </Dialog>
  );
}
