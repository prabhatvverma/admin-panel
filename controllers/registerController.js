const bcrypt = require("bcrypt");
const db = require('../models/index')
const nodemailer = require('nodemailer')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
// var { randomBytes } = require('crypto');

class registerController {
    /**
     * Rendering singup page
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    //showRegisterForm
    async showRegisterForm(req, res, next) {
        res.render("admin/register/index")
    }
    /**
     * storing users registration details
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async registeredUser(req, res, next) {
        // const result = validationResult(req);
        // let value = result.errors;
        // if (value.length > 0) {
        //     res.render('admin/register/index', {
        //         value
        //     })
        // } else {
        let url = `http://localhost:3000/register/`
        const token = jwt.sign({
            data: 'Token Data'
        }, 'ourSecretKey', { expiresIn: '10m' }
        );
        console.log(`${token},this is token`);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'prabhatnode@gmail.com',
                pass: 'vfblwfulwegxjmpf'
            }
        });
        await transporter.sendMail({
            from: '"Debute Infotech" <prabhat@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: "varification Otp", // Subject line
            // text: `Dear customer, use this One Time Password ${url}${token} to log in to your Debute account` // plain text body
            html: 'Hii ' + req.body.user_name + ',please click here <a href="' + url + '' + token + '">Verify</a> your mail'
        });
        // req.body.password = await bcrypt.hash(req.body.password, 10);
        // await db.User.create(req.body);

        res.redirect('/users')
    }
}
// }

module.exports = new registerController;