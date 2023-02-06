import * as React from 'react';

class Code extends React.Component<CodeProps, CodeState> implements CodeI {
  render(): JSX.Element {
    return <div>{this.props.value}</div>;
  }
}

export default Code;
