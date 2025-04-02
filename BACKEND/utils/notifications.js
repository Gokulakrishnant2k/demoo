// backend/utils/notification.js
const nodemailer = require('nodemailer');
const twilio = require('twilio');

// ======== Email Setup ========
const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or any email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log('📩 Email Sent Successfully!');
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
  }
};

// ======== SMS Setup ========
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient =
  accountSid && authToken ? twilio(accountSid, authToken) : null;

const sendSMS = async (to, message) => {
  if (!twilioClient) {
    console.warn('⚠️ Twilio credentials not configured. SMS not sent.');
    return;
  }

  try {
    const sms = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log(`📲 SMS Sent Successfully! SID: ${sms.sid}`);
  } catch (error) {
    console.error('❌ Error sending SMS:', error.message);
  }
};

// ======== Goal Completion Email Notification ========
const sendGoalCompletionEmail = async (user, goal) => {
  const subject = `🎉 Congratulations! Goal "${goal.name}" Completed!`;
  const text = `Hi ${user.name},\n\nYou have successfully achieved your goal: "${goal.name}". Great job! 🚀`;
  await sendEmail(user.email, subject, text);
};

module.exports = { sendEmail, sendSMS, sendGoalCompletionEmail };



