"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Award, TrendingUp, Calendar, Play, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieQuiz from "@/components/MovieQuiz";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  getQuizStats,
  getBadgeInfo,
  getLeaderboard,
  getCategories,
  isDailyQuizCompleted,
} from "@/lib/quiz";

export default function QuizPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizMode, setQuizMode] = useState("random");
  const [difficulty, setDifficulty] = useState(null);
  const [category, setCategory] = useState("all");
  const [leaderboard, setLeaderboard] = useState([]);
  const [dailyCompleted, setDailyCompleted] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const userStats = getQuizStats();
    setStats(userStats);
    setLeaderboard(getLeaderboard());
    setDailyCompleted(isDailyQuizCompleted());
  };

  const startQuiz = (mode, diff = null, cat = "all") => {
    setQuizMode(mode);
    setDifficulty(diff);
    setCategory(cat);
    setShowQuiz(true);
  };

  const closeQuiz = () => {
    setShowQuiz(false);
    loadData();
  };

  const categories = getCategories();

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        <Navbar onSearch={setSearchQuery} />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <MovieQuiz
            mode={quizMode}
            difficulty={difficulty}
            category={category}
            onClose={closeQuiz}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Navbar onSearch={setSearchQuery} />

      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="bg-gradient-to-br from-red-600 to-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Movie Quiz & Trivia</h1>
          <p className="text-xl text-gray-400">Test your movie knowledge and compete with others!</p>
        </motion.div>

        {/* Stats Overview */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            <Card className="bg-gray-700/70 border-gray-600 p-6 text-center">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">{stats.totalScore}</p>
              <p className="text-sm text-gray-300">Total Score</p>
            </Card>
            <Card className="bg-gray-700/70 border-gray-600 p-6 text-center">
              <Star className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">{stats.highScore}</p>
              <p className="text-sm text-gray-300">High Score</p>
            </Card>
            <Card className="bg-gray-700/70 border-gray-600 p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">{stats.totalQuizzes}</p>
              <p className="text-sm text-gray-300">Quizzes Played</p>
            </Card>
            <Card className="bg-gray-700/70 border-gray-600 p-6 text-center">
              <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">{stats.badges.length}</p>
              <p className="text-sm text-gray-300">Badges Earned</p>
            </Card>
          </motion.div>
        )}

        <Tabs defaultValue="play" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-gray-800">
            <TabsTrigger value="play">Play Quiz</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          {/* Play Quiz Tab */}
          <TabsContent value="play" className="space-y-8">
            {/* Daily Quiz */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-red-600 to-orange-600 border-0 p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-6 h-6 text-white" />
                      <h2 className="text-2xl font-bold text-white">Daily Quiz</h2>
                    </div>
                    <p className="text-white/90">
                      Complete today's quiz and compete with others!
                    </p>
                  </div>
                  {dailyCompleted && (
                    <Badge className="bg-green-500 text-white">Completed</Badge>
                  )}
                </div>
                <Button
                  size="lg"
                  className="bg-white text-red-600 hover:bg-gray-100 gap-2"
                  onClick={() => startQuiz("daily")}
                  disabled={dailyCompleted}
                >
                  <Play className="w-5 h-5" />
                  {dailyCompleted ? "Completed Today" : "Start Daily Quiz"}
                </Button>
              </Card>
            </motion.div>

            {/* Quick Play */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-white">Quick Play</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-gray-700/70 border-gray-600 p-6 hover:border-green-500 hover:bg-gray-700 transition-all cursor-pointer"
                  onClick={() => startQuiz("random", "easy")}>
                  <Zap className="w-8 h-8 text-green-400 mb-3" />
                  <h3 className="text-xl font-bold mb-2 text-white">Easy Mode</h3>
                  <p className="text-gray-300 text-sm mb-4">Perfect for beginners</p>
                  <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10">5 points per question</Badge>
                </Card>

                <Card className="bg-gray-700/70 border-gray-600 p-6 hover:border-yellow-500 hover:bg-gray-700 transition-all cursor-pointer"
                  onClick={() => startQuiz("random", "medium")}>
                  <Star className="w-8 h-8 text-yellow-400 mb-3" />
                  <h3 className="text-xl font-bold mb-2 text-white">Medium Mode</h3>
                  <p className="text-gray-300 text-sm mb-4">Test your knowledge</p>
                  <Badge variant="outline" className="border-yellow-500 text-yellow-400 bg-yellow-500/10">10 points per question</Badge>
                </Card>

                <Card className="bg-gray-700/70 border-gray-600 p-6 hover:border-red-500 hover:bg-gray-700 transition-all cursor-pointer"
                  onClick={() => startQuiz("random", "hard")}>
                  <Trophy className="w-8 h-8 text-red-400 mb-3" />
                  <h3 className="text-xl font-bold mb-2 text-white">Hard Mode</h3>
                  <p className="text-gray-300 text-sm mb-4">For true movie buffs</p>
                  <Badge variant="outline" className="border-red-500 text-red-400 bg-red-500/10">15 points per question</Badge>
                </Card>
              </div>
            </motion.div>

            {/* Category Quiz */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-white">Play by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((cat, index) => (
                  <Card
                    key={cat.id}
                    className="bg-gray-700/70 border-gray-600 p-4 hover:border-red-500 hover:bg-gray-700 transition-all cursor-pointer text-center"
                    onClick={() => startQuiz("random", null, cat.id)}
                  >
                    <div className="text-4xl mb-2">{cat.icon}</div>
                    <p className="font-semibold text-white">{cat.name}</p>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-gray-800 border-gray-700 p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  Top Players
                </h2>
                <div className="space-y-3">
                  {leaderboard.map((player) => (
                    <div
                      key={player.rank}
                      className={`flex items-center justify-between p-4 rounded-lg ${player.isCurrentUser
                        ? 'bg-red-600/20 border-2 border-red-600'
                        : 'bg-gray-700'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${player.rank === 1 ? 'bg-yellow-500 text-black' :
                          player.rank === 2 ? 'bg-gray-400 text-black' :
                            player.rank === 3 ? 'bg-orange-600 text-white' :
                              'bg-gray-600 text-white'
                          }`}>
                          {player.rank}
                        </div>
                        <div>
                          <p className="font-bold text-white">
                            {player.name}
                            {player.isCurrentUser && (
                              <Badge className="ml-2 bg-red-600 text-white text-xs">You</Badge>
                            )}
                          </p>
                          <p className="text-sm text-gray-400">{player.quizzes} quizzes played</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-500">{player.score}</p>
                        <p className="text-xs text-gray-400">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-gray-800 border-gray-700 p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-purple-500" />
                  Your Badges
                </h2>
                {stats && stats.badges.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {stats.badges.map((badgeId) => {
                      const badge = getBadgeInfo(badgeId);
                      return (
                        <Card key={badgeId} className="bg-gray-700 border-gray-600 p-4 text-center">
                          <div className="text-5xl mb-3">{badge.icon}</div>
                          <h3 className="font-bold text-white mb-1">{badge.name}</h3>
                          <p className="text-sm text-gray-400">{badge.description}</p>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <Award className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>No badges earned yet. Start playing to earn badges!</p>
                  </div>
                )}
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
