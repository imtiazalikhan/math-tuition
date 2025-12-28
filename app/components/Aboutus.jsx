'use client';

import { motion } from 'framer-motion';
import { Typography, Box, Grid, Chip } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PsychologyIcon from '@mui/icons-material/Psychology';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const highlights = [
  {
    icon: SchoolIcon,
    title: 'Expert Teaching',
    description: 'Years of hands-on teaching experience',
  },
  {
    icon: PsychologyIcon,
    title: 'Smart Methods',
    description: 'Creative approaches to problem-solving',
  },
  {
    icon: FavoriteIcon,
    title: 'Personalized Care',
    description: 'Individual attention for every child',
  },
  {
    icon: TrendingUpIcon,
    title: 'Proven Results',
    description: 'Track record of student success',
  },
];

const sectionHeadingSx = {
  color: '#1a1a2e',
  fontWeight: 700,
  mb: 2,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 60,
    height: 4,
    borderRadius: 2,
    background: 'linear-gradient(90deg, #2e7d32, #4caf50)',
  },
};

export default function Aboutus() {
  return (
    <Box
      component="section"
      id="about"
      aria-labelledby="about-heading"
      sx={{ mb: { xs: 8, md: 12 }, scrollMarginTop: '100px' }}
    >
      <Typography
        id="about-heading"
        variant="h3"
        component="h2"
        gutterBottom
        align="center"
        sx={{
          ...sectionHeadingSx,
          mb: 6,
        }}
      >
        About Us
      </Typography>

      <Grid container spacing={4} alignItems="center">
        {/* Left side - Text content */}
        <Grid item xs={12} md={7}>
          <Box sx={{ pr: { md: 4 } }}>
            <Chip
              label="Our Mission"
              size="small"
              sx={{
                mb: 3,
                bgcolor: 'rgba(46,125,50,0.1)',
                color: '#2e7d32',
                fontWeight: 600,
              }}
            />

            <Typography
              variant="body1"
              sx={{
                color: '#4a4a68',
                lineHeight: 2,
                mb: 3,
                fontSize: '1.05rem',
              }}
            >
              We have <strong>strong experience</strong> in teaching mathematics
              to kids. Our approach focuses on{' '}
              <strong>building fundamentals</strong>,{' '}
              <strong>increasing confidence</strong>, and{' '}
              <strong>making math enjoyable</strong>. Every child deserves to
              succeed in math, and <strong>we are here to guide them!</strong>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#4a4a68',
                lineHeight: 2,
                mb: 3,
                fontSize: '1.05rem',
              }}
            >
              We believe that <strong>math is not just about numbers</strong> —
              it's about <strong>thinking, problem-solving</strong>, and gaining
              the confidence to take on challenges. Our team brings together
              years of <strong>hands-on teaching experience</strong>, a deep
              understanding of how children learn, and a passion for helping
              students thrive.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#4a4a68',
                lineHeight: 2,
                fontSize: '1.05rem',
              }}
            >
              Through <strong>engaging lessons</strong>,{' '}
              <strong>personalized attention</strong>, and{' '}
              <strong>creative methods</strong>, we make math less intimidating
              and more rewarding. Whether a child needs help catching up or is
              ready to get ahead, we <strong>tailor our teaching</strong> to
              meet their unique needs.
            </Typography>

            <Box
              sx={{
                mt: 4,
                p: 3,
                borderRadius: 3,
                bgcolor: 'rgba(46,125,50,0.05)',
                borderLeft: '4px solid #2e7d32',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: '#1a1a2e',
                  fontWeight: 500,
                  fontStyle: 'italic',
                }}
              >
                "We're not just teaching math — we're{' '}
                <strong>building a lifelong love for learning</strong>. Let's{' '}
                <strong>unlock your child's full potential</strong>, one math
                concept at a time."
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right side - Highlight cards */}
        <Grid item xs={12} md={5}>
          <Grid container spacing={2}>
            {highlights.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      bgcolor: '#fff',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                      border: '1px solid rgba(0,0,0,0.06)',
                      textAlign: 'center',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                        borderColor: 'rgba(46,125,50,0.2)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        bgcolor: 'rgba(46,125,50,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <item.icon sx={{ color: '#2e7d32', fontSize: 26 }} />
                    </Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: '#1a1a2e',
                        mb: 1,
                        fontSize: '0.95rem',
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#6b6b8d',
                        fontSize: '0.85rem',
                        lineHeight: 1.5,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
