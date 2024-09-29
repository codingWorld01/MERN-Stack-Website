const express = require('express');
const serviceFunc = require('../controllers/service-controller');
const router = express.Router();


router.route('/service').get(serviceFunc);

module.exports = router;