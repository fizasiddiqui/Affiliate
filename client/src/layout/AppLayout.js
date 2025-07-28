import App from "../App";
import Footer from "./Footer";
import Header from "./Header";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function AppLayout({ children }) {
    return (
        <>
            <Header />
            {/* Affiliate network SVG background for all pages */}
            <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none', opacity: 0.18 }}>
                <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
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
            </Box>
            <Container maxWidth="lg" sx={{ minHeight: '70vh', py: 4, position: 'relative', zIndex: 1 }}>
                <Box>
                    {children}
                </Box>
            </Container>
            <Footer />
        </>
    );
}

export default AppLayout;