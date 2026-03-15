import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

// These need to be placed in your .env file
const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;
const EMAIL_USER = process.env.EMAIL_USER;

// Create OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    "https://developers.google.com/oauthplayground" // The Redirect URI Used
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendEmail = async (to, subject, html, text = "") => {
    try {
        // Generate an access token dynamically
        const accessToken = await oAuth2Client.getAccessToken();

        // Create a transporter using OAuth2 instead of basic auth
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: EMAIL_USER,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token, // Dynamically generated
            }
        });

        // Define the email options
        const mailOptions = {
            from: EMAIL_USER,
            to: to,
            subject: subject,
            text: text,
            html: html
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        
        console.log('Email sent successfully via OAuth2!');
        console.log('Message ID: %s', info.messageId);
        
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

export default sendEmail;
