const express = require('express');
const tableController = require('../controllers/usertableController');
const router = express.Router();

router.post('/', tableController.showAllUsersDetails);
router.get('/', tableController.showAllUsersDetails);
router.get('/:id/delete', tableController.deleteUserDetails);

module.exports = router;