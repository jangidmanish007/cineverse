"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Film, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Navbar({ onSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div
              className="flex items-center gap-2 cursor-pointer"
            >
              <Film className="w-8 h-8 text-red-600" />
              <span className="text-2xl font-bold bg-linear-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                MovieFlix
              </span>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search movies..."
                value={searchValue}
                onChange={handleSearch}
                className="pl-10 bg-gray-800/50 border-gray-600 focus:border-red-600 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer">
                Home
              </Button>
            </Link>
            <Link href="/discover">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer">
                Discover
              </Button>
            </Link>
            <Link href="/quiz">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer">
                Quiz
              </Button>
            </Link>
            <Link href="/watchlist">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer">
                Watchlist
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-red-600 hover:bg-red-700 gap-2 text-white font-semibold shadow-lg cursor-pointer">
                <User className="w-4 h-4" />
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden mt-4 space-y-4"
          >
            <Input
              type="text"
              placeholder="Search movies..."
              value={searchValue}
              onChange={handleSearch}
              className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
            />
            <div className="flex flex-col gap-2">
              <Link href="/">
                <Button variant="ghost" className="justify-start w-full cursor-pointer">Home</Button>
              </Link>
              <Link href="/discover">
                <Button variant="ghost" className="justify-start w-full cursor-pointer">Discover</Button>
              </Link>
              <Link href="/quiz">
                <Button variant="ghost" className="justify-start w-full cursor-pointer">Quiz</Button>
              </Link>
              <Link href="/watchlist">
                <Button variant="ghost" className="justify-start w-full cursor-pointer">Watchlist</Button>
              </Link>
              <Link href="/auth">
                <Button variant="ghost" className="justify-start w-full cursor-pointer">Login</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
