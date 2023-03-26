import * as React from 'react';
import { connect } from 'react-redux';
import {
  setProperty,
  setOperator,
  setTurner,
  setMultiple,
  setSockets,
  setColor,
} from '../../actions/filterActions';
import Checkbox from '../../components/Checkbox';
import InptNumber from '../../components/InptNumber';
import Select from '../../components/Select';
import Multiple from '../../components/Multiple';
import InptColor from '../../components/InptColor';

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
          name={`${this.props.property}_checkbox`}
          defaultVal={this.props.defaultVal}
          setAction={this.props.setTurnerAction}
          label={this.props.translate(this.props.property)}
          title={this.props.translate(`${this.props.property}Title`)}
        />
        {this.renderProperty(this.props.instance)}
      </article>
    );
  }

  renderProperty(instance: string): JSX.Element {
    switch (instance) {
      case 'SelChx': {
        return (
          <>
            <Select
              placeholder={this.props.translate(
                this.returnRule().textValues[0],
              )}
              options={this.props.translateOptions(
                this.props.content[this.props.options],
              )}
              property={this.props.property}
              setAction={this.props.setPropertyAction}
            />
            <Checkbox
              checked={!this.returnRule().textValues[1] === false}
              name={`${this.props.property}_checkbox`}
              property={this.props.property}
              label={this.props.translate(this.props.value)}
              index={1}
              value={this.props.value}
              setAction={this.props.setPropertyAction}
            />
          </>
        );
      }
      case 'Mul': {
        return (
          <>
            <Multiple
              placeholder={this.returnRule().textValues.join()}
              options={this.props.translateOptions(
                this.props.content[this.props.options],
              )}
              property={this.props.property}
              setAction={this.props.setMultipleAction}
            />
          </>
        );
      }
      case 'OprNumSoc': {
        const sockets: object = this.returnRule().sockets
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
            name={`${this.props.property}_socket_${color}`}
            key={`color_${i}`}
            color={colors[color]}
            letter={color}
            placeholder={color}
            value={sockets[color]}
            max={6}
            property={this.props.property}
            setAction={this.props.setSocketsAction}
          />
        ));
        return (
          <>
            <Select
              placeholder={this.props.translate(this.returnRule().operator)}
              options={this.props.translateOptions(
                this.props.content.Operators,
              )}
              property={this.props.property}
              setAction={this.props.setOperatorAction}
            />
            <InptNumber
              name={`${this.props.property}_sockets_val`}
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
      case 'OprNumMul': {
        return (
          <>
            <Select
              placeholder={this.props.translate(this.returnRule().operator)}
              options={this.props.translateOptions(
                this.props.content.Operators,
              )}
              property={this.props.property}
              setAction={this.props.setOperatorAction}
            />
            <InptNumber
              name={`${this.props.property}_operator_num_multiple`}
              value={this.returnRule().numValues[0]}
              property={this.props.property}
              setAction={this.props.setPropertyAction}
              min={this.props.min}
              max={this.props.max}
            />
            <Multiple
              placeholder={this.returnRule().textValues.join()}
              options={this.props.translateOptions(
                this.props.content[this.props.options],
              )}
              property={this.props.property}
              setAction={this.props.setMultipleAction}
            />
          </>
        );
      }
      case 'Sel': {
        let operator: JSX.Element | string = '';
        if (this.returnRule().operator) {
          operator = (
            <Select
              placeholder={this.props.translate(this.returnRule().operator)}
              options={this.props.translateOptions(
                this.props.content.Operators,
              )}
              property={this.props.property}
              setAction={this.props.setOperatorAction}
            />
          );
        }
        return (
          <>
            {operator}
            <Select
              placeholder={this.props.translate(
                this.returnRule().textValues[0],
              )}
              options={this.props.translateOptions(
                this.props.content[this.props.options],
              )}
              property={this.props.property}
              setAction={this.props.setPropertyAction}
            />
          </>
        );
      }
      case 'Num': {
        let operator: JSX.Element | string = '';
        if (this.returnRule().operator) {
          operator = (
            <Select
              placeholder={this.props.translate(this.returnRule().operator)}
              options={this.props.translateOptions(
                this.props.content.Operators,
              )}
              property={this.props.property}
              setAction={this.props.setOperatorAction}
            />
          );
        }
        return (
          <>
            {operator}
            <InptNumber
              name={`${this.props.property}_operator_num`}
              index={0}
              value={this.returnRule().numValues[0]}
              property={this.props.property}
              setAction={this.props.setPropertyAction}
              min={this.props.min}
              max={this.props.max}
            />
          </>
        );
      }
      case 'Col': {
        return (
          <>
            <InptColor
              index={0}
              name={`${this.props.property}_color`}
              value={this.returnRule().colorValues[0]}
              property={this.props.property}
              setAction={this.props.setColorAction}
              min={this.props.min}
              max={this.props.max}
            />
          </>
        );
      }
      case 'NumSelSel': {
        return (
          <>
            <InptNumber
              name={`${this.props.property}_num_select_select`}
              value={
                this.returnRule().numValues ? this.returnRule().numValues[0] : 2
              }
              property={this.props.property}
              setAction={this.props.setPropertyAction}
              index={0}
              min={this.props.min}
              max={this.props.max}
            />
            <Select
              placeholder={this.props.translate(
                this.returnRule().textValues[0],
              )}
              index={0}
              options={this.props.translateOptions(
                this.props.content[this.props.options[0]],
              )}
              property={this.props.property}
              setAction={this.props.setPropertyAction}
            />
            <Select
              placeholder={this.props.translate(
                this.returnRule().textValues[1],
              )}
              index={1}
              options={this.props.translateOptions(
                this.props.content[this.props.options[1]],
              )}
              property={this.props.property}
              setAction={this.props.setPropertyAction}
            />
          </>
        );
      }
      case 'NumNum': {
        return (
          <>
            <InptNumber
              name={`${this.props.property}_num_num_first`}
              value={
                this.returnRule().numValues ? this.returnRule().numValues[0] : 4
              }
              placeholder="id"
              property={this.props.property}
              setAction={this.props.setPropertyAction}
              index={0}
              min={this.props.min}
              max={this.props.max}
            />
            <InptNumber
              name={`${this.props.property}_num_num_second`}
              value={
                this.returnRule().numValues ? this.returnRule().numValues[1] : 4
              }
              placeholder="vol"
              property={this.props.property}
              setAction={this.props.setPropertyAction}
              index={1}
              min={0}
              max={300}
            />
          </>
        );
      }
      default:
        return <div>Check instances in content</div>;
    }
  }

  checkIfRuleOn(): boolean {
    const rules =
      this.props.filter.rules[this.props.filter.ruleIndex][
        Object.keys(this.props.filter.rules[this.props.filter.ruleIndex])[0]
      ];

    const keys = Object.keys(rules);

    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i] === this.props.property) return true;
    }

    return false;
  }

  returnRule(): RuleInterface {
    const rule: RuleInterface =
      this.props.filter.rules[this.props.filter.ruleIndex][
        Object.keys(this.props.filter.rules[this.props.filter.ruleIndex])[0]
      ][this.props.property];
    if (rule) {
      return rule;
    }
    return this.props.defaultVal;
  }
}

const mapStateToProps = (store) => ({
  filter: store.filter,
  content: store.filter.contents,
});

const mapDispatchToProps = (dispatch) => ({
  setPropertyAction: (property: object) => dispatch(setProperty(property)),
  setOperatorAction: (property: object) => dispatch(setOperator(property)),
  setTurnerAction: (property: object) => dispatch(setTurner(property)),
  setMultipleAction: (property: object) => dispatch(setMultiple(property)),
  setSocketsAction: (property: object) => dispatch(setSockets(property)),
  setColorAction: (property: object) => dispatch(setColor(property)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Property);
