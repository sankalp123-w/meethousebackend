const crypto = require('crypto');
const hashService = require('./hash-service');
const nodemailer = require("nodemailer");

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid, smsAuthToken, {
    lazyLoading: true,
});

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL// true for 465, false for other ports
    auth: {
      user: process.env.Mail_id, // generated ethereal user
      pass: process.env.Mail_pass, // generated ethereal password
    },
  });
class OtpService {
    async generateOtp() {
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }

    async sendBySms(phone, otp) {
        // return await twilio.messages.create({
        //     to: phone,
        //     from: process.env.SMS_FROM_NUMBER,
        //     body: `Your Meethouse OTP is ${otp}`,
        // });
    }
    async sendByMail(email, otp) {
        try{
            let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <Meethouse>', // sender address
            to: email, // list of receivers
            subject: "Hello your otp for login/signin ✔", // Subject line
            text: `Your Meethouse OTP is : ${otp}`, // plain text body
           
          });
        console.log(info)}
          catch(err){
              console.log(err)
          }
    }

    verifyOtp(hashedOtp, data) {
        let computedHash = hashService.hashOtp(data);
        return computedHash === hashedOtp;
    }
}

module.exports = new OtpService();
