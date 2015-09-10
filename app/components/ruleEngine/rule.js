/**
 * Created by Eswer on 9/2/2015.
 */
import alt from 'altInstance';

class ruleStore {
  constructor() {
    this.rule = {
      name: '',
      action: [],
      condition: {}
    };
  };
}

// exports the message store
export default alt.createStore(ruleStore, 'ruleStore');
