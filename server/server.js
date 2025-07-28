require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/authRoutes');
const linksRoutes = require('./src/routes/linksRoutes');
const userRoutes = require('./src/routes/userRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const cors = require('cors');
const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://mern-pink-six.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS'));
    }
  },
  credentials: true,
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.log(error));

// Standard middleware for all routes
app.use(express.json());
app.use(cookieParser());

// Register routes
app.use('/auth', authRoutes);
app.use('/links', linksRoutes);
app.use('/users', userRoutes);
app.use('/payments', paymentRoutes);

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, (error) => {
  if (error) {
    console.log('Error starting the server: ', error);
  } else {
    console.log(`Server is running at http://localhost:${PORT}`);
  }
});
