import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SubjectIcon from "@mui/icons-material/Subject";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Security: Input sanitization function
const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .replace(/[<>]/g, "")
    .slice(0, 1000);
};

// Security: Enhanced email validation
const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
};

const SUBMIT_COOLDOWN = 30000;

// Custom styled input component
const StyledInput = ({
  icon: Icon,
  label,
  error,
  helperText,
  multiline,
  rows,
  ...props
}) => (
  <Box sx={{ mb: { xs: 2, md: 2.5 }, width: "100%" }}>
    <Typography
      component="label"
      sx={{
        display: "block",
        mb: 0.75,
        fontSize: { xs: "0.8rem", md: "0.875rem" },
        fontWeight: 600,
        color: error ? "#d32f2f" : "#1a1a2e",
      }}
    >
      {label} <span style={{ color: "#d32f2f" }}>*</span>
    </Typography>
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: multiline ? "flex-start" : "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: { xs: 12, md: 16 },
          top: multiline ? 14 : "50%",
          transform: multiline ? "none" : "translateY(-50%)",
          color: error ? "#d32f2f" : "#9e9e9e",
          transition: "color 0.2s ease",
          zIndex: 1,
        }}
      >
        <Icon sx={{ fontSize: { xs: 18, md: 20 } }} />
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        error={error}
        multiline={multiline}
        rows={rows}
        {...props}
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: "#f8f9fa",
            borderRadius: { xs: 2, md: 3 },
            pl: { xs: 4.5, md: 5 },
            transition: "all 0.3s ease",
            "& fieldset": {
              borderColor: error ? "#d32f2f" : "transparent",
              borderWidth: 2,
            },
            "&:hover": {
              bgcolor: "#f1f3f4",
              "& fieldset": {
                borderColor: error ? "#d32f2f" : "#e0e0e0",
              },
            },
            "&.Mui-focused": {
              bgcolor: "#fff",
              boxShadow: error
                ? "0 0 0 3px rgba(211,47,47,0.1)"
                : "0 0 0 3px rgba(46,125,50,0.1)",
              "& fieldset": {
                borderColor: error ? "#d32f2f" : "#2e7d32",
              },
            },
          },
          "& .MuiOutlinedInput-input": {
            py: { xs: 1.25, md: 1.75 },
            fontSize: { xs: "0.875rem", md: "0.95rem" },
            "&::placeholder": {
              color: "#9e9e9e",
              opacity: 1,
            },
          },
          ...props.sx,
        }}
      />
    </Box>
    {helperText && (
      <Typography
        sx={{
          mt: 0.5,
          fontSize: { xs: "0.7rem", md: "0.75rem" },
          color: error ? "#d32f2f" : "#6b6b8d",
          pl: 1,
        }}
      >
        {helperText}
      </Typography>
    )}
  </Box>
);

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const lastSubmitTime = useRef(0);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setStatus({ type: "", message: "" });
  }, []);

  const validate = useCallback(() => {
    const tempErrors = {};
    const sanitizedName = sanitizeInput(form.name);
    const sanitizedEmail = sanitizeInput(form.email);
    const sanitizedSubject = sanitizeInput(form.subject);
    const sanitizedMessage = sanitizeInput(form.message);

    if (!sanitizedName) {
      tempErrors.name = "Full name is required";
    } else if (sanitizedName.length < 2) {
      tempErrors.name = "Name must be at least 2 characters";
    }

    if (!sanitizedEmail) {
      tempErrors.email = "Email is required";
    } else if (!isValidEmail(sanitizedEmail)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (!sanitizedSubject) {
      tempErrors.subject = "Subject is required";
    } else if (sanitizedSubject.length < 3) {
      tempErrors.subject = "Subject must be at least 3 characters";
    }

    if (!sanitizedMessage) {
      tempErrors.message = "Message is required";
    } else if (sanitizedMessage.length < 10) {
      tempErrors.message = "Message must be at least 10 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const now = Date.now();
      if (now - lastSubmitTime.current < SUBMIT_COOLDOWN) {
        const remainingTime = Math.ceil(
          (SUBMIT_COOLDOWN - (now - lastSubmitTime.current)) / 1000
        );
        setStatus({
          type: "warning",
          message: `Please wait ${remainingTime} seconds before submitting again`,
        });
        return;
      }

      if (!validate()) return;

      setSubmitting(true);
      setStatus({ type: "", message: "" });

      const sanitizedData = {
        name: sanitizeInput(form.name),
        email: sanitizeInput(form.email),
        subject: sanitizeInput(form.subject),
        message: sanitizeInput(form.message),
        timestamp: new Date().toISOString(),
      };

      try {
        const apiUrl =
          import.meta.env.VITE_API_URL ||
          "https://math-tuition-backend.vercel.app/api";

        const response = await fetch(`${apiUrl}/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sanitizedData),
        });

        const result = await response.json();

        if (response.ok && result.status === "success") {
          lastSubmitTime.current = now;
          setSubmitted(true);
          setForm({ name: "", email: "", subject: "", message: "" });
          setStatus({
            type: "success",
            message: "Message sent successfully! We'll get back to you soon.",
          });
        } else {
          setStatus({
            type: "error",
            message:
              result.message || "Something went wrong. Please try again.",
          });
        }
      } catch (error) {
        console.error("Form submission error:", error);
        setStatus({
          type: "error",
          message: "Network error. Please check your connection and try again.",
        });
      } finally {
        setSubmitting(false);
      }
    },
    [form, validate]
  );

  const resetForm = useCallback(() => {
    setSubmitted(false);
    setStatus({ type: "", message: "" });
  }, []);

  // Success state view
  if (submitted && status.type === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            textAlign: "center",
            py: { xs: 4, md: 8 },
            px: { xs: 2, md: 4 },
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Box
              sx={{
                width: { xs: 70, md: 100 },
                height: { xs: 70, md: 100 },
                borderRadius: "50%",
                bgcolor: "rgba(46,125,50,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: { xs: 2, md: 3 },
              }}
            >
              <CheckCircleIcon
                sx={{ fontSize: { xs: 40, md: 60 }, color: "#2e7d32" }}
              />
            </Box>
          </motion.div>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#1a1a2e",
              mb: { xs: 1, md: 2 },
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            Message Sent!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#6b6b8d",
              mb: { xs: 3, md: 4 },
              maxWidth: 350,
              mx: "auto",
              lineHeight: 1.7,
              fontSize: { xs: "0.875rem", md: "1rem" },
            }}
          >
            Thank you for reaching out. We'll get back to you within 24 hours.
          </Typography>
          <Button
            variant="outlined"
            onClick={resetForm}
            sx={{
              borderColor: "#2e7d32",
              color: "#2e7d32",
              fontWeight: 600,
              borderRadius: 3,
              px: { xs: 3, md: 4 },
              py: { xs: 1, md: 1.5 },
              borderWidth: 2,
              fontSize: { xs: "0.875rem", md: "1rem" },
              "&:hover": {
                borderColor: "#1b5e20",
                bgcolor: "rgba(46,125,50,0.05)",
                borderWidth: 2,
              },
            }}
          >
            Send Another Message
          </Button>
        </Box>
      </motion.div>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 2, md: 4 } }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            color: "#1a1a2e",
            mb: 0.5,
            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
          }}
        >
          Send us a Message
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#6b6b8d",
            fontSize: { xs: "0.75rem", md: "0.875rem" },
          }}
        >
          Fill out the form and we'll respond within 24 hours
        </Typography>
      </Box>

      <AnimatePresence mode="wait">
        {status.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Alert
              severity={status.type || "info"}
              sx={{
                mb: { xs: 2, md: 3 },
                borderRadius: 2,
                fontSize: { xs: "0.8rem", md: "0.875rem" },
                "& .MuiAlert-icon": {
                  alignItems: "center",
                },
              }}
              onClose={() => setStatus({ type: "", message: "" })}
            >
              {status.message}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        {/* Name and Email in row on larger screens */}
        <Grid container spacing={{ xs: 0, sm: 2 }}>
          <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", sm: "auto" } }}>
            <StyledInput
              icon={PersonOutlineIcon}
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              error={!!errors.name}
              helperText={errors.name}
              disabled={submitting}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ width: { xs: "100%", sm: "auto" } }}>
            <StyledInput
              icon={EmailOutlinedIcon}
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              error={!!errors.email}
              helperText={errors.email}
              disabled={submitting}
              inputProps={{ maxLength: 254 }}
            />
          </Grid>
        </Grid>

        {/* Subject */}
        <StyledInput
          icon={SubjectIcon}
          label="Subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="How can we help you?"
          error={!!errors.subject}
          helperText={errors.subject}
          disabled={submitting}
          inputProps={{ maxLength: 200 }}
        />

        {/* Message */}
        <StyledInput
          icon={ChatBubbleOutlineIcon}
          label="Message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your requirements..."
          error={!!errors.message}
          helperText={errors.message || `${form.message.length}/1000`}
          disabled={submitting}
          multiline
          rows={4}
          inputProps={{ maxLength: 1000 }}
        />

        {/* Submit Button */}
        <motion.div
          whileHover={{ scale: submitting ? 1 : 1.02 }}
          whileTap={{ scale: submitting ? 1 : 0.98 }}
        >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={submitting}
            endIcon={!submitting && <ArrowForwardIcon />}
            sx={{
              mt: 1,
              py: { xs: 1.5, md: 2 },
              bgcolor: "#2e7d32",
              fontWeight: 600,
              fontSize: { xs: "0.875rem", md: "1rem" },
              borderRadius: { xs: 2, md: 3 },
              textTransform: "none",
              boxShadow: "0 8px 25px rgba(46,125,50,0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#1b5e20",
                boxShadow: "0 12px 35px rgba(46,125,50,0.4)",
              },
              "&:disabled": {
                bgcolor: "#a5d6a7",
                color: "white",
              },
            }}
          >
            {submitting ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <CircularProgress size={20} sx={{ color: "white" }} />
                <span>Sending...</span>
              </Box>
            ) : (
              "Send Message"
            )}
          </Button>
        </motion.div>

        {/* Privacy note */}
        <Typography
          variant="caption"
          sx={{
            display: { xs: "none", sm: "block" },
            textAlign: "center",
            mt: { xs: 2, md: 3 },
            color: "#9e9e9e",
            fontSize: { xs: "0.7rem", md: "0.75rem" },
          }}
        >
          Your information is safe with us. We never share your data.
        </Typography>
      </Box>
    </Box>
  );
}
