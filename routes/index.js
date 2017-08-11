const index = require('../controllers/index');
const yakitori = require('../controllers/api/yakitori');
const express = require('express');
const router = express.Router();

router.use('/', index);
router.use('/api/yakitori', yakitori);

module.exports = router;
