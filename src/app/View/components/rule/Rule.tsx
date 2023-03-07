import * as React from 'react';

class Rule extends React.Component<RuleProps, RuleState> implements RuleI {
  
  handleClick(): any {
    this.props.setAction(this.props.index);
  }
  
  render(): JSX.Element {
    return (
      <div className="rule" onClick={this.handleClick.bind(this)}>{this.props.content}</div>
    );
  }
}

export default Rule;
