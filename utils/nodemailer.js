require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = async (userEmail, resetLink) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: "GANTHRO password reset",
            text: `Reset your password here: ${resetLink}`
        });

        console.log("EMAIL sent successfully");
        console.log(info.response);

        return true;

    } catch (error) {
        console.log("ERROR sending email:", error);
        throw error;
    }
};

module.exports = sendEmail;
