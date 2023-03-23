const express = require('express');
const forgetPassController = require('../controllers/forgetPassController');
const router = express.Router();


router.get('/',forgetPassController.forget);

router.post('/send', forgetPassController.sendOTP)

module.exports = router;