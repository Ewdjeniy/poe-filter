import * as React from 'react';
import { connect } from 'react-redux';
import store from '../../store/configureStore';
import Radio from '../../components/radio/Radio';
import { setLanguage } from './languageActions';
import languages from './languages.js';

const langs = JSON.parse(languages);

class Language
  extends React.Component<LanguageProps, LanguageState>
  implements LanguageI
{
  render(): JSX.Element {
    const langList = Object.keys(langs).map((lang, i) => (
      <Radio
        key={`lang_${i}`}
        instance="Flag"
        name="Language"
        imgSrc={require(`./images/${lang}.png`)}
        imgAlt={lang}
        value={lang}
        checked={this.props.language}
        setAction={this.props.setLanguageAction.bind(this)}
      />
    ));
    return <article className="language">{langList}</article>;
  }
}

const mapStateToProps = (store) => {
  return {
    language: store.language.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguageAction: (language: string) => dispatch(setLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Language);
