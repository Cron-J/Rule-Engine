/**
 * Created by Eswer on 9/2/2015
 */
// import Rule from 'rule.js';
import React from 'react';

export default class ActionComponent extends React.Component{
  componentWillMount() {
    // before rendering
  };
  componentDidMount() {
    // after rendering
  };
  componentWillUnmount() {
    // before un mount
  };
  render() {
    return (
      <div>
        <pre>Action</pre>
      </div>
    );
  }
  construcor() {
    this.action = this.props.action;
  };
  componentDidUnmount() {
    // before un mount
  }
}

ActionComponent.propTypes = {
  action: React.PropTypes.object
};
