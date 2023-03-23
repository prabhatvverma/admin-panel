var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

router.get('/error', userController.error);

// router.get('/reset', userController.reset);

router.get('/changepass', userController.changepass);

module.exports = router;
