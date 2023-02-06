export const SET_OPERATOR = 'SET_OPERATOR';

export function setOperator(operator: string): object {
  return (dispatch) => {
    dispatch({
      type: SET_OPERATOR,
      operator: operator,
    });
  };
}
