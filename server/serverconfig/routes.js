var bodyParser = require('body-parser');
/**
 * Routes for express app
 */

module.exports = function(app, passport) {
  app.use(bodyParser.json());
  app.use('/api/attributes', require('../api/attribute'));
  app.use('/api/attributesections', require('../api/attribute_section'));
  app.use('/api/tenants', require('../api/tenant'));
  app.use('/api/classification', require('../api/classification'));
  app.use('/api/classificationgroup', require('../api/classification_group'));
  app.use('/api/ruleengine',require('../api/ruleengine'));
  // ------------------------------------
  // View Rendering
  // ------------------------------------
  function getInitialState () {
    const counter = this.request.query.counter ?
      parseInt(this.request.query.counter) : 0;

    return new Promise(res => res({ counter }));
  }

  // app.use(require('../middleware/render-route')(getInitialState));

};
