// Social Features - Friends & Sharing
const FRIENDS_KEY = 'movieflix_friends';
const SHARED_LISTS_KEY = 'movieflix_shared_lists';
const ACTIVITIES_KEY = 'movieflix_activities';

// Get friends list
export const getFriends = () => {
  if (typeof window === 'undefined') return [];
  try {
    const friends = localStorage.getItem(FRIENDS_KEY);
    return friends ? JSON.parse(friends) : [];
  } catch (error) {
    console.error('Error reading friends:', error);
    return [];
  }
};

// Add friend
export const addFriend = (friend) => {
  try {
    const friends = getFriends();
    const exists = friends.find(f => f.id === friend.id);

    if (!exists) {
      const newFriend = {
        ...friend,
        addedAt: Date.now(),
        status: 'active'
      };
      friends.push(newFriend);
      localStorage.setItem(FRIENDS_KEY, JSON.stringify(friends));
      window.dispatchEvent(new Event('friendsUpdated'));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding friend:', error);
    return false;
  }
};

// Remove friend
export const removeFriend = (friendId) => {
  try {
    const friends = getFriends();
    const filtered = friends.filter(f => f.id !== friendId);
    localStorage.setItem(FRIENDS_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event('friendsUpdated'));
    return true;
  } catch (error) {
    console.error('Error removing friend:', error);
    return false;
  }
};

// Share watchlist
export const shareWatchlist = (watchlist, friendIds, message = '') => {
  try {
    const sharedLists = getSharedLists();

    const newShare = {
      id: Date.now(),
      watchlist,
      sharedWith: friendIds,
      message,
      sharedAt: Date.now(),
      views: 0
    };

    sharedLists.push(newShare);
    localStorage.setItem(SHARED_LISTS_KEY, JSON.stringify(sharedLists));

    // Add activity
    addActivity({
      type: 'share',
      content: `Shared a watchlist with ${friendIds.length} friends`,
      timestamp: Date.now()
    });

    return newShare;
  } catch (error) {
    console.error('Error sharing watchlist:', error);
    return null;
  }
};

// Get shared lists
export const getSharedLists = () => {
  if (typeof window === 'undefined') return [];
  try {
    const lists = localStorage.getItem(SHARED_LISTS_KEY);
    return lists ? JSON.parse(lists) : [];
  } catch (error) {
    console.error('Error reading shared lists:', error);
    return [];
  }
};

// Add activity
export const addActivity = (activity) => {
  try {
    const activities = getActivities();
    activities.unshift(activity);

    // Keep only last 50 activities
    const trimmed = activities.slice(0, 50);
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(trimmed));
    window.dispatchEvent(new Event('activitiesUpdated'));
    return true;
  } catch (error) {
    console.error('Error adding activity:', error);
    return false;
  }
};

// Get activities
export const getActivities = () => {
  if (typeof window === 'undefined') return [];
  try {
    const activities = localStorage.getItem(ACTIVITIES_KEY);
    return activities ? JSON.parse(activities) : [];
  } catch (error) {
    console.error('Error reading activities:', error);
    return [];
  }
};

// Get friend activities (mock for demo)
export const getFriendActivities = () => {
  const friends = getFriends();

  // Generate mock activities
  return friends.slice(0, 5).map(friend => ({
    friendId: friend.id,
    friendName: friend.name,
    friendAvatar: friend.avatar,
    action: 'added to watchlist',
    movieTitle: 'Sample Movie',
    timestamp: Date.now() - Math.random() * 86400000
  }));
};
