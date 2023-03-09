import * as React from 'react';
import { connect } from 'react-redux';
import store from '../../store/configureStore';
import Rule from '../../components/rule/Rule';
import Select from '../../components/Select';
import { setIndex, addBlock, deleteBlock } from '../filter/filterActions';

class Rules extends React.Component<RulesProps, RulesState> implements RulesI {
  render(): JSX.Element {
    const ruleList = this.props.filter.rules.map((rule, i) => {
      let content =
        this.translate([`${Object.keys(rule)[0]}`])[`${Object.keys(rule)[0]}`] +
        ': ';
      for (let key in rule) {
        const ruleProperties = rule[key];
        for (let property in ruleProperties) {
          const ruleElements = ruleProperties[property];
          content += ' ' + this.translate([property])[property] + ' - ';
          for (let ruleEl in ruleElements) {
            content +=
              ' ' +
              this.translate([ruleElements[ruleEl]])[ruleElements[ruleEl]];
          }
          content += ', ';
        }
      }
      content = content.slice(0, -2) + '.';
      return (
        <Rule
          key={`rule_${i}`}
          index={i}
          active={i == this.props.filter.ruleIndex}
          setAction={this.props.setIndexAction}
          deleteAction={this.props.deleteBlockAction}
          content={content}
        />
      );
    });
    return (
      <section className="rules">
        {ruleList}
        <div className="rules__div">
          <Select
            placeholder={`+ ${this.translate(['AddFilter'])['AddFilter']}`}
            options={this.translate(this.props.filter.contents.rules.Blocks)}
            setAction={this.props.addBlockAction}
          />
        </div>
      </section>
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
}

const mapStateToProps = (store) => {
  return {
    filter: store.filter,
    lang: store.language.lang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIndexAction: (index: any) => dispatch(setIndex(index)),
    addBlockAction: (block: any) => dispatch(addBlock(block)),
    deleteBlockAction: (index: number) => dispatch(deleteBlock(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rules);
