import { useEffect, useState } from "react";
import { signup } from "../api";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

export default function Signup({ onSignup }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const inputFocus = document.querySelector("input[name='firstName']");
    if (inputFocus) inputFocus.focus();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(form);
      onSignup(form);
      navigate("/login");
    } catch (error) {
      setErrorMessage("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-full bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-200 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        aria-label="Signup form"
        className="w-full max-w-lg bg-white rounded-3xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] p-10 flex flex-col items-center gap-6"
      >
        <div className="flex items-center gap-2 text-indigo-700 mb-2">
          <FaUserPlus size={24} />
          <h2 className="text-3xl font-extrabold tracking-wide">Create Account</h2>
        </div>

        <p className="text-center text-gray-500 mb-4 text-sm sm:text-base">
          Join our feedback community and share your thoughts!
        </p>

        <input
          name="firstName"
          placeholder="First Name"
          required
          aria-label="First Name"
          value={form.firstName}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-indigo-200 bg-indigo-50 text-lg outline-none placeholder-gray-500 text-gray-800 transition duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300"
        />
        <input
          name="lastName"
          placeholder="Last Name"
          required
          aria-label="Last Name"
          value={form.lastName}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-indigo-200 bg-indigo-50 text-lg outline-none placeholder-gray-500 text-gray-800 transition duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300"
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          required
          aria-label="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-indigo-200 bg-indigo-50 text-lg outline-none placeholder-gray-500 text-gray-800 transition duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300"
        />
        <input
          name="password"
          type="password"
          placeholder="Create Password"
          required
          aria-label="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-indigo-200 bg-indigo-50 text-lg outline-none placeholder-gray-500 text-gray-800 transition duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white text-lg shadow-lg transition ${
            loading
              ? "bg-indigo-300 cursor-not-allowed opacity-60"
              : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center mt-1">{errorMessage}</p>
        )}

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline font-medium">
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
}
