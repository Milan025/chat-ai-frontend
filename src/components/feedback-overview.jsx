import { useSelector } from "react-redux";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";

const FeedbackOverview = () => {
  const conversations = useSelector((state) => state.chat.conversations || {});
  const feedback = useSelector((state) => state.chat.feedback || {});
  const ratings = useSelector((state) => state.chat.ratings || {});
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  function prepareData() {
    return Object.keys(feedback).map((id) => {
      const messages = conversations[id];
      const firstUserMessage =
        messages.find((msg) => msg.sender === "user")?.text.slice(0, 20) || "";
      return {
        message: firstUserMessage || "New Chat",
        rating: ratings[id]?.rating || "",
        feedback: ratings[id]?.feedback || "No feedback",
      };
    });
  }

  const feedbackList = prepareData();

  const filteredFeedback = feedbackList.filter((item) =>
    search === "" ? true : item.rating === Number(search)
  );

  const sortedFeedback = [...filteredFeedback].sort((a, b) =>
    sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
  );

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Feedback Overview
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Select
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">All Ratings</MenuItem>
          {[1, 2, 3, 4, 5].map((num) => (
            <MenuItem key={num} value={num}>
              {num} Star{num === 1 ? "" : "s"}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <MenuItem value="asc">Sort: Low to High</MenuItem>
          <MenuItem value="desc">Sort: High to Low</MenuItem>
        </Select>
      </Box>
      {filteredFeedback.length === 0 ? (
        <Typography>No feedback available</Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Conversation Name</b>
                </TableCell>
                <TableCell>
                  <b>Rating</b>
                </TableCell>
                <TableCell>
                  <b>Written Feedback</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedFeedback.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.message}</TableCell>
                  <TableCell>
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <StarIcon key={i} sx={{ color: "#FFD700" }} />
                    ))}
                  </TableCell>
                  <TableCell>{item.feedback}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default FeedbackOverview;
