import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const sendMessageToAI = async (message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/chat`, { message });
    return response.data.response;
  } catch (error) {
    console.error("AI is unavailable :: ", error);
    return "Error: AI is unavailable.";
  }
};
