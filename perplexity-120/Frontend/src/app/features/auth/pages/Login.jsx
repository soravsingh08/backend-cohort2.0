import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        console.log("Login successful:", data);
        // Handle success, e.g., redirect or store token
      } else {
        console.log("Login failed:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="relative w-full max-w-md">
        {/* Decorative background gradient glow */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-600 rounded-full blur-[100px] opacity-20 "></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-800 rounded-full blur-[100px] opacity-20 "></div>

        <div className="relative bg-[#121212] border border-white/5 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold bg-linear-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400 mt-2">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={submitForm} className="space-y-6">
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
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-red-500 hover:text-red-400 transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
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

            <button
              type="submit"
              className="w-full py-3 px-4 bg-linear-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-900/20 transform active:scale-[0.98] transition-all duration-200"
            >
              Log In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-red-500 font-medium hover:text-red-400 underline decoration-red-500/30 underline-offset-4 transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
