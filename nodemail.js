import { createTransport } from 'nodemailer';

var transporter = createTransport({
    service: 'gmail',
    auth: {
        user: 'prabhatnode@gmail.com',
        pass: '9565184973'
    }
});

var mailOptions = {
    from: 'prabhatnode@gmail.com',
    to: 'prabhatvverma@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
}); 