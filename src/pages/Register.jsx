import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../AuthenticationPage/Authentication";

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error, clearError, isAuthenticated } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const result = await register(form.email, form.password);
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
            required
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
            required
            disabled={loading}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
            required
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full mt-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
