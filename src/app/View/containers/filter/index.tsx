import * as React from 'react';
import { connect } from 'react-redux';
import { clearFilter } from '../../actions/filterActions';
import Menu from '../../components/Menu';
import Button from '../../components/Button';
import Code from '../../components/Code';
import Parser from '../Parser';
import Rules from '../Rules';
import PropertiesBox from '../PropertiesBox';

class Filter
  extends React.Component<FilterProps, FilterState>
  implements FilterI
{
  constructor(props) {
    super(props);
    this.state = {
      active: 'Constructor',
    };
  }

  instance: object = {
    Constructor: () => {
      const propertiesBoxes: JSX.Element[] = Object.keys(this.props.rules).map(
        (propsLabel, i) => (
          <PropertiesBox
            key={`propertiesBox_${i}`}
            label={propsLabel}
            translate={this.props.translate}
            translateOptions={this.props.translateOptions}
          />
        ),
      );
      return (
        <article className="filter__controls">
          <div className="filter__div">
            <form className="control-panel" name="control_panel">
              {propertiesBoxes}
            </form>
            <Rules
              translateOptions={this.props.translateOptions}
              translate={this.props.translate}
            />
          </div>
          <form className="filter__buttons" name="control_panel">
            <Button value="Clear" onclick={this.handleClearClick.bind(this)} />
            <Button value="Copy" onclick={this.handleCopyClick.bind(this)} />
          </form>
        </article>
      );
    },
    Parser: () => <Parser translate={this.props.translate} name="parser" />,
    About: () => <div>About</div>,
  };

  render(): JSX.Element {
    return (
      <section className="filter">
        <Menu
          onclick={this.setMenuContent.bind(this)}
          translate={this.props.translate}
        />
        {this.instance[this.state.active]()}
        <Code rules={this.props.state} />
      </section>
    );
  }

  handleClearClick(): void {
    this.props.clearFilterAction();
  }

  checkOnNoQuotes(word: string): boolean {
    const wordsWithNoQuotes: string[] = [
      'True',
      'False',
      'Normal',
      'Magic',
      'Rare',
      'Unique',
      'Superior',
      'Divergent',
      'Anomalous',
      'Phantasmal',
      'Red',
      'Green',
      'Blue',
      'Brown',
      'White',
      'Yellow',
      'Cyan',
      'Grey',
      'Orange',
      'Pink',
      'Purple',
      'Temp',
      'Circle',
      'Diamond',
      'Hexagon',
      'Square',
      'Star',
      'Triangle',
      'Cross',
      'Moon',
      'Raindrop',
      'Kite',
      'Pentagon',
      'UpsideDownHouse',
    ];
    for (let i = 0; i < wordsWithNoQuotes.length; i += 1) {
      if (word === wordsWithNoQuotes[i]) {
        return true;
      }
    }
    return false;
  }

  returnFilterCodeOutOfRules(rules: object[]): string {
    let code = '';
    let content = '';
    rules.forEach((rule: object) => {
      const block = `${Object.keys(rule)[0]}`;
      code += `${block}\n`;
      Object.keys(rule[block]).forEach((ruleName: string) => {
        content = `    ${ruleName}`;
        if (rule[block][ruleName].operator) {
          content += ` ${rule[block][ruleName].operator}`;
        }
        if (rule[block][ruleName].numValues) {
          rule[block][ruleName].numValues.forEach((value) => {
            content += ` ${value}`;
          });
        }
        if (rule[block][ruleName].textValues) {
          rule[block][ruleName].textValues.forEach((value) => {
            content += this.checkOnNoQuotes(value)
              ? ` ${value}`
              : ` "${value}"`;
          });
        }
        if (rule[block][ruleName].colorValues) {
          rule[block][ruleName].colorValues.forEach((value) => {
            value.forEach((color) => {
              content += ` ${color}`;
            });
          });
        }
        if (rule[block][ruleName].sockets) {
          const sockets = { ...rule[block][ruleName].sockets };
          Object.keys(sockets).forEach((key) => {
            if (sockets[key] > 0) {
              for (let i = 0; i < sockets[key]; i += 1) {
                content += key;
              }
            }
          });
        }
        code += `${content}\n`;
      });
    });
    return code;
  }

  handleCopyClick(): void {
    navigator.clipboard.writeText(
      this.returnFilterCodeOutOfRules(this.props.state),
    );
  }

  setMenuContent(text: string): void {
    this.setState({ active: text });
  }
}

const mapStateToProps = (store) => ({
  state: store.filter.rules,
  rules: store.filter.contents.rules,
});

const mapDispatchToProps = (dispatch) => ({
  clearFilterAction: () => dispatch(clearFilter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
