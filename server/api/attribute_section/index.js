'use strict';

var express = require('express'),
    controller = require('./attributeSection.controller'),
    router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.attributeSectionById);
router.get('/attributeSection/:attributeSectionId', controller.attributeByAttributeSectionId);
router.post('/search', controller.search);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);
module.exports = router;
