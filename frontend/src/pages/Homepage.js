import { useEffect, useState } from "react";
import { getFeedback } from "../api";
import { logout } from "../utils";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";
import { useNavigate } from "react-router-dom";
import { FaComments } from "react-icons/fa";

export default function Homepage({ user, setUser }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [userFeedbacks, setUserFeedbacks] = useState([]);
  const [otherFeedbacks, setOtherFeedbacks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedbacks();
  }, [user.token]);

  const fetchFeedbacks = async () => {
    try {
      const data = await getFeedback(user.token);

      setFeedbacks([...data?.data]);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      setError("Failed to load feedback. Please try again later.");
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  const handleAddFeedback = (newFeedback) => {
    fetchFeedbacks();
  };

  useEffect(() => {
    const userFeedbacks = Array.isArray(feedbacks)
      ? feedbacks.filter((fb) => fb.userId === user.uuid)
      : [];

    setUserFeedbacks(userFeedbacks);

    const otherFeedbacks = Array.isArray(feedbacks)
      ? feedbacks.filter((fb) => fb.userId != user.uuid)
      : [];
    setOtherFeedbacks(otherFeedbacks);
  }, [feedbacks]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-sky-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
          <div className="flex items-center gap-3 text-indigo-600">
            <FaComments size={28} />
            <h1 className="text-4xl font-extrabold tracking-wide">
              HDFC Life Feedback Tracker
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 text-base">
              Welcome, <strong>{user.firstName}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-md mb-6 text-sm text-center font-medium">
            {error}
          </div>
        )}

        {/* My Feedbacks Section */}
        <div className="mb-10">
          <FeedbackList
            title="My Feedbacks"
            feedbacks={userFeedbacks}
            setFeedbacks={setFeedbacks}
            user={user}
            deleteHandler={()=>{
              fetchFeedbacks()
            }}
          />
        </div>

        {/* Feedback Form */}
        <div className="mb-10">
          <FeedbackForm onAdd={handleAddFeedback} user={user} />
        </div>

        {/* Others' Feedback Section */}
        <div>
          <FeedbackList
            title="Community Feedback"
            feedbacks={otherFeedbacks}
            setFeedbacks={setFeedbacks}
            user={user}
            refreshFeedback={fetchFeedbacks}
          />
        </div>
      </div>
    </div>
  );
}
