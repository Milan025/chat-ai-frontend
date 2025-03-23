import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPastConversations,
  startNewConversation,
} from "../store/chat-slice";
import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ShareIcon from "@mui/icons-material/Share";
import { BarChart as FeedbackIcon } from "@mui/icons-material";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedConversations = useSelector((state) => state.chat.conversations);
  const conversationId = useSelector((state) => state.chat.conversationId);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newChatStarted, setNewChatStarted] = useState(false);
  const conversationNames = useSelector(
    (state) => state.chat.conversationNames
  );

  useEffect(() => {
    dispatch(fetchPastConversations());
  }, [dispatch]);

  useEffect(() => {
    if (newChatStarted && conversationId) {
      navigate(`/conversation/${conversationId}`);
      setNewChatStarted(false);
    }
  }, [conversationId, newChatStarted, navigate]);

  const handleMenuOpen = (event, conversationId) => {
    setAnchorEl(event.currentTarget);
    setSelectedConversation(conversationId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedConversation(null);
  };

  const handleShare = () => {
    if (selectedConversation) {
      const shareableLink = `${window.location.origin}/conversation/${selectedConversation}`;
      navigator.clipboard.writeText(shareableLink);
      alert("Conversation link copied to clipboard!");
      handleMenuClose();
    }
  };

  const handleNewConversation = () => {
    dispatch(startNewConversation());
    setNewChatStarted(true);
  };

  const handleConversationClick = (id) => {
    navigate(`/conversation/${id}`);
  };

  return (
    <Box
      sx={{
        width: "250px",
        borderRight: "1px solid #ccc",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            mb: 2,
            justifyContent: "flex-start",
            textTransform: "none",
            fontWeight: "bold",
            color: "black",
            borderRadius: "20px",
            padding: "10px 15px",
            borderColor: "#ccc",
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
          onClick={handleNewConversation}
        >
          New Chat
        </Button>

        <Typography variant="h6">Past Conversations</Typography>
        <List>
          {Object.keys(savedConversations).length === 0 ? (
            <Typography>No saved conversations</Typography>
          ) : (
            Object.entries(savedConversations).map(([id]) => (
              <ListItem
                key={id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ flexGrow: 1, cursor: "pointer" }}
                  onClick={() => handleConversationClick(id)}
                >
                  {conversationNames[id] || "New Chat"}
                </Typography>

                <IconButton
                  size="small"
                  onClick={(event) => handleMenuOpen(event, id)}
                >
                  <MoreHorizIcon />
                </IconButton>
              </ListItem>
            ))
          )}
        </List>
      </Box>
      <Box sx={{ p: 2, position: "relative" }}>
        <Button
          variant="outlined"
          startIcon={<FeedbackIcon />}
          sx={{
            mt: "auto",
            textTransform: "none",
            fontWeight: "bold",
            color: "black",
            borderRadius: "20px",
            padding: "10px 15px",
            borderColor: "#ccc",
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
          onClick={() => navigate("/feedback")}
        >
          View Feedback
        </Button>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleShare}>
          <ShareIcon sx={{ mr: 1 }} /> Share
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SideBar;
