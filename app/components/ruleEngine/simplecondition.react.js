// import Rule from 'rule.js';
import React from 'react';
import {Operator} from 'stores/RuleEngine/RuleStore.js';
import style from 'scss/components/ruleeditor.scss';
import ExpressionComponent from './expression.react.js';
import OperatorComponent from './operator.react.js';

export default class SimpleConditionComponent extends React.Component{
  constructor(props) {
    super(props);
    this.operatorslist = [
      new Operator('gt', 'is greater than'), new Operator('lt', 'is less than'), new Operator('eq', 'is equal to'), new Operator('contains', 'contains')
    ];
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
  componentWillUnmount() {
    // before un mount
    // console.log('simplecondition is willunmount');
  };
  render() {
    return (
      <div className="form-inline">
        <ExpressionComponent className={style.expression} expression={this.props.simplecondition.lexpression} expressionType="lexpression" onPropertyChange={this.propertyChanged.bind(this)}/>
        <select className="form-control input-sm">
        {
          this.operatorslist.map((operator, id) => {
            // console.log('operator each data', operator);
            return (<option key={id} value={operator.id}>
              <OperatorComponent operator={operator}/>
            </option>);
          })
        }
        </select>
        <ExpressionComponent className={style.expression} expression={this.props.simplecondition.rexpression} expressionType="rexpression" onPropertyChange={this.propertyChanged.bind(this)}/>
      </div>
    );
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

