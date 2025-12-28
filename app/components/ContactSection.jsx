'use client';

import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import ContactForm from './ContactForm';
import LetsConnect from './LetsConnect';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function ContactSection() {
  return (
    <Box
      component="section"
      id="contact"
      aria-labelledby="contact-heading"
      sx={{ scrollMarginTop: '100px', pt: { xs: 4, md: 8 } }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            bgcolor: '#fff',
            borderRadius: { xs: 3, md: 4 },
            boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.06)',
            minHeight: { sm: 500, md: 600 },
          }}
        >
          {/* Left Column - Contact Info */}
          <Box
            sx={{
              flex: { xs: 'none', sm: '0 0 38%', md: '0 0 40%' },
              background:
                'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
              p: { xs: 3, sm: 3, md: 5 },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <LetsConnect />
          </Box>

          {/* Right Column - Contact Form */}
          <Box
            sx={{
              flex: { xs: 'none', sm: '1 1 62%', md: '1 1 60%' },
              p: { xs: 3, sm: 3, md: 5 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <ContactForm />
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}
