import { fromJS } from 'immutable';
import { INPUT_CHANGED } from '../constants/login'

var initialState = fromJS({
  "loginData": {},
});

export default function loginReducer(state = initialState, action) {
    switch(action.type) {
        case INPUT_CHANGED: 
            return state.set('loginData', state.get('loginData').set(action.name, { value: action.value }));
         default :
             return state;
    }
}