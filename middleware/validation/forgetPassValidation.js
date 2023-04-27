const { check } = require('express-validator');
const db = require('../../models/index')
let otp_services = require("otp-services");
// console.log("validation page");
const forgetPassEmailValidation = [
    check("email").not().isEmpty().withMessage("Enter Email").bail()
        .isEmail().withMessage("Enter a valid email").bail()
        .custom(async (value) => {
            const data = await db.User.findOne({
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