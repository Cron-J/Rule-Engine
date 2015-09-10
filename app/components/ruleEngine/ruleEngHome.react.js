import React from 'react';
export default
class RuleEngine extends React.Component {
  render() {
    return (
      <div className="container">
        <form name="rule_form">
          <div className="row">
            <div className="col-sm-6 form-group">
              <input type="text" className="form-control" name="Rule_Name" placeholder="Rule Name" required></input>
            </div>
            <div className="row pull-right">
              <button className="btn btn-primary pull-right">Run Rule</button>
            </div>
          </div>
        </form>
      </div>
      );
  }
}
