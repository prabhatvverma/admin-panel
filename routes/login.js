var express = require('express');
const { check } = require('express-validator');
const loginController = require('../controllers/loginController');
var router = express.Router();

/*----------- Validation For Login Page---------*/

var loginValidation = [
    /*-------- Chaking Validation for Email---------*/

    check("email")
        .not().isEmpty().withMessage("Enter email").bail()
        .isEmail().withMessage("Enetr valid email").bail(),
    check("password")
        .not().isEmpty().withMessage("Enter password").bail()
        

]

/* GET login page. */
router.get('/', loginController.login);
router.post('/', loginValidation, loginController.loginUser);

module.exports = router;
