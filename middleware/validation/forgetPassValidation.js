const { check } = require('express-validator');
const db = require('../../models/index')

// console.log("validation page");
var forgetPassEmailValidation = [
    check("email").not().isEmpty().withMessage("Enter Email").bail()
        .isEmail().withMessage("Enter a valid email").bail()
        .custom(async (value) => {
            var data = await db.User.findOne({
                where: {
                    'email': value
                }
            });
            if (data == null) {
                throw new Error("Email does't exist");
            }
        }).bail()
]

module.exports = forgetPassEmailValidation;