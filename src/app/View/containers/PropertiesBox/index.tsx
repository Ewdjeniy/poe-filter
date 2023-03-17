import * as React from 'react';
import { connect } from 'react-redux';
import store from '../../store/configureStore';
import Property from '../Property';
import Block from '../Block';

class PropertiesBox
  extends React.Component<PropertiesBoxProps, PropertiesBoxState>
  implements PropertiesBoxI
{
  constructor(props) {
    super(props);
    this.state = {
      propertiesBoxTurner: 0,
      propertiesBoxCheckboxClass: 'properties-box__checkbox',
      propertiesBoxPropertiesClass: 'properties-box__properties properties-box__properties_hidden',
    };
  }

  render(): JSX.Element {
    const propertyList: any = this.props.rules[this.props.label].map((rule: any, i: any) => {
      const props: any = { key: `property_${i}` };
      for (let key in rule) {
        props[key] = rule[key];
      }
      return React.createElement(Property, props);
    });

    const block = () => <Block />;

    return (
      <article className="properties-box">
        <div
          className={this.state.propertiesBoxCheckboxClass}
          onClick={this.onCheckboxChange.bind(this)}
        >
          <div className="properties-box__checker"></div>
        </div>
        <div className="properties-box__box">
          <span className="properties-box__span" onClick={this.onCheckboxChange.bind(this)}>
            {this.translate([this.props.label])[this.props.label]}
          </span>
          <div className={this.state.propertiesBoxPropertiesClass}>
            {this.props.label == 'Blocks' ? block() : propertyList}
          </div>
        </div>
      </article>
    );
  }

  onCheckboxChange() {
    if (this.state.propertiesBoxTurner) {
      this.setState({
        propertiesBoxTurner: 0,
        propertiesBoxCheckboxClass: 'properties-box__checkbox',
        propertiesBoxPropertiesClass:
          'properties-box__properties properties-box__properties_hidden',
      });
    } else {
      this.setState({
        propertiesBoxTurner: 1,
        propertiesBoxCheckboxClass: 'properties-box__checkbox properties-box__checkbox_checked',
        propertiesBoxPropertiesClass: 'properties-box__properties',
      });
    }
  }

  translate(words: any[]): any {
    const result: any = {};
    words.forEach((word) => {
      const translation = this.props.lang[word] ? this.props.lang[word] : word;
      result[word] = translation;
    });
    return result;
  }
}

const mapStateToProps = (store) => {
  return {
    rules: store.filter.contents.rules,
    lang: store.language.lang,
  };
};

export default connect(mapStateToProps)(PropertiesBox);
