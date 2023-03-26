import defaultInitialState from '../defaults/defaultInitialState';

export const initialState: FilterInitialState = structuredClone
  ? structuredClone(defaultInitialState)
  : { ...defaultInitialState };

function setKey(obj, newKey) {
  const key = Object.keys(obj)[0];
  const value = obj[key];
  const newObj = {};

  newObj[newKey] = value;
  return { ...newObj };
}

function filterReducer(
  state = initialState,
  action = {
    type: 'SET_COLOR',
    key: 'BaseType',
    operator: '>=',
    numValues: [4],
    textValues: [''],
    turner: true,
    valueType: 'num',
    value: 'Toxic',
    index: 0,
    block: 'Show',
    letter: 'G',
    rgb: [255, 255, 255],
    alpha: 255,
    colorValues: [[255, 255, 255, 255]],
    sockets: {
      R: 1,
      G: 3,
      B: 0,
      A: 0,
      D: 0,
      W: 0,
    },
  },
): FilterInitialState {
  switch (action.type) {
    case 'SET_COLOR': {
      const rulesCopy = state.rules.slice(0);
      const [key] = Object.keys(rulesCopy[state.ruleIndex]);
      if (rulesCopy[state.ruleIndex][key][action.key]) {
        const index = action.index ? action.index : 0;
        if (action.rgb) {
          action.rgb.forEach((val, i) => {
            rulesCopy[state.ruleIndex][key][action.key].colorValues[index][i] =
              val;
          });
        }
        if (action.alpha) {
          rulesCopy[state.ruleIndex][key][action.key].colorValues[index][3] =
            action.alpha;
        }
      }
      return {
        ...state,
        rules: rulesCopy,
      };
    }
    case 'CLEAR_FILTER': {
      const rulesCopy = defaultInitialState.rules.slice(0);
      return {
        ...state,
        ruleIndex: 0,
        rules: rulesCopy,
      };
    }
    case 'SET_MULTIPLE': {
      const rulesCopy = state.rules.slice(0);
      const [key] = Object.keys(rulesCopy[state.ruleIndex]);
      const returnValueIndex = (valuesArr: string[], val: string) => {
        for (let i = 0; i < valuesArr.length; i += 1) {
          if (val === valuesArr[i]) return i;
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
          rulesCopy[state.ruleIndex][key][action.key].textValues.push(
            action.value,
          );
        }
      }
      return {
        ...state,
        rules: rulesCopy,
      };
    }
    case 'SET_SOCKETS': {
      const rulesCopy = state.rules.slice(0);
      const [key] = Object.keys(rulesCopy[state.ruleIndex]);
      if (rulesCopy[state.ruleIndex][key][action.key]) {
        rulesCopy[state.ruleIndex][key][action.key].sockets[action.letter] =
          action.value;
      }
      return {
        ...state,
        rules: rulesCopy,
      };
    }
    case 'DELETE_BLOCK': {
      const rulesCopy = state.rules.slice(0);
      rulesCopy.splice(action.index, 1);
      return {
        ...state,
        ruleIndex: action.index - 1,
        rules: rulesCopy,
      };
    }
    case 'ADD_BLOCK': {
      const rulesCopy = state.rules.slice(0);
      const i: number = rulesCopy.length;
      rulesCopy[i] = {};
      console.log(action.block);
      rulesCopy[i][action.block] = {};
      return {
        ...state,
        ruleIndex: i,
        rules: rulesCopy,
      };
    }
    case 'SET_INDEX': {
      return {
        ...state,
        ruleIndex: action.index,
      };
    }
    case 'SET_BLOCK': {
      const rulesCopy = state.rules.slice(0);

      rulesCopy[state.ruleIndex] = setKey(
        rulesCopy[state.ruleIndex],
        action.value,
      );

      return {
        ...state,
        rules: rulesCopy,
      };
    }
    case 'SET_PROPERTY': {
      const rulesCopy = state.rules.slice(0);
      const [key] = Object.keys(rulesCopy[state.ruleIndex]);
      if (rulesCopy[state.ruleIndex][key][action.key]) {
        if (
          rulesCopy[state.ruleIndex][key][action.key][
            `${action.valueType}Values`
          ]
        ) {
          const index = action.index ? action.index : 0;
          const textValues =
            rulesCopy[state.ruleIndex][key][action.key][
              `${action.valueType}Values`
            ];
          if (action.value) {
            textValues[index] = action.value;
          } else {
            textValues.splice(index, 1);
          }
        }
      }
      return {
        ...state,
        rules: rulesCopy,
      };
    }
    case 'SET_OPERATOR': {
      const rulesCopy = state.rules.slice(0);
      const [key] = Object.keys(rulesCopy[state.ruleIndex]);
      if (rulesCopy[state.ruleIndex][key][action.key]) {
        rulesCopy[state.ruleIndex][key][action.key].operator = action.value;
      }
      return {
        ...state,
        rules: rulesCopy,
      };
    }
    case 'SET_TURNER': {
      const rulesCopy = state.rules.slice(0);
      const [key] = Object.keys(rulesCopy[state.ruleIndex]);
      if (action.turner) {
        const rule: RuleInterface = {};
        if (action.operator) rule.operator = action.operator;
        if (action.numValues) rule.numValues = action.numValues;
        if (action.textValues) rule.textValues = action.textValues;
        if (action.colorValues) rule.colorValues = action.colorValues;
        if (action.sockets) rule.sockets = action.sockets;
        rulesCopy[state.ruleIndex][key][action.key] = rule;
      } else {
        delete rulesCopy[state.ruleIndex][key][action.key];
      }
      return {
        ...state,
        rules: rulesCopy,
      };
    }
    default:
      return state;
  }
}

export default filterReducer;
