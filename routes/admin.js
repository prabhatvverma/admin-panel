const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authentication = require('../middleware/authentication/autentication');
const changePasswordValidation = require('../middleware/validation/changePassValidation')

router.use(authentication);
router.get('/', adminController.admin);
router.get('/logout', adminController.logoutUser);
router.get('/users', adminController.showAllUsersDetails);
router.get('/deluser', adminController.deleteUserDetails);
router.get('/changepass', changePasswordValidation, adminController.changepass);
router.post('/changepass/genNewPass', changePasswordValidation, adminController.userPassChange);
module.exports = router;