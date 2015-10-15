/**
 * Created by Eswer on 9/4/2015.
 */
// import Rule from 'rule.js';
import React from 'react';

export default class ConstantComponent extends React.Component{
  constructor(props) {
    super(props);
    this.list = ['String', 'Date', 'Boolean'];
    this.buildConstantComponent();
  };
  componentWillMount() {
    // after rendering
    // console.log('Constant compenent will mount');
  };
  componentDidMount() {
    // before rendering
    // console.log('Constant is mounted');
  };
  componentWillReceiveProps(nxtprops) {
    this.props = nxtprops;
    this.buildConstantComponent();
  }
  componentWillUnmount() {
    // before un mount
    // console.log('Constant is willunmount');
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
    let type = this.props.constant.type ? this.props.constant.type : onselectedType;
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
      this.optionslist.push(<option key={id} selected={type === listtype} value={listtype}>{listtype}</option>);
    });
    this.selectBox = (
        <select className="form-control input-sm" onChange={this.handleChangeSelect.bind(this)}>
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
    this.props.constant.type = key;
    this.props.constant.value = value;
    // this.InitComponentUnmount();
    this.notifyChange();
  }
  handleChangeInput(event) {
    let value = event.target.value;
    if (this.props.constant.type === 'Boolean') {
      value = event.target.checked;
    }
    this.props.constant.value = value;
    this.notifyChange();
  }
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

