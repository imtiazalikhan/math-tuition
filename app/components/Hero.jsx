'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Typography, Button, Box, Chip, Container } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Hero() {
  const handleNavClick = useCallback((href) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <Box
      component="section"
      aria-label="Hero section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: '70vh', md: '80vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80') center/cover",
          filter: 'brightness(0.35)',
        },
      }}
    >
      <Container
        maxWidth="md"
        sx={{ position: 'relative', zIndex: 1, textAlign: 'center', py: 8 }}
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
              bgcolor: 'rgba(255,255,255,0.15)',
              color: 'white',
              fontWeight: 600,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              '& .MuiChip-icon': { color: '#4caf50' },
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
              color: 'white',
              fontWeight: 800,
              fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
              lineHeight: 1.2,
              mb: 3,
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            Building Confidence in{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(90deg, #4caf50, #81c784)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
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
              color: 'rgba(255,255,255,0.9)',
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              fontWeight: 400,
              fontSize: { xs: '1rem', sm: '1.15rem' },
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
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => handleNavClick('#contact')}
              sx={{
                bgcolor: '#2e7d32',
                color: 'white',
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontSize: '1rem',
                boxShadow: '0 8px 30px rgba(46,125,50,0.4)',
                '&:hover': {
                  bgcolor: '#1b5e20',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(46,125,50,0.5)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Start Learning Today
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => handleNavClick('#whyus')}
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.5)',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontSize: '1rem',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white',
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
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 150,
          background: 'linear-gradient(to top, #fafafa, transparent)',
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
}
