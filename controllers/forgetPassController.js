const sendMail = require("../services/emailService");
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
let otp_services = require("otp-services");
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
            return
        }
        /* ------- connect with the smtp server------ */
        const emailTO = req.body.email;
        const emailFrom = "prabhat@gmail.com"
        const varificationOtp = otp_services.setNumber(4);
        // const varificationOtp = otpGenerator.generate(4, { digits: true, upperCaseAlphabets: false, specialChars: false });
        sendMail({
            from: emailFrom,
            to: emailTO,
            subject:"Forget Password",
            text: `${emailFrom} shared you a link to verify this is you`,
            html: 'Dear customer, use this One Time Password  [ ' + varificationOtp + ' ] to log in to your Debute account'
        });
        res.redirect("/forget/otp");
    }

    async verifyOtp (req,res,next){
        res.render("admin/resetpassword/verifyOtp")
    }

    async createNewPass (req,res,next){
        res.render("admin/resetpassword/createNewPass")
    }
}



module.exports = new forgetPassController;