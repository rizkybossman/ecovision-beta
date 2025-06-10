import React, { useState } from "react";

const EcoQuestAuth = ({ onLogin, onRegister, isAdminLogin, setIsAdminLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(formData);
    } else {
      onRegister(formData);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-8">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
        {isAdminLogin ? "Admin " : ""}{isLogin ? "Login" : "Register"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && !isAdminLogin && (
          <>
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </>
        )}
        <div>
          <label className="block text-gray-700 mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-green-600 hover:underline"
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>

      {!isAdminLogin && (
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsAdminLogin(true);
              setIsLogin(true);
            }}
            className="text-gray-600 hover:underline text-sm"
          >
            Admin Login
          </button>
        </div>
      )}

      {isAdminLogin && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsAdminLogin(false)}
            className="text-gray-600 hover:underline text-sm"
          >
            Back to User Login
          </button>
        </div>
      )}
    </div>
  );
};

export default EcoQuestAuth;