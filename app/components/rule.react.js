/**
 * Created by Eswer on 9/2/2015.
 */
import React from 'react';
import {Rule,AnyAllCondition} from '../reducers/grammar.js';
import _ from 'lodash';
import {Action} from '../reducers/grammar.js';
// import Action from './action.react.js';
import AnyAllConditionComponent from './AnyAllCondition.react.js';
import ActionComponent from './action.react.js';
import ConditionComponent from './condition.react.js';
import SchemaStore from '../reducers/SchemaStore.js';

export default
class RuleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.rule.state.App.rule;
    let schema = new SchemaStore();
    this.schema = schema.schema;
  };
  componentWillReceiveProps(nxtprops) {
    this.props = nxtprops;
    //console.log(this.props);
    this.setState({...this.props.rule.state.App.rule});
  };
  render() {
    if(this.state.actions){
      return (
          <div className="container">
            <div className="row col-sm-12 form-group">
              <input type="name" className="form-control" id="name" value={this.state.name} onChange={this.modifyRuleName.bind(this)} placeholder="Rule Name" />
            </div>
            <div className="row col-sm-8">
              <h2> If </h2>
            </div>
            <div className="row col-sm-4">
              <button className="btn btn-default margintop20" type="submit" onClick={this.saveRule.bind(this)}>Save Rule</button>
              <button className="btn btn-default margintop20" type="submit" onClick={this.runRule.bind(this)}>Run Rule</button>
            </div>
            <div className="row col-sm-12">
              <AnyAllConditionComponent anyallcondition={this.state.condition} schema={this.schema[this.state.schemaId]} onPropertyChange={this.propertyChanged.bind(this)}></AnyAllConditionComponent>
            </div>
            <div className="row col-sm-12">
              <h2> Then
              </h2>
              <ul className="treeRoot">
            {
                this.state.actions.map((action, i) => {
                  return (<li key={i} className="treeChild">
                    <div className="treeChildDiv">
                      <ActionComponent key={i} id={i} action={action}/>
                    </div>
                  </li>);
                })
                }
                <li className="treeChild">
                  <div className="treeChildDiv">
                    <button className="btn btn-default btn-xs margin5topbottom" type="submit" onClick={this.addAction.bind(this)}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span>Add Action</button>
                  </div>
                </li>
              </ul>
            </div>
            <div className="row">
              <div className="col-sm-5">
                <h2> Preview
                </h2>
                <div className="custom-well">
                </div>
              </div>
            </div>
          </div>
      );
    }else{
      console.log('this.state.actions rule is not defined');
      return(<span></span>);
    }

  }
  runRule() {
    console.log(this.state.condition instanceof AnyAllCondition);
    this.state.toJSExpression();
  }
  saveRule() {
    this.checkDuplicateRules = (rule) => {
      let rules = this.props.rule.state.App.rules;
      let found = _.find(rules,function(rulenames){
        return rulenames.name === rule.name;
      });
      if(found && rule.updaterule){
        return 'updaterule';
      }else{
        return 'createRule';
      }
    };
    let ruleType = this.checkDuplicateRules(this.state)
    if(this.state.name === ""){
        console.log('rule should have a name');
    }else if(ruleType === 'updaterule'){
      this.props.rule.SaveRule(this.state);
    }else if(ruleType === 'createRule'){
      this.props.rule.NewRule(this.state);
    }

  }
  addAction() {
    this.state.actions.push(new Action('A action created'));
    this.propertyChanged('actions', this.state.actions);
  }
  modifyRuleName(event) {
    let name = event.target.value;
    this.setState({...this.state, name: name});
    this.notifyChange();
  }
  propertyChanged(key, value) {
    let change = this.state;
    change[key] = value;
    this.setState({...change});
    this.notifyChange();
  };
  notifyChange() {
      this.props.onPropertyChange(this.state);
  }
}

RuleComponent.propTypes = {
  rule: React.PropTypes.object
};
