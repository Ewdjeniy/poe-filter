import * as React from 'react';

class InptNumber extends React.Component<InptNumberProps, InptNumberState> implements InptNumberI {
  render(): JSX.Element {
    return (
      <div className="inpt-number inpt-number_theme_poe">
        <input
          className={
            this.props.color
              ? `inpt-number__number inpt-number__number_${this.props.color}`
              : 'inpt-number__number'
          }
          value={this.props.value ? this.props.value : ''}
          name={this.props.name}
          placeholder={this.props.placeholder}
          type="number"
          min={this.props.min}
          max={this.props.max}
          onChange={(e) => this.handleChange(e)}
        />
      </div>
    );
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>): any {
    if (this.props.letter) {
      this.props.setAction({
        key: this.props.property,
        value: e.target.value,
        letter: this.props.letter,
      });
    } else {
      const index = this.props.index ? this.props.index : 0;
      this.props.setAction({ key: this.props.property, index: index, valueType: 'num', value: e.target.value });
    }
  }
}

export default InptNumber;
