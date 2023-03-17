import content from '../defaults/defaultContent';
import defaultInitialState from '../defaults/defaultInitialState';

const contents = JSON.parse(content);

export const initialState: any = Object.assign({}, defaultInitialState);

function filterReducer(state = initialState, action): FilterState {
  let rulesCopy: any[];
  let key: string;

  switch (action.type) {
    case 'SET_SOCKETS':
      rulesCopy = state.rules.slice(0);
      key = Object.keys(rulesCopy[state.ruleIndex])[0];
      if (rulesCopy[state.ruleIndex][key][action.key]) {
        rulesCopy[state.ruleIndex][key][action.key].sockets[action.letter] = action.value;
      }
      return {
        ...state,
        rules: rulesCopy,
      };
      break;
    case 'DELETE_BLOCK':
      rulesCopy = state.rules.slice(0);
      rulesCopy.splice(action.index, 1);
      return {
        ...state,
        ruleIndex: action.index - 1,
        rules: rulesCopy,
      };
      break;
    case 'ADD_BLOCK':
      rulesCopy = state.rules.slice(0);
      const i = rulesCopy.length;
      rulesCopy[i] = {};
      rulesCopy[i][action.block] = {};
      return {
        ...state,
        ruleIndex: i,
        rules: rulesCopy,
      };
      break;
    case 'SET_INDEX':
      return {
        ...state,
        ruleIndex: action.index,
      };
      break;
    case 'SET_BLOCK':
      rulesCopy = state.rules.slice(0);

      rulesCopy[state.ruleIndex] = setKey(rulesCopy[state.ruleIndex], action.value);

      return {
        ...state,
        rules: rulesCopy,
      };
      break;
    case 'SET_PROPERTY':
      rulesCopy = state.rules.slice(0);
      key = Object.keys(rulesCopy[state.ruleIndex])[0];
      if (rulesCopy[state.ruleIndex][key][action.key]) {
        if (rulesCopy[state.ruleIndex][key][action.key][`${action.valueType}Values`]) {
          rulesCopy[state.ruleIndex][key][action.key][`${action.valueType}Values`][action.index] = action.value;
        }
      }
      return {
        ...state,
        rules: rulesCopy,
      };
      break;
    case 'SET_MULTIPLE':
      rulesCopy = state.rules.slice(0);
      key = Object.keys(rulesCopy[state.ruleIndex])[0];
      const returnValueIndex = (valuesArr: any[], val: any) => {
        for (let i = 0; i < valuesArr.length; i++) {
          if (val == valuesArr[i]) return i;
        }
        return false;
      };
      if (rulesCopy[state.ruleIndex][key][action.key]) {
        const i = returnValueIndex(
          rulesCopy[state.ruleIndex][key][action.key].textValues,
          action.value,
        );
        if (i || i === 0) {
          rulesCopy[state.ruleIndex][key][action.key].textValues.splice(i, 1);
        } else {
          rulesCopy[state.ruleIndex][key][action.key].textValues.push(action.value);
        }
      }
      return {
        ...state,
        rules: rulesCopy,
      };
      break;
    case 'SET_OPERATOR':
      rulesCopy = state.rules.slice(0);
      key = Object.keys(rulesCopy[state.ruleIndex])[0];
      if (rulesCopy[state.ruleIndex][key][action.key]) {
        rulesCopy[state.ruleIndex][key][action.key].operator = action.value;
      }
      return {
        ...state,
        rules: rulesCopy,
      };
      break;
    case 'SET_TURNER':
      rulesCopy = state.rules.slice(0);
      key = Object.keys(rulesCopy[state.ruleIndex])[0];
      if (action.turner) {
        let rule: any = {};
        if (action.operator) rule.operator = action.operator;
        if (action.numValues) rule.numValues = action.numValues;
        if (action.textValues) rule.textValues = action.textValues;
        if (action.sockets) rule.sockets = action.sockets;
        rulesCopy[state.ruleIndex][key][action.key] = rule;
      } else {
        delete rulesCopy[state.ruleIndex][key][action.key];
      }
      return {
        ...state,
        rules: rulesCopy,
      };
      break;
    default:
      return state;
  }
}

function setKey(obj, newKey) {
  const key = Object.keys(obj)[0];
  const value = obj[key];
  const newObj = {};

  newObj[newKey] = value;
  return Object.assign({}, newObj);
}

export default filterReducer;
