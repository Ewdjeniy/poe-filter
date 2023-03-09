export function deleteBlock(index: number): object {
  return (dispatch) => {
    dispatch({
      type: 'DELETE_BLOCK',
      index: index,
    });
  };
}

export function addBlock(block: any): object {
  return (dispatch) => {
    dispatch({
      type: 'ADD_BLOCK',
      block: block,
    });
  };
}

export function setBlock(property: any): object {
  return (dispatch) => {
    dispatch({
      type: 'SET_BLOCK',
      value: property.value,
    });
  };
}

export function setProperty(property: any): object {
  return (dispatch) => {
    dispatch({
      type: 'SET_PROPERTY',
      key: property.key,
      value: property.value,
    });
  };
}

export function setOperator(property: any): object {
  return (dispatch) => {
    dispatch({
      type: 'SET_OPERATOR',
      key: property.key,
      value: property.value,
    });
  };
}

export function setTurner(property: any): object {
  return (dispatch) => {
    dispatch({
      type: 'SET_TURNER',
      turner: property.turner,
      key: property.key,
      operator: property.operator,
      value: property.value,
    });
  };
}

export function setIndex(index: any): object {
  return (dispatch) => {
    dispatch({
      type: 'SET_INDEX',
      index: index,
    });
  };
}
