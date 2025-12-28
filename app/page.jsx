import { Box, Container } from '@mui/material';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import Aboutus from './components/Aboutus';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Header />
      <Hero />

      {/* Main content sections */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <WhyUs />
        <Aboutus />
        <ContactSection />
      </Container>

      <Footer />
    </Box>
  );
}
