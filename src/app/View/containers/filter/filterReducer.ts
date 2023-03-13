import content from './contents.js';

const contents = JSON.parse(content);

export const initialState: any = {
  ruleIndex: 0,
  contents: contents,
  rules: [
    {
      Show: {
        LinkedSockets: { operator: '>', value: 5 },
        Rarity: { operator: '>', value: 'Magic' },
        ArchnemesisMod: { values: ['Steel-infused'] },
//        HasExplicitMod: { operator: '>=', value: [2, 'of Haast', 'of Tzteosh', 'of Ephij'] },
      },
    },
    {
      Hide: {
        LinkedSockets: { operator: '<', value: 3 },
        AreaLevel: { operator: '<', value: 80 },
      },
    },
  ],
};

function filterReducer(state = initialState, action): FilterState {
  let rulesCopy: any[];
  let key: string;

  switch (action.type) {
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
      if (rulesCopy[state.ruleIndex][key][action.key]) {
        rulesCopy[state.ruleIndex][key][action.key].value = action.value;
      }
      return {
        ...state,
        rules: rulesCopy,
      };
      break;
    case 'SET_MULTIPLE':
      rulesCopy = state.rules.slice(0);
      key = Object.keys(rulesCopy[state.ruleIndex])[0];
      const returnValueIndex = (valuesArr:any[], val: any) => {
        for (let i = 0; i < valuesArr.length; i++) {
          if (val == valuesArr[i]) return i;
        }
        return false;
      };
      if (rulesCopy[state.ruleIndex][key][action.key]) {
        const i = returnValueIndex(rulesCopy[state.ruleIndex][key][action.key].values, action.value);
        if (i || i === 0) {
          rulesCopy[state.ruleIndex][key][action.key].values.splice(i, 1);
        } else {
          rulesCopy[state.ruleIndex][key][action.key].values.push(action.value);
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
        rulesCopy[state.ruleIndex][key][action.key] = action.operator
          ? { operator: action.operator, value: action.value }
          : { value: action.value };
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
