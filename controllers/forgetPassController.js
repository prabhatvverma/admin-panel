const { request } = require('express');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
class forgetPassController {
    /**
         * forget password
         * @param {*} req 
         * @param {*} res 
         * @param {*} next 
         */
    async showForgetPassword(req, res, next) {
        res.render('admin/resetpassword/index');
    }

    async sendingOTP(req, res, next) {
        const result = validationResult(req);
        const value = result.errors;
        if (value.length > 0) {
            res.render('admin/resetpassword/index', {
                value: value
            })
        } else {
            /* ------- connect with the smtp server------ */
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'prabhatnode@gmail.com',
                    pass: 'vfblwfulwegxjmpf'
                }
            });
            const varificationOtp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
            await transporter.sendMail({
                from: '"Debute Infotech" <prabhat@gmail.com>', // sender address
                to: req.body.email, // list of receivers
                subject: "varification Otp", // Subject line
                text: "Dear customer, use this One Time Password " + varificationOtp + " to log in to your Debute account" // plain text body
                // html: "<b>req.body.message?</b>", // html body
            });
            res.redirect("/login");
        }
    }
}


module.exports = new forgetPassController;