const db = require("../models/index");
const session = require('express-session');
const { where } = require("sequelize");
const { validationResult, Result } = require('express-validator');
class loginController {
    /**
         * Rendering login page 
         * @param {*} req 
         * @param {*} res 
         * @param {*} next 
         */
    async showLoginForm(req, res, next) {
        
        // res.status(200).send("hello");
        res.render('admin/login/index')
    }
    /**
     * login user to admin panel
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async loginUser(req, res, next) {
        const result = validationResult(req);
        const value = result.errors;
        if (value.length > 0) {
            res.render('admin/login/index', {
                value,
            })
            return
        }
        const usersData = await db.User.findOne({
            where: {
                email: req.body.email,
            }
        })
        req.session.user = usersData.email;
        res.redirect('/admin',);
    }
}
module.exports = new loginController;