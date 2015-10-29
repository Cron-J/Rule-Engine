import React from 'react';
import Select from 'react-select';
export default class LabelToSelect extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nxtprops) {
        this.props = nxtprops;
    }
    render(){
        this.label = <span ref="label" className="variablelabel" onClick={this.toggleSelect.bind(this)}>{this.props.label} &nbsp;</span>;
        this.selectboxclass = 'variableobject';
        if(this.props.label){
            this.selectboxclass = 'hidden';
        }
        this.selectbox = <span ref="variableobject" className={this.selectboxclass}>
            <Select ref='selectBox'
                name="form-field-name" noResultsText = "No properties found"
                value={this.props.label}
                placeholder="select operator"
                options={this.props.options}
                optionRenderer={this.renderOption}
                valueRenderer={this.renderValue}
                onChange={this.handleOnChange.bind(this)}
                onBlur={this.handleOnChange.bind(this)}
            />
        </span>;
        return(
        <span ref="labelselect">
            {this.label}
            {this.selectbox}
        </span>);
    }
    renderOption(option) {
        let label = '', tag = '';
        if(typeof option.label === 'object')
        {
            label = option.label[0];
            let type = option.label[1];
            if(type === ' >>'){
                tag = <b style={{ color: option.hex }}>{label}</b>;
            }else if(type === '>'){
                tag = <i style={{ color: option.hex }}>{label}</i>;
            }
        }else{
            tag = <span style={{ color: option.hex }}>{option.label}</span>;
        }
        return tag;

    }
    renderValue(option) {
        let label = '', tag = '';
        if(typeof option.label === 'object')
        {
            label = option.label[0];
            let type = option.label[1];
            if(type === ' >>'){
                tag = <b style={{ color: option.hex }}>{label}</b>;
            }else if(type === '>'){
                tag = <i style={{ color: option.hex }}>{label}</i>;
            }
        }else{
            tag = <span style={{ color: option.hex }}>{option.label}</span>;
        }
        return tag;
    }
    toggleSelect(event,showlabel){
        let list = this.refs.variableobject;
        let label = this.refs.label;
        //if(label.textContent){
        label.className = showlabel === true ? 'variablelabel':'hidden';
        list.className = showlabel === true ? 'hidden' : 'variableobject';
        this.refs.selectBox.focus();
        //}
    }
    handleOnChange(event){
        this.toggleSelect(null,true);
        if(event[0]) {
            this.props.onPropertyChange(event);
        }
    }
}
LabelToSelect.propTypes = {
    options: React.PropTypes.object,
    onPropertyChange: React.PropTypes.func,
    label: React.PropTypes.String
};
