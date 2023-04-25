const bcrypt = require("bcrypt");
const db = require('../models/index')
const nodemailer = require('nodemailer')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const { query } = require("express");
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
    async registerUser(req, res, next) {
        const result = validationResult(req);
        let value = result.errors;
        // console.log(result);
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
        const full_name = users.name;
        const usersId = users.id;

        // const token = jwt.sign({
        //     data: 'Token Data'
        // }, 'ourSecretKey', { expiresIn: '10m' }
        // );
        let url = "http://localhost:3000/register/verify?id=" + usersId
        // console.log(url);
        // console.log(`${token},this is token`);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.FACEBOOK_APP_ID,
                pass: process.env.FACEBOOK_APP_SECRET
            }
        });

        await transporter.sendMail({
            from: '"Debute Infotech" <prabhat@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: "verification mail", // Subject line
            html: 'Hii ' + full_name + ',please click here <a href="' + url + '">Verify</a> your mail'
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