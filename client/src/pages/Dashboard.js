import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LinkIcon from '@mui/icons-material/Link';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LinksDashboard from './links/LinksDashboard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { serverEndpoint } from '../config/config';

function Dashboard() {
    const [summary, setSummary] = useState({
        totalLinks: 0,
        totalClicks: 0,
        recentLinks: 0
    });

    // Fetch summary stats for dashboard cards
    const fetchSummary = async () => {
        try {
            const res = await axios.get(`${serverEndpoint}/links/summary`, { withCredentials: true });
            setSummary(res.data.data);
        } catch {
            // fallback: do nothing
        }
    };

    useEffect(() => {
        fetchSummary();
    }, []);

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh', pb: { xs: 2, md: 4 } }}>
            {/* Decorative background blob */}
            <Box className="background-blob top-right" sx={{ background: 'radial-gradient(circle at 60% 40%, #1976d2 0%, transparent 70%)' }} />
            <Box className="background-blob bottom-left" sx={{ background: 'radial-gradient(circle at 40% 60%, #43a047 0%, transparent 70%)' }} />
            <Container maxWidth="lg" sx={{ pt: { xs: 2, md: 6 }, pb: 2, zIndex: 1, position: 'relative' }}>
                {/* Hero Section */}
                <Paper elevation={6} sx={{
                    p: { xs: 1.2, sm: 2, md: 4 },
                    mb: { xs: 2, md: 4 },
                    borderRadius: 4,
                    background: 'linear-gradient(120deg, rgba(24,32,48,0.92) 60%, rgba(34,58,94,0.92) 100%)',
                    color: '#fff',
                    boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
                    border: '2.5px solid #4fc3f7',
                    position: 'relative',
                    overflow: 'visible',
                }}>
                    <Typography variant="h4" fontWeight={800} gutterBottom sx={{ color: '#fff', textShadow: '0 2px 12px #0008, 0 1px 0 #223a5e', letterSpacing: 1, mb: 0.5, fontSize: { xs: '1.3rem', sm: '1.7rem', md: '2.2rem' } }}>
                        Welcome to Your Dashboard
                    </Typography>
                    {/* Animated underline */}
                    <Box sx={{ height: 4, width: { xs: 40, sm: 60, md: 70 }, background: 'linear-gradient(90deg, #4fc3f7 0%, #ffb74d 100%)', borderRadius: 2, mb: 2, animation: 'pulseUnderline 2.5s infinite alternate' }} />
                    <Typography variant="subtitle1" sx={{ color: '#f3f6fd', textShadow: '0 1px 4px #0004', opacity: 1, mb: 3, fontWeight: 500, fontSize: { xs: '0.98rem', sm: '1.13rem' } }}>
                        Manage your affiliate links, track performance, and grow your campaigns—all in one place.
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Paper elevation={0} sx={{
                                p: { xs: 1.2, sm: 2.2 },
                                display: 'flex',
                                alignItems: 'center',
                                gap: { xs: 1, sm: 2 },
                                borderRadius: 3,
                                background: 'rgba(24,32,48,0.85)',
                                color: '#fff',
                                boxShadow: '0 2px 12px #4fc3f733',
                                border: '2px solid #4fc3f7',
                                position: 'relative',
                            }}>
                                <Box sx={{
                                    width: { xs: 32, sm: 44 },
                                    height: { xs: 32, sm: 44 },
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #4fc3f7 0%, #223a5e 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 2px 12px #4fc3f755',
                                }}>
                                    <LinkIcon sx={{ fontSize: { xs: 20, sm: 28 }, color: '#fff' }} />
                                </Box>
                                <Box>
                                    <Typography variant="h5" fontWeight={800} sx={{ color: '#fff', textShadow: '0 2px 8px #0008', fontSize: { xs: '1.1rem', sm: '1.3rem' } }}>{summary.totalLinks}</Typography>
                                    <Typography variant="body2" sx={{ color: '#4fc3f7', fontWeight: 600, letterSpacing: 0.5, fontSize: { xs: '0.95rem', sm: '1.01rem' } }}>Total Links</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Paper elevation={0} sx={{
                                p: { xs: 1.2, sm: 2.2 },
                                display: 'flex',
                                alignItems: 'center',
                                gap: { xs: 1, sm: 2 },
                                borderRadius: 3,
                                background: 'rgba(24,32,48,0.85)',
                                color: '#fff',
                                boxShadow: '0 2px 12px #81c78433',
                                border: '2px solid #81c784',
                                position: 'relative',
                            }}>
                                <Box sx={{
                                    width: { xs: 32, sm: 44 },
                                    height: { xs: 32, sm: 44 },
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #81c784 0%, #223a5e 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 2px 12px #81c78455',
                                }}>
                                    <AssessmentIcon sx={{ fontSize: { xs: 20, sm: 28 }, color: '#fff' }} />
                                </Box>
                                <Box>
                                    <Typography variant="h5" fontWeight={800} sx={{ color: '#fff', textShadow: '0 2px 8px #0008', fontSize: { xs: '1.1rem', sm: '1.3rem' } }}>{summary.totalClicks}</Typography>
                                    <Typography variant="body2" sx={{ color: '#81c784', fontWeight: 600, letterSpacing: 0.5, fontSize: { xs: '0.95rem', sm: '1.01rem' } }}>Total Clicks</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Paper elevation={0} sx={{
                                p: { xs: 1.2, sm: 2.2 },
                                display: 'flex',
                                alignItems: 'center',
                                gap: { xs: 1, sm: 2 },
                                borderRadius: 3,
                                background: 'rgba(24,32,48,0.85)',
                                color: '#fff',
                                boxShadow: '0 2px 12px #ffb74d33',
                                border: '2px solid #ffb74d',
                                position: 'relative',
                            }}>
                                <Box sx={{
                                    width: { xs: 32, sm: 44 },
                                    height: { xs: 32, sm: 44 },
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #ffb74d 0%, #223a5e 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 2px 12px #ffb74d55',
                                }}>
                                    <AddCircleIcon sx={{ fontSize: { xs: 20, sm: 28 }, color: '#fff' }} />
                                </Box>
                                <Box>
                                    <Typography variant="h5" fontWeight={800} sx={{ color: '#fff', textShadow: '0 2px 8px #0008', fontSize: { xs: '1.1rem', sm: '1.3rem' } }}>{summary.recentLinks}</Typography>
                                    <Typography variant="body2" sx={{ color: '#ffb74d', fontWeight: 600, letterSpacing: 0.5, fontSize: { xs: '0.95rem', sm: '1.01rem' } }}>Links Added (30d)</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
                {/* Add animated underline keyframes */}
                <style>{`
                    @keyframes pulseUnderline {
                        0% { opacity: 0.7; transform: scaleX(1); }
                        100% { opacity: 1; transform: scaleX(1.15); }
                    }
                `}</style>
                {/* Main Content */}
                <Box sx={{ mt: { xs: 1, md: 2 } }}>
                    <LinksDashboard onLinksChanged={fetchSummary} />
                </Box>
            </Container>
        </Box>
    );
}

export default Dashboard;