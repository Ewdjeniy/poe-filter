import * as React from 'react';
import { connect } from 'react-redux';
import store from '../../store/configureStore';
import { setProperty, setOperator, setTurner, setMultiple } from '../filter/filterActions';
import Checkbox from '../../components/checkbox/Checkbox';
import InptNumber from '../../components/inptNumber/InptNumber';
import Select from '../../components/Select';
import Multiple from '../../components/Multiple';
import Radio from '../../components/radio/Radio';

class Property
  extends React.Component<PropertyProps, PropertyState>
  implements PropertyI
{
  render(): JSX.Element {
    return (
      <article className="property">
        <Checkbox
          checked={this.checkIfRuleOn()}
          property={this.props.property}
          defaultVal={this.props.defaultVal}
          setAction={this.props.setTurnerAction}
          label={this.props.lang[this.props.property]}
          title={
            this.translate([this.props.property + 'Title'])[
              this.props.property + 'Title'
            ]
          }
        />
        {this[`to${this.props.instance}`]()}
      </article>
    );
  }
  
  toMultiple(): any {
    return (
      <>
        <Multiple
          placeholder={
            this.translate([this.returnRule().value])[this.returnRule().value]
          }
          options={this.translate(this.props.content[this.props.options])}
          property={this.props.property}
          setAction={this.props.setMultipleAction}
        />
      </>
    );
  }

  toSelect(): any {
    let operator: any = '';
    if (this.returnRule().operator) {
      operator = (
        <Select
          value={this.returnRule().operator}
          options={this.translate(this.props.content.operators)}
          multiple="true"
          property={this.props.property}
          setAction={this.props.setOperatorAction}
        />
      );
    }
    return (
      <>
        {operator}
        <Select
          placeholder={
            this.translate([this.returnRule().value])[this.returnRule().value]
          }
          options={this.translate(this.props.content[this.props.options])}
          property={this.props.property}
          setAction={this.props.setPropertyAction}
        />
      </>
    );
  }

  toBoolean(): any {
    return (
      <>
        <Select
          placeholder={
            this.translate([this.returnRule().value])[this.returnRule().value]
          }
          options={this.translate(['True', 'False'])}
          property={this.props.property}
          setAction={this.props.setPropertyAction}
        />
      </>
    );
  }

  toNumeric(): any {
    return (
      <>
        <Select
          placeholder={
            this.translate([this.returnRule().operator])[
              this.returnRule().operator
            ]
          }
          options={this.translate(this.props.content.operators)}
          property={this.props.property}
          setAction={this.props.setOperatorAction}
        />
        <InptNumber
          value={this.returnRule().value}
          property={this.props.property}
          setAction={this.props.setPropertyAction}
          min={this.props.min}
          max={this.props.max}
        />
      </>
    );
  }

  translate(words: any[]): any {
    const result: any = {};
    words.forEach((word) => {
      const translation = this.props.lang[word] ? this.props.lang[word] : word;
      result[word] = translation;
    });
    return result;
  }

  checkIfRuleOn(): any {
    const rules =
      this.props.filter.rules[this.props.filter.ruleIndex][
        Object.keys(this.props.filter.rules[this.props.filter.ruleIndex])[0]
      ];

    for (let key in rules) {
      if (key == this.props.property) return true;
    }

    return false;
  }

  returnRule(): any {
    const rule =
      this.props.filter.rules[this.props.filter.ruleIndex][
        Object.keys(this.props.filter.rules[this.props.filter.ruleIndex])[0]
      ][this.props.property];
    if (rule) {
      return rule;
    }
    return this.props.defaultVal;
  }
}

const mapStateToProps = (store) => {
  return {
    filter: store.filter,
    content: store.filter.contents,
    lang: store.language.lang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPropertyAction: (property: any) => dispatch(setProperty(property)),
    setOperatorAction: (property: any) => dispatch(setOperator(property)),
    setTurnerAction: (property: any) => dispatch(setTurner(property)),
    setMultipleAction: (property: any) => dispatch(setMultiple(property)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Property);
