import React from "react";
import { motion } from "framer-motion";
import { Box, Typography, Stack, Link } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const contactInfo = [
  {
    icon: EmailIcon,
    label: "Email us",
    value: "imtiazk4u@gmail.com",
    href: "mailto:imtiazk4u@gmail.com",
    ariaLabel: "Send email to imtiazk4u@gmail.com",
  },
  {
    icon: PhoneIcon,
    label: "Call us",
    value: "+971 543014873",
    href: "tel:+971543014873",
    ariaLabel: "Call +971 543014873",
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "+971 543014873",
    href: "https://wa.me/971543014873",
    ariaLabel: "Message on WhatsApp",
  },
  {
    icon: AccessTimeIcon,
    label: "Available",
    value: "Mon - Sat, 10 AM - 8 PM",
    href: null,
    ariaLabel: "Available Monday to Saturday, 9 AM to 8 PM",
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

export default function LetsConnect() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            color: "white",
            mb: { xs: 1.5, md: 2 },
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
          }}
        >
          Let's Connect
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "rgba(255,255,255,0.85)",
            mb: { xs: 2, md: 4 },
            lineHeight: 1.7,
            fontSize: { xs: "0.875rem", sm: "0.9rem", md: "1rem" },
            display: { xs: "none", sm: "block" },
          }}
        >
          Have questions or need a personalized online tuition plan? We're here
          to support your child's math journey every step of the way.
        </Typography>
      </motion.div>

      <Box sx={{ mt: { xs: 0, md: "auto" } }}>
        {contactInfo.map((item, index) => (
          <motion.div
            key={item.label}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Stack
              direction="row"
              spacing={{ xs: 1.5, md: 2 }}
              alignItems="center"
              sx={{
                mb: { xs: 1.5, md: 3 },
                p: { xs: 1.5, md: 2 },
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.15)",
                  transform: "translateX(5px)",
                },
              }}
            >
              <Box
                sx={{
                  p: { xs: 0.75, md: 1 },
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <item.icon
                  sx={{ color: "#81c784", fontSize: { xs: 20, md: 24 } }}
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    fontSize: { xs: "0.6rem", md: "0.7rem" },
                    display: "block",
                  }}
                >
                  {item.label}
                </Typography>
                {item.href ? (
                  <Link
                    href={item.href}
                    aria-label={item.ariaLabel}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    sx={{
                      display: "block",
                      color: "white",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                      fontSize: { xs: "0.8rem", sm: "0.875rem", md: "1rem" },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      "&:hover": {
                        color: "#81c784",
                      },
                    }}
                  >
                    {item.value}
                  </Link>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      fontSize: { xs: "0.8rem", sm: "0.875rem", md: "1rem" },
                    }}
                  >
                    {item.value}
                  </Typography>
                )}
              </Box>
            </Stack>
          </motion.div>
        ))}
      </Box>

      {/* Social proof / Trust indicator - hidden on small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Box
          sx={{
            mt: { xs: 2, md: 4 },
            pt: { xs: 2, md: 3 },
            borderTop: "1px solid rgba(255,255,255,0.2)",
            display: { xs: "none", md: "block" },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.7)",
              textAlign: "center",
              fontStyle: "italic",
              fontSize: { xs: "0.75rem", md: "0.875rem" },
            }}
          >
            "Every child can excel in math with the right guidance"
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
}
