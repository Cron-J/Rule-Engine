/**
 * Created by Eswer on 9/4/2015.
 */
// import Rule from 'rule.js';
/*
 TODO :  Coloring of variables , filtering of properties in select box,
   1. Unique identification of variable, constants, collections, aggregators using color codes.
   2. Filtering of properties in selectbox.
   3. if constant was selected on click to have a suitable constants dropdown. and identifying how to convert Constant to Variable.
   4.Schema conversion to hierarchy representation.
   5.Fixing bugs.
   6.Constant of type string to Quotes
   7.  Achieve below TBD with stephan.

   if Expression
   (sub-collection: iterate, filter, Expression)
   then action
   and also map.

   8.Achieve the following such as below TBD with stephan. or coming up with a solution.

   ex1 : function checkValidImage()
   file type: gif, jpeg
   size: from/to
   ... (external ..)

   ex2 : all Prices
   filter(attributeId="DocThumbnail")
   expression(value | endAfterDot) in [jpeg, gif...])

   ex3 : if "required field not field"
   2 fields are not filled
   then "store error"
   we don't know which one

   ex4: if "customerprice > stdprice"
   then "Show the wrong customerprices and customers"

   ex5: all Prices
   filter(attributeId="DocThumbnail")
   expression(value | endAfterDot) in [jpeg, gif...])

   8. Constant to support arbitrary number of inputs such as
   value in [jpeg,gif,png]
 */
import React from 'react';
import {Variable,AnyAllCondition} from '../reducers/grammar.js';
import Select from 'react-select';
import {AggregatorStore} from '../reducers/SchemaStore.js';
import AnyAllConditionComponent from './AnyAllCondition.react.js';
import LabelToSelect from '../common/labelToSelect.react.js';
import _ from 'lodash';
// import style from '../scss/components/ruleeditor.scss';

export default class VariableComponent extends React.Component{
  constructor(props) {
    super(props);
    this.processComponent();
  };
  componentWillReceiveProps(nxtprops) {
    this.props = nxtprops;
    this.processComponent();
  }
  //if key is selected render next child component
  renderChildVariable(key) {
    let object = this.props.objectschema;
    //console.log(object,'after operator selection')
    let isVariable = this.props.variable;
    let attributes = object[key];
    (attributes instanceof Array)? this.attributes = attributes[0] :this.attributes = attributes;
    // if attributes have instance render empty
    if (this.attributes && this.attributes.instance) {
      this.renderVariable = <span></span>;
    }else if (this.attributes && isVariable && isVariable.variable && isVariable.variable.isCollection === false) {
      // if isCollection is false render variable
      this.renderVariable = <VariableComponent key={key} variable={this.props.variable.variable} onPropertyChange={this.propertyChanged.bind(this)} objectschema={this.attributes}/>;
    }else if(this.attributes && isVariable && isVariable.variable && isVariable.variable.isCollection && isVariable.variable.variabletype === 'AnyAllCondition'){
      // if isCollection is true and Child is AnyAllCondition render variable with aggregators
      this.renderVariable = <VariableComponent key={key} variable={this.props.variable.variable} onPropertyChange={this.propertyChanged.bind(this)} objectschema={this.attributes}/>
    }else if(isVariable && isVariable.variable && isVariable.isCollection && isVariable.variabletype === 'AnyAllCondition' && _.isEmpty(isVariable.variable) !== true){
      // if isCollection is true and Child is AnyAllCondition render variable with AnyAllCondition
      this.renderVariable = <AnyAllConditionComponent anyallcondition={this.props.variable.variable} schema={this.props.objectschema} onPropertyChange={this.propertyChanged.bind(this)}></AnyAllConditionComponent>
    }
  }
  // sets this.options with keys
  processComponent() {
    this.options = [];
    let objectkeys = this.props.objectschema;
    let variable = this.props.variable;
    if(variable.isCollection && variable.variabletype === 'AnyAllCondition'){
      // overide with aggregators;
      objectkeys = new AggregatorStore();
    }
    for (let i in objectkeys) {
      if (objectkeys.hasOwnProperty(i) && !objectkeys[i].instance && typeof objectkeys[i] === 'object' && objectkeys[i].func === undefined) {
        this.options.push({value : [i,'>>'], label:[i ,' >>']});
      }else{
        this.options.push({value : [i], label:i} );
      }
    }
    // adding commands for constants.
    if(this.props.expressiontype){
      let commands = [{value:['String','>'],label:['Enter a value...','>']},{value:['Date','>'],label:['Select a Date...','>']},{value:['Boolean','>'],label:['Yes or No...','>']}];
      for(let command in commands){
        this.options.unshift(commands[command]);
      }
    }
    // on select  assign new varialbe component
    if (this.props.variable && this.props.variable.variable) {
      this.renderChildVariable(this.props.variable.key);
    }
  }
  render() {
    if (this.props.variable) {
      this.variableComponentRender = (
          <span ref="variable" className="variable">
            <LabelToSelect label={this.props.variable.key} options={this.options} onPropertyChange={this.handleChangeSelect.bind(this)} />
          {this.renderVariable}
          </span>
      );
    }else {
      this.variableComponentRender = (<span ref="variable" className="variable">
        <LabelToSelect label={this.props.variable.key} options={this.options} onPropertyChange={this.logChange.bind(this)} /></span>);
    }
    return (
        this.variableComponentRender
    );
  };
  logChange(val) {
    console.log("Selected: " + val);
  }
  InitComponentUnmount() {
    let mountNode = ReactDOM.findDOMNode(this.refs.variable);
    React.unmountComponentAtNode(mountNode);
  }
  handleChangeSelect(event) {
    /**
     * @return {boolean}
     */
    this.Operation = function(keys){
      let ischild = true;
      this.checkForAggregator = function(key) {
        let aggregatorlist = new AggregatorStore();
        for(let i in aggregatorlist){
          if(i === key){
            return true;
          }
        }
        return false;
      };
      let variable = this.props.variable;
      if(keys[1] === '>>'){
          variable.isCollection = true;
          variable.variable = new Variable(undefined,'AnyAllCondition');
          variable.variable.isCollection = true;
      }else if(keys[1] === '>'){
        this.props.expressiontype(keys[0]);
        ischild = false;
      }else if(keys[0]){
          // if aggregator store anyallcondition
          if(this.checkForAggregator(keys[0])){
            variable.variable = new AnyAllCondition();
          }else{
            variable.isCollection = false;
            variable.variable = new Variable(undefined);
          }
      }
      return ischild;
    };
    let keys = event;
    this.props.variable.key = keys[0];
    //variable ::= <Variable> | <AnyAllCondition>
    if(this.Operation(keys)){
      this.renderChildVariable(keys[0]);
      this.notifyChange();
    }
  }
  propertyChanged(key, value , anyallcondition) {
    if(anyallcondition){
      this.props.variable['variable'] = value;
    }else{
      this.props.variable[key] = value;
    }
    this.notifyChange();
  };
  notifyChange() {
    // console.log('updating properties notifychanges', this.props.variable);
    this.props.onPropertyChange('variable', this.props.variable);
  };
}
VariableComponent.propTypes = {
  variable: React.PropTypes.object,
  objectschema: React.PropTypes.object,
  onPropertyChange: React.PropTypes.func
};

