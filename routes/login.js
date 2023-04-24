const passport = require('passport')
require("../services/googleAuth")
var express = require('express');
const loginController = require('../controllers/loginController');
var router = express.Router();
const loginValidation = require('../middleware/validation/loginValidation')

/* GET login page. */
router.get('/', loginController.showLoginForm);
router.post('/', loginValidation, loginController.loginUser);


router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));


module.exports = router;
