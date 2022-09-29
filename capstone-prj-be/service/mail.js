
const nodeMailer = require('nodemailer')
require('dotenv').config()

const adminEmail = process.env.ADMIN_MAIL
const adminPassword = process.env.ADMIN_MAIL_PASSWORD
var aws = require('aws-sdk');
const mailHost = 'smtp.gmail.com'
const mailPort = 465
module.exports = {
    send_mail(to, subject, htmlContent) {
     try {
        const transporter = nodeMailer.createTransport({
            host: mailHost,
            port: mailPort,
            secure: true, 
            auth: {
              user: adminEmail,
              pass: adminPassword
            }
          })
        const options = {
            from: adminEmail,
            to: to, 
            subject: subject, 
            html: htmlContent 
          }
        transporter.sendMail(options,  function(err, info){
          if (err){
            throw new Error(err)
          }
          else{
            return info
          }
        })
     } catch (error) {
         console.log(error)
     }
    },
    send_mail_with_ses(to, subject, htmlContent){
      const sesConfig = {
        accessKeyId: "AKIAYMKLOZHQ3TLYIV6U", 
        secretAccessKey: "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",
        region: "ap-south-1", // đây là region của server nó là vùng bạn đã chọn khi tạo ses nếu Mumbai là ap-south-1
        apiVersion: '2010-12-01', // version của api
      }
      const sesAws = new AWS.SES(sesConfig);
      const params = {
        Destination: {
          ToAddresses: [to], // email người nhận
        },
        Source: "p2pleningfpt@gmail.com", // email dùng để gửi đi
        Message: {
          Subject: {
            Data: subject,
            Charset: 'UTF-8',
          },
          Body: {
            Text: {
              Data: htmlContent,
              Charset: 'UTF-8'
            }
          }
        },
      }
      
      const sendPromise = sesAws.sendEmail(params).promise();
      
      sendPromise
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          throw new Error(error)
        })
    }

  }
 
