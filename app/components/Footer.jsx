import { Typography, Box, Container } from '@mui/material';
import Image from 'next/image';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: 'center',
        py: 4,
        mt: 8,
        background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)',
        color: 'rgba(255,255,255,0.8)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 2 }}>
          <Image
            src="/logo.svg"
            alt="Math Kidz - Online Math Tuition for Kids"
            width={120}
            height={45}
            style={{
              height: '45px',
              width: 'auto',
              filter: 'brightness(1.1)',
            }}
          />
        </Box>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          &copy; {new Date().getFullYear()} Math Tuitions for Kids. All rights
          reserved.
        </Typography>
      </Container>
    </Box>
  );
}
