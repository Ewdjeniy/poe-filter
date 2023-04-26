import * as React from 'react';
import { connect } from 'react-redux';
import Checkbox from '../../components/Checkbox';
import Property from '../Property';
import Block from '../Block';

class PropertiesBox
  extends React.Component<PropertiesBoxProps, PropertiesBoxState>
  implements PropertiesBoxI
{
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
        <label className="properties-box__label">
          <Checkbox
            name={`${this.props.label}_property_box_checkbox`}
            checked={this.props.active}
            setAction={this.handleChange.bind(this)}
          />
          <span className="properties-box__span">
            {this.props.translate(this.props.label)}
          </span>
        </label>
        <div
          className={
            this.props.active
              ? 'properties-box__box properties-box__box_active'
              : 'properties-box__box'
          }
        >
          {this.props.label === 'Blocks' ? block() : propertyList}
        </div>
      </article>
    );
  }

  handleChange(): void {
    this.props.onclick(this.props.index);
  }
}

const mapStateToProps = (store) => ({
  rules: store.filter.contents.rules,
});

export default connect(mapStateToProps)(PropertiesBox);
