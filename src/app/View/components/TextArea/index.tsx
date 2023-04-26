import * as React from 'react';

class Button
  extends React.Component<ButtonProps, ButtonState>
  implements ButtonI
{
  render(): JSX.Element {
    return (
      <input
        className="button button_theme_poe"
        type="button"
        value={this.props.value}
        onClick={this.handleClick.bind(this)}
      />
    );
  }

  handleClick(): void {
    this.props.onclick();
  }
}

export default Button;
