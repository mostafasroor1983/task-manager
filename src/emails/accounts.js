
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (email, name, text) => {
    const msg = {
        to: email,
        from: "sroorora994@gmail.com",
        subject: `Hello ${name}`,
        text,
      };
      
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        });
};

module.exports = sendEmail;
