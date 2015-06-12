'use strict';

var mongoose = require('mongoose'),
    validator = require('mongoose-validators'),
    Schema = mongoose.Schema;

/**
 * @module rule
 * @description contain the details of rule information, conditions and actions.
 */

var RuleSchema = new Schema({

    /** 
      description. It can only contain string, is required and unique field which is indexed.
    */
    description: {
        type: String,
        validate: [validator.isLength(1, 50)]
    },

    /** 
      status. It can only contain string, status value can be live/active; paused/inactive; unfinished.
    */

    name:String,

    status: {
        type: String,
        enum: ['live', 'active', 'paused', 'inactive', 'unfinished']
    },

    jsonExpression: String,

    jsExpression: String

    //jsonExpression: String
    //jsExpression: String
});

/**
  findRule. return the rule objects.
  @param callback: callback of this form.
*/
RuleSchema.statics.findRule = function (callback) {
    this.find({}, callback);
};

/**
  findOneRule. return the one rule object.
  @param id: get id to find one rule by id.
  @param callback: callback of this form.
*/
RuleSchema.statics.findOneRule = function (id, callback) {
    this.findOne({_id: id}, callback);
};

/**
  createRule. return the create rule object result.
  @param data: data is use to create new rule.
  @param callback: callback of this form.
*/
RuleSchema.statics.createRule = function (data, callback) {
    var rule = new this(data);
    rule.save(callback);
};

/**
  updateRule. return the create rule object result.
  @param updateData: updateData is use to update rule w.r.t id.
  @param callback: callback of this form.
*/
RuleSchema.statics.updateRule = function (updateData, callback) {
    updateData.save(callback);
};

/**
  removeUser. return the create rule object result.
  @param removeData: removeData is use to remove rule w.r.t id.
  @param callback: callback of this form.
*/
RuleSchema.statics.removeUser = function (removeData, callback) {
    removeData.remove();
};

var rule = mongoose.model('rule', RuleSchema);

/** export schema */
module.exports = {
    Rule: rule
};