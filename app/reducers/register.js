import { fromJS } from 'immutable'
import { INPUT_CHANGED, REGISTER_ERRORS } from '../constants/register'

var initialState = fromJS({
  "data": {},
  "errors": {}
});

export default function loginReducer(state = initialState, action) {
    switch(action.type) {
        case INPUT_CHANGED: 
            return state.set('data', state.get('data').set(action.name, { value: action.value }))
        case REGISTER_ERRORS:
            return state.set('errors', action.errors);
         default :
             return state;
    }
}