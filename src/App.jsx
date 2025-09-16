import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import PhoneIcon from "@mui/icons-material/Phone";

function App() {
  const [form, setForm] = useState({ name: "", grade: "", phone: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (result.status === "success") {
        setStatus("✅ Submitted successfully!");
        setForm({ name: "", grade: "", phone: "" });
      } else {
        setStatus("❌ Something went wrong.");
      }
    } catch (err) {
      setStatus("❌ Server error.");
      console.error(err);
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

  return (
    <>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Math Tuitions
          </Typography>
          <Button color="inherit" href="#about">
            About
          </Button>
          <Button color="inherit" href="#benefits">
            Why Us
          </Button>
          <Button color="inherit" href="#contact">
            Contact
          </Button>
        </Toolbar>
      </AppBar>

      {/* Banner */}
      <Box
        sx={{
          background:
            "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80') center/cover",
          color: "white",
          textAlign: "center",
          py: 10,
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

      <Container maxWidth={false} sx={{ mt: 6 }}>
        {/* Why Us */}
        <Box id="benefits" sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom align="center">
            Why Choose Us?
          </Typography>
          <Grid container spacing={3}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ display: "flex", height: 180 }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 150 }}
                    image={benefit.img}
                    alt={benefit.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{benefit.title}</Typography>
                    <Typography variant="body2">{benefit.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* About Us */}
        <Box id="about" sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom align="center">
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
                sx={{ width: "100%", borderRadius: 2 }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Contact Form */}
        <Box id="contact" sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom align="center">
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
              >
                Submit
              </Button>
              {status && (
                <Typography align="center" sx={{ mt: 2, color: "green" }}>
                  {status}
                </Typography>
              )}
            </Box>
          </Card>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        sx={{ textAlign: "center", py: 3, background: "#333", color: "white" }}
      >
        <Typography>
          © 2025 Math Tuitions for Kids. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}

export default App;
