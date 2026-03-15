import sendEmail from './mailer.js';

async function test() {
    console.log("Starting email test...");
    try {
        await sendEmail(
            process.env.EMAIL_USER, // Send it to yourself as a test
            "Test Email from Node.js (OAuth2)",
            "Hello! If you are reading this, your Nodemailer OAuth2 setup is working perfectly. 🎉",
            "<h1>Hello!</h1><p>If you are reading this, your Nodemailer OAuth2 setup is working perfectly. 🎉</p>"
        );
        console.log("Test completed successfully!");
    } catch (error) {
        console.error("Test failed. Please check the logs above.");
    }
}

test();
