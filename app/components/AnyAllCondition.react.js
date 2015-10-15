/**
 * Created by Eswer on 9/2/2015.
 */

import React from 'react';

import {SimpleCondition, Condition} from '../reducers/index.js';
import ConditionComponent from './condition.react.js';
import Button from 'react-bootstrap/lib/Button';
import {ButtonGroup} from 'react-bootstrap';

export default class AnyAllConditionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.prerender();
        //console.log('allAnycondition',this.props.schema);
        this.schema = this.props.schema;
    };
    componentWillMount() {
        // after rendering
        // console.log('condition compenent will mount');
    };
    componentDidMount() {
        // before rendering
        // console.log('component is mounted');
    };
    componentWillReceiveProps(nxtprops) {
        this.props = nxtprops;
        this.prerender();
    }
    componentWillUnmount() {
        // before un mount
    };
    prerender() {
        this.state = this.props;
        let condition = this.props.anyallcondition;
        if (condition && condition.conditions && condition.conditions.length > 0) {
            this.subConditions = this.state.anyallcondition.conditions.map((condition, i) => {
                return (
                    <li className="treeChild">
                        <div className="treeChildDiv">
                            <div className="row">
                                <div className="col-md-11">
                                    <ConditionComponent key={i} id={i} schema={this.schema} condition={condition} PropertyChange={this.propertyChanged.bind(this)}/>
                                </div>
                                <div className="col-md-1 form-inline">
                                    <span type="button" onClick={this.deleteCondition.bind(this, i)} className="btn btn-default"><span  className="glyphicon glyphicon-remove iconsize1em" aria-hidden="true"></span></span>
                                </div>
                            </div>
                        </div>
                    </li>
                )
            })
        }else {
            this.subConditions = <span></span>
        }

    }
    render() {
        return (
            <form>
                <div>
                    <div>
                        <ButtonGroup bsSize="xsmall">
                            <Button onClick={this.propertyChanged.bind(this, 'All')} active={this.props.anyallcondition.on === 'All'}>All</Button>
                            <Button onClick={this.propertyChanged.bind(this, 'Any')} active={this.props.anyallcondition.on === 'Any'}>Any</Button>
                        </ButtonGroup>
                    </div>
                    <ul className="treeRoot">
                    {this.subConditions}
                        <li className="treeChild">
                            <div className="treeChildDiv">
                                <div className="row">
                                    <div className="col-md-12">
                                        <ButtonGroup bsSize="xsmall" className="margin5topbottom">
                                            <Button onClick={this.addCondition.bind(this, false)}><span className="glyphicon glyphicon-plus iconsize11" aria-hidden="true"></span>Condition</Button>
                                            <Button onClick={this.addCondition.bind(this, true)}><span className="glyphicon glyphicon-plus iconsize11" aria-hidden="true"></span>All/Any Condition</Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </form>
        );
    };
    deleteCondition(index) {
        let conditions = this.state.anyallcondition.conditions;
        if(conditions && conditions.length === 2){
            this.state.anyallcondition.on ='';
        }
        conditions.splice(index, 1);
        this.notifyChange();
    }
    addCondition(value) {
        let anyallcondition = this.state.anyallcondition;
        if(anyallcondition.conditions.length === 1){
            this.props.anyallcondition.on = 'All';
        }
        if(value){
            anyallcondition.conditions.push(new Condition(true));// condition true returns group
        }else {
            anyallcondition.conditions.push(new Condition(false));// condition false return simplecondition
        }
        this.notifyChange();
    }
    onPropertyChange(index, value) {
        this.props.anyallcondition.conditions[index] = value;
        this.notifyChange();
    }
    propertyChanged(value , index) {
         if (index > -1) {
            // modify condition data
            this.props.anyallcondition.conditions[index] = value;
        }else {
            this.props.anyallcondition.on = value;
        }
        this.notifyChange();
    };
    notifyChange() {
        this.props.onPropertyChange('condition', this.state.anyallcondition,'AnyAllCondition');
    };
    _handleClick() {
        // console.log(this);
    };
}

ConditionComponent.defaultProps = {
    // ConditionComponent: this.props.condition
};


ConditionComponent.propTypes = {
    condition: React.PropTypes.object,
    onPropertyChange: React.PropTypes.func,
    id: React.PropTypes.number
};

