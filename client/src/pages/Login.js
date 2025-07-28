import { useState } from "react";
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { serverEndpoint } from "../config/config";
import { useDispatch } from "react-redux";
import { SET_USER } from "../redux/user/actions";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let isValid = true;
        let newErrors = {};

        if (formData.username.length === 0) {
            isValid = false;
            newErrors.username = "Username is mandatory";
        }

        if (formData.password.length === 0) {
            isValid = false;
            newErrors.password = "Password is mandatory";
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            const body = {
                username: formData.username,
                password: formData.password
            };
            const config = {
                withCredentials: true
            };
            try {
                const response = await axios.post(`${serverEndpoint}/auth/login`, body, config);
                dispatch({
                    type: SET_USER,
                    payload: response.data.user
                });
            } catch (error) {
                setErrors({ message: "Something went wrong, please try again" });
            }
        }
    };

    const handleGoogleSuccess = async (authResponse) => {
        try {
            const response = await axios.post(`${serverEndpoint}/auth/google-auth`, {
                idToken: authResponse.credential
            }, {
                withCredentials: true
            });
            dispatch({
                type: SET_USER,
                payload: response.data.user
            });
        } catch (error) {
            setErrors({ message: 'Error processing google auth, please try again' });
        }
    };

    const handleGoogleError = async (error) => {
        setErrors({ message: 'Error in google authorization flow, please try again' });
    }

    return (
        <>
            {/* Enhanced decorative background blobs */}
            <div className="background-blob top-right vibrant-blob" />
            <div className="background-blob bottom-left vibrant-blob2" />

            {/* Login form, compact layout */}
            <section style={{ position: 'relative', zIndex: 1, marginTop: '3vh', maxWidth: 350, marginLeft: 'auto', marginRight: 'auto', padding: '1.2rem 0.2rem', textAlign: 'center' }}>
                {/* Logo/Brand area */}
                <div className="login-logo-area" style={{ marginBottom: '0.7em' }}>
                    <div className="login-logo-circle" style={{ width: 38, height: 38, fontSize: '1.3rem' }}>
                        <span className="login-logo-text">A</span>
                    </div>
                    <span className="login-brand-name" style={{ fontSize: '1.1rem' }}>Affiliate</span>
                </div>
                <h2 className="text-center login-title" style={{ fontSize: '1.2rem', marginBottom: '0.3em' }}>Welcome Back!</h2>
                <div className="login-subtitle text-center" style={{ fontSize: '0.98rem', marginBottom: '0.7em' }}>Sign in to access your dashboard and manage your links.</div>
                {errors.message && <div className="form-error" style={{ marginTop: '0.7em', fontSize: '0.97em' }}>{errors.message}</div>}
                <form onSubmit={handleSubmit} className="form" style={{ marginTop: '0.7em', gap: '0.7em' }}>
                    <div className="form-group">
                        <label htmlFor="username" style={{ fontSize: '0.98em' }}>Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={errors.username ? 'input-error' : ''}
                            autoComplete="username"
                            style={{ fontSize: '0.98em', padding: '0.4em 0.7em' }}
                        />
                        {errors.username && <div className="input-error-text" style={{ fontSize: '0.95em' }}>{errors.username}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" style={{ fontSize: '0.98em' }}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'input-error' : ''}
                            autoComplete="current-password"
                            style={{ fontSize: '0.98em', padding: '0.4em 0.7em' }}
                        />
                        {errors.password && <div className="input-error-text" style={{ fontSize: '0.95em' }}>{errors.password}</div>}
                    </div>
                    <Button type="submit" variant="contained" fullWidth className="login-btn" sx={{ mt: 1, fontWeight: 700, fontSize: '1.01rem', borderRadius: 2, boxShadow: 2, py: 1 }}>
                        Sign In
                    </Button>
                </form>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.2, mb: 0.5 }}>
                    <Button variant="text" size="small" sx={{ color: '#4fc3f7', textTransform: 'none', fontWeight: 600, px: 0, fontSize: '0.97em' }} href="/forget-password">
                        Forgot Password?
                    </Button>
                    <Typography variant="body2" sx={{ color: '#b0b8c9', fontSize: '0.97em' }}>
                        Don't have an account?{' '}
                        <Button variant="text" size="small" sx={{ color: '#ffb74d', textTransform: 'none', fontWeight: 600, px: 0, fontSize: '0.97em' }} href="/register">
                            Register
                        </Button>
                    </Typography>
                </Box>
                {/* Modern Divider */}
                <Box sx={{ display: 'flex', alignItems: 'center', my: 1.2 }}>
                    <Box sx={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.12)' }} />
                    <Typography variant="body2" sx={{ mx: 1.2, color: '#b0b8c9', fontWeight: 600, letterSpacing: 1, fontSize: '0.97em' }}>
                        OR
                    </Typography>
                    <Box sx={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.12)' }} />
                </Box>
                {/* Modern Google Sign In */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.5, mb: 0.2 }}>
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            width="100%"
                            theme="filled_black"
                            shape="pill"
                            text="signin_with"
                        />
                    </GoogleOAuthProvider>
                </Box>
            </section>
        </>
    );
}

export default Login;
