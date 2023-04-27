const sendMail = require("../services/emailService");
const session = require('express-session');
const db = require("../models/index")
const { validationResult } = require('express-validator');
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
        const userTableData = await db.User.findOne({
            where: {
                email: req.body.email
            }
        })
        // const emailTO = req.body.email;
        // const emailFrom = "prabhat@gmail.com"
        const varificationOtp = otp_services.setNumber(4);
        await db.ForgetPasswordOtp.create({
            'email': req.body.email,
            'user_id': userTableData.id,
            'otp': varificationOtp,
            'expireAt': Date.now() + 5 * 60000
        })
        req.session.forOtp = req.body.email;
        /* ------- connect with the smtp server------ */
        // sendMail({
        //     from: emailFrom,
        //     to: emailTO,
        //     subject: "Forget Password",
        //     text: `${emailFrom} shared you a link to verify this is you`,
        //     html: 'Dear customer, use this One Time Password  [ ' + varificationOtp + ' ] to log in to your Debute account'
        // });

        res.redirect('forget/otp');
    }
    async showVerfyOtp(req,res,next){
        res.render("admin/resetpassword/verifyOtp",{
            email: req.session.forOtp
        })
    }

    async verifyOtp(req, res, next) {
        const result = validationResult(req);
        const value = result.errors;
        console.log(value);
        if (value.length > 0) {
            res.render("admin/resetpassword/verifyOtp", {
                email: req.session.forOtp,
                value
            })
        }
        // res.render("admin/resetpassword/verifyOtp", {
        //     email: req.session.forOtp,
        //     value
        // })
        res.redirect('forget/newpass');
    }

    async createNewPass(req, res, next) {
        res.render("admin/resetpassword/createNewPass")
    }
}



module.exports = new forgetPassController;