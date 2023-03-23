const express = require('express');
const { check } = require('express-validator');
const registerController = require('../controllers/registerController');
const router = express.Router();
const registrationValidation = require('../middleware/validation/regsterValidation')




router.get('/', registerController.showRegisterForm);

router.post('/', registrationValidation, registerController.registerUser);

module.exports = router;