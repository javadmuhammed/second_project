
let const_data = {
    // NOTIFICATION_QUEUE: "NOTIFICATION_QUEUE"
    TYPE_OF_NOTIFICATION: {
        USER_SIGN_UP_OTP: "USER_SIGN_UP_OTP"
    },


    MAIL_CONFIG: {
        host: "smtp.example.com",
        port: 587,
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD
        }
    }
}

module.exports= const_data;