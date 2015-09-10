/**
 * Created by Eswer on 9/2/2015.
 */
// import Rule from 'rule.js';
import React from 'react';

import style from 'scss/components/ruleeditor.scss';
import {SimpleCondition, Condition} from 'stores/RuleEngine/RuleStore.js';
import SimpleConditionComponent from './simplecondition.react.js';
import Button from 'react-bootstrap/lib/Button';
import {ButtonGroup} from 'react-bootstrap';

export default class ConditionComponent extends React.Component {
  constructor(props) {
    super(props);
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
  }
  componentWillUnmount() {
    // before un mount
  };
  _onOptionChange(value) {
    this.props.condition.anyall = value;
  }
  render() {
    return (
      <form>
        <div>
          <ButtonGroup bsSize="xsmall">
            <Button onClick={this.propertyChanged.bind(this, 'anyall', 'All')} active={this.props.condition.anyall === 'All'}>All</Button>
            <Button onClick={this.propertyChanged.bind(this, 'anyall', 'Any')} active={this.props.condition.anyall === 'Any'}>Any</Button>
          </ButtonGroup>
          <ul className={style.treeRoot}>
            {
              this.props.condition.simpleconditions.map((simplecondition, i) => {
                console.log('i', i);
                return (<li key={i} className={style.treeChild}>
                  <div className="row">
                    <div className="col-md-10">
                      <div className={style.treeChildDiv}>
                        <SimpleConditionComponent key={i} id={i} simplecondition={simplecondition} onPropertyChange={this.propertyChanged.bind(this)}/>
                      </div>
                    </div>
                    <div className="col-md-2 form-inline">
                      <button type="button" onClick={this.deleteSimpleCondition.bind(this, i)} className="btn btn-default">delete</button>
                    </div>
                  </div>
                </li>);
              })
            }
            <li className={style.treeChild}>
              {
                this.props.condition.conditions.map((condition, i) => {
                  return (<div className={style.treeChildDiv}><ConditionComponent key={i} id={i} condition={condition} onPropertyChange={this.propertyChanged.bind(this)}/></div>);
                })
              }
              <div className={style.treeChildDiv}>
                <span className={style.buttonclick}>
                  <a onClick={this.addSubCondition.bind(this)}><span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span><span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span></a>
                </span>
              </div>
            </li>
            <li className={style.treeChild}>
              <div className={style.treeChildDiv}>
                <span className={style.buttonclick}>
                  <a onClick={this.addSimpleCondition.bind(this)}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></a>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </form>
    );
  };
  deleteSimpleCondition(index) {
    this.props.condition.simpleconditions.splice(index, 1);
    this.notifyChange();
  }
  addSubCondition() {
    this.props.condition.conditions.push(new Condition());
    this.notifyChange();
  }
  addSimpleCondition() {
    this.props.condition.simpleconditions.push(new SimpleCondition());
    console.log(this.props.condition);
    this.notifyChange();
  }
  propertyChanged(key, value, id) {
    if (typeof id === 'number') {
      this.props.condition[key][id] = value;
    }else {
      this.props.condition[key] = value;
    }
    this.notifyChange();
  };
  notifyChange() {
    if (this.props.id) {
      this.props.onPropertyChange('conditions', this.props.condition, this.props.id);
    }else {
      this.props.onPropertyChange('condition', this.props.condition);
    }
  };
  _handleClick() {
    // console.log(this);
  };
  componentDidUnmount() {
    // before un mount
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
