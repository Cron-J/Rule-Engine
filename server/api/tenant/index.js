'use strict';

var express = require('express'),
    controller = require('./tenant.controller'),
    router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.tenantById);
router.get('/tenant/:name', controller.tenantByName);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);
module.exports = router;
