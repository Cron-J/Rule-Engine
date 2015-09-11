import {Operator} from './RuleStore.js';

class util {
  __extends(d, b) {
    for (let p in b)
      if (b.hasOwnProperty(p)) d[p] = b[p];

    function __() {
      this.constructor = d;
    }
    __.prototype = b.prototype;
    d.prototype = new __();
  }
  toDataString(value) {
    if (typeof value === 'string') {
      return '\'' + value + '\'';
    } else if (typeof value === 'number') {
      return value;
    } else if (typeof value === 'object') {
      if (value instanceof Date) {
        return 'new Date({0})'.format(value.toString());
      }
    } else if (typeof value === 'boolean') {
      return '';
    }
  }
}

class isEmptyOperator extends Operator {
  constructor() {
    super('isEmpty', 'is empty', 'checkbox', ['String', 'Number', 'Date', 'Boolean']);
  }
  toJSExpression(key, value) {
    return '(({0}  === "")||({0} === undefined)||({0} === null))'.format(key, new util().toDataString(value)); // TODO: value.new util().toDataString();
  }
}
class isExistsOperator extends Operator{
  constructor() {
    super('isExists', 'is exists', 'checkbox', ['String', 'Number', 'Date', 'Boolean']);
  }

  toJSExpression(key, value) {
    return '(({0}  === "")||({0} === undefined))'.format(key, new util().toDataString(value));
  }
}

class equalToOperator extends Operator {
  constructor() {
    super('equalTo', 'equal to', 'data', ['String', 'Number', 'Date', 'Boolean']);
  }
  toJSExpression(key, value) {
    return '({0} == {1})'.format(key, new util().toDataString(value));
  };
}
class notEqualToOperator extends Operator{
  constructor() {
    super('notEqualTo', 'not equal to', 'data', ['String', 'Number', 'Date', 'Boolean']);
  }
  toJSExpression(key, value) {
    return '({0} !== {1})'.format(key, new util().toDataString(value));
  };
}
class greaterThanOperator extends Operator {
  constructor() {
    super('greaterThan', 'greater than', 'data', ['Number', 'Date']);
  }
  toJSExpression(key, value) {
    return '({0} > {1})'.format(key, new util().toDataString(value));
  };
}
class greaterThanEqualOperator extends Operator {
  constructor() {
    super('greaterThanEqual', 'greater than equal', 'data', ['Number', 'Date']);
  }
  toJSExpression(key, value) {
    return '({0} >= {1})'.format(key, new util().toDataString(value));
  };
}
class lessThanOperator extends Operator {
  constructor() {
    super('lessThan', 'less than', 'data', ['Number', 'Date']);
  }
  toJSExpression(key, value) {
    return '({0} < {1})'.format(key, new util().toDataString(value));
  };
}
class lessThanEqualOperator extends Operator {
  constructor() {
    super('lessThanEqual', 'less than equal', 'data', ['Number', 'Date']);
  }
  toJSExpression(key, value) {
    return '({0} <= {1})'.format(key, new util().toDataString(value));
  };
}

class endsWithOperator extends Operator {
  constructor() {
    super('endsWith', 'ends with', 'data', ['String']);
  }
  toJSExpression(key, value) {
  return '({0}.indexOf({1}) + {0}.length)=={0}.length)'.format(key, new util().toDataString(value));
};
}

class beginsWithOperator extends Operator {
  constructor() {
    super('beginsWith', 'begins with', 'data', ['String']);
  }
  toJSExpression(key, value) {
  return '({0}.indexOf({1})==0)'.format(key, new util().toDataString(value));
};

}
class containsOperator extends Operator {
  constructor() {
    super('contains', 'contains', 'data', ['String']);
  }
  toJSExpression(key, value) {
    return '({0}.indexOf({1})>=0)'.format(key, new util().toDataString(value));
  }
}

export default class Operatorslist {
  constructor() {
    this.isEmpty = new isEmptyOperator();
    this.isExists = new isExistsOperator();
    this.equalTo = new equalToOperator();
    this.notEqualTo = new notEqualToOperator();
    this.greaterThan = new greaterThanOperator();
    this.greaterThanEqual = new greaterThanEqualOperator();
    this.lessThan = new lessThanOperator();
    this.lessThanEqual = new lessThanEqualOperator();
    this.endsWith = new endsWithOperator();
    this.beginsWith = new beginsWithOperator();
    this.contains = new containsOperator();
  }
}

