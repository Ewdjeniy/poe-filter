import * as React from 'react';
import { connect } from 'react-redux';
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
      propertiesBoxPropertiesClass:
        'properties-box__properties properties-box__properties_hidden',
    };
  }

  render(): JSX.Element {
    const propertyList: JSX.Element[] = this.props.rules[this.props.label].map(
      (rule: object, i: number) => {
        const props: Props = {
          key: `property_${i}`,
          label: '',
          title: '',
          property: '',
          defaultVal: {},
          options: [],
          instance: '',
          translate: this.props.translate,
          translateOptions: this.props.translateOptions,
        };

        Object.keys(rule).forEach((key) => {
          props[key] = rule[key];
        });

        return React.createElement(Property, props);
      },
    );

    const block = () => <Block translate={this.props.translate} />;

    return (
      <article className="properties-box">
        <div
          className={this.state.propertiesBoxCheckboxClass}
          onClick={this.onCheckboxChange.bind(this)}
        >
          <div className="properties-box__checker"></div>
        </div>
        <div className="properties-box__box">
          <span
            className="properties-box__span"
            onClick={this.onCheckboxChange.bind(this)}
          >
            {this.props.translate(this.props.label)}
          </span>
          <div className={this.state.propertiesBoxPropertiesClass}>
            {this.props.label === 'Blocks' ? block() : propertyList}
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
        propertiesBoxCheckboxClass:
          'properties-box__checkbox properties-box__checkbox_checked',
        propertiesBoxPropertiesClass: 'properties-box__properties',
      });
    }
  }
}

const mapStateToProps = (store) => ({
  rules: store.filter.contents.rules,
});

export default connect(mapStateToProps)(PropertiesBox);
