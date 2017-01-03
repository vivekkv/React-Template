import { fromJS } from 'immutable';
import { SET_AVILABLE_DRIVERS } from '../constants/map'

var initialState = fromJS({
  "connectedDrivers": []
});

export default function mapReducer(state = initialState, action) {
    switch(action.type) {
        case SET_AVILABLE_DRIVERS:
            return state.setIn(["connectedDrivers"], action.connectedDrivers)
        default :
             return state;
    }
}