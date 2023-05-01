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

// router.get('/otp/newpass',forgetPassAuth, forgetPassController.showcreateNewPass);
router.post('/otp/newpass', forgetPassAuth, otpvalidation, forgetPassController.showcreateNewPass);

router.post('/otp/newpass/login', forgetPassAuth, forgetPassController.updatePassword);
// router.get('/otp/newpass/login',  forgetPassController.updatePassword);

// router.get('/otp/newpass', forgetPassController.createNewPass);
// router.post('/otp/newpass', forgetPassController.createNewPass);


module.exports = router;