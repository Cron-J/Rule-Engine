/**
 * Created by Eswer on 9/4/2015.
 */
// import Rule from 'rule.js';
import React from 'react';
import _ from 'lodash';

export default class ConstantComponent extends React.Component{
  constructor(props) {
    super(props);
    this.list = ['String', 'Date', 'Boolean'];
    this.buildConstantComponent();
  };
  componentWillReceiveProps(nxtprops) {
    this.props = nxtprops;
    this.buildConstantComponent();
  };
  render() {
    return (
      <span>
      {this.selectBox}
      {this.renderComponent}
      </span>
    );
  }
  buildConstantComponent(onselectedType) {
    let type = this.props.constant.key ? this.props.constant.key : onselectedType;
    this.selectBox = (<span></span>);
    switch (type) {
      case 'String' : this.renderComponent = (
          <span>
            <input className="form-control input-sm" onChange={this.handleChangeInput.bind(this)} defaultValue={this.props.constant.value} type="text"/>
          </span>
      );
      break;
      case 'Boolean' : this.renderComponent = (
          <span>
            <input className="form-control input-sm" onChange={this.handleChangeInput.bind(this)} checked={this.props.constant.value === true} type="checkbox"/>
          </span>
      );
      break;
      case 'Date' : this.renderComponent = (
          <span>
            <input className="form-control input-sm" onChange={this.handleChangeInput.bind(this)} defaultValue={this.props.constant.value} type="date"/>
          </span>
      );
      break;
      default : this.renderComponent = (
          <span>
            <input className="form-control input-sm checkbox-primary" onchange={this.handleChangeInput.bind(this)} defaultValue={this.props.constant.value} type="text"/>
          </span>
      );
    }
    this.optionslist = [];
    this.list.map((listtype, id) => {
      this.optionslist.push(<option key={id} value={type === listtype} value={listtype}>{listtype}</option>);
    });
    this.selectBox = (
        <select className="form-control input-sm" defaultValue={this.props.constant.key} onChange={this.handleChangeSelect.bind(this)}>
        {this.optionslist}
        </select>
    );
  }
  handleChangeSelect(event) {
    let key = event.target.value;
    let value;
    if (key === 'Boolean') {
      value = event.target.checked;
    }
    this.props.constant.key = key;
    this.props.constant.value = value;
    // this.InitComponentUnmount();
    this.notifyChange();
  }
  callbacker = function (value) {
    this.props.constant.value = value;
    this.notifyChange();
  };
  inputupdate = _.debounce(this.callbacker,1000);
  handleChangeInput = function(event) {
    if(event.target.type === 'checkbox'){
      this.inputupdate(event.target.checked);
    }else{
      this.inputupdate(event.target.value);
    }
  };
  propertyChanged(key, value) {
    this.props.constant[key] = value;
    this.notifyChange();
  };
  notifyChange() {
    this.props.onPropertyChange('variable', this.props.constant);
  };
}
ConstantComponent.propTypes = {
  constant: React.PropTypes.object,
  onPropertyChange: React.PropTypes.func,
  type: React.PropTypes.string
};

