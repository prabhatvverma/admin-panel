const sendMail = require("../services/emailService");
const session = require('express-session');
const db = require("../models/index")
const { validationResult } = require('express-validator');
let otp_services = require("otp-services");
const bcrypt = require("bcrypt");
class forgetPassController {
    /**
         * SHOW FORGET PASSWORD PAGE
         * @param {*} req 
         * @param {*} res 
         * @param {*} next 
         */
    async showForgetPassword(req, res, next) {
        res.render('admin/resetpassword/index');
    }


    /**
     * SHOW OTP VALIDATION PAGE & ADD DATA TO TABLE STORE EMAIL IN SESSION
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */

    async showSendingOTP(req, res, next) {
        const value = validationResult(req).errors;
        if (value.length > 0) {
            res.render('admin/resetpassword/index', {
                value: value
            })
            return
        }
        const userTableData = await db.User.findOne({
            where: {
                email: req.body.email
            }
        })
        const emailTO = req.body.email;
        const emailFrom = "prabhat@gmail.com"
        const varificationOtp = otp_services.setNumber(4);
        await db.ForgetPasswordOtp.create({
            'email': req.body.email,
            'user_id': userTableData.id,
            'otp': varificationOtp,
            'expireAt': Date.now() + 5 * 60000
        })
        req.session.forOtp = userTableData.email;
        /* ------- SENDING OTP IN EMAIL TO RESET USER PASSWORD------ */
        sendMail({
            from: emailFrom,
            to: emailTO,
            subject: "Forget Password",
            text: `${emailFrom} shared you a link to verify this is you`,
            html: 'Dear customer, use this One Time Password  [ ' + varificationOtp + ' ] to log in to your Debute account'
        });

        res.render('admin/resetpassword/verifyOtp', {
            email: req.session.forOtp
        })
    }

    /**
     * SHOW CREATENEWPASS PAGE AND CREATE NEWWW PASS ADD TO DATABASE
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async showcreateNewPass(req, res, next) {
        const result = validationResult(req);
        const value = result.errors;
        console.log(value);
        if (value.length > 0) {
            res.render("admin/resetpassword/verifyOtp", {
                email: req.session.forOtp,
                value
            })
        }       
        res.render("admin/resetpassword/createNewPass")
    }
/**
 * POST REQUEST FOR NEW PASSWORD REDIRECT TO LOGIN PAGE 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
    async updatePassword(req, res, next) {
        const result = validationResult(req);
        const value = result.errors;
        console.log(value);
        if (value.length > 0) {
            res.render("admin/resetpassword/verifyOtp", {
                email: req.session.forOtp,
                value
            })
        }
     console.log(req.session.forOtp);
        req.body.newPass = await bcrypt.hash(req.body.newPass, 10);
        console.log(req.body.newPass);
        await db.User.update({ password: req.body.newPass},
            {
                where: {
                    email: req.session.forOtp
                }
            })
        res.redirect('/login')
    }
}



module.exports = new forgetPassController;