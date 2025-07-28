import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {
    return (
        <Box component="footer" sx={{
            background: 'rgba(24,32,48,0.85)',
            backdropFilter: 'blur(12px)',
            borderTop: '1.5px solid #223a5e',
            color: '#f3f6fd',
            boxShadow: '0 -4px 24px rgba(16,22,36,0.18)',
            mt: 6,
            px: { xs: 1, sm: 3 },
            pt: 4,
            pb: 2,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', md: 'center' },
                gap: 3,
                mb: 2,
                maxWidth: 1200,
                mx: 'auto',
                width: '100%',
            }}>
                {/* Brand and About */}
                <Box sx={{ mb: { xs: 2, md: 0 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Box sx={{ width: 32, height: 32, borderRadius: '50%', background: '#181e2c', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1, boxShadow: 2 }}>
                            <Typography sx={{ color: '#4fc3f7', fontWeight: 700, fontSize: '1.3rem', letterSpacing: 1 }}>A</Typography>
                        </Box>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, letterSpacing: 1 }}>
                            Affiliate
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#b0b8c9', maxWidth: 340 }}>
                        Affiliate is your trusted platform for managing links, tracking analytics, and maximizing your online presence. Join us to simplify your journey!
                    </Typography>
                </Box>
                {/* Social Icons */}
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                    <IconButton component="a" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" sx={{ color: '#4fc3f7', background: '#181e2c', '&:hover': { color: '#fff', background: '#223a5e' } }}>
                        <LinkedInIcon fontSize="medium" />
                    </IconButton>
                    <IconButton component="a" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" sx={{ color: '#ffb74d', background: '#181e2c', '&:hover': { color: '#fff', background: '#223a5e' } }}>
                        <InstagramIcon fontSize="medium" />
                    </IconButton>
                    <IconButton component="a" href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" sx={{ color: '#81c784', background: '#181e2c', '&:hover': { color: '#fff', background: '#223a5e' } }}>
                        <TwitterIcon fontSize="medium" />
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', md: 'center' },
                gap: 2,
                borderTop: '1px solid rgba(255,255,255,0.10)',
                pt: 1.5,
                maxWidth: 1200,
                mx: 'auto',
                width: '100%',
            }}>
                <Typography variant="body2" sx={{ color: '#b0b8c9' }}>
                    <strong>Address:</strong> Phagwara (Satnampura), Punjab, India - 144402
                </Typography>
                <Typography variant="body2" sx={{ color: '#b0b8c9' }}>
                    &copy; {new Date().getFullYear()} All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
}

export default Footer;