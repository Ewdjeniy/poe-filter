import * as React from 'react';

class Rule extends React.Component<RuleProps, RuleState> implements RuleI {
  
  handleClick(): any {
    this.props.setAction(this.props.index);
  }
  
  render(): JSX.Element {
    return (
      <tr className="rule" onClick={this.handleClick.bind(this)}>
        <td className="rule__td">{this.props.block}</td>
      </tr>
    );
  }
}

export default Rule;
