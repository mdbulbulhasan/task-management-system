import React, { useState, useEffect, createContext, useContext } from "react";
import { loginUser, registerUser } from "../APIs/auth";

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Validate token function
  const validateToken = async (storedToken) => {
    try {
      // Since we're using fake tokens, we'll do a simple validation
      // In a real app, you'd make an API call to validate the token
      if (!storedToken) return false;

      // Check if token exists in our "user sessions"
      const userSessions =
        JSON.parse(localStorage.getItem("userSessions")) || [];
      const session = userSessions.find(
        (session) => session.token === storedToken,
      );

      if (session && session.expiry > Date.now()) {
        return session;
      }

      return false;
    } catch (err) {
      console.error("Token validation error:", err);
      return false;
    }
  };

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          const session = await validateToken(storedToken);
          if (session) {
            setToken(storedToken);
            setUser({ email: session.email });
          } else {
            // Token is invalid, remove it
            localStorage.removeItem("token");
            localStorage.removeItem("userSessions");
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        setError("Failed to initialize authentication");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await loginUser({ email, password });
      const newToken = response.token;

      // Create user session
      const userSessions =
        JSON.parse(localStorage.getItem("userSessions")) || [];
      const session = {
        token: newToken,
        email: email,
        expiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };

      // Remove any existing sessions for this user
      const filteredSessions = userSessions.filter((s) => s.email !== email);
      filteredSessions.push(session);

      localStorage.setItem("userSessions", JSON.stringify(filteredSessions));
      localStorage.setItem("token", newToken);

      setToken(newToken);
      setUser({ email });

      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await registerUser({ email, password });
      const newToken = response.token;

      // Create user session
      const userSessions =
        JSON.parse(localStorage.getItem("userSessions")) || [];
      const session = {
        token: newToken,
        email: email,
        expiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };

      userSessions.push(session);

      localStorage.setItem("userSessions", JSON.stringify(userSessions));
      localStorage.setItem("token", newToken);

      setToken(newToken);
      setUser({ email });

      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Registration failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    try {
      // Remove token from localStorage
      localStorage.removeItem("token");

      // Remove user session
      const userSessions =
        JSON.parse(localStorage.getItem("userSessions")) || [];
      const updatedSessions = userSessions.filter(
        (session) => session.token !== token,
      );
      localStorage.setItem("userSessions", JSON.stringify(updatedSessions));

      // Clear state
      setToken(null);
      setUser(null);
      setError(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user && !!token;
  };

  // Refresh token (extend session)
  const refreshToken = async () => {
    if (!token) return false;

    try {
      const session = await validateToken(token);
      if (session) {
        // Extend session expiry
        const userSessions =
          JSON.parse(localStorage.getItem("userSessions")) || [];
        const updatedSessions = userSessions.map((s) =>
          s.token === token
            ? { ...s, expiry: Date.now() + 24 * 60 * 60 * 1000 }
            : s,
        );
        localStorage.setItem("userSessions", JSON.stringify(updatedSessions));
        return true;
      }
      return false;
    } catch (err) {
      console.error("Token refresh error:", err);
      return false;
    }
  };

  // Clear any authentication errors
  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
    refreshToken,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Protected Route Component
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    // Redirect to login or show unauthorized message
    window.location.href = "/login";
    return null;
  }

  return children;
};

// Authentication Component (for rendering auth forms)
const Authentication = () => {
  const { user, login, register, logout, loading, error, clearError } =
    useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        // Redirect will be handled by the router
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const result = await register(formData.email, formData.password);
      if (result.success) {
        // Redirect will be handled by the router
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });
    clearError();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Welcome, {user.email}!
          </h1>
          <p className="text-center mb-4">
            You are successfully authenticated.
          </p>
          <button
            onClick={logout}
            className="bg-red-500 text-white p-2 rounded w-full"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Register"}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>

          {!isLogin && (
            <div className="mb-4">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="border p-2 w-full rounded"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded w-full mb-4 disabled:opacity-50"
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <button
          onClick={toggleMode}
          className="text-blue-500 w-full text-center"
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default Authentication;
