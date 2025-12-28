import { useState, useRef, useEffect, useCallback } from "react";
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
const API_URL = import.meta.env.VITE_API_URL || "https://math-tuition-backend.vercel.app/api";

// Send notification to backend
const sendChatNotification = async (message, conversationHistory) => {
  try {
    await fetch(`${API_URL}/chat-notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        conversationHistory,
        timestamp: new Date().toISOString(),
        source: "website-chat",
      }),
    });
  } catch (error) {
    console.error("Failed to send chat notification:", error);
  }
};

// Auto-reply responses based on keywords
const getAutoReply = (message) => {
  const lowerMessage = message.toLowerCase();

  // Fees and pricing
  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("fee") || lowerMessage.includes("charge") || lowerMessage.includes("rate") || lowerMessage.includes("aed") || lowerMessage.includes("dirham")) {
    return `Our 1-on-1 Individual Tuition fees (as per UAE standards):

📌 Hourly Rate: Starting from AED 50/hour
📌 Monthly Package: AED 500/month

Fees may vary based on grade level:
• Grade 1-5: AED 50/hour | AED 500/month
• Grade 6-8: AED 60/hour | AED 600/month
• Grade 9-12: AED 75/hour | AED 750/month

✨ All classes are personalized 1-on-1 online sessions focused entirely on your child's needs!

Would you like to book a FREE demo class?`;
  }

  // Hourly specific
  if (lowerMessage.includes("hour") || lowerMessage.includes("per session") || lowerMessage.includes("single class")) {
    return `Our hourly rates start from AED 50/hour depending on the grade level:

• Grade 1-5: AED 50/hour
• Grade 6-8: AED 60/hour
• Grade 9-12: AED 75/hour

Each session is 1 hour of focused online learning. You can book as many sessions as needed!`;
  }

  // Monthly package
  if (lowerMessage.includes("month") || lowerMessage.includes("package") || lowerMessage.includes("subscription")) {
    return `Our monthly packages offer great value:

• Grade 1-5: AED 500/month (12 sessions)
• Grade 6-8: AED 600/month (12 sessions)
• Grade 9-12: AED 750/month (12 sessions)

Monthly packages include 3 classes per week, homework help, and progress tracking. All classes are online!`;
  }

  // Timing and schedule
  if (lowerMessage.includes("timing") || lowerMessage.includes("schedule") || lowerMessage.includes("time") || lowerMessage.includes("slot") || lowerMessage.includes("when")) {
    return "We offer flexible timings for online classes! Sessions available from 4 PM to 9 PM on weekdays and 10 AM to 6 PM on weekends (UAE time). We work around your child's school schedule. What time works best for you?";
  }

  // Grade and syllabus
  if (lowerMessage.includes("grade") || lowerMessage.includes("class") || lowerMessage.includes("age") || lowerMessage.includes("level") || lowerMessage.includes("syllabus") || lowerMessage.includes("curriculum")) {
    return `We teach mathematics to students from Grade 1 to Grade 12.

📚 We cover academic syllabi including:
• CBSE
• ICSE
• British Curriculum
• American Curriculum
• IB (International Baccalaureate)

Our online classes align with your child's school syllabus for better academic performance!`;
  }

  // Online classes
  if (lowerMessage.includes("online") || lowerMessage.includes("offline") || lowerMessage.includes("mode") || lowerMessage.includes("zoom") || lowerMessage.includes("virtual")) {
    return `We provide 1-on-1 ONLINE classes only via Zoom/Google Meet with:

✅ Individual attention for your child
✅ Interactive whiteboard
✅ Screen sharing
✅ Recorded sessions (on request)
✅ Digital worksheets & resources

No group classes - your child gets 100% personalized attention from the tutor!`;
  }

  // Individual / One-on-one
  if (lowerMessage.includes("individual") || lowerMessage.includes("one on one") || lowerMessage.includes("1 on 1") || lowerMessage.includes("one-on-one") || lowerMessage.includes("1-on-1") || lowerMessage.includes("personal") || lowerMessage.includes("private") || lowerMessage.includes("group")) {
    return `Yes! We offer exclusively 1-on-1 individual tuition - no group classes!

👨‍🏫 Benefits of our individual sessions:
• 100% focus on your child
• Personalized pace & teaching style
• Address specific weak areas
• More interaction & doubt clearing
• Flexible scheduling

Your child gets undivided attention throughout the session!`;
  }

  // Trial and demo
  if (lowerMessage.includes("trial") || lowerMessage.includes("demo") || lowerMessage.includes("free") || lowerMessage.includes("try")) {
    return "Yes! We offer a FREE demo class so your child can experience our teaching style. No payment required for the trial. Would you like to book one? Just share your child's grade and preferred timing!";
  }

  // Teacher info
  if (lowerMessage.includes("teacher") || lowerMessage.includes("tutor") || lowerMessage.includes("faculty") || lowerMessage.includes("who teach")) {
    return "Our teachers are experienced educators with 5+ years of teaching experience. They specialize in making math fun and easy to understand. All our tutors are familiar with UAE academic curricula (CBSE, British, American, IB) and conduct engaging online sessions.";
  }

  // Contact
  if (lowerMessage.includes("contact") || lowerMessage.includes("call") || lowerMessage.includes("phone") || lowerMessage.includes("whatsapp") || lowerMessage.includes("number")) {
    return "You can reach us directly on WhatsApp at +971 54 301 4873. Click the 'Continue on WhatsApp' button below to start a conversation with our team!";
  }

  // Greetings
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey") || lowerMessage.includes("good morning") || lowerMessage.includes("good evening") || lowerMessage.includes("assalam")) {
    return "Hello! Welcome to Math Kidz! 👋 How can I help you today? Feel free to ask about our online classes, fees (starting AED 50/hour), timings, or book a FREE demo class!";
  }

  // Thanks
  if (lowerMessage.includes("thank") || lowerMessage.includes("thanks") || lowerMessage.includes("shukran")) {
    return "You're welcome! 😊 If you have any more questions, feel free to ask. We're here to help your child excel in mathematics! Would you like to book a FREE demo class?";
  }

  // Enrollment
  if (lowerMessage.includes("enroll") || lowerMessage.includes("register") || lowerMessage.includes("join") || lowerMessage.includes("admission") || lowerMessage.includes("start") || lowerMessage.includes("begin")) {
    return "Great! To enroll your child:\n\n1️⃣ Book a FREE demo class\n2️⃣ Choose hourly (AED 50+/hr) or monthly package (AED 500+/month)\n3️⃣ Select your preferred schedule\n\nReach out to us on WhatsApp to get started!";
  }

  // Payment
  if (lowerMessage.includes("pay") || lowerMessage.includes("payment") || lowerMessage.includes("bank") || lowerMessage.includes("transfer")) {
    return "We accept multiple payment methods:\n\n• Bank Transfer\n• Cash (for UAE residents)\n• Online Payment\n\nPayment is due at the beginning of each month for monthly packages, or before each session for hourly bookings.";
  }

  // Location
  if (lowerMessage.includes("location") || lowerMessage.includes("where") || lowerMessage.includes("area") || lowerMessage.includes("dubai") || lowerMessage.includes("abu dhabi") || lowerMessage.includes("sharjah")) {
    return "We provide ONLINE classes only, so students from anywhere in UAE (Dubai, Abu Dhabi, Sharjah, Ajman, etc.) or even abroad can join! All you need is a stable internet connection and a device.";
  }

  // Default response
  return "Thank you for your message! Here's a quick overview:\n\n👨‍🏫 Type: 1-on-1 Individual Tuition\n💰 Fees: Starting AED 50/hour or AED 500/month\n💻 Mode: Online classes only\n📚 Coverage: School academic syllabus\n🎓 Grades: 1 to 12\n\nWould you like to know more about fees, timings, or book a FREE demo class?";
};

function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 Welcome to Math Kidz!\n\nWe offer 1-on-1 individual online math tuition for kids (Grades 1-12) starting from AED 50/hour.\n\n✨ Personalized attention for your child!\n\nHow can I help you today? Ask me about:\n• Fees & Packages\n• Class Timings\n• Syllabus Coverage\n• Free Demo Class",
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

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      time: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");

    // Send notification to backend (non-blocking)
    sendChatNotification(inputValue, updatedMessages.map(m => ({
      text: m.text,
      sender: m.sender,
      time: m.time.toISOString(),
    })));

    // Simulate typing delay for bot response
    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        text: getAutoReply(inputValue),
        sender: "bot",
        time: new Date(),
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  }, [inputValue, messages]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const openWhatsApp = useCallback(() => {
    // Send notification that user is moving to WhatsApp
    sendChatNotification("User clicked 'Continue on WhatsApp'", messages.map(m => ({
      text: m.text,
      sender: m.sender,
      time: m.time.toISOString(),
    })));

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'm interested in math tuition for my child.")}`,
      "_blank",
      "noopener,noreferrer"
    );
  }, [messages]);

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
              onKeyDown={handleKeyDown}
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
