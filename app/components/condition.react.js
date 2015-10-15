/**
 * Created by Eswer on 9/2/2015.
 */
// import Rule from 'rule.js';
import React from 'react';

// import style from '../scss/components/ruleeditor.scss';
import {SimpleCondition, Condition} from '../reducers/index.js';
import SimpleConditionComponent from './simplecondition.react.js';
import AnyAllConditionComponent from './AnyAllCondition.react.js';
import Button from 'react-bootstrap/lib/Button';
import {ButtonGroup} from 'react-bootstrap';

export default class ConditionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.renderCondition();
    this.schema = this.props.schema;
  };
  componentWillMount() {
    // after rendering
    // console.log('condition compenent will mount');
  };
  componentDidMount() {
    // before rendering
    // console.log('component is mounted');
  };
  componentWillReceiveProps(nxtprops) {
    this.props = nxtprops;
    this.renderCondition();
  }
  componentWillUnmount() {
    // before un mount
  };
  render() {
    return (
      this.renderComponent
    );
  };
  renderCondition() {
     let condition = this.props.condition;
     if (condition) {
       if (condition.AnyAllCondition) {
         this.renderComponent = <AnyAllConditionComponent anyallcondition={condition.AnyAllCondition} schema={this.props.schema} onPropertyChange={this.propertyChanged.bind(this)}></AnyAllConditionComponent>
       }else if (condition.SimpleCondition) {
         this.renderComponent = <SimpleConditionComponent simplecondition={condition.SimpleCondition} schema={this.props.schema} onPropertyChange={this.propertyChanged.bind(this)}></SimpleConditionComponent>
       }else {
         console.log('ERROR : condition component class has no object with any or with simplecondition');
       }
     }else {
       console.log('ERROR : failed at condition component');
     }
  }
  propertyChanged(key,value, type) {
    if (key === 'SimpleCondition') {
      this.props.condition[key] = value;
    }else {
      this.props.condition[type] = value;
    }
    this.notifyChange();
  };

  notifyChange() {
      this.props.PropertyChange(this.props.condition, this.props.id);
  };
  _handleClick() {
    // console.log(this);
  };
}

ConditionComponent.defaultProps = {
  // ConditionComponent: this.props.condition
};


ConditionComponent.propTypes = {
  condition: React.PropTypes.object,
  onPropertyChange: React.PropTypes.func,
  id: React.PropTypes.number
};
