"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Share2, UserPlus, Activity, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getFriends,
  addFriend,
  removeFriend,
  shareWatchlist,
  getFriendActivities
} from "@/lib/social";
import { getWatchlist } from "@/lib/watchlist";

export default function SocialPanel() {
  const [friends, setFriends] = useState([]);
  const [activities, setActivities] = useState([]);
  const [newFriendName, setNewFriendName] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [showShareDialog, setShowShareDialog] = useState(false);

  const loadFriends = () => {
    const friendsList = getFriends();
    setFriends(friendsList);
  };

  const loadActivities = () => {
    const acts = getFriendActivities();
    setActivities(acts);
  };

  useEffect(() => {
    loadFriends();
    loadActivities();

    const handleUpdate = () => {
      loadFriends();
      loadActivities();
    };

    window.addEventListener('friendsUpdated', handleUpdate);
    window.addEventListener('activitiesUpdated', handleUpdate);

    return () => {
      window.removeEventListener('friendsUpdated', handleUpdate);
      window.removeEventListener('activitiesUpdated', handleUpdate);
    };
  }, []);

  const handleAddFriend = () => {
    if (!newFriendName.trim()) return;

    const friend = {
      id: Date.now(),
      name: newFriendName,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newFriendName}`,
      status: 'active'
    };

    addFriend(friend);
    setNewFriendName("");
    loadFriends();
  };

  const handleRemoveFriend = (friendId) => {
    if (confirm('Remove this friend?')) {
      removeFriend(friendId);
      loadFriends();
    }
  };

  const handleShareWatchlist = () => {
    if (selectedFriends.length === 0) {
      alert('Please select at least one friend');
      return;
    }

    const watchlist = getWatchlist();
    shareWatchlist(watchlist, selectedFriends, shareMessage);

    setShowShareDialog(false);
    setSelectedFriends([]);
    setShareMessage("");
    alert('Watchlist shared successfully!');
  };

  const toggleFriendSelection = (friendId) => {
    setSelectedFriends(prev =>
      prev.includes(friendId)
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-red-500" />
          Social
        </h2>

        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700 gap-2">
              <Share2 className="w-4 h-4" />
              Share Watchlist
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Share Your Watchlist</DialogTitle>
              <DialogDescription className="text-gray-400">
                Select friends to share your watchlist with
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Friends Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">Select Friends</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {friends.length === 0 ? (
                    <p className="text-gray-400 text-sm">No friends added yet</p>
                  ) : (
                    friends.map(friend => (
                      <div
                        key={friend.id}
                        onClick={() => toggleFriendSelection(friend.id)}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${selectedFriends.includes(friend.id)
                          ? 'bg-red-600'
                          : 'bg-gray-800 hover:bg-gray-700'
                          }`}
                      >
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="font-medium">{friend.name}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium mb-2 block">Message (Optional)</label>
                <Input
                  value={shareMessage}
                  onChange={(e) => setShareMessage(e.target.value)}
                  placeholder="Add a message..."
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={handleShareWatchlist}
                  className="flex-1 bg-red-600 hover:bg-red-700 gap-2"
                >
                  <Send className="w-4 h-4" />
                  Share
                </Button>
                <Button
                  onClick={() => setShowShareDialog(false)}
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Add Friend */}
      <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 p-4">
        <div className="flex gap-2">
          <Input
            value={newFriendName}
            onChange={(e) => setNewFriendName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddFriend()}
            placeholder="Add friend by name..."
            className="bg-gray-800 border-gray-700 text-white"
          />
          <Button
            onClick={handleAddFriend}
            className="bg-red-600 hover:bg-red-700 gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Add
          </Button>
        </div>
      </Card>

      {/* Friends List */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-red-500" />
          Friends ({friends.length})
        </h3>

        {friends.length === 0 ? (
          <Card className="bg-gray-900/50 border-gray-800 p-8 text-center">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No friends added yet</p>
          </Card>
        ) : (
          <div className="grid gap-3">
            {friends.map((friend) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="bg-gray-900/50 border-gray-800 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold text-white">{friend.name}</h4>
                        <Badge className="bg-green-600 text-white text-xs">
                          {friend.status}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveFriend(friend.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Activity Feed */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Activity className="w-5 h-5 text-red-500" />
          Recent Activity
        </h3>

        {activities.length === 0 ? (
          <Card className="bg-gray-900/50 border-gray-800 p-8 text-center">
            <Activity className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No recent activity</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-900/50 border-gray-800 p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={activity.friendAvatar}
                      alt={activity.friendName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-300">
                        <span className="font-semibold text-white">{activity.friendName}</span>
                        {' '}{activity.action}{' '}
                        <span className="font-semibold text-white">{activity.movieTitle}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
