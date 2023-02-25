import * as React from 'react';

class Radio extends React.Component<RadioProps, RadioState> implements RadioI {
  onRadioChange(): void {
    this.props.setAction(this.props.value);
  }

  render(): JSX.Element {
    return (
      <div className="radio">
        <label className="radio__label">
          <input
            className="radio__input"
            name={this.props.name}
            type="radio"
            value={this.props.value}
            checked={this.props.checked == this.props.value}
            onChange={this.onRadioChange.bind(this)}
          />
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default Radio;
