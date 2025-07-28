import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LinkIcon from '@mui/icons-material/Link';

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Login', to: '/login' },
    { label: 'Register', to: '/register' },
];

function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <AppBar position="sticky" elevation={6} sx={{
            background: 'rgba(24,32,48,0.85)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 24px rgba(16,22,36,0.18)',
            borderBottom: '1.5px solid #223a5e',
        }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: 48, px: { xs: 1, md: 2 }, py: 0 }}>
                {/* Brand */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <IconButton size="small" edge="start" sx={{ color: '#4fc3f7', background: '#181e2c', mr: 0.5, p: 0.7, borderRadius: 2, boxShadow: 2 }}>
                            <LinkIcon fontSize="medium" />
                        </IconButton>
                        <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700, letterSpacing: 0.5, fontSize: '1.05rem' }}>
                            Affiliate
                        </Typography>
                    </Link>
                </Box>
                {/* Desktop Nav */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                    {navLinks.map((item) => (
                        <Button
                            key={item.to}
                            component={Link}
                            to={item.to}
                            sx={{ color: '#f3f6fd', fontWeight: 600, fontSize: '0.98rem', px: 1.2, py: 0.5, borderRadius: 2, textTransform: 'none', minHeight: 0, '&:hover': { background: '#223a5e', color: '#ff9800' } }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Box>
                {/* Mobile Nav */}
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton edge="end" color="inherit" aria-label="menu" size="small" onClick={() => setDrawerOpen(true)}>
                        <MenuIcon fontSize="medium" />
                    </IconButton>
                </Box>
            </Toolbar>
            {/* Drawer for mobile */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
                PaperProps={{ sx: { background: '#181e2c', color: '#fff', minWidth: 160 } }}>
                <List>
                    {navLinks.map((item) => (
                        <ListItem key={item.to} disablePadding>
                            <ListItemButton component={Link} to={item.to} onClick={() => setDrawerOpen(false)} sx={{ py: 1 }}>
                                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600, fontSize: '0.98rem' }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </AppBar>
    );
}

export default Header;
