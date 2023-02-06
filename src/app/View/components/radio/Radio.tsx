import * as React from 'react';

class Radio extends React.Component<RadioProps, RadioState> implements RadioI {
  onRadioClick(): any {
    this.props.setOperator(this.props.value);
  }

  render(): JSX.Element {
    return (
      <div className="radio">
        <label className="radio__label">
          {this.props.label}
          <input
            className="radio__input"
            name={this.props.name}
            type="radio"
            value={this.props.value}
            onClick={this.onRadioClick.bind(this)}
          />
        </label>
      </div>
    );
  }
}

export default Radio;
