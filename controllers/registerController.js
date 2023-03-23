const bcrypt = require("bcrypt");
const db = require('../models/index')
const { validationResult } = require('express-validator')

class registerController{
    /**
     * Rendering singup page
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    //showRegisterForm
    async showRegisterForm(req, res, next) {
        res.render("admin/register/index", {
        });
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
        if (value) {
            res.render('admin/register/index', {
                value
            })
        }
        req.body.password = await bcrypt.hash(req.body.password, 10);
        await db.User.create(req.body);
        const users = await db.User.findAll();
        res.render('admin/register/index', {
            users: users
        })
    }
}
module.exports = new registerController;