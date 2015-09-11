/**
 * Created by Eswer on 9/2/2015.
 */
import React from 'react';
import Rule from 'stores/RuleEngine/RuleStore.js';
import {Action} from 'stores/RuleEngine/RuleStore.js';
import style from 'scss/components/ruleeditor.scss';
// import Action from './action.react.js';
import ActionComponent from './action.react.js';
import ConditionComponent from './condition.react.js';

export default
class RuleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = Rule.getState();
    // console.log('state', this.state);
  };
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
      <div className="container">
        <div className="row col-sm-12 form-group">
          <input type="name" className="form-control" id="name" placeholder="Rule Name" />
        </div>
        <div className="row col-sm-12">
          <h2> If </h2>
        </div>
        <div className="row col-sm-12">
          <ConditionComponent condition={this.state.condition} onPropertyChange={this.propertyChanged.bind(this)}/>
        </div>
        <div className="row col-sm-12">
          <h2> Then Action
          </h2>
          <ul className={style.treeRoot}>
            {
              this.state.actions.map((action, i) => {
                return (<li key={i} className={style.treeChild}>
                  <div className={style.treeChildDiv}>
                    <ActionComponent key={i} id={i} action={action}/>
                  </div>
                </li>);
              })
            }
            <li className={style.treeChild}>
              <span className={style.buttonclick}>
                <a onClick={this.addAction.bind(this)}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span>Add Action</a>
              </span>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col-sm-5">
            <h2> Preview
            </h2>
            <div className="custom-well">
            </div>
          </div>
        </div>
      </div>
    );
  }
  addAction() {
    this.state.actions.push(new Action('A action created'));
    this.propertyChanged('actions', this.state.actions);
  }
  propertyChanged(key, value) {
    //console.log('set state update', value);
    this.setState({key, value});
  };

  update() {
    // console.log('random update logic');
  };
  componentDidUnmount() {
    // before un mount
  };
}
