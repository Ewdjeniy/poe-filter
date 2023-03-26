function setLanguage(property: ActionProperty): object {
  return (dispatch) => {
    dispatch({
      type: 'SET_LANGUAGE',
      language: property.value,
    });
  };
}

export default setLanguage;
