const { check } = require('express-validator');
const db = require('../../models/index');
const bcrypt = require('bcrypt');

const changePasswordValidation = [
    check("old_password").not().isEmpty().withMessage("Enter Password").bail()
        .custom(async (value, { req }) => {
            const data = await db.User.findOne({
                where: {
                    'email': req.session.user
                }
            })
            if (await bcrypt.compare(req.body.old_password, data.password) == false) {
                throw new Error("Enter Valid Old Password")
            }
        }).bail(),
    check("new_password").not().isEmpty().withMessage("Enter Password").bail()
    ,
    check("cnf_password").not().isEmpty().withMessage("Enter Password").bail()
        .custom(async (value, { req }) => {
            if (value !== req.body.new_pasword) {
                throw new Error("Enter same password");
            }
        })
];

module.exports = changePasswordValidation;