const router = require("express").Router();
const forgetpass = require("../controllers/fogetpassControlller");

router.get('/', forgetpass.showEmailPage);
router.post('/otp', forgetpass.showVerifyOtpPage)
// router.get('/otp', forgetpass.showVerifyOtpPage);

// router.get('/otp/newpass',forgetpass.showCreateNewPass)
router.post('/otp/newpass',forgetpass.showCreateNewPass)

module.exports = router;