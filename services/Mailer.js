const nodemailer = require('nodemailer');

const keys = require('../config/keys');

class Mailer {
  constructor({ subject, email }, content) {
    this.subject = subject;
    this.content = content;
    this.mailOptions = {
      from: 'Nguyen Van Dang',
      to: email,
      subject,
      html: content,
    };
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: keys.googleAccount,
        pass: keys.googlePassword,
      },
    });
  }
  async send() {
    await this.transporter.sendMail(this.mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
      return info;
    });
  }
}

module.exports = Mailer;
