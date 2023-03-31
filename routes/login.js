var express = require('express');
const loginController = require('../controllers/loginController');
var router = express.Router();
const loginValidation = require('../middleware/validation/loginValidation')

/* GET login page. */
router.get('/', loginController.showLoginForm);
router.post('/', loginValidation, loginController.loginUser);

module.exports = router;
