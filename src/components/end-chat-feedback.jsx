import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, TextField } from "@mui/material";
import { Rating } from "@mui/lab";
import { addRating, saveConversationToAPI } from "../store/chat-slice";

const EndChatFeedback = ({ conversationId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const _rating = useSelector(
    (state) => state.chat.ratings[conversationId] || {}
  );
  const messages = useSelector(
    (state) => state.chat.conversations[conversationId] || []
  );
  const _feedback = useSelector(
    (state) => state.chat.feedback[conversationId] || {}
  );

  useEffect(() => {
    if (Object.keys(_rating).length !== 0) {
      setSubmitted(true);
      setFeedback(_rating.feedback);
      setRating(_rating.rating);
    }
  }, [_rating]);

  const handleSubmit = () => {
    dispatch(addRating({ conversationId, rating, feedback }));
    setSubmitted(true);
    alert("Thank you for your feedback!");
    dispatch(
      saveConversationToAPI(conversationId, messages, _feedback, {
        rating,
        feedback,
      })
    );
  };

  return (
    <Box sx={{ mt: 3, textAlign: "center" }}>
      <Typography variant="h6">Rate this Conversation:</Typography>
      <Rating
        value={rating}
        disabled={submitted}
        onChange={(e, newValue) => setRating(newValue)}
      />
      <TextField
        fullWidth
        label="Your feedback..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        sx={{ mt: 2 }}
        disabled={submitted}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{ mt: 2 }}
        disabled={submitted}
      >
        {submitted ? "Thank You!" : "Submit Feedback"}
      </Button>
    </Box>
  );
};

export default EndChatFeedback;
