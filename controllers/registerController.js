const bcrypt = require("bcrypt");
const db = require('../models/index')
const { validationResult } = require('express-validator')
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
        const result = validationResult(req);
        let value = result.errors;
        if (value.length>0) {
            res.render('admin/register/index', {
                value
            })
        } else {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            await db.User.create(req.body);
            res.redirect('/users')
        }
    }
}

module.exports = new registerController;