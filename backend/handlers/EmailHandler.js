import { sendEMail } from "../utils/mailer.js";

export const sendConfirmationEmail = async (email, token) => {
  const url = `${process.env.HOST}/users/confirm-email/${token}`;
  const subject = "Confirm your email - " + process.env.APP_NAME;
  const html = `<h1>Confirm your email</h1>
               <p>Click on the following link to confirm your email:</p>
               <a href="${url}" target="_blank">${url}</a>
               <p>The link will expire in 24 hours.</p>
               <p>If you didn't create this account, please ignore this email. Your email can't be used until it's confirmed.</p>`;
  const isSent = await sendEMail({
    to: email,
    from: "support@" + process.env.SENDGRID_DOMAIN,
    subject,
    html,
  });
  return isSent;
};

// export const sendResetPasswordEmail = async (email, token) => {
//   const url = `${process.env.HOST}/users/reset-password/${token}`;
//   const subject = "Password Reset - " + process.env.APP_NAME;
//   const html = `<h1>Reset Your Password</h1>
//                  <p>Click on the following link to reset your password:</p>
//                  <a href="${url}">${url}</a>
//                  <p>The link will expire in 10 minutes.</p>
//                  <p>If you didn't request a password reset, please ignore this email.</p>`;
//   const isSent = await sendEmail(email, subject, html);
//   return isSent;
// };

// export const sendContactEmailToAdmin = async (data) => {
//   const to = process.env.SUPPORT_TEAM_EMAILS.split(" ");
//   const subject = "Query from " + process.env.APP_NAME;
//   const html = `<h1>Query from Contact Form</h1>
//                  <p><b>Email<b/>: ${data.email}</p>
//                  <p><b>Name<b/>: ${data.name}</p>
//                  <p><b>Message<b/>: ${data.message}</p>`;
//   const isSent = await sendEmail(to, subject, html, data.email);
//   return isSent;
// };
