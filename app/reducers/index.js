import * as types from '../constants/ActionTypes';
import { combineReducers } from 'redux';
import squel from 'squel';
import { createReducer } from 'redux-create-reducer';

/****************** Start of Grammar Definitions in rule-engine *******************/
export class Constant {
  constructor() {
    this.type = '';
    this.value = '';
    // to do test case
    this.type = 'String';
  }
}
// Variable holds a key and a type of its own for example key.key.key.key as product.attributesvalues.attribute.classificationid.

export class Variable {
  constructor(key) {
    this.key = key ? key : '';
    this.variable = {};
  }
}
// Operator holds a operator type similar to > , < , = etc..
export class Operator {
  constructor(id, label, valueType, keyTypes) {
    this.id = id;
    this.label = label;
    this.valueType = valueType;
    this.keyTypes = keyTypes;
  }
  // expression to operate on key and value, boolean result
  toJSExpression(key, value) {
    return 'Not Implemented' + value;
  }
  // is the operator is allowed for given keyType
  isAllowed(keyType) {
    return this.keyTypes.indexOf(keyType) > 0;
  }
}
// Expression have variable which holds a TYPE variable or a TYPE constant
// variable type is determined by isVariable
class Expression {
  constructor() {
    this.variable = {};
    this.isVariable = true;
  }
}
// SimpleCondition is an expressions resolve to true or false 1. (a = b)  2.(a > b)
// SimpleCondition holds leftexpression operator rightexpression
export class SimpleCondition {
  constructor() {
    this.lhexpression = new Expression();
    this.rhexpression = new Expression();
    this.operator = new Operator();
  }
}
// Condition specifies and, or on list of simpleconditions and also holds list of itselfs(for subconditions).
// Condition resolves to true or false;
export class Condition {
  constructor(type) {
    if(type) {
      var anyallcondition = new AnyAllCondition();
      anyallcondition.addCondition();
      this.AnyAllCondition = anyallcondition;
    }else {
      this.SimpleCondition = new SimpleCondition();
    }
  }
  toJSExpression() {
    
  }
  toSquel() {
    if(this.SimpleCondition){
      return this.SimpleCondition.toSquel();
    }
  }
  // addSimpleCondition = function addSimpleCondition() {
  //   this.simpleconditions.push(new SimpleCondition());
  // }
}
// AnyAllCondition holds list of conditions
//AnyallCondition = on ,
export class AnyAllCondition {
  /** @namespace this.conditions */
  constructor() {
    this.on = ''; //applies on 'All' , 'Any' , 'AlleastOne'
    this.conditions = [];
    // default single condition init
    //this.addCondition();
  }
  addCondition() {
    this.conditions.push(new Condition());
  }
  toJSExpression() {
    var jsExpr = "" +
        "(function(item) {" +
        "var object = {\"{0}\": item};" +
        "return {1};" +
        "})";
    return jsExpr.format(1,232);
  }
}
// Function class used to perform a function action based on type.
// to do.
class FunctionClass {
  constructor(name) {
    this.label = name;
  }
}
// Action class had the function and params to determine the type and action to be performed
// to do.
export class Action {
  constructor(name) {
    this.function = new FunctionClass(name);
    this.parameters = {};
  }
}
// Rule holds condition and a list of actions.
class Rule {
  constructor() {
    this.AnyAllCondition = new AnyAllCondition();
    this.actions = [];
    this.name = '';
    // todo for the test actions
    // this.addAction('send Email');
  }
  toJSExpression() {
    //console.log(this.condition.toJSExpression());
    //console.log(this.AnyAllCondition);
  }
  addAction(param) {
    this.actions.push(new Action(param));
  }
}
/****************** End of Grammar Definitions in rule-engine *********************/
/****************** Common functions **********************************************/
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
          ? args[number]
          : match
          ;
    });
  };
}

/****************** End of Common functions **********************************************/
/****************** Catch the actions here ****************************************/
function getRules(state,action){
  action.data.then(function(success){
    state.rules = success;
  },function(error){
    console.log(error);
  })
}

const initialState = {
  rule : new Rule(),
  rules : []
};
var App = createReducer(initialState,{
  [types.EDITRULE](state,action){
    //console.log('Edit rule set state ------------------------->',action);
    let rule = action.payload.response.rule;
    rule.updaterule = true;
    return {
      ...state,
      rule : action.payload.response.rule
    }
  },
  [types.UPDATESTATE](state,action){
    //console.log('update state ------------------------->',action);
    return {
      ...state,
      rule : action.payload.response.rule
    }
  },
  [types.GETRULES](state,action){
    //console.log('action called');
    return {
      ...state
    }
  },
  [types.GETRULESSUCCESS](state,action){
    //console.log('action called');
    return{
      ...state,
      rules : action.payload.response
    }
  },
  [types.GETRULESFAILURE](state,action){
    //console.log('action called');
    const { data } = action.payload;
    return {
      ...state,
    }
  }
});
const rootReducer = combineReducers({
  App
});

export default rootReducer;
