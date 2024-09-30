const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

async function Sendmail(email, htmlTemplate) {

    // Create a transporter object
    const transporter = nodemailer.createTransport({
        service: "gmail", // Use Gmail as the service
        auth: {
          user: "5006pankajkmaurya@gmail.com", // Your Gmail address
          pass: "nlwmmuxywhvzkhoo", // App password or your Gmail password if less secure apps enabled
        },
    });
    try {
        const info= await transporter.sendMail({
            from:"5006pankajkmaurya@gmail.com",
            to: email,
            subjet:"verification",
            html:htmlTemplate
        })
        console.log("message sent : %s")

    } catch (error) {
        console.log(error)
    }
   
}

module.exports=Sendmail


