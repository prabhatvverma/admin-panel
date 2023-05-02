const { check } = require("express-validator");
const db = require("../../models/index");

const otpvalidation = [
    check("otp").not().isEmpty().withMessage("Please Enter Otp").bail()
        .isLength("4").withMessage(" Please enter 4 digit otp").bail()
        .custom(async (value, { req }) => {
            const varificationOtp = await bcrypt.compare(req.body.otp, data.password)
            const data = await db.ForgetPasswordOtp.findAll({
                where: {
                    email: req.body.email,
                    otp: req.body.otp
                }
            });
            console.log(data.length);
            if (data.length == 0) {
                throw new Error("Enter Valid otp");
            }
            if (Number(data[0].expireAt) - Date.now() < 0) {
                throw new Error("Otp expired");
            }
            // console.log(otpTabelData);
        }).bail()

]

module.exports = otpvalidation;