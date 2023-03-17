import * as React from 'react';
import { connect } from 'react-redux';
import store from '../../store/configureStore';
import {
  setProperty,
  setOperator,
  setTurner,
  setMultiple,
  setSockets,
} from '../../actions/filterActions';
import Checkbox from '../../components/Checkbox';
import InptNumber from '../../components/InptNumber';
import Select from '../../components/Select';
import Multiple from '../../components/Multiple';
import Radio from '../../components/Radio';

class Property extends React.Component<PropertyProps, PropertyState> implements PropertyI {
  render(): JSX.Element {
    return (
      <article className="property">
        <Checkbox
          checked={this.checkIfRuleOn()}
          property={this.props.property}
          defaultVal={this.props.defaultVal}
          setAction={this.props.setTurnerAction}
          label={this.props.lang[this.props.property]}
          title={this.translate([this.props.property + 'Title'])[this.props.property + 'Title']}
        />
        {this[`render${this.props.instance}`]()}
      </article>
    );
  }

  renderMultiple(): any {
    return (
      <>
        <Multiple
          placeholder={this.translate([this.returnRule().values])[this.returnRule().values]}
          options={this.translate(this.props.content[this.props.options])}
          property={this.props.property}
          setAction={this.props.setMultipleAction}
        />
      </>
    );
  }

  renderOperatorNumColors(): any {
    const sockets: any = this.returnRule().sockets
      ? this.returnRule().sockets
      : this.props.defaultVal.sockets;
    const colors = {
      R: 'red',
      G: 'green',
      B: 'blue',
      W: 'white',
      A: 'abyss',
      D: 'delve',
    };
    const colorsList = Object.keys(sockets).map((color, i) => (
      <InptNumber
        key={`color_${i}`}
        color={colors[color]}
        letter={color}
        placeholder={color}
        value={sockets[color]}
        max="6"
        property={this.props.property}
        setAction={this.props.setSocketsAction}
      />
    ));
    return (
      <>
        <Select
          placeholder={this.translate([this.returnRule().operator])[this.returnRule().operator]}
          options={this.translate(this.props.content.operators)}
          property={this.props.property}
          setAction={this.props.setOperatorAction}
        />
        <InptNumber
          value={this.returnRule().numValues[0]}
          property={this.props.property}
          setAction={this.props.setPropertyAction}
          min={this.props.min}
          max={this.props.max}
        />
        {colorsList}
      </>
    );
  }

  renderOperatorNumMultiple(): any {
    return (
      <>
        <Select
          placeholder={this.translate([this.returnRule().operator])[this.returnRule().operator]}
          options={this.translate(this.props.content.operators)}
          property={this.props.property}
          setAction={this.props.setOperatorAction}
        />
        <InptNumber
          value={this.returnRule().numValues[0]}
          property={this.props.property}
          setAction={this.props.setPropertyAction}
          min={this.props.min}
          max={this.props.max}
        />
        <Multiple
          placeholder={this.returnRule().textValues}
          options={this.translate(this.props.content[this.props.options])}
          property={this.props.property}
          setAction={this.props.setMultipleAction}
        />
      </>
    );
  }

  renderSelect(): any {
    let operator: any = '';
    if (this.returnRule().operator) {
      operator = (
        <Select
          value={this.returnRule().operator}
          options={this.translate(this.props.content.operators)}
          property={this.props.property}
          setAction={this.props.setOperatorAction}
        />
      );
    }
    return (
      <>
        {operator}
        <Select
          placeholder={this.translate([this.returnRule().value])[this.returnRule().value]}
          options={this.translate(this.props.content[this.props.options])}
          property={this.props.property}
          setAction={this.props.setPropertyAction}
        />
      </>
    );
  }

  renderBoolean(): any {
    return (
      <>
        <Select
          placeholder={this.translate([this.returnRule().value])[this.returnRule().value]}
          options={this.translate(['True', 'False'])}
          property={this.props.property}
          setAction={this.props.setPropertyAction}
        />
      </>
    );
  }

  renderOperatorNum(): any {
    return (
      <>
        <Select
          placeholder={this.translate([this.returnRule().operator])[this.returnRule().operator]}
          options={this.translate(this.props.content.operators)}
          property={this.props.property}
          setAction={this.props.setOperatorAction}
        />
        <InptNumber
          index= {0}
          value={this.returnRule().numValues[0]}
          property={this.props.property}
          setAction={this.props.setPropertyAction}
          min={this.props.min}
          max={this.props.max}
        />
      </>
    );
  }

  renderNumericTwo(): any {
    return (
      <>
        <InptNumber
          value={this.returnRule().values ? this.returnRule().values[0] : ''}
          placeholder="id"
          property={this.props.property}
          setAction={this.props.setPropertyAction}
          index="0"
          min={this.props.min}
          max={this.props.max}
        />
        <InptNumber
          value={this.returnRule().values ? this.returnRule().values[1] : ''}
          placeholder="vol"
          property={this.props.property}
          setAction={this.props.setPropertyAction}
          index="1"
          min="0"
          max="300"
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
    setSocketsAction: (property: any) => dispatch(setSockets(property)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Property);
