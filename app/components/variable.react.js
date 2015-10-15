/**
 * Created by Eswer on 9/4/2015.
 */
// import Rule from 'rule.js';
import React from 'react';
import {Variable} from '../reducers/index.js';
import Select from 'react-select';
// import style from '../scss/components/ruleeditor.scss';

export default class VariableComponent extends React.Component{
  constructor(props) {
    super(props);
    this.processComponent();
  };
  componentWillMount() {
    // before rendering
  };
  componentWillReceiveProps(nxtprops) {
    this.props = nxtprops;
    this.processComponent();
  }
  componentDidMount() {
    // aftr rendering
  };
  componentWillUnmount() {
    // before un mount
    // console.log('Variable is willunmount');
  };
  renderChildVariable(key) {
    let object = this.props.objectschema;
    //console.log(object,'after operator selection')
    this.attributes = object[key];
    if (this.attributes && this.attributes.instance) {
      this.renderVariable = <span></span>;
    }else if (this.attributes) {
      this.renderVariable = <VariableComponent key={key} variable={this.props.variable.variable} onPropertyChange={this.propertyChanged.bind(this)} objectschema={this.attributes}/>;
    }
  }
  processComponent() {
    this.options = [];
    let objectkeys = this.props.objectschema;
    for (let i in objectkeys) {
      if (objectkeys.hasOwnProperty(i)) {
        this.options.push({value : i, label: i});
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
                  name="form-field-name"
                  value="one"
                  selected={this.props.variable.key} value={this.props.variable.key}
                  options={this.options}
                  onChange={this.handleChangeSelect.bind(this)}
              />
            </span>
          {this.renderVariable}
          </span>
      );
    }else {
      this.variableComponentRender = (<span><Select
          name="form-field-name"
          className="form-control input-sm"
          value="one"
          options={this.options}
          onChange={this.logChange.bind(this)} allowClear="false"
      /></span>);
    }
    return (
        this.variableComponentRender
    );
  };
  logChange(val) {
    console.log("Selected: " + val);
  }
  InitComponentUnmount() {
    //console.log(this.refs.variable);
    let mountNode = ReactDOM.findDOMNode(this.refs.variable);
    React.unmountComponentAtNode(mountNode);
  }
  handleChangeSelect(event) {
    let key = event;
    //let key = event.target.value;
    this.props.variable.key = key;
    // this.InitComponentUnmount();
    this.props.variable.variable = new Variable(undefined);
    this.renderChildVariable(key);
    this.notifyChange();
  }
  propertyChanged(key, value) {
    this.props.variable[key] = value;
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

