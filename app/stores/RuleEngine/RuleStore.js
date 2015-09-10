/**
 * Created by Eswer on 9/1/2015.
 */
import alt from 'altInstance';
// Constant holds a type of constant such as date, string, boolean and value holds the constant value.
export class Constant {
  constructor() {
    this.type = '';
    this.value = '';
    // to do test case
    this.type = 'text';
    this.value = 'akash';
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
  constructor(id, label) {
    this.id = id;
    this.label = label;
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
    this.lexpression = new Expression();
    this.rexpression = new Expression();
    this.operator = new Operator();
  }
}
// Condition specifies and, or on list of simpleconditions and also holds list of itselfs(for subconditions).
// Condition resolves to true or false;
export class Condition {
  constructor() {
    this.anyall = 'All';
    this.simpleconditions = [];
    this.conditions = [];
    // todo for the test simpleconditions
    // this.addSimpleCondition();
  }
  // addSimpleCondition = function addSimpleCondition() {
  //   this.simpleconditions.push(new SimpleCondition());
  // }
}
// Function class used to perform a function action based on type.
// to do.
class Function {
  constructor(name) {
    this.label = name;
  }
}
// Action class had the function and params to determine the type and action to be performed
// to do.
export class Action {
  constructor(name) {
    this.function = new Function(name);
    this.parameters = {};
  }
}
// Rule holds condition and a list of actions.
class Rule {
  constructor() {
    this.condition = new Condition();
    this.actions = [];
    this.name = '';
    // todo for the test actions
    // this.addAction('send Email');
  }
  addAction = function addAction(param) {
    this.actions.push(new Action(param));
  }
  updateRule(rule) {
    this.rule = rule;
  }
}

// exports the message store
export default alt.createStore(Rule, 'Rule');
