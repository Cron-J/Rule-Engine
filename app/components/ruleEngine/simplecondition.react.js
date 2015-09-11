// import Rule from 'rule.js';
import React from 'react';
// import {Operator} from 'stores/RuleEngine/RuleStore.js';
import style from 'scss/components/ruleeditor.scss';
import ExpressionComponent from './expression.react.js';
import OperatorComponent from './operator.react.js';
import Operatorslist from 'stores/RuleEngine/Operatorslist.js';
import SchemaStore from 'stores/RuleEngine/SchemaStore.js';

export default class SimpleConditionComponent extends React.Component{
  constructor(props) {
    super(props);
    // this.operatorslist = [
    //  new Operator('gt', 'is greater than'), new Operator('lt', 'is less than'), new Operator('eq', 'is equal to'), new Operator('contains', 'contains')
    // ];
    this.operators = new Operatorslist();
    this.schema = SchemaStore.getState();
    this.filteroperators();
    // console.log('--props----', this.props);
    // console.log('--state----', this.state);
  };
  componentWillMount() {
    // after rendering
    // console.log('simplecondition compenent will mount');
  };
  componentDidMount() {
    // before rendering
    // console.log('simplecondition is mounted');
  };
  componentWillReceiveProps(nxtprops) {
    this.props = nxtprops;
    this.filteroperators();
  }
  componentWillUnmount() {
    // before un mount
    // console.log('simplecondition is willunmount');
  };
  renderOperator() {
    if (this.operatorslist.length) {
      this.Operatorcomponent = (<select className="form-control input-sm" onChange={this.handleOperatorChange.bind(this)}><option>choose operator</option>
        {
            this.operatorslist.map((operator, id) => {
              return (<option key={id} value={operator.id}>
                <OperatorComponent operator={operator}/>
              </option>);
            })
            }
      </select>);
    }else {
      this.Operatorcomponent = <span></span>;
    }
  }
  renderRightExpression(instance) {
    if (instance) {
      this.rightExpressionComponent = (<ExpressionComponent className={style.expression} instanceType={this.instance} expression={this.props.simplecondition.rexpression} expressionType="rexpression" onPropertyChange={this.propertyChanged.bind(this)}/>);
    }else {
      this.rightExpressionComponent = <span> </span>;
    }
  }
  render() {
    return (
      <div className="form-inline">
        <ExpressionComponent className={style.expression} expression={this.props.simplecondition.lexpression} expressionType="lexpression" onPropertyChange={this.propertyChanged.bind(this)}/>
        {this.Operatorcomponent}
        {this.rightExpressionComponent}
      </div>
    );
  }
  handleOperatorChange(event) {
    let key = event.target.value;
    if (key) {
      this.rexpressiontype = this.instance;
      this.renderRightExpression(this.instance);
    }
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
    let expression = this.props.simplecondition.lexpression;
    if (expression.isVariable && this.schema.schema && expression.variable) {
      this.instance = this.operatorType(expression.variable, this.schema.schema);
      this.getOperatorlist(this.instance);
      this.renderRightExpression(this.instance);
    }else if (expression.isVariable === false && this.schema.schema && expression.variable) {
      this.instance = expression.variable.type;
      this.renderRightExpression(this.instance);
      this.getOperatorlist(this.instance);
    }else {
      console.log('Invalid data or schema');
    }
  }
  componentDidUnmount() {
    // before un mount
    // console.log('simplecondition is didunmount');
  };
  propertyChanged(key, value) {
    this.props.simplecondition[key] = value;
    this.notifyChange();
  };
  notifyChange() {
    this.props.onPropertyChange('simpleconditions', this.props.simplecondition, this.props.id);
  };
}
SimpleConditionComponent.propTypes = {
  simplecondition: React.PropTypes.object,
  onPropertyChange: React.PropTypes.func,
  id: React.PropTypes.number
};

