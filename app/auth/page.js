"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Film, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Authentication successful!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-8 cursor-pointer"
          >
            <Film className="w-10 h-10 text-red-600" />
            <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
              MovieFlix
            </span>
          </motion.div>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-900/50">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10 bg-gray-900/50 border-gray-700"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-gray-900/50 border-gray-700"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-gray-400">Remember me</span>
                    </label>
                    <a href="#" className="text-red-600 hover:text-red-500">
                      Forgot password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="John Doe"
                        className="pl-10 bg-gray-900/50 border-gray-700"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10 bg-gray-900/50 border-gray-700"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-gray-900/50 border-gray-700"
                        required
                      />
                    </div>
                  </div>

                  <div className="text-sm text-gray-400">
                    By signing up, you agree to our{" "}
                    <a href="#" className="text-red-600 hover:text-red-500">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-red-600 hover:text-red-500">
                      Privacy Policy
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Sign Up"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>

        <p className="text-center text-gray-400 text-sm mt-6">
          <Link href="/" className="text-red-600 hover:text-red-500">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
