// import Rule from 'rule.js';
import React from 'react';
// import {Operator} from 'stores/RuleEngine/RuleStore.js';
// import style from '../scss/components/ruleeditor.scss';
import ExpressionComponent from './expression.react.js';
import OperatorComponent from './operator.react.js';
import Operatorslist from '../reducers/Operatorslist.js';
import SchemaStore from '../reducers/SchemaStore.js';
import Select from 'react-select';

export default class SimpleConditionComponent extends React.Component{
  constructor(props) {
    super(props);
    this.operators = new Operatorslist();
    this.filteroperators();
  };
  componentWillReceiveProps(nxtprops) {
    this.props = nxtprops;
    this.operators = new Operatorslist();
    this.filteroperators();
  }
  renderOperator() {
    if (this.operatorslist.length) {
      let options = [];
      for(let i=0;i<this.operatorslist.length;i++){
        options.push({value : this.operatorslist[i].id, label:this.operatorslist[i].id} );
      }
      this.Operatorcomponent = (<Select
          name="form-field-name" noResultsText = "No properties found"
          value={this.props.simplecondition.operator.label}
          placeholder="select operator"
          options={options}
          onChange={this.handleOperatorChange.bind(this)}
      />);

    }else {
      this.Operatorcomponent = <span></span>;
    }
  }
  renderRightExpression(instance) {
    if (instance && this.props.simplecondition.operator && this.props.simplecondition.operator.label) {
      this.rightExpressionComponent = (<ExpressionComponent schema={this.props.schema} className="expression" instanceType={this.instance} expression={this.props.simplecondition.rhsexpression} expressionType="rhsexpression" onPropertyChange={this.propertyChanged.bind(this)}/>);
    }else {
      this.rightExpressionComponent = <span> </span>;
    }
  }
  render() {
    return (
      <div className="form-inline">
        <ExpressionComponent schema={this.props.schema} className="expression" expression={this.props.simplecondition.lhsexpression} expressionType="lhsexpression" onPropertyChange={this.propertyChanged.bind(this)}/>
        {this.Operatorcomponent}
        {this.rightExpressionComponent}
      </div>
    );
  }
  handleOperatorChange(event) {
    let key = event;
    this.propertyChanged('operator', this.operators[key]);
  }
  filteroperators() {
    this.operatorType = function operatorType(variable, schema) {
      if (variable && variable.variable && variable.key) {
        return operatorType(variable.variable, schema[variable.key]);
      }
      return variable && schema && schema.instance ? schema.instance : '';
    };
    this.getOperatorlist = function getOperatorlist(instance) {
      this.operatorslist = [];
      let operatorlist = this.operators;
      for (let k in operatorlist) {
        if (operatorlist.hasOwnProperty(k)) {
          for (let i = 0; i < operatorlist[k].keyTypes.length; i++) {
            if (operatorlist[k].keyTypes[i] === instance) {
              this.operatorslist.push(operatorlist[k]);
            }
          }
        }
      }
      this.renderOperator(this.operatorslist);
    };
    let expression = this.props.simplecondition.lhsexpression;
    if (expression.isVariable && this.props.schema && expression.variable) {
      this.instance = this.operatorType(expression.variable, this.props.schema);
      this.getOperatorlist(this.instance);
      this.renderRightExpression(this.instance);
    } else if (expression.isVariable === false && this.props.schema && expression.variable) {
      this.instance = expression.variable.type;
      this.renderRightExpression(this.instance);
      this.getOperatorlist(this.instance);
    } else {
      console.log('Invalid data or schema');
    }
  }
  propertyChanged(key, value) {
    this.props.simplecondition[key] = value;
    this.notifyChange();
  };
  notifyChange() {
    this.props.onPropertyChange('SimpleCondition', this.props.simplecondition);
  };
}
SimpleConditionComponent.propTypes = {
  simplecondition: React.PropTypes.object,
  onPropertyChange: React.PropTypes.func,
  id: React.PropTypes.number
};

