const express=require('express');
const usercontroller = require('../controllers/userController');
const router = express.Router();



router.get('/' , usercontroller.changepass);

module.exports = router;