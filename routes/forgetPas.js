const express = require('express');
const forgetPassController = require('../controllers/forgetPassController');
const router = express.Router();
const forgetPassEmailValidation = require('../middleware/validation/forgetPassValidation');

/**geting Forget Password page */
router.get('/', forgetPassController.showForgetPassword);

/**post request for forget password */
router.post('/', forgetPassEmailValidation, forgetPassController.sendingOTP)

router.get('/otp', forgetPassController.verifyOtp);

router.get('/newpass', forgetPassController.createNewPass)

module.exports = router;