const db = require('../../models/index')
const bcrypt = require('bcrypt');
const { check } = require('express-validator');

var loginValidation = [
    /*-------- Chaking Validation for Email---------*/

    check("email")
        .not().isEmpty().withMessage("Enter email").bail()
        .isEmail().withMessage("Enetr valid email").bail()
        .custom(async (value) => {
            var data = await db.User.findOne({
                where: {
                    'email': value
                }
            });
            if (data == null) {
                throw new Error("Email Password incorrect");
            }
        }).bail(),
    check("password")
        .not().isEmpty().withMessage("Enter password").bail()
        .custom(async (value, { req }) => {
            var data = await db.User.findOne({
                where: {
                    'email': req.body.email
                }
            })
            if (data) {
                const verfication = await bcrypt.compare(value, data.password)

                
                if (verfication == false) {
                    throw new Error("Email Password incorrect")
                }
            }
        }).bail(),
    check("is_verified")
        .custom(async (value, { req }) => {
            var data = await db.User.findOne({
                where: {
                    'email': req.body.email
                }
            })
            if (data) {
                if (data == null) {
                    return
                }
                if (await bcrypt.compare(req.body.password, data.password) == false) {
                    return
                }
                if (data.is_verified == 0) {
                    // console.log("you are here");
                    throw new Error("Please verify your Email")
                }
            }
        }).bail()

]
module.exports = loginValidation;