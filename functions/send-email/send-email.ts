import { Handler } from '@netlify/functions'
import nodemailer, { TransportOptions } from 'nodemailer'
import { google } from 'googleapis'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

export const handler: Handler = async (event, context) => {
  try {
    const { EMAIL_ACCOUNT, 
            EMAIL_RECEIVE_ACCOUNT, 
            EMAIL_SERVICE, 
            CLIENT_ID, 
            CLIENT_SECRET, 
            REDIRECT_URI, 
            REFRESH_TOKEN } = process.env;
    
    const from_name = event.queryStringParameters.from_name || "";
    const reply_to = event.queryStringParameters.reply_to || "";
    const message = event.queryStringParameters.message || "";

    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        type: 'OAuth2',
        user: EMAIL_ACCOUNT,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      }
    } as TransportOptions)

    const mailOptions = {
      from: `Website Contact Form 📨 <${EMAIL_ACCOUNT}>`,
      to: EMAIL_RECEIVE_ACCOUNT,
      subject: `New Message From ${from_name} (${reply_to})`,
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
