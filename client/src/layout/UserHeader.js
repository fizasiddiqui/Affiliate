import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Can from "../rbac/Can";
import { useState } from "react";
import axios from "axios";
import ResetPassword from "../pages/ResetPassword";
import { serverEndpoint } from "../config/config";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';

function UserHeader() {
    const userDetails = useSelector((state) => state.userDetails);
    const [showReset, setShowReset] = useState(false);
    const [resetError, setResetError] = useState("");
    const [resetLoading, setResetLoading] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleResetPassword = async () => {
        setResetLoading(true);
        setResetError("");
        try {
            await axios.post(`${serverEndpoint}/auth/send-reset-password-token`, { email: userDetails.email });
            setResetEmail(userDetails.email);
            setShowReset(true);
        } catch (err) {
            setResetError("Failed to send reset code. Try again.");
        } finally {
            setResetLoading(false);
        }
    };

    return (
        <>
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
                            <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700, letterSpacing: 0.5, fontSize: '1.05rem' }}>
                                Dashboard
                            </Typography>
                        </Link>
                    </Box>
                    {/* User Menu */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ color: '#f3f6fd', fontWeight: 600, fontSize: '0.98rem', mr: 0.5 }}>
                            {userDetails ? userDetails.name : 'Account'}
                        </Typography>
                        <IconButton size="small" onClick={handleMenu} sx={{ color: '#4fc3f7', background: '#181e2c', p: 0.7, borderRadius: 2, boxShadow: 2 }}>
                            <AccountCircle fontSize="medium" />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            PaperProps={{ sx: { background: '#181e2c', color: '#fff', minWidth: 180 } }}
                        >
                            <MenuItem component={Link} to="/manage-payments" onClick={handleClose} sx={{ fontWeight: 500, fontSize: '0.98rem' }}>Manage Payments</MenuItem>
                            <Can permission='canViewUser'>
                                <MenuItem component={Link} to="/users" onClick={handleClose} sx={{ fontWeight: 500, fontSize: '0.98rem' }}>Manage Users</MenuItem>
                            </Can>
                            <MenuItem onClick={() => { handleClose(); handleResetPassword(); }} sx={{ fontWeight: 500, fontSize: '0.98rem' }} disabled={resetLoading}>
                                {resetLoading ? "Sending..." : "Reset Password"}
                            </MenuItem>
                            <MenuItem component={Link} to="/logout" onClick={handleClose} sx={{ fontWeight: 500, fontSize: '0.98rem' }}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            {showReset && (
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center" style={{ zIndex: 9999 }}>
                    <div className="bg-white p-4 rounded shadow" style={{ minWidth: 350, position: 'relative' }}>
                        <button className="btn-close position-absolute top-0 end-0 m-2" onClick={() => setShowReset(false)}></button>
                        <h5 className="mb-3">Reset Password</h5>
                        {resetError && <div className="alert alert-danger">{resetError}</div>}
                        <ResetPassword email={resetEmail} hideEmailField={true} onSuccess={() => setShowReset(false)} />
                    </div>
                </div>
            )}
        </>
    );
}

export default UserHeader;