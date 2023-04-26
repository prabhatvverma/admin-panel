const bcrypt = require("bcrypt");
const db = require('../models/index')
const { validationResult } = require('express-validator')
// const jwt = require('jsonwebtoken');
const { query } = require("express");
const sendMail = require("../services/emailService");

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
    async registerUser(req, res, next) {
        const result = validationResult(req);
        let value = result.errors;
        if (value.length>0) {
            res.render('admin/register/index', {
                value
            })
            return
        }
        req.body.password = await bcrypt.hash(req.body.password, 10);
        await db.User.create(req.body);
        const users = await db.User.findOne({
            where: {
                email: req.body.email
            }
        });
        const fullName = users.name;
        const userId = users.id;
        const emailTO = users.email;
        const emailFrom = "prabhat@gmail.com"
        // const token = jwt.sign({
        //     data: 'Token Data'
        // }, 'ourSecretKey', { expiresIn: '10m' }
        // );
        let url = "http://localhost:3000/register/verify?id=" + userId
        // console.log(url);
        // console.log(`${token},this is token`);
        
        sendMail({
            from: emailFrom,
            to: emailTO,
            subject:"Email Varification",
            text: `${emailFrom} shared you a link to verify this is you`,
            html: 'Hii ' + fullName + ',please click here <a href="' + url + '">Verify</a> your mail'
            
        });
        res.send("You are registerd check email to verfy email");
        // res.redirect('/register')
    }


    async varifyEmail(req, res, next) {
        await db.User.update({ is_verified: 1 }, {
            where: {
                id: req.query.id
            }
        });
        res.redirect('/login');
    }
}


module.exports = new registerController;