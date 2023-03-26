import languages from '../defaults/Languages';

const lang = JSON.parse(languages);

export const initialState: languageInitialState = {
  language: 'english',
  lang: lang.english,
};

function languageReducer(
  state = initialState,
  action = { language: 'english', type: 'SET_LANGUAGE' },
): languageInitialState {
  switch (action.type) {
    case 'SET_LANGUAGE': {
      return {
        ...state,
        language: action.language,
        lang: lang[action.language],
      };
    }
    default:
      return state;
  }
}

export default languageReducer;
