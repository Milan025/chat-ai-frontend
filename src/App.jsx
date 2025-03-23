import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import ChatBox from "./components/chat-box";
import SideBar from "./components/side-bar";
import { Box } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import FeedbackOverview from "./components/feedback-overview";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Box sx={{ display: "flex" }}>
          <SideBar />
          <Routes>
            <Route path="/" element={<ChatBox />} />
            <Route path="/conversation/:id" element={<ChatBox />} />
            <Route path="/feedback" element={<FeedbackOverview />} />
          </Routes>
        </Box>
      </Router>
    </Provider>
  );
}

export default App;
