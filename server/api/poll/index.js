'use strict';

var express = require('express');
var controller = require('./poll.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();
router.post('/create', controller.create);
router.get('/:id', controller.show);
router.post('/:id/answer', controller.answer);
router.get('/user/:user', controller.user);
router.delete('/remove/:id', auth.isAuthenticated(), controller.remove);

module.exports = router;