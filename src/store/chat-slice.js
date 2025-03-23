import { createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: {},
    feedback: {},
    savedConversations: {},
    ratings: {},
    conversationId: null,
    conversationNames: {},
  },
  reducers: {
    startNewConversation: (state) => {
      const newId = nanoid();
      state.conversationId = newId;
      state.conversations[state.conversationId] = [];
      state.feedback[state.conversationId] = {};
      state.conversationNames[newId] = "New Chat";
    },
    addMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      if (!state.conversations[conversationId]) {
        state.conversations[conversationId] = [];
      }
      state.conversations[conversationId].push(message);
      if (state.conversations[conversationId].length === 1) {
        state.conversationNames[conversationId] = message.text.slice(0, 20);
      }
    },
    addFeedback: (state, action) => {
      const { conversationId, messageIndex, feedbackType } = action.payload;
      if (!state.feedback[conversationId]) {
        state.feedback[conversationId] = {};
      }
      state.feedback[conversationId][messageIndex] = feedbackType;
    },
    addRating: (state, action) => {
      const { conversationId, rating, feedback } = action.payload;
      state.ratings[conversationId] = { rating, feedback };
    },
    setPastConversations: (state, action) => {
      const transform = transformConversations(action.payload);
      state.conversations = transform.conversations || {};
      state.conversationNames = action.payload.names;
      state.feedback = transform.feedback || {};
      state.ratings = transform.ratings || {};
    },
  },
});

export const {
  startNewConversation,
  addMessage,
  addFeedback,
  addRating,
  setPastConversations,
} = chatSlice.actions;

function transformConversations(input) {
  const output = {
    conversations: {},
    feedback: {},
    ratings: {},
  };

  for (const [conversationId, conversation] of Object.entries(
    input.conversations
  )) {
    output.conversations[conversationId] = [...conversation.messages];

    if (conversation.feedback) {
      output.feedback[conversationId] = conversation.feedback;
    }

    if (conversation.rating) {
      output.ratings[conversationId] = conversation.rating;
    }
  }

  return output;
}

export const saveConversationToAPI =
  (conversationId, messages, feedback, rating) => async () => {
    await axios.post(`${API_BASE_URL}/conversations`, {
      id: conversationId,
      messages,
      feedback,
      rating,
    });
  };

export const fetchPastConversations = () => async (dispatch) => {
  const response = await axios.get(`${API_BASE_URL}/conversations`);
  dispatch(setPastConversations(response.data));
};

export default chatSlice.reducer;
