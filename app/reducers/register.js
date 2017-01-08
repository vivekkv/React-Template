import { fromJS } from 'immutable'
import { INPUT_CHANGED } from '../constants/register'

var initialState = fromJS({
  "formData": {},
});

export default function loginReducer(state = initialState, action) {
    switch(action.type) {
        case INPUT_CHANGED: 
            return state.set('formData', state.get('formData').set(action.name, { value: action.value }));
         default :
             return state;
    }
}