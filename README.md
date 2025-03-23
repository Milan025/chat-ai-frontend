# AI Chat Application  

This is a **React-based AI Chat Application** where users can chat with an AI, provide feedback on responses, and view past conversations. It includes **Redux Toolkit for state management** and **Express.js for mocking AI responses**.  

## **🚀 Features**
- **AI Chat Interface**: Users can send messages, and AI provides responses.  
- **Feedback System**: Users can react with 👍 or 👎 on AI responses.  
- **Conversation History**: Past conversations are saved and accessible.  
- **Share Conversations**: Generate a shareable link for any chat.  
- **Feedback Overview**: View all feedback in a sortable table.  

---

## 🛠️ Tech Stack & Justifications
Frontend
React.js (with Vite) → Fast development & optimized builds.

Redux Toolkit → Efficient state management.

React Router → Navigation for different pages.

Material UI → Pre-styled UI components for faster development.

Backend
Express.js → Lightweight and easy-to-setup mock API.

CORS Middleware → To allow frontend-backend communication.

Deployment
Frontend: Netlify (Fast static hosting).

Backend: Render (For free API hosting).

## 🎨 Design Decisions
Redux for State Management

Redux enables global conversation tracking and feedback storage.

Alternatives like React Context API were considered but Redux was chosen for better scalability.

Express.js for API Mocking

Instead of calling a real AI API (e.g., OpenAI), we mock responses using Express.js.

This allows faster testing and offline development.

Material UI for UI Design

Used for quick styling and a clean, responsive UI.

Reduces custom CSS work while maintaining a professional look.

Shareable Conversation Links

Implemented unique IDs for easy sharing of past chats.

## ⚖️ Trade-offs & Future Improvements
Trade-offs
No real AI processing: Instead of integrating OpenAI, we used mock responses for simplicity.

Limited error handling: API failures return a basic error message.

Potential Improvements
✅ Real AI Integration → Replace the mock API with OpenAI's GPT API.
✅ Better Error Handling → Display retry options for failed responses.
✅ Dark Mode Toggle → Implement user preference storage in Redux.
✅ Mobile Responsiveness → Improve layout for smaller screens.

## 📄 Deployment Links
Live App: https://deccanai.netlify.app/conversation/DXQWzeDs2-w5KIeyNv54A