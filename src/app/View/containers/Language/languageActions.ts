export function setLanguage(property: any): object {
  return (dispatch) => {
    dispatch({
      type: 'SET_LANGUAGE',
      language: property.value,
    });
  };
}