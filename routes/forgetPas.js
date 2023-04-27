const express = require('express');
const forgetPassController = require('../controllers/forgetPassController');
const router = express.Router();
const forgetPassEmailValidation = require('../middleware/validation/forgetPassValidation');
const otpvalidation = require("../middleware/validation/otpValidation");
/**geting Forget Password page */
router.get('/', forgetPassController.showForgetPassword);

/**post request for forget password */
router.post('/forget/otp', forgetPassEmailValidation, forgetPassController.sendingOTP)

// router.get('/otp', forgetPassController.showVerfyOtp);
router.post('/otp/newpass', otpvalidation, forgetPassController.verifyOtp);

router.get('/otp/newpass', forgetPassController.createNewPass);
router.post('/otp/newpass', forgetPassController.createNewPass);


module.exports = router;