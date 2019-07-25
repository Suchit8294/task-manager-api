const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name)=>{
sgMail.send({
  to: email,
  from: 'kumar.suchit9@gmail.com',
  subject: 'Thank you for joining in!',
  text: `Welcome to app ${name}. Let me know how you get along with the app.`,
})
}

const sendGoodbyeEmail = (email, name)=>{
sgMail.send({
    to: email,
    from: 'kumar.suchit9@gmail.com',
    subject: 'Will be missing you!',
    text: `Good Bye ${name}. What would we have done to keep you abroad?`
})
}

module.exports = { sendWelcomeEmail, sendGoodbyeEmail }