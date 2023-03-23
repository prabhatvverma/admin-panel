const db = require("../models");
const bcrypt = require('bcrypt');
const { where } = require("sequelize");
const { validationResult, Result } = require('express-validator');
const { error } = require("jquery");
class loginController {
    /**
         * Rendering login page 
         * @param {*} req 
         * @param {*} res 
         * @param {*} next 
         */
    async login(req, res, next) {
        res.render('admin/login/index')
    }

    async loginUser(req, res, next) {
        const result = validationResult(req);
        // console.log(result);
        // console.log(result.errors);
        const email = req.body.email;
        var password = req.body.password;
        var data = await db.User.findOne({
            where: {
                'email': email
            }
        });
        console.log(password);
        console.log(data.dataValues.password);
        if (await bcrypt.compare(password, data.dataValues.password)) {
            res.redirect('/admin');
        } else {
            // console.log(errors);
            //   throw Error("password dosent match");
            // const msg = "Eneter valid email and password"
            res.redirect('/login');
        }
    }
}
module.exports = new loginController;