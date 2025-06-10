import React, { useState, useEffect } from "react";
import { getCurrentLocation, SubmissionMap } from "./EcoQuestMap";

// Master list of all possible missions
const ALL_MISSIONS = [
  {
    id: 1,
    title: "Reusable Bottle",
    desc: "Photo using reusable bottle",
    points: 20,
  },
  {
    id: 2,
    title: "Public Transport",
    desc: "Photo using public transport",
    points: 20,
  },
  {
    id: 3,
    title: "Vegetarian Meal",
    desc: "Photo of vegetarian meal",
    points: 20,
  },
  {
    id: 4,
    title: "Recycling",
    desc: "Photo of proper recycling",
    points: 20,
  },
  {
    id: 5,
    title: "Bike Ride",
    desc: "Photo while cycling for commute",
    points: 25,
  },
  {
    id: 6,
    title: "Eco Bag",
    desc: "Photo using eco-friendly shopping bag",
    points: 15,
  },
  {
    id: 7,
    title: "Pick Up Trash",
    desc: "Photo picking up trash in public area",
    points: 30,
  },
  {
    id: 8,
    title: "Composting",
    desc: "Photo of home composting bin",
    points: 25,
  },
  {
    id: 9,
    title: "Plant a Tree",
    desc: "Photo while planting a tree",
    points: 40,
  },
  {
    id: 10,
    title: "Thrift Shopping",
    desc: "Photo from a second-hand/thrift store",
    points: 20,
  },
  {
    id: 11,
    title: "No Plastic",
    desc: "Photo of a plastic-free meal or drink",
    points: 20,
  },
  {
    id: 12,
    title: "Community Garden",
    desc: "Photo participating in a community garden",
    points: 30,
  },
  {
    id: 13,
    title: "Refill Station",
    desc: "Photo refilling bottle at public refill station",
    points: 20,
  },
  {
    id: 14,
    title: "DIY Item",
    desc: "Photo of a handmade upcycled item",
    points: 25,
  },
  {
    id: 15,
    title: "Outdoor Yoga",
    desc: "Photo doing yoga outside",
    points: 15,
  },
  {
    id: 16,
    title: "Use Natural Light",
    desc: "Photo of working/studying without artificial light",
    points: 15,
  },
  {
    id: 17,
    title: "Read Outdoors",
    desc: "Photo reading a book outdoors",
    points: 15,
  },
  {
    id: 18,
    title: "Walk Instead of Ride",
    desc: "Photo walking to destination instead of using vehicle",
    points: 20,
  },
  {
    id: 19,
    title: "Local Market Visit",
    desc: "Photo at local farmer's market",
    points: 20,
  },
  {
    id: 20,
    title: "Zero Waste Lunch",
    desc: "Photo of lunch with no packaging waste",
    points: 25,
  },
  {
    id: 21,
    title: "Eco Cleaning",
    desc: "Photo using natural/eco cleaning product",
    points: 15,
  },
  {
    id: 22,
    title: "Natural Scenery",
    desc: "Photo of favorite green spot near your location",
    points: 10,
  },
  {
    id: 23,
    title: "Rainy Day Plant Care",
    desc: "Photo of watering plants using rainwater",
    points: 25,
  },
  {
    id: 24,
    title: "Home Gardening",
    desc: "Photo of your indoor or balcony garden",
    points: 20,
  },
  {
    id: 25,
    title: "Solar Panel Sighting",
    desc: "Photo of any solar panel in use",
    points: 30,
  },

  // Add more missions here as needed
];

// Helper function to get today's date key (YYYY-MM-DD)
const getDateKey = () => {
  const now = new Date();
  return now.toISOString().split("T")[0];
};

// Helper function to get random missions
const getRandomMissions = (count = 4) => {
  const shuffled = [...ALL_MISSIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Check if it's time to reset missions (after 3 AM)
const shouldResetMissions = () => {
  const now = new Date();
  const lastReset = localStorage.getItem("lastMissionReset");

  // If no reset has occurred today and it's past 3 AM
  if (!lastReset || lastReset !== getDateKey()) {
    if (now.getHours() >= 3) {
      return true;
    }
  }
  return false;
};

const EcoQuestMissions = ({ user, submissions, onLogout, onSubmission }) => {
  const [missions, setMissions] = useState([]);
  const [currentSubmission, setCurrentSubmission] = useState({
    missionId: null,
    location: null,
    socialMediaLink: "",
    description: "",
    agreedToTerms: false,
  });
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  // Initialize or reset missions
  useEffect(() => {
    const initializeMissions = () => {
      const dateKey = getDateKey();
      const storedMissions = localStorage.getItem(`missions-${dateKey}`);
      const lastReset = localStorage.getItem("lastMissionReset");

      // Reset missions if:
      // 1. It's a new day and past 3 AM, or
      // 2. No missions exist for today
      if (shouldResetMissions() || !storedMissions) {
        const newMissions = getRandomMissions(4);
        localStorage.setItem(
          `missions-${dateKey}`,
          JSON.stringify(newMissions)
        );
        localStorage.setItem("lastMissionReset", dateKey);
        setMissions(newMissions);
      } else {
        setMissions(JSON.parse(storedMissions));
      }
    };

    initializeMissions();

    // Set up a timer to check for mission reset every minute
    const resetCheckInterval = setInterval(() => {
      if (shouldResetMissions()) {
        initializeMissions();
      }
    }, 60000); // Check every minute

    return () => clearInterval(resetCheckInterval);
  }, []);

  const startSubmission = async (missionId) => {
    try {
      const location = await getCurrentLocation();
      setCurrentSubmission({
        missionId,
        location,
        socialMediaLink: "",
        description: "",
        agreedToTerms: false,
      });
      setShowSubmissionModal(true);
    } catch (error) {
      alert(`Could not get your location: ${error.message}`);
      setCurrentSubmission({
        missionId,
        location: null,
        socialMediaLink: "",
        description: "",
        agreedToTerms: false,
      });
      setShowSubmissionModal(true);
    }
  };

  const handleSubmitMission = () => {
    if (!currentSubmission.location) {
      alert("Please select your location on the map");
      return;
    }
    if (!currentSubmission.socialMediaLink) {
      alert("Please provide a social media link");
      return;
    }
    if (!currentSubmission.agreedToTerms) {
      alert("Please confirm this is your original content");
      return;
    }

    onSubmission(currentSubmission.missionId, {
      location: currentSubmission.location,
      socialMediaLink: currentSubmission.socialMediaLink,
      description: currentSubmission.description,
      agreedToTerms: currentSubmission.agreedToTerms,
    });
    setShowSubmissionModal(false);
  };

  const isMissionPending = (missionId) => {
    return user?.pendingApprovals?.includes(missionId) || false;
  };

  const isMissionCompleted = (missionId) => {
    return submissions.some(
      (s) =>
        s.userId === user?.username &&
        s.missionId === missionId &&
        s.status === "approved"
    );
  };

  return (
    <main className="flex-grow container mx-auto px-4 pt-12 pb-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-2 mt-8">
          EcoQuest
        </h1>
        <p className="text-center text-gray-600">
          Complete daily missions to earn points!
        </p>
        <p className="text-center text-sm text-gray-500 mt-1">
          Missions reset daily at 3 AM
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-10">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-green-800">
              {user.name}
            </h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="mt-2">
              <span className="font-bold">{user.totalPoints || 0}</span> points
              •
              <span className="font-bold ml-2">
                {user.missionsCompleted || 0}
              </span>{" "}
              missions
            </p>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        {missions.map((mission) => {
          const isCompleted = isMissionCompleted(mission.id);
          const isPending = isMissionPending(mission.id);

          return (
            <div
              key={mission.id}
              className={`p-6 rounded-lg border ${
                isCompleted
                  ? "bg-green-50 border-green-200"
                  : isPending
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3 className="font-bold text-lg text-green-700 mb-2">
                {mission.title}
              </h3>
              <p className="text-gray-600 my-3">{mission.desc}</p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-green-600 font-medium">
                  {mission.points} pts
                </span>

                {isCompleted ? (
                  <span className="text-green-500 text-sm font-medium">
                    Completed!
                  </span>
                ) : isPending ? (
                  <span className="text-yellow-500 text-sm font-medium">
                    Pending Approval
                  </span>
                ) : (
                  <button
                    onClick={() => startSubmission(mission.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
                  >
                    Submit Proof
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showSubmissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-green-700">
                  {
                    missions.find((m) => m.id === currentSubmission.missionId)
                      ?.title
                  }
                </h3>
                <button
                  onClick={() => setShowSubmissionModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">
                    Social Media Link
                  </label>
                  <input
                    type="url"
                    placeholder="Link to your post (Instagram, Twitter, etc.)"
                    className="w-full p-2 border rounded"
                    value={currentSubmission.socialMediaLink}
                    onChange={(e) =>
                      setCurrentSubmission({
                        ...currentSubmission,
                        socialMediaLink: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    placeholder="Tell us about your eco-friendly action..."
                    className="w-full p-2 border rounded h-24"
                    value={currentSubmission.description}
                    onChange={(e) =>
                      setCurrentSubmission({
                        ...currentSubmission,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Location Verification
                  </label>
                  <SubmissionMap
                    location={currentSubmission.location}
                    onLocationChange={(location) =>
                      setCurrentSubmission({
                        ...currentSubmission,
                        location,
                      })
                    }
                  />
                  {currentSubmission.location && (
                    <p className="text-sm text-gray-600 mt-1">
                      Location: {currentSubmission.location.lat.toFixed(4)},{" "}
                      {currentSubmission.location.lng.toFixed(4)}
                    </p>
                  )}
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms-checkbox"
                    className="mt-1 mr-2"
                    checked={currentSubmission.agreedToTerms}
                    onChange={(e) =>
                      setCurrentSubmission({
                        ...currentSubmission,
                        agreedToTerms: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="terms-checkbox" className="text-gray-700">
                    I confirm this is my original content and I completed this
                    eco-friendly action today.
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowSubmissionModal(false)}
                    className="px-4 py-2 border rounded text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitMission}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    disabled={
                      !currentSubmission.agreedToTerms ||
                      !currentSubmission.location
                    }
                  >
                    Submit for Approval
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default EcoQuestMissions;
