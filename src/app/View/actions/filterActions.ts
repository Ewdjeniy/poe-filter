export function clearFilter(): object {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_FILTER',
    });
  };
}

export function setColor(property: ActionProperty): object {
  return (dispatch) => {
    dispatch({
      type: 'SET_COLOR',
      key: property.key,
      index: property.index,
      rgb: property.rgb,
      alpha: property.alpha,
    });
  };
}

export function setSockets(property: ActionProperty): object {
  return (dispatch) => {
    dispatch({
      type: 'SET_SOCKETS',
      key: property.key,
      letter: property.letter,
      value: property.value,
    });
  };
}

export function deleteBlock(index: number): object {
  return (dispatch) => {
    dispatch({
      type: 'DELETE_BLOCK',
      index,
    });
  };
}

export function addBlock(obj: ActionProperty): object {
  return (dispatch) => {
    dispatch({
      type: 'ADD_BLOCK',
      block: obj.value,
    });
  };
}

export function setBlock(property: ActionProperty): object {
  return (dispatch) => {
    dispatch({
      type: 'SET_BLOCK',
      value: property.value,
    });
  };
}

export function setMultiple(property: ActionProperty): object {
  return (dispatch) => {
    dispatch({
      type: 'SET_MULTIPLE',
      key: property.key,
      value: property.value,
    });
  };
}

export function setProperty(property: ActionProperty): object {
  return (dispatch) => {
    dispatch({
      type: 'SET_PROPERTY',
      key: property.key,
      valueType: property.valueType,
      index: property.index,
      value: property.value,
    });
  };
}

export function setOperator(property: ActionProperty): object {
  return (dispatch) => {
    dispatch({
      type: 'SET_OPERATOR',
      key: property.key,
      value: property.value,
    });
  };
}

export function setTurner(property: ActionProperty): object {
  return (dispatch) => {
    dispatch({
      type: 'SET_TURNER',
      turner: property.turner,
      key: property.key,
      operator: property.operator,
      numValues: property.numValues,
      textValues: property.textValues,
      colorValues: property.colorValues,
      sockets: property.sockets,
    });
  };
}

export function setIndex(index: number): object {
  return (dispatch) => {
    dispatch({
      type: 'SET_INDEX',
      index,
    });
  };
}
