import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LetsConnect from "./LetsConnect";
import ContactForm from "./ContactForm";
import Aboutus from "./Aboutus";
import WhatsAppChat from "./WhatsAppChat";

// Animation variants for Framer Motion
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    transition: { duration: 0.3 },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = useCallback((open) => {
    setDrawerOpen(open);
  }, []);

  const drawerItems = [
    { label: "Why Us", href: "#whyus" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = useCallback(
    (href) => {
      toggleDrawer(false);
      // Small delay for drawer close animation
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    },
    [toggleDrawer]
  );

  const benefits = [
    {
      title: "Boosts Confidence",
      desc: "Helps children gain self-confidence in mathematics through structured learning and positive reinforcement.",
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80",
      highlight: "Build Strong Foundation",
    },
    {
      title: "Improved Performance",
      desc: "Regular practice and doubt clearing ensures better grades and deeper understanding of concepts.",
      img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=400&q=80",
      highlight: "Track Progress",
    },
    {
      title: "Friendly Teaching",
      desc: "Our teachers simplify complex concepts with interactive sessions that make learning enjoyable.",
      img: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80",
      highlight: "Interactive Sessions",
    },
    {
      title: "Structured Practice",
      desc: "We provide worksheets, quizzes, and consistent feedback to track progress and identify areas for improvement.",
      img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80",
      highlight: "Personalized Learning",
    },
  ];

  const sectionHeadingSx = {
    color: "#1a1a2e",
    fontWeight: 700,
    mb: 2,
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: -8,
      left: "50%",
      transform: "translateX(-50%)",
      width: 60,
      height: 4,
      borderRadius: 2,
      background: "linear-gradient(90deg, #2e7d32, #4caf50)",
    },
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fafafa" }}>
      {/* Header */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          top: 0,
          zIndex: 1100,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 0.5 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ flexGrow: 1 }}
            >
              <Box
                component="a"
                href="#"
                sx={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="/logo.svg"
                  alt="Math Kidz - Online Math Tuition and Tutorials for Kids"
                  style={{
                    height: "50px",
                    width: "auto",
                  }}
                />
              </Box>
            </motion.div>

            {isMobile ? (
              <IconButton
                edge="end"
                onClick={() => toggleDrawer(true)}
                aria-label="Open navigation menu"
                sx={{
                  color: "#1a1a2e",
                  "&:hover": { bgcolor: "rgba(46,125,50,0.1)" },
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {drawerItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      onClick={() => handleNavClick(item.href)}
                      sx={{
                        color: "#4a4a68",
                        fontWeight: 600,
                        px: 2,
                        borderRadius: 2,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: "rgba(46,125,50,0.08)",
                          color: "#2e7d32",
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleNavClick("#contact")}
                    sx={{
                      ml: 1,
                      bgcolor: "#2e7d32",
                      fontWeight: 600,
                      borderRadius: 2,
                      px: 3,
                      boxShadow: "0 4px 14px rgba(46,125,50,0.35)",
                      "&:hover": {
                        bgcolor: "#1b5e20",
                        boxShadow: "0 6px 20px rgba(46,125,50,0.45)",
                      },
                    }}
                  >
                    Enroll Now
                  </Button>
                </motion.div>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
            bgcolor: "#fafafa",
          },
        }}
      >
        <Box sx={{ width: 280 }} role="navigation" aria-label="Main navigation">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              borderBottom: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <img
              src="/logo.svg"
              alt="Math Kidz - Online Math Tuition and Tutorials for Kids"
              style={{
                height: "40px",
                width: "auto",
              }}
            />
            <IconButton
              onClick={() => toggleDrawer(false)}
              aria-label="Close navigation menu"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <List sx={{ px: 1, py: 2 }}>
            <AnimatePresence>
              {drawerItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemButton
                      onClick={() => handleNavClick(item.href)}
                      sx={{
                        borderRadius: 2,
                        "&:hover": { bgcolor: "rgba(46,125,50,0.08)" },
                      }}
                    >
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontWeight: 600,
                          color: "#4a4a68",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </motion.div>
              ))}
            </AnimatePresence>
            <Divider sx={{ my: 2 }} />
            <ListItem disablePadding>
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleNavClick("#contact")}
                sx={{
                  bgcolor: "#2e7d32",
                  fontWeight: 600,
                  borderRadius: 2,
                  py: 1.5,
                  "&:hover": { bgcolor: "#1b5e20" },
                }}
              >
                Enroll Now
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Hero Banner */}
      <Box
        component="section"
        aria-label="Hero section"
        sx={{
          position: "relative",
          overflow: "hidden",
          minHeight: { xs: "70vh", md: "80vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80') center/cover",
            filter: "brightness(0.35)",
          },
        }}
      >
        <Container
          maxWidth="md"
          sx={{ position: "relative", zIndex: 1, textAlign: "center", py: 8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Chip
              label="Trusted by 500+ Parents"
              icon={<CheckCircleIcon />}
              sx={{
                mb: 3,
                bgcolor: "rgba(255,255,255,0.15)",
                color: "white",
                fontWeight: 600,
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                "& .MuiChip-icon": { color: "#4caf50" },
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: "white",
                fontWeight: 800,
                fontSize: { xs: "2.2rem", sm: "3rem", md: "3.5rem" },
                lineHeight: 1.2,
                mb: 3,
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
              }}
            >
              Building Confidence in{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg, #4caf50, #81c784)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Mathematics
              </Box>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255,255,255,0.9)",
                mb: 4,
                maxWidth: 600,
                mx: "auto",
                fontWeight: 400,
                fontSize: { xs: "1rem", sm: "1.15rem" },
              }}
            >
              Helping kids overcome fear of math with fun, interactive learning
              experiences tailored to their unique needs.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => handleNavClick("#contact")}
                sx={{
                  bgcolor: "#2e7d32",
                  color: "white",
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: "1rem",
                  boxShadow: "0 8px 30px rgba(46,125,50,0.4)",
                  "&:hover": {
                    bgcolor: "#1b5e20",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 40px rgba(46,125,50,0.5)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Start Learning Today
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => handleNavClick("#whyus")}
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.5)",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: "1rem",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderColor: "white",
                  },
                }}
              >
                Learn More
              </Button>
            </Box>
          </motion.div>
        </Container>

        {/* Decorative gradient overlay at bottom */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 150,
            background: "linear-gradient(to top, #fafafa, transparent)",
            pointerEvents: "none",
          }}
        />
      </Box>

      {/* Main content sections */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Why Us */}
        <Box
          component="section"
          id="whyus"
          aria-labelledby="whyus-heading"
          sx={{ mb: { xs: 8, md: 12 }, scrollMarginTop: "100px" }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <Typography
              id="whyus-heading"
              variant="h3"
              component="h2"
              gutterBottom
              align="center"
              sx={{
                ...sectionHeadingSx,
                mb: 6,
              }}
            >
              Why Choose Us?
            </Typography>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: { xs: "wrap", md: "nowrap" },
                gap: 3,
                justifyContent: "center",
                mt: 6,
              }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  style={{ flex: "1 1 0", minWidth: 220 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 4,
                      border: "1px solid rgba(0,0,0,0.06)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                      overflow: "hidden",
                      bgcolor: "#fff",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 12px 40px rgba(46,125,50,0.15)",
                        borderColor: "rgba(46,125,50,0.2)",
                      },
                    }}
                  >
                    {/* Image at top */}
                    <Box
                      sx={{
                        position: "relative",
                        pt: "100%",
                        background:
                          "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={benefit.img}
                        alt={`${benefit.title} - Math Tuition for Kids | Math Kidz`}
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "75%",
                          height: "75%",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "4px solid white",
                          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                        }}
                      />
                    </Box>

                    <CardContent
                      sx={{
                        flexGrow: 1,
                        textAlign: "center",
                        p: 3,
                      }}
                    >
                      <Chip
                        label={benefit.highlight}
                        size="small"
                        sx={{
                          mb: 1.5,
                          bgcolor: "rgba(46,125,50,0.1)",
                          color: "#2e7d32",
                          fontWeight: 600,
                          fontSize: "0.7rem",
                        }}
                      />
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        sx={{
                          fontWeight: 700,
                          color: "#1a1a2e",
                          fontSize: "1.1rem",
                        }}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6b6b8d",
                          lineHeight: 1.6,
                          fontSize: "0.875rem",
                        }}
                      >
                        {benefit.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Box>

        {/* About Us */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <Aboutus sectionHeadingSx={sectionHeadingSx} />
        </motion.div>

        {/* Contact Section */}
        <Box
          component="section"
          id="contact"
          aria-labelledby="contact-heading"
          sx={{ scrollMarginTop: "100px", pt: { xs: 4, md: 8 } }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                bgcolor: "#fff",
                borderRadius: { xs: 3, md: 4 },
                boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.06)",
                minHeight: { sm: 500, md: 600 },
              }}
            >
              {/* Left Column - Contact Info */}
              <Box
                sx={{
                  flex: { xs: "none", sm: "0 0 38%", md: "0 0 40%" },
                  background:
                    "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
                  p: { xs: 3, sm: 3, md: 5 },
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <LetsConnect />
              </Box>

              {/* Right Column - Contact Form */}
              <Box
                sx={{
                  flex: { xs: "none", sm: "1 1 62%", md: "1 1 60%" },
                  p: { xs: 3, sm: 3, md: 5 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <ContactForm />
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          textAlign: "center",
          py: 4,
          mt: 8,
          background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)",
          color: "rgba(255,255,255,0.8)",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 2 }}>
            <img
              src="/logo.svg"
              alt="Math Tuitions"
              style={{
                height: "45px",
                width: "auto",
                filter: "brightness(1.1)",
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
            &copy; {new Date().getFullYear()} Math Tuitions for Kids. All rights
            reserved.
          </Typography>
        </Container>
      </Box>

      {/* WhatsApp Chat Button */}
      <WhatsAppChat />
    </Box>
  );
}

export default App;
