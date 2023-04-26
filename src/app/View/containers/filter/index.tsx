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
    const propertiesState: number[] = this.returnPropertiesState(0);
    this.state = {
      active: 'Constructor',
      propertiesState,
    };
  }

  render(): JSX.Element {
    return (
      <section className="filter">
        <Menu
          onclick={this.setMenuContent.bind(this)}
          translate={this.props.translate}
        />
        {this.renderInstance(this.state.active)}
        <Code
          rules={this.props.filter.rules}
          checkOnQuotes={this.checkOnQuotes.bind(this)}
        />
      </section>
    );
  }

  renderInstance(instance: string): JSX.Element {
    switch (instance) {
      case 'Constructor': {
        const propertiesBoxes: JSX.Element[] = Object.keys(
          this.props.rules,
        ).map((propsLabel, i) => (
          <PropertiesBox
            key={`propertiesBox_${i}`}
            label={propsLabel}
            translate={this.props.translate}
            translateOptions={this.props.translateOptions}
            active={!this.state.propertiesState[i] === false}
            index={i}
            onclick={this.handlePropertyBoxClick.bind(this)}
          />
        ));
        return (
          <article className="filter__controls">
            <div className="filter__div">
              <form className="control-panel" name="control_panel">
                {propertiesBoxes}
              </form>
              <Rules
                translateOptions={this.props.translateOptions}
                translate={this.props.translate}
                onclick={this.handleRuleClick.bind(this)}
              />
            </div>
            <form className="filter__buttons" name="control_panel">
              <Button
                value="Clear"
                onclick={this.handleClearClick.bind(this)}
              />
              <Button value="Copy" onclick={this.handleCopyClick.bind(this)} />
            </form>
          </article>
        );
      }

      case 'About': {
        return <article>About</article>;
      }

      case 'Parser': {
        return <Parser translate={this.props.translate} name="parser" />;
      }

      default: {
        return <div>No instance</div>;
      }
    }
  }

  handleRuleClick(index: number): void {
    this.setState({
      propertiesState: this.returnPropertiesState(index),
    });
  }

  handlePropertyBoxClick(index: number): void {
    const propertiesState = this.state.propertiesState.slice(0);
    const turner = this.state.propertiesState[index] === 0 ? 1 : 0;
    propertiesState[index] = turner;

    this.setState({
      propertiesState,
    });
  }

  returnPropertiesState(ruleIndex: number): number[] {
    const stateRulesArr: string[] = Object.keys(
      this.props.filter.rules[ruleIndex][
        Object.keys(this.props.filter.rules[ruleIndex])[0]
      ],
    );
    const contentRulesArr: string[] = Object.keys(this.props.rules);
    const result: number[] = [];

    Object.keys(this.props.rules).forEach(() => {
      result.push(0);
    });

    for (let i = 1; i < contentRulesArr.length; i += 1) {
      const contentRules = this.props.rules[contentRulesArr[i]];
      for (let j = 0; j < contentRules.length; j += 1) {
        if (stateRulesArr.indexOf(contentRules[j].property) !== -1) {
          result[i] = 1;
        }
      }
    }
    return result;
  }

  handleClearClick(): void {
    this.props.clearFilterAction();
  }

  checkOnQuotes(word: string): string {
    if (word.split(' ').length > 1 || word.split('-').length > 1) {
      return `"${word}"`;
    } else {
      return word;
    }
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
            content += ` ${this.checkOnQuotes(value)}`;
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
      this.returnFilterCodeOutOfRules(this.props.filter.rules),
    );
  }

  setMenuContent(text: string): void {
    this.setState({ active: text });
  }
}

const mapStateToProps = (store) => ({
  filter: store.filter,
  rules: store.filter.contents.rules,
});

const mapDispatchToProps = (dispatch) => ({
  clearFilterAction: () => dispatch(clearFilter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
