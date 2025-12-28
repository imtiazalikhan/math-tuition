'use client';

import { motion } from 'framer-motion';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from '@mui/material';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
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
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  hover: {
    y: -8,
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
    transition: { duration: 0.3 },
  },
};

const benefits = [
  {
    title: 'Boosts Confidence',
    desc: 'Helps children gain self-confidence in mathematics through structured learning and positive reinforcement.',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80',
    highlight: 'Build Strong Foundation',
  },
  {
    title: 'Improved Performance',
    desc: 'Regular practice and doubt clearing ensures better grades and deeper understanding of concepts.',
    img: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=400&q=80',
    highlight: 'Track Progress',
  },
  {
    title: 'Friendly Teaching',
    desc: 'Our teachers simplify complex concepts with interactive sessions that make learning enjoyable.',
    img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
    highlight: 'Interactive Sessions',
  },
  {
    title: 'Structured Practice',
    desc: 'We provide worksheets, quizzes, and consistent feedback to track progress and identify areas for improvement.',
    img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80',
    highlight: 'Personalized Learning',
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

export default function WhyUs() {
  return (
    <Box
      component="section"
      id="whyus"
      aria-labelledby="whyus-heading"
      sx={{ mb: { xs: 8, md: 12 }, scrollMarginTop: '100px' }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
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
        viewport={{ once: true, margin: '-50px' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            gap: 3,
            justifyContent: 'center',
            mt: 6,
          }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              style={{ flex: '1 1 0', minWidth: 220 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                  bgcolor: '#fff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 12px 40px rgba(46,125,50,0.15)',
                    borderColor: 'rgba(46,125,50,0.2)',
                  },
                }}
              >
                {/* Image at top */}
                <Box
                  sx={{
                    position: 'relative',
                    pt: '100%',
                    background:
                      'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={benefit.img}
                    alt={`${benefit.title} - Math Tuition for Kids | Math Kidz`}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '75%',
                      height: '75%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '4px solid white',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                    }}
                  />
                </Box>

                <CardContent
                  sx={{
                    flexGrow: 1,
                    textAlign: 'center',
                    p: 3,
                  }}
                >
                  <Chip
                    label={benefit.highlight}
                    size="small"
                    sx={{
                      mb: 1.5,
                      bgcolor: 'rgba(46,125,50,0.1)',
                      color: '#2e7d32',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                    }}
                  />
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: '#1a1a2e',
                      fontSize: '1.1rem',
                    }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#6b6b8d',
                      lineHeight: 1.6,
                      fontSize: '0.875rem',
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
  );
}
