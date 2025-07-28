const nodemailer = require('nodemailer');

const sendMail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        });

        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
};

module.exports = sendMail;
