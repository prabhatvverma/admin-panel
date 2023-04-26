require("dotenv").config();
const accountSid = 'AC0ee612aac819a57c970c108353508d44';
const authToken = process.env.TWILIO_AUTH_TOKEN_MSG;
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Hi Prabhat This side',
        from: '+16317693873',
        to: '+919795969539'
    })
    .then(message => console.log(message.sid))
   