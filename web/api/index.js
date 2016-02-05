'use strict';

let express = require('express');

let router = express.Router();

router.use('/firewalls', require('./firewalls'));

module.exports = router;
