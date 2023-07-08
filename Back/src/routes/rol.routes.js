const express = require('express');
const router = express.Router();
const controller = require('../controllers/rol.controller');

router.get('/', controller.getRoles);

module.exports = router;
