const API_URL = "http://localhost:4000";

// Signup API
export const signup = async (user) => {
  const res = await fetch(`${API_URL}/auth/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return { success: true };
};

// Login API
export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return { success: true, user: result.data };
};

// Get all feedbacks
export const getFeedback = async (token) => {
  const res = await fetch(`${API_URL}/feedback`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
};

// Submit a new feedback
export const postFeedback = async (data, token) => {
  console.log(data);
  
  const res = await fetch(`${API_URL}/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
};

// Vote (up/down) on feedback
export const voteFeedback = async (id, direction, token) => {
  const res = await fetch(`${API_URL}/feedback/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ vote: direction }),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
};

// Delete feedback
export const deleteFeedback = async (id, token) => {
  const res = await fetch(`${API_URL}/feedback/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete");
  return { success: true };
};
 