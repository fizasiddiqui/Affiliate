import { useState } from "react";
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { serverEndpoint } from "../config/config";
import { useDispatch } from "react-redux";
import { SET_USER } from "../redux/user/actions";

function Register() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let newErrors = {};
        let isValid = true;
        if (formData.username.length === 0) {
            newErrors.username = "Username is mandatory";
            isValid = false;
        }

        if (formData.password.length === 0) {
            newErrors.password = "Password is mandatory";
            isValid = false;
        }

        if (formData.name.length === 0) {
            newErrors.name = "Name is mandatory";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validate()) {
            const body = {
                username: formData.username,
                password: formData.password,
                name: formData.name
            };
            const configuration = {
                withCredentials: true
            };
            try {
                const response = await axios.post(
                    `${serverEndpoint}/auth/register`,
                    body, configuration);
                dispatch({
                    type: SET_USER,
                    payload: response.data.user
                });

            } catch (error) {
                if (error?.response?.status === 401) {
                    setErrors({ message: 'User exist with the given email' });
                } else {
                    setErrors({ message: 'Something went wrong, please try again' });
                }
            }
        }
    };

    const handleGoogleSignin = async (authResponse) => {
        try {
            const response = await axios.post(`${serverEndpoint}/auth/google-auth`, {
                idToken: authResponse.credential
            }, {
                withCredentials: true
            });

            dispatch({
                type: SET_USER,
                payload: response.data.userDetails
            });
        } catch (error) {
            console.log(error);
            setErrors({ message: 'Something went wrong while google signin' });
        }
    };

    const handleGoogleSigninFailure = async (error) => {
        console.log(error);
        setErrors({ message: 'Something went wrong while google signin' });
    };

    return (
        <section className="card register-card">
            <h2 className="text-center mb-4">Sign up with a new account</h2>

            {errors.message && (
                <div className="form-error" role="alert">
                    {errors.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'input-error' : ''}
                        autoComplete="name"
                    />
                    {errors.name && (
                        <div className="input-error-text">{errors.name}</div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={errors.username ? 'input-error' : ''}
                        autoComplete="username"
                    />
                    {errors.username && (
                        <div className="input-error-text">{errors.username}</div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'input-error' : ''}
                        autoComplete="new-password"
                    />
                    {errors.password && (
                        <div className="input-error-text">{errors.password}</div>
                    )}
                </div>

                <button type="submit" className="btn-primary full-width">Submit</button>
            </form>

            <div className="divider-row">
                <span>OR</span>
            </div>
            <div className="google-login-row">
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                    <GoogleLogin
                        onSuccess={handleGoogleSignin}
                        onError={handleGoogleSigninFailure}
                    />
                </GoogleOAuthProvider>
            </div>
        </section>
    );
}

export default Register;