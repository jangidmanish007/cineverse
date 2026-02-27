"use client";

import { Film, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Film className="w-8 h-8 text-red-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                MovieFlix
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Your premium destination for streaming and downloading high-quality video content.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Categories</li>
              <li className="hover:text-white cursor-pointer">New Releases</li>
              <li className="hover:text-white cursor-pointer">Popular</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Terms of Service</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Contact Us</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="bg-gray-800/50 border border-gray-700 hover:bg-gray-700 text-white hover:text-white cursor-pointer">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="bg-gray-800/50 border border-gray-700 hover:bg-gray-700 text-white hover:text-white cursor-pointer">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="bg-gray-800/50 border border-gray-700 hover:bg-gray-700 text-white hover:text-white cursor-pointer">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="bg-gray-800/50 border border-gray-700 hover:bg-gray-700 text-white hover:text-white cursor-pointer">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 MovieFlix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
