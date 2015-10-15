import * as types from '../constants/ActionTypes';
import { combineReducers } from 'redux';
import squel from 'squel';
import { createReducer } from 'redux-create-reducer';
import * as grammar from './grammar';
/****************** Common functions **********************************************/
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
          ? args[number]
          : match
          ;
    });
  };
}

/****************** End of Common functions **********************************************/
/****************** Catch the actions here ****************************************/
function getRules(state,action){
  action.data.then(function(success){
    state.rules = success;
  },function(error){
    console.log(error);
  })
}

const initialState = {
  rule : new grammar.Rule(),
  rules : []
};
var App = createReducer(initialState,{
  [types.EDITRULE](state,action){
    //console.log('Edit rule set state ------------------------->',action);
    let rule = action.payload.response.rule;
    rule.updaterule = true;
    return {
      ...state,
      rule : action.payload.response.rule
    }
  },
  [types.CREATERULE](state,action){
     return {
       ...state,
       rule : new grammar.Rule()
     }
  },
  [types.UPDATESTATE](state,action){
    //console.log('update state ------------------------->',action);
    return {
      ...state,
      rule : action.payload.response.rule
    }
  },
  [types.GETRULES](state,action){
    //console.log('action called');
    return {
      ...state
    }
  },
  [types.GETRULESSUCCESS](state,action){
    //console.log('action called');
    return{
      ...state,
      rules : action.payload.response
    }
  },
  [types.GETRULESFAILURE](state,action){
    //console.log('action called');
    const { data } = action.payload;
    return {
      ...state,
    }
  }
});
const rootReducer = combineReducers({
  App
});

export default rootReducer;
