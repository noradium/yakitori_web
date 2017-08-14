const index = require('../controllers/index');
const yakitori = require('../controllers/api/yakitori');
const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use('/', index);
router.use('/api/yakitori', cors({maxAge: 3600}), yakitori);

module.exports = router;
