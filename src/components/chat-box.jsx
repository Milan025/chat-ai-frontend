import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  addFeedback,
  saveConversationToAPI,
} from "../store/chat-slice";
import { sendMessageToAI } from "../api/chat-api";
import { Box, TextField, Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import EndChatFeedback from "./end-chat-feedback";
import { useParams } from "react-router-dom";

const ChatBox = () => {
  const { id: conversationId } = useParams();

  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.chat.conversations);
  const messages = useSelector(
    (state) => state.chat.conversations[conversationId] || []
  );
  const feedback = useSelector(
    (state) => state.chat.feedback[conversationId] || {}
  );
  const rating = useSelector(
    (state) => state.chat.ratings[conversationId] || {}
  );
  const [message, setMessage] = useState("");
  const [hoverIndex, setHoverIndex] = useState(null);
  const [chatEnded, setChatEnded] = useState(false);

  const currentMessages = conversations[conversationId] || [];

  useEffect(() => {
    setChatEnded(false);
  }, [conversationId]);

  useEffect(() => {
    if (Object.keys(rating).length !== 0) {
      setChatEnded(true);
    }
  }, [rating]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const msg = message.trim();

    setMessage("");

    dispatch(
      addMessage({ conversationId, message: { text: msg, sender: "user" } })
    );

    const aiResponse = await sendMessageToAI(msg);
    dispatch(
      addMessage({
        conversationId,
        message: { text: aiResponse, sender: "ai" },
      })
    );

    if (msg.toLowerCase() == "bye") {
      setChatEnded(true);
      dispatch(
        saveConversationToAPI(
          conversationId,
          [
            ...messages,
            { text: msg, sender: "user" },
            { text: aiResponse, sender: "ai" },
          ],
          feedback,
          rating
        )
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFeedback = (index, type) => {
    dispatch(
      addFeedback({ conversationId, messageIndex: index, feedbackType: type })
    );
    dispatch(
      saveConversationToAPI(
        conversationId,
        messages,
        {
          ...feedback,
          [index]: type,
        },
        rating
      )
    );
  };

  return (
    <Box sx={{ width: "50%", margin: "auto", mt: 4, p: 2 }}>
      <Typography variant="h5">AI Chat</Typography>
      <Box sx={{ maxHeight: "500px", overflowY: "auto", mb: 2 }}>
        {currentMessages.map((msg, index) => (
          <Box
            key={index}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            sx={{ textAlign: msg.sender === "user" ? "right" : "left", mb: 1 }}
          >
            <Typography
              sx={{
                display: "inline-block",
                p: 1,
                borderRadius: 2,
                backgroundColor: msg.sender === "user" ? "#1976d2" : "#eee",
                color: msg.sender === "user" ? "#fff" : "#000",
              }}
            >
              {msg.text}
            </Typography>
            {msg.sender === "ai" && hoverIndex === index && (
              <Box sx={{ display: "inline-flex", ml: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => handleFeedback(index, "up")}
                  color={feedback[index] === "up" ? "primary" : "default"}
                >
                  <ThumbUpIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleFeedback(index, "down")}
                  color={feedback[index] === "down" ? "error" : "default"}
                >
                  <ThumbDownIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Box>
        ))}
      </Box>
      {chatEnded ? (
        <EndChatFeedback conversationId={conversationId} />
      ) : (
        <TextField
          fullWidth
          variant="outlined"
          label="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          multiline
          minRows={1}
          maxRows={4}
        />
      )}
    </Box>
  );
};

export default ChatBox;
