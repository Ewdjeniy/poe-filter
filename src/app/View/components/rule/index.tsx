import * as React from 'react';

class Rule extends React.Component<RuleProps, RuleState> implements RuleI {
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

  handleRuleClick(): void {
    this.props.setAction(this.props.index);
    this.props.onclick(this.props.index);
  }

  handleXClick(): void {
    this.props.deleteAction(this.props.index);
  }

  incloseFirstWordInSpan(text: string): JSX.Element {
    const wordsArray: string[] = text.split(' ');
    let restWords = '';
    for (let i = 1; i < wordsArray.length; i += 1) {
      restWords += ` ${wordsArray[i]} `;
    }
    return (
      <>
        <i className="rule__i">{wordsArray[0]}</i>
        {restWords}
      </>
    );
  }
}

export default Rule;
