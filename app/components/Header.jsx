'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AppBar,
  Toolbar,
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
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

const navItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = useCallback((open) => {
    setDrawerOpen(open);
  }, []);

  const drawerItems = [
    { label: 'Why Us', href: '#whyus' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = useCallback(
    (href) => {
      toggleDrawer(false);
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
    [toggleDrawer]
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
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
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Image
                  src="/logo.svg"
                  alt="Math Kidz - Online Math Tuition and Tutorials for Kids"
                  width={120}
                  height={50}
                  style={{ height: '50px', width: 'auto' }}
                  priority
                />
              </Box>
            </motion.div>

            {isMobile ? (
              <IconButton
                edge="end"
                onClick={() => toggleDrawer(true)}
                aria-label="Open navigation menu"
                sx={{
                  color: '#1a1a2e',
                  '&:hover': { bgcolor: 'rgba(46,125,50,0.1)' },
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
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
                        color: '#4a4a68',
                        fontWeight: 600,
                        px: 2,
                        borderRadius: 2,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: 'rgba(46,125,50,0.08)',
                          color: '#2e7d32',
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
                    onClick={() => handleNavClick('#contact')}
                    sx={{
                      ml: 1,
                      bgcolor: '#2e7d32',
                      fontWeight: 600,
                      borderRadius: 2,
                      px: 3,
                      boxShadow: '0 4px 14px rgba(46,125,50,0.35)',
                      '&:hover': {
                        bgcolor: '#1b5e20',
                        boxShadow: '0 6px 20px rgba(46,125,50,0.45)',
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
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            bgcolor: '#fafafa',
          },
        }}
      >
        <Box sx={{ width: 280 }} role="navigation" aria-label="Main navigation">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              borderBottom: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <Image
              src="/logo.svg"
              alt="Math Kidz - Online Math Tuition and Tutorials for Kids"
              width={100}
              height={40}
              style={{ height: '40px', width: 'auto' }}
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
                        '&:hover': { bgcolor: 'rgba(46,125,50,0.08)' },
                      }}
                    >
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontWeight: 600,
                          color: '#4a4a68',
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
                onClick={() => handleNavClick('#contact')}
                sx={{
                  bgcolor: '#2e7d32',
                  fontWeight: 600,
                  borderRadius: 2,
                  py: 1.5,
                  '&:hover': { bgcolor: '#1b5e20' },
                }}
              >
                Enroll Now
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
