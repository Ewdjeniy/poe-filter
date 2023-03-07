import content from './contents.js';

const contents = JSON.parse(content);

export const initialState: any = {
  ruleIndex: 0,
  contents: contents,
  rules: [{ Show: { LinkedSockets: { operator: '>', value: 5 }, Rarity: { operator: '>', value: "Magic" }, } }, { Hide: { LinkedSockets: { operator: '<', value: 3 }, AreaLevel: { operator: '<', value: 80 }, } }],
};

function filterReducer(state = initialState, action): FilterState {
  let rulesCopy: any[];
  let key: string;

  switch (action.type) {
    case 'SET_INDEX':
      return {
        ...state,
        ruleIndex: action.index,
      };
      break;
    case 'SET_BLOCK':
      rulesCopy = state.rules.slice(0);

      rulesCopy[state.ruleIndex] = setKey(
        rulesCopy[state.ruleIndex],
        action.value,
      );

      return {
        ...state,
        rules: rulesCopy,
      };
      break;
    case 'SET_PROPERTY':
      rulesCopy = state.rules.slice(0);
      key = Object.keys(rulesCopy[state.ruleIndex])[0];
      console.log(action);
      rulesCopy[state.ruleIndex][key][action.key].value =
        action.value;
      return {
        ...state,
        rules: rulesCopy,
      };
      break;
    case 'SET_OPERATOR':
      rulesCopy = state.rules.slice(0);
      key = Object.keys(rulesCopy[state.ruleIndex])[0];
      rulesCopy[state.ruleIndex][key][action.key].operator = action.value;
      return {
        ...state,
        rules: rulesCopy,
      };
      break;
    case 'SET_TURNER':
      rulesCopy = state.rules.slice(0);
      key = Object.keys(rulesCopy[state.ruleIndex])[0];
      if (action.turner) {
        rulesCopy[state.ruleIndex][key][action.key] = action.operator ? { operator: action.operator, value: action.value } : { value: action.value };
        console.log(rulesCopy[state.ruleIndex][key][action.key]);
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
