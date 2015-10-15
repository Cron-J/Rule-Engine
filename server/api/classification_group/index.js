'use strict';

var express = require('express'),
    controller = require('./classificationGroup.controller'),
    router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.getOne);
router.get('/classification/:id', controller.getClassification);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/search', controller.search);
module.exports = router;
