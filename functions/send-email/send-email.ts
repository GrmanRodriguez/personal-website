import { Handler } from '@netlify/functions'
import nodemailer from 'nodemailer'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

export const handler: Handler = async (event, context) => {
  try {
    const { EMAIL_ACCOUNT, EMAIL_RECEIVE_ACCOUNT, EMAIL_PASSWORD, EMAIL_SERVICE} = process.env;
    const from_name = event.queryStringParameters.from_name || "";
    const reply_to = event.queryStringParameters.reply_to || "";
    const message = event.queryStringParameters.message || "";

    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_PASSWORD
      }
    })

    const mailOptions = {
      from: EMAIL_ACCOUNT,
      to: EMAIL_RECEIVE_ACCOUNT,
      subject: `New Message from ${from_name} (${reply_to})`,
      text: message
    }

    await transporter.sendMail(mailOptions)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Email sent!"
      }),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: (err as Error).message
      }),
    }
  }
}
