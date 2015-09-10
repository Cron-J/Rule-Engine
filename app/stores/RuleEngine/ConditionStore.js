/**
 * Created by Eswer on 9/1/2015.
 */
import alt from 'altInstance';

class ConditionStore {
  constructor() {
    this.lexpression = {};
    this.operator = {};
    this.rexpression = {};
    this.test = function test() {};
  }
  createSimpleStatement = function createSimpleStatement() {
    return {'lexpression': {}, 'operator': {}, 'rexpression': {}};
  };
  updateRule(rule) {
    this.rule = rule;
  }
}

// exports the message store
export default alt.createStore(ConditionStore, 'ConditionStore');

