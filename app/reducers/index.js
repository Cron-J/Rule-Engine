import * as types from '../constants/ActionTypes';
import { combineReducers } from 'redux';
import { createReducer } from 'redux-create-reducer';
import * as grammar from './grammar';
/****************** Catch the actions here ****************************************/
//function getRules(state,action){
//  console.log('getrules called in reduces');
//  action.data.then(function(success){
//    state.rules = success;
//  },function(error){
//    console.log(error);
//  })
//}

console.log();
let revive = function(object){
  if(object && object.type){
    let JSfunctionstring = 'new grammar.'+object.type+'(object)';
    object = eval(JSfunctionstring);
  }
  for(let i in object){
    if(typeof object[i] === 'object'){
      let type = object[i].type;
      object[i] = revive(object[i]);
    }
  }
  return object;
};

const initialState = {
  rule : new grammar.Rule(),
  rules : []
};
var App = createReducer(initialState,{
  [types.EDITRULE](state,action){
    //console.log('Edit rule set state ------------------------->',action);
    let revivedrule = revive(action.payload.response.rule);
    revivedrule.updaterule = true;
    return {
      ...state,
      rule : revivedrule
    }
  },
  [types.UPDATERULESUCCESS](state,action){
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
