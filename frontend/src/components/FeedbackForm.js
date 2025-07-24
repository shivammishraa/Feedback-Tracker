import { useEffect, useState } from "react";
import { postFeedback } from "../api";

export default function FeedbackForm({ onAdd,user }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const nameInput = document.querySelector("input[name='name']");
    if (nameInput) nameInput.focus();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const newFeedback = await postFeedback(form,user?.token);
      onAdd(newFeedback);
      setForm({ name: "", email: "", message: "" });
      setError("");
    } catch (err) {
      console.error("Feedback submission failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4 w-full max-w-2xl mx-auto mt-6"
      aria-label="Feedback form"
    >
      <h2 className="text-xl font-semibold text-gray-800">Leave Feedback</h2>

      <input
        name="name"
        type="text"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
        aria-label="Name"
        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        name="email"
        type="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        required
        aria-label="Email"
        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        name="message"
        placeholder="Your Feedback"
        rows="4"
        value={form.message}
        onChange={handleChange}
        required
        aria-label="Feedback"
        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>

      {error && (
        <p className="text-red-600 text-sm font-medium text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-md font-semibold text-white text-lg shadow-md transition ${
          loading
            ? "bg-blue-300 cursor-not-allowed opacity-60"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  );
}
