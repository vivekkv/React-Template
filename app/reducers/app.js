import { fromJS } from 'immutable';
import { UPDATE_USER_LOCATION } from '../constants';

var initialState = fromJS({
  "mapData": {},
  "user": {
      "location": null
  }
});

export default function appReducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_USER_LOCATION:
            return state.setIn(["user", "location"], action.coords)
        default :
             return state;
    }
}