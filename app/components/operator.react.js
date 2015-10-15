/**
 * Created by Eswer on 9/4/2015.
 */
// import Rule from 'rule.js';
import React from 'react';

export default class OperatorComponent extends React.Component{
  constructor(props) {
    super(props);
  };
  render() {
    return <span>{this.props.operator.label}</span>;
  }
}
OperatorComponent.propTypes = {
  operator: React.PropTypes.object
};

