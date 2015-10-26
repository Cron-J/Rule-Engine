/**
 * Created by Eswer on 9/4/2015.
 */
// import Rule from 'rule.js';
import React from 'react';
import {Variable,AnyAllCondition} from '../reducers/grammar.js';
import Select from 'react-select';
import {AggregatorStore} from '../reducers/SchemaStore.js';
import AnyAllConditionComponent from './AnyAllCondition.react.js';
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
        this.options.push({value : [i,'>>'], label:[i ,' >>'] });
      }else{
        this.options.push({value : [i], label:i} );
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
            <span ref="variableobject">
              <Select
                  name="form-field-name" noResultsText = "No properties found"
                  value={this.props.variable.key}
                  options={this.options}
                  onChange={this.handleChangeSelect.bind(this)}
              />
            </span>
          {this.renderVariable}
          </span>
      );
    }else {
      this.variableComponentRender = (<span ref="variable" className="variable">
        <span ref="variableobject">
        <Select
          name="form-field-name" noResultsText = "No properties found"
          className="form-control input-sm"
          options={this.options}
          onChange={this.logChange.bind(this)} allowClear="false"
      /></span></span>);
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
    this.Operation = function(keys){
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
      }else if(keys[0]){
          // if aggregator store anyallcondition
          if(this.checkForAggregator(keys[0])){
            variable.variable = new AnyAllCondition();
          }else{
            variable.isCollection = false;
            variable.variable = new Variable(undefined);
          }
      }
    };
    let keys = event;
    this.props.variable.key = keys[0];
    //variable ::= <Variable> | <AnyAllCondition>
    this.Operation(keys);
    this.renderChildVariable(keys[0]);
    this.notifyChange();
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

