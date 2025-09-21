import { useState } from "react";
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
  Divider,
  useTheme,
  useMediaQuery,
  Container,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import PhoneIcon from "@mui/icons-material/Phone";

function App() {
  const [form, setForm] = useState({ name: "", grade: "", phone: "" });
  const [status, setStatus] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // 🧠 Simple validation function
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.grade.trim()) newErrors.grade = "Grade is required";
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be a 10-digit number";
    }
    return newErrors;
  };

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const drawerItems = ["Why Us", "About", "Contact"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(
        "https://math-tuition-backend.vercel.app/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const result = await res.json();

      if (result.status === "success") {
        setStatus("✅ Submitted successfully!");
        setForm({ name: "", grade: "", phone: "" });
        setErrors({});
      } else {
        setStatus("❌ Something went wrong.");
      }
    } catch (err) {
      setStatus("❌ Server error. Try again later.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };
  const benefits = [
    {
      title: "Boosts Confidence",
      desc: "Helps children gain self-confidence in mathematics through structured learning.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Improved Performance",
      desc: "Regular practice and doubt clearing ensures better grades and understanding.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Friendly Teaching",
      desc: "Our teachers simplify concepts with interactive sessions.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Structured Practice",
      desc: "We provide worksheets, quizzes, and consistent feedback to track progress.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const sectionHeadingSx = {
    color: "#333",
    fontWeight: "bold",
    mb: 4,
  };

  return (
    <>
      {/* Header */}
      <AppBar
        position="sticky"
        sx={{ background: "#f3f3f3", top: 0, zIndex: 1100 }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, color: "#333", fontWeight: "bold" }}
          >
            Math Tuitions
          </Typography>
          {isMobile ? (
            <IconButton
              edge="start"
              onClick={() => toggleDrawer(true)}
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              {drawerItems.map((item) => (
                <Button
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                >
                  {item}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, color: "#333", fontWeight: "bold" }}
            >
              Math Tuitions
            </Typography>
            <IconButton onClick={() => toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {drawerItems.map((text) => (
              <ListItem button key={text} onClick={() => toggleDrawer(false)}>
                <ListItemText color="#333" primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main content sections */}
      <Box sx={{ scrollBehavior: "smooth", pt: 0 }}>
        {/* Banner */}
        <Box
          sx={{
            background:
              "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80') center/cover",
            color: "white",
            textAlign: "center",
            py: 10,
            mb: 6,
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            Building Confidence in Mathematics
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Helping kids overcome fear of math with fun learning!
          </Typography>
          <Button
            variant="contained"
            color="success"
            href="#contact"
            sx={{ mt: 4 }}
          >
            Enroll Now
          </Button>
        </Box>

        {/* Why Us */}
        <Box id="whyus" sx={{ mb: 6, scrollMarginTop: "70px" }}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={sectionHeadingSx}
          >
            Why Choose Us?
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 3, // spacing between cards
            }}
          >
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                sx={{
                  width: { xs: "100%", sm: "48%" }, // full width on mobile, half on sm+
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={benefit.img}
                  alt={benefit.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2">{benefit.desc}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* About Us */}
        <Box id="about" sx={{ mb: 6, scrollMarginTop: "70px" }}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={sectionHeadingSx}
          >
            About Us
          </Typography>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography sx={{ maxWidth: 500 }}>
                Though we are new, we have strong experience in teaching
                mathematics to kids. Our approach focuses on building
                fundamentals, increasing confidence, and making math enjoyable.
                Every child deserves to succeed in math, and we are here to
                guide them!
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1581093458381-4f3f6b1b7f5d?auto=format&fit=crop&w=600&q=80"
                alt="About us"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  objectFit: "cover",
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Contact Form */}
        <Box id="contact" sx={{ mb: 6, scrollMarginTop: "70px" }}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={sectionHeadingSx}
          >
            Contact Us
          </Typography>
          <Card sx={{ maxWidth: 500, mx: "auto", p: 3, boxShadow: 6 }}>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Parent Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Child's Grade/Class"
                name="grade"
                value={form.grade}
                onChange={handleChange}
                required
                variant="outlined"
                error={!!errors.grade}
                helperText={errors.grade}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                variant="outlined"
                error={!!errors.phone}
                helperText={errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
              {status && (
                <Typography
                  align="center"
                  sx={{ mt: 2, color: status.includes("✅") ? "green" : "red" }}
                >
                  {status}
                </Typography>
              )}
            </Box>
          </Card>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            textAlign: "center",
            py: 3,
            background: "#f3f3f3",
            color: "#333",
          }}
        >
          <Typography>
            © 2025 Math Tuitions for Kids. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default App;
