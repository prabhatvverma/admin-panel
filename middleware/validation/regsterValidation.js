const { check } = require('express-validator');
const db = require('../../models/index')

var registrationValidation = [


    /*------------validation for first_name--------------*/
    check("first_name")
        .not().isEmpty().withMessage("Enter name").bail()
        .isLength({ min: 3 }).withMessage("Name must have 3 words").bail(),
    /*------------validation for last--------------*/


    check("last_name")
        .not().isEmpty().withMessage("Enter name").bail()
        .isLength({ min: 3 }).withMessage("Name must have 3 words").bail(),


    /*------------validation for email--------------*/
    check("email").not().isEmpty().withMessage("Enter Email").bail()
        .isEmail().withMessage("Enter a valid email").bail()
        .custom(async (value) => {
            var data = await db.User.findOne({
                where: {
                    'email': value
                }
            });
            if (data != null) {
                throw new Error("Email alredy exist");
            }
        }).bail(),


        /*------------validation for password--------------*/
    check("password").not().isEmpty().withMessage("Enter Password").bail()
        .isLength({ min: 4 }).withMessage("Password must 4 charectors")
];

module.exports = registrationValidation;