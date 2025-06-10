import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Weather condition to emoji mapping
const weatherEmoji = {
  Cerah: "☀️",
  "Cerah Berawan": "⛅",
  Berawan: "⛅",
  "Berawan Tebal": "☁️",
  "Hujan Ringan": "🌧️",
  "Hujan Sedang": "🌧️",
  "Hujan Lebat": "⛈️",
  "Hujan Lokal": "⛈️",
  "Hujan Petir": "⛈️",
};

const getWeatherDescription = (condition, temperature) => {
  const descriptions = {
    Cerah: `It's a beautiful sunny day with clear skies. Perfect for outdoor activities!`,
    "Cerah Berawan": `Partly cloudy skies with occasional sunshine. Great weather for being outside.`,
    Berawan: `Cloudy skies today. The clouds might make it feel slightly cooler.`,
    "Berawan Tebal": `Thick cloud cover today. It might feel a bit gloomy but no rain expected.`,
    "Hujan Ringan": `Light rain falling. Don't forget your umbrella if going outside!`,
    "Hujan Sedang": `Moderate rainfall. Consider indoor activities or wear proper rain gear.`,
    "Hujan Lebat": `Heavy rainfall expected. Be cautious if traveling and stay dry!`,
    "Hujan Lokal": `Localized showers in the area. The rain might be intermittent.`,
    "Hujan Petir": `Thunderstorms likely. Stay indoors if possible during the storm.`,
  };

  let tempComment = "";
  if (temperature > 30) tempComment = " It feels quite hot today.";
  else if (temperature > 25) tempComment = " Temperatures are warm.";
  else if (temperature > 20) tempComment = " Temperatures are pleasant.";
  else tempComment = " It feels a bit cool today.";

  return (
    (descriptions[condition] || "Typical weather conditions today.") +
    tempComment
  );
};

// Activity recommendations based on weather
const activityRecommendations = {
  Cerah: [
    {
      title: "Cycling around the city or park",
      image: "/images/active/cycling.jpg",
    },
    {
      title: "Planting plants or gardening in the yard",
      image: "/images/active/gardening.jpg",
    },
    {
      title: "Climbing hills or walking in the open air",
      image: "/images/active/hiking.jpg",
    },
    {
      title: "Visiting traditional markets with your own shopping bags",
      image: "/images/active/bags.jpg",
    },
    {
      title: "Drying clothes without a dryer",
      image: "/images/active/drying.jpg",
    },
  ],
  "Cerah Berawan": [
    {
      title: "Reading environmental-themed books in the open air",
      image: "/images/active/reading.jpg",
    },
    {
      title: "Filling out quizzes or challenges about eco-lifestyle",
      image: "/images/active/strategy.jpg",
    },
    {
      title: "Using time to educate children about recycling",
      image: "/images/active/teaching.jpg",
    },
    {
      title: "Visiting a library or green community space",
      image: "/images/active/library.jpg",
    },
    {
      title:
        "Making educational vlogs about the weather & the surrounding nature",
      image: "/images/active/vlogging.jpg",
    },
  ],
  Berawan: [
    {
      title: "Join a local eco-community discussion outdoors",
      image: "/images/active/community.jpg",
    },
    {
      title: "Reading environmental-themed books in the open air",
      image: "/images/active/reading.jpg",
    },
    {
      title: "Sketching nature scenery using eco-friendly materials",
      image: "/images/active/sketch.jpg",
    },
    {
      title: "Visiting a library or green community space",
      image: "/images/active/library.jpg",
    },
    {
      title: "Writing an eco-journal while enjoying the breeze",
      image: "/images/active/journal.jpg",
    },
  ],

  "Berawan Tebal": [
    {
      title: "Documenting cloud patterns for climate awareness post",
      image: "/images/active/skywatch.jpg",
    },
    {
      title: "Filling out quizzes or challenges about eco-lifestyle",
      image: "/images/active/hiking.jpg",
    },
    {
      title: "Using time to educate children about recycling",
      image: "/images/active/teaching.jpg",
    },
    {
      title: "Practicing mindful walking while picking up trash",
      image: "/images/active/trash.jpg",
    },
    {
      title: "Making educational vlogs about the weather & nature",
      image: "/images/active/vlogging.jpg",
    },
  ],

  "Hujan Ringan": [
    {
      title: "Creating DIY pots from used materials indoors",
      image: "/images/active/diy-pots.jpg",
    },
    {
      title: "Cleaning and sorting used goods at home",
      image: "/images/active/cleaning.jpg",
    },
    {
      title: "Watching environmental documentaries",
      image: "/images/active/documentary.jpg",
    },
    {
      title: "Writing blogs or short stories about climate change",
      image: "/images/active/writing.jpg",
    },
    {
      title: "Organizing your digital files to reduce e-waste",
      image: "/images/active/digital-cleanup.jpg",
    },
  ],

  "Hujan Sedang": [
    {
      title: "Starting a seed planting project indoors",
      image: "/images/active/planting.jpg",
    },
    {
      title: "Making compost from kitchen scraps at home",
      image: "/images/active/compost.jpg",
    },
    {
      title: "Writing letters to local officials about sustainability",
      image: "/images/active/letter.jpg",
    },
    {
      title: "Designing eco-awareness posters or infographics",
      image: "/images/active/design.jpg",
    },
    {
      title: "Learning how to repair clothes instead of throwing them away",
      image: "/images/active/repair.jpg",
    },
  ],

  "Hujan Lebat": [
    {
      title: "Attend a webinar or online training about sustainability",
      image: "/images/active/webinar.jpg",
    },
    {
      title: "Turn off unused electronic devices to save energy",
      image: "/images/active/energy.jpg",
    },
    {
      title: "Make DIY eco-crafts from recycled materials",
      image: "/images/active/recycling.jpg",
    },
    {
      title: "Create an upcycled home decoration",
      image: "/images/active/upcycle.jpg",
    },
    {
      title: "Meditate and reflect on personal eco-goals",
      image: "/images/active/meditate.jpg",
    },
  ],

  "Hujan Lokal": [
    {
      title: "Attend a virtual eco-cooking class",
      image: "/images/active/cooking.jpg",
    },
    {
      title: "Turn off unused electronic devices to save energy",
      image: "/images/active/energy.jpg",
    },
    {
      title: "Make DIY eco-crafts from recycled materials",
      image: "/images/active/recycling.jpg",
    },
    {
      title: "Take part in a 24-hour energy saving challenge",
      image: "/images/active/challenge.jpg",
    },
    {
      title: "Organize a digital eco-awareness campaign",
      image: "/images/active/awareness.jpg",
    },
  ],

  "Hujan Petir": [
    {
      title: "Attend a webinar or online training about sustainability",
      image: "/images/active/webinar.jpg",
    },
    {
      title: "Create an indoor garden plan using reused containers",
      image: "/images/active/plan-garden.jpg",
    },
    {
      title: "Make DIY eco-crafts from recycled materials",
      image: "/images/active/recycling.jpg",
    },
    {
      title: "Design a green lifestyle schedule for the next week",
      image: "/images/active/planning.jpg",
    },
    {
      title: "Learn about eco-anxiety and how to manage it",
      image: "/images/active/eco-anxiety.jpg",
    },
  ],

  default: [
    {
      title: "Take a moment to appreciate nature around you",
      image: "/images/active/nature.jpg",
    },
    {
      title: "Plan your next eco-friendly activity",
      image: "/images/active/planning.jpg",
    },
    {
      title: "Learn something new about sustainability",
      image: "/images/active/learning.jpg",
    },
  ],
};

const EcoActive = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: -6.2088, lng: 106.8456 }, // Default to Jakarta
    address: "Loading...",
  });
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendedActivities, setRecommendedActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Get user location
  const onSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    setLocation({
      loaded: true,
      coordinates: { lat: latitude, lng: longitude },
      address: "Your current location",
    });

    // Reverse geocoding to get address
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    )
      .then((response) => response.json())
      .then((data) => {
        const address = data.display_name || "Your current location";
        setLocation((prev) => ({
          ...prev,
          address: address,
        }));
      })
      .catch(() => {
        // If reverse geocoding fails, keep default address
      });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      coordinates: { lat: -6.2088, lng: 106.8456 }, // Default to Jakarta
      address: "Default location (Jakarta)",
    });
    setError(
      `Location access denied. Using default location. Error: ${error.message}`
    );
  };

  // Fetch weather data from BMKG API
  const fetchWeatherData = async (lat, lng) => {
    try {
      // Mock response structure based on BMKG API docs
      const mockWeatherData = {
        t: Math.floor(Math.random() * 15) + 20, // Random temp between 20-35°C
        hu: Math.floor(Math.random() * 50) + 30, // Random humidity 30-80%
        weather_desc: [
          "Cerah",
          "Cerah Berawan",
          "Berawan",
          "Hujan Ringan",
          "Hujan Lebat",
        ][Math.floor(Math.random() * 5)],
        ws: Math.floor(Math.random() * 20) + 5, // Random wind speed 5-25 km/h
        wd: ["Utara", "Timur", "Selatan", "Barat"][
          Math.floor(Math.random() * 4)
        ],
        tcc: Math.floor(Math.random() * 100), // Random cloud cover 0-100%
        vs_text: (Math.random() * 10).toFixed(1) + " km", // Random visibility 0-10 km
      };

      setWeather(mockWeatherData);

      // Set recommended activities based on weather
      const weatherCondition = mockWeatherData.weather_desc;
      const activities =
        activityRecommendations[weatherCondition] ||
        activityRecommendations.default;
      setRecommendedActivities(activities);
      setSelectedActivity(activities[0]); // Select first activity by default

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch weather data");
      setLoading(false);
    }
  };

  // Get location and set up time updates
  useEffect(() => {
    if (!location.loaded) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
      } else {
        onError({ message: "Geolocation not supported" });
      }
    }

    // Update time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch weather when location changes
  useEffect(() => {
    if (location.loaded) {
      fetchWeatherData(location.coordinates.lat, location.coordinates.lng);
    }
  }, [location]);

  // Refresh handler
  const handleRefresh = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      fetchWeatherData(location.coordinates.lat, location.coordinates.lng);
    }
  };

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-50 to-primary-100">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 mt-8">
        {/* Page title with subtitle */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-800">
            Eco Active
          </h1>
          <p className="text-lg text-primary-600 mt-2">
            Discover eco-friendly activities based on your current weather
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        {/* Top section with location/time and map side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Location and Time Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white h-full">
            <h2 className="text-xl font-semibold mb-4">Your Location & Time</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium opacity-80">
                  Current Location
                </p>
                <p className="text-lg font-semibold">{location.address}</p>
              </div>
              <div>
                <p className="text-sm font-medium opacity-80">Coordinates</p>
                <p className="text-lg font-semibold">
                  {location.coordinates.lat.toFixed(4)},{" "}
                  {location.coordinates.lng.toFixed(4)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium opacity-80">Current Time</p>
                <p className="text-lg font-semibold">{formatTime(time)}</p>
              </div>
              <div>
                <p className="text-sm font-medium opacity-80">Today's Date</p>
                <p className="text-lg font-semibold">{formatDate(time)}</p>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="h-full">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg h-full">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Your Location Map
              </h2>
              <div className="h-64 md:h-80 rounded-xl overflow-hidden shadow-md">
                {location.loaded ? (
                  <MapContainer
                    center={[
                      location.coordinates.lat,
                      location.coordinates.lng,
                    ]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker
                      position={[
                        location.coordinates.lat,
                        location.coordinates.lng,
                      ]}
                    >
                      <Popup>
                        You are here! <br /> {location.address}
                      </Popup>
                    </Marker>
                  </MapContainer>
                ) : (
                  <div className="flex justify-center items-center h-full bg-white/20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Weather and Activity section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weather Card */}
          {/* Weather Card */}
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-4">Current Weather</h2>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : weather ? (
              <div className="space-y-4">
                {/* Main weather row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-5xl mr-3">
                      {weatherEmoji[weather.weather_desc] || "🌤️"}
                    </span>
                    <div>
                      <p className="text-sm font-medium opacity-80">
                        Condition
                      </p>
                      <p className="text-2xl font-bold">
                        {weather.weather_desc}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium opacity-80">
                      Temperature
                    </p>
                    <p className="text-4xl font-bold">{weather.t}°C</p>
                  </div>
                </div>

                {/* Weather details grid - expanded with more visual elements */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Humidity with icon */}
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                        />
                      </svg>
                      <div>
                        <p className="text-xs font-medium opacity-80">
                          Humidity
                        </p>
                        <p className="text-lg font-semibold">{weather.hu}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Wind with icon */}
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12.453 4.516a.45.45 0 00-.437.425 7.45 7.45 0 01-6.39 6.39.45.45 0 00-.425.437.45.45 0 00.437.425 7.45 7.45 0 016.39 6.39.45.45 0 00.425.437.45.45 0 00.437-.425 7.45 7.45 0 016.39-6.39.45.45 0 00.425-.437.45.45 0 00-.425-.437 7.45 7.45 0 01-6.39-6.39.45.45 0 00-.437-.425z"
                        />
                      </svg>
                      <div>
                        <p className="text-xs font-medium opacity-80">Wind</p>
                        <p className="text-lg font-semibold">
                          {weather.ws} km/h {weather.wd}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cloud cover with icon */}
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                        />
                      </svg>
                      <div>
                        <p className="text-xs font-medium opacity-80">
                          Cloud Cover
                        </p>
                        <p className="text-lg font-semibold">{weather.tcc}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Visibility with icon */}
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <div>
                        <p className="text-xs font-medium opacity-80">
                          Visibility
                        </p>
                        <p className="text-lg font-semibold">
                          {weather.vs_text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional weather info */}
                <div className="bg-white/10 rounded-lg p-3 mt-4">
                  <p className="text-sm">
                    {getWeatherDescription(weather.weather_desc, weather.t)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p>Weather data not available</p>
              </div>
            )}
          </div>

          {/* Recommended Activity Card - Now larger and below weather */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-4">Recommended Activity</h2>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : recommendedActivities.length > 0 ? (
              <div className="h-full flex flex-col gap-4">
                {" "}
                {/* Use gap instead of margins */}
                <div>
                  <p className="text-2xl font-bold mb-4">
                    {selectedActivity.title}
                  </p>
                  <div className="bg-white/20 rounded-lg p-4 mb-4">
                    {weather && (
                      <p className="text-sm">
                        This activity is recommended because the current weather
                        is {weather.weather_desc.toLowerCase()}. Perfect for an
                        eco-friendly activity!
                      </p>
                    )}
                  </div>

                  {/* Activity Image - fixed height with aspect ratio */}
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                    <img
                      src={
                        selectedActivity.image ||
                        "/images/activities/default.jpg"
                      }
                      alt={selectedActivity.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      {!selectedActivity.image && (
                        <p className="text-white/80">
                          Illustration coming soon
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* Suggestions section with controlled spacing */}
                <div className="mt-0">
                  {" "}
                  {/* Explicitly set mt-0 to remove any default margin */}
                  <p className="text-sm font-medium opacity-80 mb-2">
                    Other suggestions:
                  </p>
                  <ul className="space-y-2">
                    {recommendedActivities
                      .slice(1, 3)
                      .map((activity, index) => (
                        <li
                          key={index}
                          className="text-sm cursor-pointer hover:underline py-1 pl-2 -ml-2 rounded hover:bg-white/10 transition-colors"
                          onClick={() => setSelectedActivity(activity)}
                        >
                          • {activity.title}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p>No activity recommendations available</p>
              </div>
            )}
          </div>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-center">
          <button
            onClick={handleRefresh}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh Data
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EcoActive;
