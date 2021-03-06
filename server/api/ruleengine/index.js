'use strict';

var express = require('express'),
    controller = require('./ruleengine.controller'),
    router = express.Router();

router.post('/createnewrule', controller.save);
router.post('/updaterule', controller.update);
router.get('/getrules', controller.getrules);
router.get('/pgschema',controller.getSchema);
module.exports = router;
