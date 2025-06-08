import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   service: 'gmail', // Or 'hotmail', 'outlook', etc.
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : (() => { throw new Error('SMTP_PORT is not defined'); })(),
    secure: false, // Use `true` for port 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});


export default transporter;
