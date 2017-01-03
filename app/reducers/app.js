import { fromJS } from 'immutable';

var initialState = fromJS({
  "mapData": {},
  "user": {
     
  }
});

export default function appReducer(state = initialState, action) {
    switch(action.type) {
        default :
             return state;
    }
}