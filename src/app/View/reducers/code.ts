import { SET_OPERATOR } from '../actions/CodeActions';

const initialState = {
  operator: 'Show',
};

function codeReducer(state = initialState, action): any {
  switch (action.type) {
    case SET_OPERATOR:
      return { ...state, operator: action.operator };
    default:
      return state;
  }
}

export default codeReducer;
