import * as React from 'react';

class Button extends React.Component<ButtonProps, ButtonState> implements ButtonI {
  render(): JSX.Element {
    return (
      <input type="button" value="Button" onClick={this.handleClick.bind(this)} />
    );
  }
  
  handleClick(): any {
    this.props.onclick();
  }
}

export default Button;
