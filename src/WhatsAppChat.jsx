import { useState, useRef, useEffect } from "react";
import {
  Box,
  Fab,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Zoom,
  Fade,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WHATSAPP_NUMBER = "971543014873";

// Auto-reply responses based on keywords
const getAutoReply = (message) => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("fee") || lowerMessage.includes("charge")) {
    return "Our tuition fees vary based on the grade level and session frequency. We offer affordable packages starting from AED 200/month. Would you like to speak with our team for a customized quote? You can reach us on WhatsApp for more details!";
  }

  if (lowerMessage.includes("timing") || lowerMessage.includes("schedule") || lowerMessage.includes("time") || lowerMessage.includes("slot")) {
    return "We offer flexible timings! Classes are available from 4 PM to 9 PM on weekdays and 10 AM to 6 PM on weekends. We can work around your child's school schedule.";
  }

  if (lowerMessage.includes("grade") || lowerMessage.includes("class") || lowerMessage.includes("age") || lowerMessage.includes("level")) {
    return "We teach mathematics to students from Grade 1 to Grade 12. Our curriculum covers school syllabus (CBSE, ICSE, British, American) as well as foundation building for competitive exams.";
  }

  if (lowerMessage.includes("online") || lowerMessage.includes("offline") || lowerMessage.includes("mode")) {
    return "We offer both online and offline classes! Online classes are conducted via Zoom with interactive whiteboards. Offline classes are available in select locations.";
  }

  if (lowerMessage.includes("trial") || lowerMessage.includes("demo") || lowerMessage.includes("free")) {
    return "Yes! We offer a FREE demo class so your child can experience our teaching style. Would you like to book a trial session? Just share your preferred timing!";
  }

  if (lowerMessage.includes("teacher") || lowerMessage.includes("tutor") || lowerMessage.includes("faculty")) {
    return "Our teachers are experienced educators with 5+ years of teaching experience. They specialize in making math fun and easy to understand for kids of all levels.";
  }

  if (lowerMessage.includes("contact") || lowerMessage.includes("call") || lowerMessage.includes("phone") || lowerMessage.includes("whatsapp")) {
    return "You can reach us directly on WhatsApp at +971 54 301 4873. Click the WhatsApp button below to start a conversation with our team!";
  }

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey") || lowerMessage.includes("good")) {
    return "Hello! Welcome to Math Kidz! 👋 How can I help you today? Feel free to ask about our classes, timings, fees, or anything else!";
  }

  if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
    return "You're welcome! 😊 If you have any more questions, feel free to ask. We're here to help your child excel in mathematics!";
  }

  if (lowerMessage.includes("enroll") || lowerMessage.includes("register") || lowerMessage.includes("join") || lowerMessage.includes("admission")) {
    return "Great! To enroll your child, please fill out the contact form on our website or reach out to us on WhatsApp. We'll guide you through the simple registration process!";
  }

  // Default response
  return "Thank you for your message! For detailed information, please connect with us on WhatsApp where our team can assist you personally. Is there anything specific about our math tuition you'd like to know - like fees, timings, or grade levels?";
};

function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 Welcome to Math Kidz! How can I help you today?",
      sender: "bot",
      time: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate typing delay for bot response
    setTimeout(() => {
      const botReply = {
        id: messages.length + 2,
        text: getAutoReply(inputValue),
        sender: "bot",
        time: new Date(),
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'm interested in math tuition for my child.")}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: { xs: 20, md: 30 },
        right: { xs: 20, md: 30 },
        zIndex: 1200,
      }}
    >
      {/* Chat Window */}
      <Zoom in={isOpen}>
        <Paper
          elevation={8}
          sx={{
            position: "absolute",
            bottom: 80,
            right: 0,
            width: { xs: 320, sm: 380 },
            height: { xs: 450, sm: 500 },
            borderRadius: 3,
            overflow: "hidden",
            display: isOpen ? "flex" : "none",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
              color: "white",
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "white",
                color: "#2e7d32",
                width: 45,
                height: 45,
              }}
            >
              <ChatIcon />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight={700}>
                Math Kidz Support
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                We typically reply instantly
              </Typography>
            </Box>
            <IconButton
              onClick={() => setIsOpen(false)}
              sx={{ color: "white" }}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              bgcolor: "#f5f5f5",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            {messages.map((message) => (
              <Fade in key={message.id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "80%",
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: message.sender === "user" ? "#2e7d32" : "white",
                      color: message.sender === "user" ? "white" : "inherit",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      borderTopRightRadius: message.sender === "user" ? 0 : 16,
                      borderTopLeftRadius: message.sender === "bot" ? 0 : 16,
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                      {message.text}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        textAlign: "right",
                        mt: 0.5,
                        opacity: 0.7,
                        fontSize: "0.65rem",
                      }}
                    >
                      {formatTime(message.time)}
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          {/* WhatsApp Connect Button */}
          <Box
            sx={{
              px: 2,
              py: 1,
              bgcolor: "#e8f5e9",
              borderTop: "1px solid #c8e6c9",
            }}
          >
            <Box
              onClick={openWhatsApp}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                py: 1,
                px: 2,
                bgcolor: "#25D366",
                borderRadius: 2,
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "#128C7E",
                  transform: "scale(1.02)",
                },
              }}
            >
              <WhatsAppIcon sx={{ color: "white", fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: "white", fontWeight: 600 }}>
                Continue on WhatsApp
              </Typography>
            </Box>
          </Box>

          {/* Input Area */}
          <Box
            sx={{
              p: 2,
              bgcolor: "white",
              borderTop: "1px solid #e0e0e0",
              display: "flex",
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: "#f5f5f5",
                },
              }}
            />
            <IconButton
              onClick={handleSend}
              disabled={!inputValue.trim()}
              sx={{
                bgcolor: "#2e7d32",
                color: "white",
                "&:hover": { bgcolor: "#1b5e20" },
                "&:disabled": { bgcolor: "#e0e0e0", color: "#9e9e9e" },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Zoom>

      {/* Chat Toggle Button */}
      <Fab
        aria-label="Open chat"
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          bgcolor: isOpen ? "#1b5e20" : "#2e7d32",
          color: "white",
          width: { xs: 56, md: 64 },
          height: { xs: 56, md: 64 },
          boxShadow: "0 4px 20px rgba(46, 125, 50, 0.4)",
          "&:hover": {
            bgcolor: "#1b5e20",
            boxShadow: "0 6px 25px rgba(46, 125, 50, 0.5)",
          },
          transition: "all 0.3s ease",
        }}
      >
        {isOpen ? (
          <CloseIcon sx={{ fontSize: { xs: 28, md: 32 } }} />
        ) : (
          <ChatIcon sx={{ fontSize: { xs: 28, md: 32 } }} />
        )}
      </Fab>
    </Box>
  );
}

export default WhatsAppChat;
