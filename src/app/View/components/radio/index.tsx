import * as React from 'react';

class Radio extends React.Component<RadioProps, RadioState> implements RadioI {
  render(): JSX.Element {
    return <div className="radio">{this.renderRadio(this.props.instance)}</div>;
  }

  renderRadio(instance: string): JSX.Element {
    switch (instance) {
      case 'Flag': {
        return (
          <label className="radio__label">
            <img src={this.props.imgSrc} alt={this.props.imgAlt} />
            <input
              className="radio__input radio__input_hidden"
              name={this.props.name}
              type="radio"
              value={this.props.value}
              checked={this.props.checked}
              onChange={this.onRadioChange.bind(this)}
            />{' '}
            {this.props.label}
          </label>
        );
      }
      default: {
        return (
          <label className="radio__label">
            <input
              className="radio__input"
              name={this.props.name}
              type="radio"
              value={this.props.value}
              checked={this.props.checked}
              onChange={this.onRadioChange.bind(this)}
            />{' '}
            {this.props.label}
          </label>
        );
      }
    }
  }

  onRadioChange(): void {
    this.props.setAction({ key: this.props.property, value: this.props.value });
  }
}

export default Radio;
