import * as React from 'react';
import { connect } from 'react-redux';
import Radio from '../../components/Radio';
import setLanguage from '../../actions/languageActions';
import languages from '../../defaults/Languages';

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
        /* eslint-disable */
        imgSrc={require(`./images/${lang}.png`)}
        /* eslint-enable */
        imgAlt={lang}
        value={lang}
        checked={this.props.language === lang}
        setAction={this.props.setLanguageAction.bind(this)}
      />
    ));

    return <article className="language">{langList}</article>;
  }
}

const mapStateToProps = (store) => ({
  language: store.language.language,
});

const mapDispatchToProps = (dispatch) => ({
  setLanguageAction: (property: object) => dispatch(setLanguage(property)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Language);
