const express = require('express');
const tableController = require('../controllers/usertableController');
const router = express.Router();

router.post('/', tableController.userDetailsTable);
router.get('/', tableController.userDetailsTable);
router.get('/:id/delete', tableController.delete);

module.exports = router;