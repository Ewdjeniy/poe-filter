import * as React from 'react';
import { connect } from 'react-redux';
import {
  setProperty,
  setOperator,
  setTurner,
  setMultiple,
  setSockets,
  setColor,
  setSwitcher,
} from '../../actions/filterActions';
import Checkbox from '../../components/Checkbox';
import InptNumber from '../../components/InptNumber';
import Select from '../../components/Select';
import Radio from '../../components/Radio';
import Multiple from '../../components/Multiple';
import InptColor from '../../components/InptColor';

class Property
  extends React.Component<PropertyProps, PropertyState>
  implements PropertyI
{
  render(): JSX.Element {
    return (
      <article className="property">
        <label className="property__label">
          <Checkbox
            checked={this.checkIfRuleOn()}
            property={this.props.property}
            name={`${this.props.property}_checkbox`}
            defaultVal={this.props.defaultVal}
            setAction={this.props.setTurnerAction}
          />
          <span className="property__span">
            {this.props.translate(this.props.property)}
          </span>
        </label>
        {this.renderProperty(this.props.instance)}
      </article>
    );
  }

  renderProperty(instance: string): JSX.Element {
    switch (instance) {
      case 'Rad': {
        const checked: boolean = this.props.filter.rules[this.props.filter.ruleIndex][Object.keys(this.props.filter.rules[this.props.filter.ruleIndex])[0]][this.props.property];
        return (
          <>
            <Radio
              instance="Radio"
              label={this.props.translate('Enable')}
              name={`${this.props.property}_radio`}
              property={this.props.property}
              value='true'
              checked={checked === true}
              setAction={this.props.setSwitcherAction}
            />
            <Radio
              instance="Radio"
              label={this.props.translate('Disable')}
              name={`${this.props.property}_radio`}
              property={this.props.property}
              value=''
              checked={checked === false}
              setAction={this.props.setSwitcherAction}
            />
          </>
        );
      }
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
              checked={this.checkIfRuleOn()}
              defaultVal={this.props.defaultVal}
              setTurner={this.props.setTurnerAction}
            />
            <label className="property__label">
              <Checkbox
                checked={!this.returnRule().textValues[1] === false}
                name={`${this.props.property}_checkbox`}
                property={this.props.property}
                setAction={this.props.setPropertyAction}
                value={this.props.value}
                index={1}
              />
              <span className="property__span">
                {this.props.translate(this.props.value)}
              </span>
            </label>
          </>
        );
      }
      case 'Mul': {
        return (
          <>
            <Multiple
              placeholder={this.translateArray(this.returnRule().textValues)}
              options={this.props.translateOptions(
                this.checkIfBaseType(this.props.content[this.props.options]),
              )}
              property={this.props.property}
              setAction={this.props.setMultipleAction}
              checked={this.checkIfRuleOn()}
              defaultVal={this.props.defaultVal}
              setTurner={this.props.setTurnerAction}
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
            checked={this.checkIfRuleOn()}
            defaultVal={this.props.defaultVal}
            setTurner={this.props.setTurnerAction}
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
              checked={this.checkIfRuleOn()}
              defaultVal={this.props.defaultVal}
              setTurner={this.props.setTurnerAction}
            />
            <InptNumber
              name={`${this.props.property}_sockets_val`}
              value={this.returnRule().numValues[0]}
              property={this.props.property}
              setAction={this.props.setPropertyAction}
              min={this.props.min}
              max={this.props.max}
              checked={this.checkIfRuleOn()}
              defaultVal={this.props.defaultVal}
              setTurner={this.props.setTurnerAction}
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
              checked={this.checkIfRuleOn()}
              defaultVal={this.props.defaultVal}
              setTurner={this.props.setTurnerAction}
            />
            <InptNumber
              name={`${this.props.property}_operator_num_multiple`}
              value={this.returnRule().numValues[0]}
              property={this.props.property}
              setAction={this.props.setPropertyAction}
              min={this.props.min}
              max={this.props.max}
              checked={this.checkIfRuleOn()}
              defaultVal={this.props.defaultVal}
              setTurner={this.props.setTurnerAction}
            />
            <Multiple
              placeholder={this.returnRule().textValues.join()}
              options={this.props.translateOptions(
                this.props.content[this.props.options],
              )}
              property={this.props.property}
              setAction={this.props.setMultipleAction}
              checked={this.checkIfRuleOn()}
              defaultVal={this.props.defaultVal}
              setTurner={this.props.setTurnerAction}
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
              checked={this.checkIfRuleOn()}
              defaultVal={this.props.defaultVal}
              setTurner={this.props.setTurnerAction}
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
              checked={this.checkIfRuleOn()}
              defaultVal={this.props.defaultVal}
              setTurner={this.props.setTurnerAction}
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
              checked={this.checkIfRuleOn()}
              defaultVal={this.props.defaultVal}
              setTurner={this.props.setTurnerAction}
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
              checked={this.checkIfRuleOn()}
              defaultVal={this.props.defaultVal}
              setTurner={this.props.setTurnerAction}
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
              checked={this.checkIfRuleOn()}
              defaultVal={this.props.defaultVal}
              setTurner={this.props.setTurnerAction}
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
              checked={this.checkIfRuleOn()}
              defaultVal={this.props.defaultVal}
              setTurner={this.props.setTurnerAction}
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
              checked={this.checkIfRuleOn()}
              defaultVal={this.props.defaultVal}
              setTurner={this.props.setTurnerAction}
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
              checked={this.checkIfRuleOn()}
              defaultVal={this.props.defaultVal}
              setTurner={this.props.setTurnerAction}
            />
          </>
        );
      }
      case 'SelNum': {
        return (
          <>
            <Select
              placeholder={this.returnRule().textValues[0]}
              options={this.props.translateOptions(
                this.props.content[this.props.options],
              )}
              property={this.props.property}
              setAction={this.props.setPropertyAction}
              checked={this.checkIfRuleOn()}
              defaultVal={this.props.defaultVal}
              setTurner={this.props.setTurnerAction}
            />
            <InptNumber
              name={`${this.props.property}_num`}
              value={
                this.returnRule().numValues ? this.returnRule().numValues[0] : 4
              }
              placeholder="vol"
              property={this.props.property}
              setAction={this.props.setPropertyAction}
              index={0}
              min={0}
              max={300}
              checked={this.checkIfRuleOn()}
              defaultVal={this.props.defaultVal}
              setTurner={this.props.setTurnerAction}
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
              checked={this.checkIfRuleOn()}
              defaultVal={this.props.defaultVal}
              setTurner={this.props.setTurnerAction}
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
              checked={this.checkIfRuleOn()}
              defaultVal={this.props.defaultVal}
              setTurner={this.props.setTurnerAction}
            />
          </>
        );
      }
      default:
        return <div>Check instances in content</div>;
    }
  }

  checkIfBaseType(options: any): string[] {
    if (this.props.property === 'BaseType') {
      const rule =
        this.props.filter.rules[this.props.filter.ruleIndex][
          Object.keys(this.props.filter.rules[this.props.filter.ruleIndex])[0]
        ];
      if (rule.Class) {
        const classNames: string[] = rule.Class.textValues;
        let opts: string[] = [];
        classNames.forEach((className) => {
          if (className.indexOf('Currency') !== -1) {
            opts = opts.concat(options.Currency, options['Stackable Currency']);
          } else if (className.indexOf('Delve') !== -1) {
            opts = opts.concat(
              options['Delve Socketable Currency'],
              options['Delve Stackable Socketable Currency'],
            );
          } else if (className.indexOf('Heist') !== -1) {
            opts = opts.concat(
              options['Heist Blueprint'],
              options['Heist Contract'],
              options['Heist Equipment Reward'],
              options['Heist Equipment Tool'],
              options['Heist Equipment Utility'],
              options['Heist Equipment Weapon'],
              options['Heist Objective'],
            );
          } else if (className.indexOf('Labyrinth') !== -1) {
            opts = opts.concat(
              options['Labyrinth Item'],
              options['Labyrinth Map Item'],
              options['Labyrinth Trinket'],
            );
          } else if (className.indexOf('Jewels') !== -1) {
            opts = opts.concat(options['Jewels'], options['Abyss Jewels']);
          } else if (className.indexOf('Flasks') !== -1) {
            opts = opts.concat(
              options['Hybrid Flask'],
              options['Life Flask'],
              options['Mana Flask'],
              options['Utility Flasks'],
            );
          } else if (className.indexOf('Gems') !== -1) {
            opts = opts.concat(
              options['Gems'],
              options['Active Skill Gem'],
              options['Support Skill Gem'],
            );
          } else {
            opts = opts.concat(options[className]);
          }
        });
        if (rule.BaseType && rule.BaseType.textValues[0]) {
          opts = opts.concat(rule.BaseType.textValues);
        }
        return opts;
      }
      let opts: any = [];
      Object.values(options).forEach((optionsArr) => {
        opts = opts.concat(optionsArr);
      });
      return opts;
    }
    return options;
  }

  translateArray(words: string[]): string {
    let result = [];
    words.forEach((word) => {
      result.push(this.props.translate(word));
    });
    return result.join();
  }

  checkIfRuleOn(): boolean {
    if (this.props.filter.rules[this.props.filter.ruleIndex] && this.props.filter.rules[this.props.filter.ruleIndex][
        Object.keys(this.props.filter.rules[this.props.filter.ruleIndex])[0]
      ]) {
      const rules =
      this.props.filter.rules[this.props.filter.ruleIndex][
        Object.keys(this.props.filter.rules[this.props.filter.ruleIndex])[0]
      ];

      const keys = Object.keys(rules);

      for (let i = 0; i < keys.length; i += 1) {
        if (keys[i] === this.props.property) return true;
      }
    }
    return false;
  }

  returnRule(): RuleInterface {
    
    if (this.props.filter.rules[this.props.filter.ruleIndex] && this.props.filter.rules[this.props.filter.ruleIndex][
        Object.keys(this.props.filter.rules[this.props.filter.ruleIndex])[0]
      ]) {
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
  setSwitcherAction: (property: object) => dispatch(setSwitcher(property)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Property);
