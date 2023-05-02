const express = require('express');
const forgetPassController = require('../controllers/forgetPassController');
const router = express.Router();
const forgetPassAuth = require('../middleware/authentication/forgetPassAuthentication')
const forgetPassEmailValidation = require('../middleware/validation/forgetPassValidation');
const otpvalidation = require("../middleware/validation/otpValidation");

/**geting Forget Password page */
router.get('/', forgetPassController.showForgetPassword);

/**post request for forget password */
router.post('/otp', forgetPassEmailValidation, forgetPassController.showSendingOTP);

router.post('/otp/newpass', forgetPassAuth, otpvalidation, forgetPassController.showcreateNewPass);

router.post('/otp/newpass/login', forgetPassAuth, forgetPassController.updatePassword);



module.exports = router;