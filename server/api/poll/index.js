'use strict';

var express = require('express');
var controller = require('./poll.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();
router.post('/create', controller.create);
router.get('/:id', controller.show);

module.exports = router;