import api from '../common/api/save.js';
import * as types from '../constants/ActionTypes';
// Update the state with new rule
export function UpdateRule(updatedrule) {
  return {type: types.UPDATESTATE,payload:{response:updatedrule}}
}
// set Rule for Edit
export function EditRule(rule) {
  return {type: types.EDITRULE,payload:{response:rule}}
}
// Get rules list;
export function GetRules() {
  //console.log('api call to http://localhost:4000/api/ruleengine/getrules');
  return {types: [types.GETRULES, types.GETRULESSUCCESS, types.GETRULESFAILURE],
    payload: {response:api.getrules().then(response => response)}}
}

// update a rule
export function SaveRule(rule) {
  return {
    types: [types.UPDATERULE, types.UPDATERULESUCCESS, types.UPDATERULEFAILURE],
    payload: {response: api.updaterule({'name': rule.name, 'rule': rule}).then(response => response)}
  }
}
// create new rule
export function NewRule(rule) {
  return {
    types: [types.NEWRULE, types.NEWRULESUCCESS, types.NEWRULEFAILURE],
    payload: {response: api.newrule({'name': rule.name, 'rule': rule}).then(response => response)}
  }
}

