import { useState } from "react";
import { voteFeedback, deleteFeedback } from "../api";

export default function FeedbackList({
  feedbacks,
  setFeedbacks,
  deleteHandler,
  user,
  title,
  refreshFeedback,
}) {
  const [loadingVote, setLoadingVote] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(null);

  const handleVote = async (id, direction) => {
    setLoadingVote(id);
    try {
      const updated = await voteFeedback(id, direction, user.token);
      refreshFeedback();
    } catch (err) {
      console.error("Vote failed:", err);
    } finally {
      setLoadingVote(null);
    }
  };

  const handleDelete = async (id) => {
    setLoadingDelete(id);
    try {
      await deleteFeedback(id, user.token); 
      deleteHandler();
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setLoadingDelete(null);
    }
  };

  if (!feedbacks.length) {
    return (
      <div className="mt-8">
        {title && (
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
        )}
        <p className="text-center text-gray-600 mt-2">
          No feedback submitted yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-4xl mx-auto px-4">
      {title && (
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h3>
      )}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="bg-white rounded-lg shadow-md p-5 transition-transform hover:scale-[1.01]"
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-1">
              {fb.name}
            </h4>
            <p className="text-gray-700 mb-4">{fb.message}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleVote(fb.uuid, 1)}
                  disabled={fb.userId === user.uuid || loadingVote === fb.uuid}
                  aria-label="Upvote feedback"
                  className={`px-2 py-1 rounded ${
                    fb.userId === user.uuid || loadingVote === fb.uuid
                      ? "bg-green-100 opacity-50 cursor-not-allowed"
                      : "bg-green-100 hover:bg-green-200 text-green-700"
                  }`}
                  title={
                    fb.userId === user.uuid
                      ? "You can't upvote your own feedback"
                      : "Upvote"
                  }
                >
                  ⬆️ {fb?.likedByUsers?.length}
                </button>

                <span className="text-gray-800 font-semibold bg-gray-100 px-2 py-1 rounded text-sm">
                  {fb.votes}
                </span>

                <button
                  onClick={() => handleVote(fb.uuid, 0)}
                  disabled={fb.userId === user.uuid || loadingVote === fb.uuid}
                  aria-label="Downvote feedback"
                  className={`px-2 py-1 rounded ${
                    fb.userId === user.uuid || loadingVote === fb.uuid
                      ? "bg-red-100 opacity-50 cursor-not-allowed"
                      : "bg-red-100 hover:bg-red-200 text-red-700"
                  }`}
                  title={
                    fb.userId === user.uuid
                      ? "You can't downvote your own feedback"
                      : "Downvote"
                  }
                >
                  ⬇️{fb?.dislikedByUsers?.length}
                </button>
              </div>

              {user.uuid === fb.userId && (
                <button
                  onClick={() => handleDelete(fb.uuid)}
                  disabled={loadingDelete === fb.uuid}
                  aria-label="Delete feedback"
                  className={`px-2 py-1 rounded ${
                    loadingDelete === fb.uuid
                      ? "bg-gray-300 opacity-60 cursor-not-allowed"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                  title="Delete Feedback"
                >
                  🗑️
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
