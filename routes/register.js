const express = require('express');
const registerController = require('../controllers/registerController');
const router = express.Router();
const registrationValidation = require('../middleware/validation/regsterValidation');

/**Route for registration form */
router.get('/', registerController.showRegisterForm);

/** Route for users details */
router.post('/', registrationValidation,  registerController.registerUser);

router.get('/verify/',  registerController.varifyEmail);
module.exports = router;