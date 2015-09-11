/**
 * Created by Eswer on 9/4/2015.
 */
// import Rule from 'rule.js';
import React from 'react';
import VariableComponent from './variable.react.js';
import ConstantComponent from './constant.js';
import {Variable, Constant} from 'stores/RuleEngine/RuleStore.js';
import SchemaStore from 'stores/RuleEngine/SchemaStore.js';
import Button from 'react-bootstrap/lib/Button';
import {ButtonGroup} from 'react-bootstrap';


export default class ExpressionComponent extends React.Component{
  constructor(props) {
    super(props);
    this.schema = SchemaStore.getState();
  };
  componentWillMount() {
    // after rendering
    // console.log('Expression compenent will mount');
  };
  componentDidMount() {
    // before rendering
    // console.log('Expression is mounted');
  };
  componentWillUnmount() {
    // before un mount
    // console.log('Expression is willunmount');
  };
  render() {
    this.variable = (<VariableComponent variable={this.props.expression.variable} objectschema={this.schema.schema} onPropertyChange={this.propertyChanged.bind(this)}/>);
    this.constant = (
      <span>
        <ConstantComponent constant={this.props.expression.variable} onPropertyChange={this.propertyChanged.bind(this)}/>
      </span>
    );
    this.expressionRender = this.props.expression.isVariable ? this.variable : this.constant;
    return (
      <span>
        <ButtonGroup bsSize="xsmall" vertical>
          <Button onClick={this.propertyChangedIsVariable.bind(this, 'isVariable', true)} active={this.props.expression.isVariable === true}>Variable</Button>
          <Button onClick={this.propertyChangedIsVariable.bind(this, 'isVariable', false)} active={this.props.expression.isVariable === false}>Constant</Button>
        </ButtonGroup>
        {this.expressionRender}
      </span>
    );
  }
  propertyChangedIsVariable(key, value) {
    this.props.expression[key] = value;
    this.props.expression.variable = value ? new Variable() : new Constant();
    this.notifyChange(this.props.expressionType);
  }
  propertyChanged(key, value) {
    this.props.expression[key] = value;
    this.notifyChange(this.props.expressionType);
  };
  notifyChange(expressionType) {
    this.props.onPropertyChange(expressionType, this.props.expression);
  };
  componentDidUnmount() {
    // before un mount
    // console.log('Expression is didunmount');
  };
}
ExpressionComponent.propTypes = {
  expression: React.PropTypes.object,
  expressionType: React.PropTypes.string,
  onPropertyChange: React.PropTypes.func
};

