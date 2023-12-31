const sgMail = require("@sendgrid/mail");

// Envia los mail de verificación \\

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (to, subject, body) => {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM,
      subject,
      text: body,
      html: `
                <div>
                    <h1>${subject}</h1>
                    <p>${body}</p>
                </div>
            `,
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendMail;
