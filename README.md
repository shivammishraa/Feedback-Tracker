# Feedback-Tracker


A full-stack feedback management platform built with **React**, **Node.js**, and **Express**, designed to provide a seamless and interactive user experience for submitting and managing feedback within a community.

This application enables **authenticated users** to share their thoughts, **interact with others' feedback**, and experience a clean, responsive interface crafted with modern UI practices. It is ideal for internal feedback systems, case study review platforms, or small community discussions.

---

## 🚀 How to Run the Project Locally

### 📁 1. Clone the repository

```bash
git clone https://github.com/shivammishraa/Feedback-Tracker.git
cd Feedback-Tracker
```

🛠️ 2. Start the Backend Server
````bash
cd backend
npm install           # Install dependencies
npm install cors      # Add CORS middleware
npm run local         # Start the backend server
````

💻 3. Start the Frontend React App
```bash
cd ../frontend
npm install           # Install frontend dependencies
npm start             # Start the React dev server
```

## 💡 Key Highlights

- **🔐 User Authentication**  
  Users must sign up and log in to access the application. Auth state is preserved in localStorage, and unauthorized access is blocked.

- **📥 Feedback Submission**  
  Logged-in users can submit detailed feedback through a structured form. Each feedback is stored uniquely and linked to the author.

- **🧑‍💻 Personalized View**  
  - **My Feedback Section**: Displays only the feedback submitted by the logged-in user.  
  - **Community Feedback Section**: Displays feedback from other users in the platform.

- **📈 Voting System**  
  - Users can upvote or downvote community feedback to indicate agreement or priority.  
  - Users **cannot vote on their own feedback**, maintaining fairness and integrity.

- **🗑️ Access Control**  
  - Users can only delete their own feedback.  
  - No access to edit or remove others' posts.

- **📱 Fully Responsive UI**  
  Tailored for **mobile, tablet, and desktop** using **Tailwind CSS**.  
  Includes:
  - Rounded buttons
  - Proper spacing
  - Gradient backgrounds
  - Clean form inputs and consistent design system

- **🚪 Logout Option**  
  One-click logout that clears session data securely.
  

🖼️ UI Snapshot:

<img width="1902" height="972" alt="image" src="https://github.com/user-attachments/assets/915aa6e6-7bf3-403d-b276-38e62d047a2f" />

<img width="1919" height="958" alt="image" src="https://github.com/user-attachments/assets/3895bf57-c912-49b2-9c4e-56c3d97b00c1" />

<img width="460" height="789" alt="image" src="https://github.com/user-attachments/assets/551abbfe-683c-4d87-a94a-ab38ace5263c" />
