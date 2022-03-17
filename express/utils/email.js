const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter mailtrap.io/
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // BETTER USE SENDGRID
  });
  console.log('transporter', transporter);
  console.log('options', options);

  // 2) Define the email options
  const mailOptions = {
    from: "'Trip Planner' <planner@gmail.com>",
    utf8: '✓', // Sender address
    to: options.email, // List of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
    html: `<p>${options.message}</p>`, // html body
  };
  // 3) send the email
  const info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
};
module.exports = sendEmail;
