import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import LinkIcon from '@mui/icons-material/Link';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function Home() {
    const navigate = useNavigate();
    return (
        <Box sx={{ position: 'relative', minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', pb: { xs: 4, md: 6 } }}>
            {/* Affiliate Network SVG Background with Darker Colors */}
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 1440 800"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    pointerEvents: 'none',
                    opacity: 0.22,
                }}
            >
                {/* Lines - darker shades */}
                <line x1="200" y1="200" x2="400" y2="100" stroke="#0d2346" strokeWidth="3" />
                <line x1="400" y1="100" x2="700" y2="200" stroke="#1b4027" strokeWidth="2.5" />
                <line x1="700" y1="200" x2="1000" y2="120" stroke="#7a4a00" strokeWidth="2.5" />
                <line x1="200" y1="200" x2="500" y2="400" stroke="#1b4027" strokeWidth="2" />
                <line x1="500" y1="400" x2="900" y2="350" stroke="#0d2346" strokeWidth="2.5" />
                <line x1="900" y1="350" x2="1200" y2="600" stroke="#7a4a00" strokeWidth="2" />
                <line x1="700" y1="200" x2="900" y2="350" stroke="#1b4027" strokeWidth="2" />
                <line x1="400" y1="100" x2="500" y2="400" stroke="#7a4a00" strokeWidth="2" />
                {/* Nodes - darker shades */}
                <circle cx="200" cy="200" r="28" fill="#0d2346" />
                <circle cx="400" cy="100" r="18" fill="#1b4027" />
                <circle cx="700" cy="200" r="22" fill="#7a4a00" />
                <circle cx="1000" cy="120" r="16" fill="#0d2346" />
                <circle cx="500" cy="400" r="20" fill="#1b4027" />
                <circle cx="900" cy="350" r="24" fill="#7a4a00" />
                <circle cx="1200" cy="600" r="30" fill="#0d2346" />
            </svg>

            {/* Hero Section */}
            <Box sx={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 700, mt: { xs: 4, md: 6 }, mb: { xs: 2, md: 4 }, px: { xs: 1, sm: 2, md: 0 }, textAlign: 'center' }} className="fade-in-up">
                <Typography variant="h2" fontWeight={800} gutterBottom sx={{ letterSpacing: 1, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
                    Welcome to <span style={{ color: 'var(--primary-color)' }}>Affiliate</span>
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ mb: 3, fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' } }}>
                    Build, manage, and grow your affiliate business with ease and insight.
                </Typography>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button
                        variant="contained"
                        size="large"
                        className="btn-primary home-cta-btn"
                        sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.15rem' }, px: { xs: 2, sm: 4 }, py: { xs: 0.8, sm: 1.2 }, borderRadius: 3, boxShadow: 3 }}
                        onClick={() => navigate('/register')}
                    >
                        Get Started
                    </Button>
                </Box>
            </Box>

            {/* Feature Highlights */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: { xs: 2, sm: 4 }, mt: 4, zIndex: 1, width: '100%', maxWidth: 900 }}>
                <FeatureItem
                    icon={<LinkIcon sx={{ fontSize: { xs: 32, sm: 40, md: 48 }, color: '#4fc3f7', background: '#181e2c', borderRadius: '50%', p: 1.2, boxShadow: 2 }} />}
                    title="Easy Link Management"
                    desc="Organize, shorten, and track all your affiliate links in one place."
                />
                <FeatureItem
                    icon={<AssessmentIcon sx={{ fontSize: { xs: 32, sm: 40, md: 48 }, color: '#81c784', background: '#181e2c', borderRadius: '50%', p: 1.2, boxShadow: 2 }} />}
                    title="Real-Time Analytics"
                    desc="Gain insights with beautiful charts and detailed click analytics."
                />
                <FeatureItem
                    icon={<TrendingUpIcon sx={{ fontSize: { xs: 32, sm: 40, md: 48 }, color: '#ffb74d', background: '#181e2c', borderRadius: '50%', p: 1.2, boxShadow: 2 }} />}
                    title="Performance Tracking"
                    desc="Monitor your growth and optimize your affiliate strategy."
                />
            </Box>
        </Box>
    );
}

function FeatureItem({ icon, title, desc }) {
    return (
        <Box className="feature-card fade-in-up" sx={{ minWidth: { xs: 140, sm: 180, md: 220 }, maxWidth: { xs: 220, sm: 260, md: 280 }, flex: '1 1 140px', px: { xs: 1, sm: 2 }, py: { xs: 2, sm: 3 }, m: 1, borderRadius: 3, textAlign: 'center', zIndex: 1, background: 'none', boxShadow: 'none' }}>
            <Box sx={{ mb: 1.5 }}>{icon}</Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5, fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } }}>{title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>{desc}</Typography>
        </Box>
    );
}

export default Home;