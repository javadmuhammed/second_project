const nodeMailer = require("nodemailer");
const mailTemplate = require("../../../../config/template/mailTemplate");
const const_data = require("../../../../config/const_data");
const { communicationConnection } = require("../../../config");
// const { communicationConnection } = require("../../../../config");

async function SingInConsumerOTP() {

    const queue = process.env.USER_SIGN_IN_NOTIFICATION


    const channel = await communicationConnection();


    await channel.assertQueue(queue, { durable: true });
    await channel.consume(queue, (message) => {

        console.log("Consume Sign IN OTP", message)
        if (message) {
            let data = JSON.parse(message.content.toString())
            console.log(data)

            let { otp, email, full_name } = data;
            let mailContent = mailTemplate.otpMailTemplate(otp, full_name)


            let mailTransport = nodeMailer.createTransport({
                service: const_data.MAIL_CONFIG.service,
                auth: const_data.MAIL_CONFIG.auth
            })


            let mailOption = {
                from: const_data.MAIL_CONFIG.auth.user,
                to: email,
                subject: 'Sign IN OTP',
                html: mailContent
            };

            return new Promise((resolve, reject) => {
                mailTransport.sendMail(mailOption).then(() => {
                    console.log("User Sign In OTP has been sent")
                }).catch((err) => {
                    console.log("User Sign In OTP has been failed")
                    console.log(err)
                })
            })

        }
    },
        { noAck: true }
    );
}

module.exports = SingInConsumerOTP