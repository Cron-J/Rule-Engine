import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { resetErrorMessage } from '../actions';
import * as ActionCreators from '../actions';
import Select from 'react-select';
import _ from 'lodash';
import RuleComponent from '../components/rule.react.js';
// redux actionbinding and utility functions
import { bindActionCreators} from 'redux';

class initState{
  constructor(){
    //showrule for managing views edit and new rule.
    this.showrule = false;
    this.editrules = true;
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDismissClick = this.handleDismissClick.bind(this);
    this.app =  this.props.state.App;
    this.state = new initState();
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage();
    e.preventDefault();
  }

  handleChange(nextValue) {
    // Available thanks to contextTypes below
    const { router } = this.context;
    router.transitionTo(`/${nextValue}`);
  }
  componentWillReceiveProps(nxtprops) {
    this.props = nxtprops;
    //console.log(this.props);
    this.app =  this.props.state.App;
  }

  componentWillMount(){
    if(this.app.rules && this.app.rules.length ===0){
      this.props.GetRules();
    }
    //console.log("component mounting",this.props.state.App);
  }
  setRuleToState(value) {
    //console.log(this.app);
    let index = _.findIndex(this.app.rules,{name: value});
    this.props.EditRule(this.app.rules[index]);
    this.setState({showrule : true});
  }
  rulesList() {
    let App;
    App = this.props.state.App;
    let rules = App.rules;
    let options = [];
    if(rules){
      for(let i=0;i<rules.length;i++){
        options.push({'label': rules[i].name, 'value': rules[i].name});
      }
    }else {
      console.log('no rules found');
    }
    this.rules =  <Select
        name="form-field-name"
        value = {App.rule.name}
        options={options} onChange={this.setRuleToState.bind(this)}
    />;
    //console.log(rules);
  }
  NewRule(){
    this.props.CreateRule();
    this.setState({editrules : false, showrule : true});
  }
  Back(){
    this.setState({editrules : true,
      showrule : false});
  }
  render() {
    // Injected by React Router
    const { location, children } = this.props;
    const { pathname } = location;
    const value = pathname.substring(1);
    this.rulesList();
    //console.log('this is ruleslist');
    return (
      <div>
        <div className="container">
          {this.state.editrules ?
              <div className="row">
                <div className="col-sm-8 form-group margintop20" >
                  {this.rules}
                </div>
                <div className="col-sm-4 form-group margintop20">
                  <button className="btn btn-default" type="submit" onClick={this.NewRule.bind(this)}>New Rule</button>
                </div>
              </div>
              : <div className="row"><div className="col-sm-offset-8 form-group margintop20" >
            <button className="btn btn-default margintop20" type="submit" onClick={this.Back.bind(this)}>Back</button>
          </div></div>}
        </div>
        {this.state.showrule ? <RuleComponent rule={this.props} onPropertyChange={this.propertyChanged.bind(this)}/>: null}
        <hr />
        {this.renderErrorMessage()}
        {children}
      </div>
    );
  }
  renderErrorMessage() {
    const { location, children } = this.props;
    const { errorMessage } = this.props;
    if (!errorMessage) {
      return null;
    }

    return (
        <p style={{ backgroundColor: '#e99', padding: 10 }}>
          <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
        Dismiss
        </a>)
        </p>
    );
  }
  propertyChanged(value) {
    this.app.rule = value;
    this.props.UpdateRule(this.app);
  }
}

App.propTypes = {
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }),
  params: PropTypes.shape({
    userLogin: PropTypes.string,
    repoName: PropTypes.string
  }).isRequired,
  children: PropTypes.node,
  UpdateRule: PropTypes.func.isRequired,
  NewRule: PropTypes.func.isRequired,
  EditRule: PropTypes.func.isRequired
};

App.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    state: state,
    errorMessage: state.errorMessage
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(App);
