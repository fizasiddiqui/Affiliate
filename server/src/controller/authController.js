const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../model/Users');
const { OAuth2Client } = require('google-auth-library');
const { validationResult } = require('express-validator');
const sendMail = require('../util/sendMail'); // Make sure this file exists
const secret = process.env.JWT_SECRET;

// 🔐 Reset Password APIs
const authController = {
    sendResetPasswordToken: async (req, res) => {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ message: 'Email is required' });
            }

            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const resetCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
            const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

            user.resetCode = resetCode;
            user.resetCodeExpiry = expiry;
            await user.save();

            // Send code via email
            await sendMail(email, 'Reset Password Code', `Your reset code is: ${resetCode}`);

            res.json({ message: 'Reset code sent to email' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    resetPassword: async (req, res) => {
        try {
            const { email, code, newPassword } = req.body;

            if (!email || !code || !newPassword) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (user.resetCode !== code) {
                return res.status(400).json({ message: 'Invalid reset code' });
            }

            if (!user.resetCodeExpiry || user.resetCodeExpiry < new Date()) {
                return res.status(400).json({ message: 'Reset code expired' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            user.resetCode = undefined;
            user.resetCodeExpiry = undefined;

            await user.save();

            res.json({ message: 'Password reset successful' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // ✅ Existing methods below (unchanged)

    login: async (request, response) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(401).json({ errors: errors.array() });
            }

            const { username, password } = request.body;
            const data = await Users.findOne({ email: username });
            if (!data) {
                return response.status(401).json({ message: 'Invalid credentials ' });
            }

            const isMatch = await bcrypt.compare(password, data.password);
            if (!isMatch) {
                return response.status(401).json({ message: 'Invalid credentials ' });
            }

            const user = {
                id: data._id,
                name: data.name,
                email: data.email,
                role: data.role ? data.role : 'admin',
                adminId: data.adminId,
                credits: data.credits,
                subscription: data.subscription
            };

            const token = jwt.sign(user, secret, { expiresIn: '1h' });
            response.cookie('jwtToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
            });
            
            
            response.json({ user: user, message: 'User authenticated' });
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: 'Internal server error' });
        }
    },

    logout: (request, response) => {
        response.clearCookie('jwtToken');
        response.json({ message: 'Logout successfull' });
    },

    isUserLoggedIn: async (request, response) => {
        const token = request.cookies.jwtToken;

        if (!token) {
            return response.status(401).json({ message: 'Unauthorized access' });
        }

        jwt.verify(token, secret, async (error, user) => {
            if (error) {
                return response.status(401).json({ message: 'Unauthorized access' });
            } else {
                const latestUserDetails = await Users.findById({ _id: user.id });
                response.json({ message: 'User is logged in', user: latestUserDetails });
            }
        });
    },

    register: async (request, response) => {
        try {
            const { username, password, name } = request.body;

            const data = await Users.findOne({ email: username });
            if (data) {
                return response.status(401)
                    .json({ message: 'Account already exist with given email' });
            }

            const encryptedPassword = await bcrypt.hash(password, 10);

            const user = new Users({
                email: username,
                password: encryptedPassword,
                name: name,
                role: 'admin'
            });

            await user.save();
            const userDetails = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                credits: user.credits
            };
            const token = jwt.sign(userDetails, secret, { expiresIn: '1h' });

            response.cookie('jwtToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
            });
            
            
            response.json({ message: 'User registered', user: userDetails });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    },

    googleAuth: async (request, response) => {
        try {
            const { idToken } = request.body;
            if (!idToken) {
                return response.status(401).json({ message: 'Invalid request' });
            }

            const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const googleResponse = await googleClient.verifyIdToken({
                idToken: idToken,
                audience: process.env.GOOGLE_CLIENT_ID
            });

            const payload = googleResponse.getPayload();
            const { sub: googleId, name, email } = payload;

            let data = await Users.findOne({ email: email });
            if (!data) {
                data = new Users({
                    email: email,
                    name: name,
                    isGoogleUser: true,
                    googleId: googleId,
                    role: 'admin'
                });
                await data.save();
            }

            const user = {
                id: data._id ? data._id : googleId,
                username: email,
                name: name,
                role: data.role ? data.role : 'admin',
                credits: data.credits
            };

            const token = jwt.sign(user, secret, { expiresIn: '1h' });
            response.cookie('jwtToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
            });
            
            
            response.json({ user: user, message: 'User authenticated' });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = authController;
