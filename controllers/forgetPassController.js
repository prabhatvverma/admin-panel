const nodemailer = require('nodemailer');
class forgetPassController {
    /**
         * forget password
         * @param {*} req 
         * @param {*} res 
         * @param {*} next 
         */
    async forget(req, res, next) {
        res.render('admin/resetpassword/index');
    }

    async sendOTP(req,res,next){
        res.send("sending email");
    }
}

module.exports = new forgetPassController;