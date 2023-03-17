import languages from '../defaults/defaultLanguage';

const lang = JSON.parse(languages);

export const initialState: any = {
  language: 'english',
  lang: lang['english'],
};

function languageReducer(state = initialState, action): any {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.language,
        lang: lang[action.language],
      };
      break;
    default:
      return state;
  }
}

export default languageReducer;
