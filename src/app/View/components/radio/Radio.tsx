import * as React from 'react';

class Radio extends React.Component<RadioProps, RadioState> implements RadioI {
  
  constructor(props) {
    super(props);
    
    this.state = {
      value: 'english',
    }
  }
  
  onRadioChange(): void {
    this.props.setAction({key: this.props.property, value: this.props.value});
  }

  render(): JSX.Element {
    return (
      <div className="radio">
        {this[`to${this.props.instance}`]()}
      </div>
    );
  }

  toFlag(): any {
    return (
      <>
        <label className="radio__label">
          <img className="radio__img" src={this.props.imgSrc} alt={this.props.imgAlt} />
          <input
            className="radio__input radio_hidden"
            name={this.props.name}
            type="radio"
            value={this.props.value}
            checked={this.props.checked == this.props.value}
            onChange={this.onRadioChange.bind(this)}
          />
        </label>
      </>
    );
  }

  toRadio(): any {
    return (
      <>
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
      </>
    );
  }
}

export default Radio;
