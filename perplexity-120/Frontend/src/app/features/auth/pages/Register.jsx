import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        console.log("Registration successful:", data);
        // Handle success, e.g., redirect to login or verification
      } else {
        console.log("Registration failed:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="relative w-full max-w-md">
        {/* Decorative background gradient glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600 rounded-full blur-[100px] opacity-20 "></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-800 rounded-full blur-[100px] opacity-20 "></div>

        <div className="relative bg-[#121212] border border-white/5 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold bg-linear-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
              Join Us
            </h1>
            <p className="text-gray-400 mt-2">
              Create an account to get started
            </p>
          </div>

          <form onSubmit={submitForm} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200"
                required
              />
            </div>

            <div className="flex items-center space-x-2 text-xs text-gray-400 py-1">
              <input
                type="checkbox"
                className="rounded border-white/10 bg-[#1a1a1a] text-red-600 focus:ring-0 focus:ring-offset-0"
                required
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-red-500 hover:underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-red-500 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-linear-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-900/20 transform active:scale-[0.98] transition-all duration-200 mt-2"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-red-500 font-medium hover:text-red-400 underline decoration-red-500/30 underline-offset-4 transition-colors"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
