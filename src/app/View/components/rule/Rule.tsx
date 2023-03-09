import * as React from 'react';

class Rule extends React.Component<RuleProps, RuleState> implements RuleI {
  handleRuleClick(): any {
    this.props.setAction(this.props.index);
  }

  handleXClick(): any {
    this.props.deleteAction(this.props.index);
  }

  incloseFirstWordInSpan(text: string): any {
    let wordsArray: any = text.split(' ');
    let restWords: any = '';
    for (let i = 1; i < wordsArray.length; i++) {
      restWords += ` ${wordsArray[i]} `;
    }
    return (
      <>
        <i className="rule__i">{wordsArray[0]}</i>
        {restWords}
      </>
    );
  }

  render(): JSX.Element {
    const className = this.props.active ? 'rule__div rule_active' : 'rule__div';
    return (
      <div className="rule">
        <div className={className} onClick={this.handleRuleClick.bind(this)}>
          {this.incloseFirstWordInSpan(this.props.content)}
        </div>
        <span className="rule__x" onClick={this.handleXClick.bind(this)}>
          x
        </span>
      </div>
    );
  }
}

export default Rule;
