import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const newsFeedRef = useRef(null);

  // Load data from localStorage
  const loadData = () => {
    setIsLoading(true);
    const savedUsers = JSON.parse(localStorage.getItem("ecoQuestUsers")) || [];
    const savedSubmissions = JSON.parse(localStorage.getItem("ecoQuestSubmissions")) || [];
    
    // Sort users by points (descending)
    const sortedUsers = [...savedUsers]
      .sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));
    
    // Get recent approved submissions (last 10)
    const recentApproved = savedSubmissions
      .filter(s => s.status === "approved")
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);
    
    setUsers(sortedUsers);
    setRecentSubmissions(recentApproved);
    setIsLoading(false);
  };

  // Filter users based on active filter
  const filterUsers = () => {
    let filtered = [...users];
    
    switch(activeFilter) {
      case "top10":
        filtered = filtered.slice(0, 10);
        break;
      case "top5":
        filtered = filtered.slice(0, 5);
        break;
      case "monthly":
        // Filter users who completed quests in the last 30 days
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        
        filtered = filtered.filter(user => {
          const lastCompleted = new Date(user.lastCompletedDate || 0);
          return lastCompleted >= oneMonthAgo;
        });
        break;
      case "new":
        // Show newest users first (assuming users have a joinDate)
        filtered.sort((a, b) => new Date(b.joinDate || 0) - new Date(a.joinDate || 0));
        break;
      default:
        // "all" - show all users
        break;
    }
    
    setFilteredUsers(filtered);
  };

  useEffect(() => {
    document.title = "EcoVision | Leaderboard";
    loadData();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, activeFilter]);

  // Animation for scrolling news feed
  useEffect(() => {
    if (!newsFeedRef.current || recentSubmissions.length === 0) return;
    
    const newsFeed = newsFeedRef.current;
    const contentWidth = newsFeed.scrollWidth;
    let animationFrame;
    let scrollPosition = 0;
    let pauseScroll = false;
    
    const animate = () => {
      if (!pauseScroll) {
        scrollPosition += 0.5;
        if (scrollPosition >= contentWidth) {
          scrollPosition = -newsFeed.offsetWidth;
        }
        newsFeed.style.transform = `translateX(-${scrollPosition}px)`;
      }
      animationFrame = requestAnimationFrame(animate);
    };
    
    // Pause on hover
    const handleMouseEnter = () => pauseScroll = true;
    const handleMouseLeave = () => pauseScroll = false;
    
    newsFeed.parentElement.addEventListener('mouseenter', handleMouseEnter);
    newsFeed.parentElement.addEventListener('mouseleave', handleMouseLeave);
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrame);
      newsFeed.parentElement.removeEventListener('mouseenter', handleMouseEnter);
      newsFeed.parentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [recentSubmissions]);

  // Medal emoji based on position
  const getMedal = (position) => {
    switch(position) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return position;
    }
  };

  // Get user's current rank (considering all users, not just filtered)
  const getUserRank = (username) => {
    return users.findIndex(user => user.username === username) + 1;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
      <Header />
      
      <main className="container mx-auto px-6 sm:px-8 lg:px-10 py-16">
        {/* Leaderboard Title and Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-primary-900 mb-2">Leaderboard</h1>
            <p className="text-lg text-primary-700">
              {activeFilter === "all" ? "All eco-warriors" : 
               activeFilter === "top10" ? "Top 10 performers" :
               activeFilter === "top5" ? "Top 5 champions" :
               activeFilter === "monthly" ? "This month's leaders" : "Newest members"}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="appearance-none bg-white rounded-lg border border-primary-300 py-2 pl-4 pr-8 text-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Users</option>
                <option value="top10">Top 10</option>
                <option value="top5">Top 5</option>
                <option value="monthly">Monthly Leaders</option>
                <option value="new">New Members</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <button
              onClick={loadData}
              disabled={isLoading}
              className={`flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors ${isLoading ? 'opacity-70' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Leaderboard Cards */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <>
            {filteredUsers.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mb-16">
                {filteredUsers.map((user, index) => {
                  const globalRank = getUserRank(user.username);
                  const isTop3 = globalRank <= 3;
                  
                  return (
                    <div 
                      key={user.username} 
                      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                        isTop3 ? "ring-2" : ""
                      } ${
                        globalRank === 1 ? "ring-yellow-400" :
                        globalRank === 2 ? "ring-gray-300" :
                        globalRank === 3 ? "ring-amber-500" : ""
                      }`}
                    >
                      <div className={`p-6 text-center ${
                        globalRank === 1 ? "bg-gradient-to-r from-yellow-100 to-yellow-50" :
                        globalRank === 2 ? "bg-gradient-to-r from-gray-100 to-gray-50" :
                        globalRank === 3 ? "bg-gradient-to-r from-amber-100 to-amber-50" : "bg-white"
                      }`}>
                        <div className="flex justify-center mb-4">
                          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold ${
                            globalRank === 1 ? "bg-yellow-100 text-yellow-600" :
                            globalRank === 2 ? "bg-gray-100 text-gray-600" :
                            globalRank === 3 ? "bg-amber-100 text-amber-600" : "bg-primary-100 text-primary-600"
                          }`}>
                            {getMedal(globalRank)}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-primary-900 mb-1">
                          {user.name || user.username}
                        </h3>
                        <p className="text-primary-600 mb-3">@{user.username}</p>
                        
                        <div className="flex justify-center space-x-4 mb-3">
                          <div className="bg-primary-50 rounded-lg p-2">
                            <p className="text-sm text-primary-600">Points</p>
                            <p className="text-lg font-bold text-primary-900">{user.totalPoints || 0}</p>
                          </div>
                          <div className="bg-green-50 rounded-lg p-2">
                            <p className="text-sm text-green-600">Quests</p>
                            <p className="text-lg font-bold text-green-900">{user.missionsCompleted || 0}</p>
                          </div>
                        </div>
                        
                        <div className="text-xs text-primary-500 mb-2">
                          {user.lastCompletedDate ? (
                            <>Last quest: {new Date(user.lastCompletedDate).toLocaleDateString()}</>
                          ) : "No quests completed yet"}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium text-gray-500">Rank #{globalRank}</span>
                          <span className="text-xs font-medium text-gray-500">
                            {((user.totalPoints || 0) / 200 * 100).toFixed(0)}% to next level
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" 
                            style={{ width: `${Math.min(100, (user.totalPoints || 0) / 200 * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-lg">
                <div className="inline-block bg-primary-100 rounded-full p-4 mb-4">
                  <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  {activeFilter === "monthly" ? "No Activity This Month" : 
                   activeFilter === "new" ? "No New Members" : "No Eco Warriors Yet"}
                </h3>
                <p className="text-primary-600 max-w-md mx-auto">
                  {activeFilter === "monthly" ? "Complete quests this month to appear here!" : 
                   activeFilter === "new" ? "Be the first to join and appear here!" : "Be the first to complete quests and appear on the leaderboard!"}
                </p>
              </div>
            )}
          </>
        )}
        
        {/* Recent Activity News Feed */}
        {recentSubmissions.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-primary-900 mb-6 text-center">Recent Eco Activity</h2>
            
            <div className="relative overflow-hidden bg-white rounded-xl shadow-lg p-1 hover:shadow-xl transition-shadow">
              <div 
                ref={newsFeedRef}
                className="flex items-center py-4 whitespace-nowrap"
              >
                {[...recentSubmissions, ...recentSubmissions].map((submission, index) => {
                  const user = users.find(u => u.username === submission.userId);
                  const missionId = submission.missionId;
                  const userRank = getUserRank(submission.userId);
                  
                  return (
                    <div key={`${submission.id}-${index}`} className="inline-flex items-center px-6">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        userRank === 1 ? "bg-yellow-100" :
                        userRank === 2 ? "bg-gray-100" :
                        userRank === 3 ? "bg-amber-100" : "bg-primary-100"
                      }`}>
                        <span className={`font-bold ${
                          userRank === 1 ? "text-yellow-600" :
                          userRank === 2 ? "text-gray-600" :
                          userRank === 3 ? "text-amber-600" : "text-primary-600"
                        }`}>
                          {getMedal(userRank)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary-900">
                          <span className="font-bold">{user?.name || user?.username}</span> completed Quest #{missionId}
                        </p>
                        <p className="text-xs text-primary-500">
                          {new Date(submission.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="ml-4 px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                        +20 pts
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Leaderboard;