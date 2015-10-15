/**
 * Created by Eswer on 9/4/2015.
 */
// import Rule from 'rule.js';
import React from 'react';

export default class OperatorComponent extends React.Component{
  constructor(props) {
    super(props);
    // console.log('--props operator----', this.props.operator.label);
    // console.log('--state----', this.state);
  };
  componentWillMount() {
    // after rendering
    // console.log('Operator compenent will mount');
  };
  componentDidMount() {
    // before rendering
    // console.log('Operator is mounted');
  };
  componentWillUnmount() {
    // before un mount
    // console.log('Operator is willunmount');
  };
  render() {
    return <span>{this.props.operator.label}</span>;
  }
}
// Operator.defaultProps = {
// eachcondition: (this.props.eachcondition === undefined ? {} : this.props.eachcondition)
// };
OperatorComponent.propTypes = {
  operator: React.PropTypes.object
};

