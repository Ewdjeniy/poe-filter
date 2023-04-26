import * as React from 'react';

class InptNumber
  extends React.Component<InptNumberProps, InptNumberState>
  implements InptNumberI
{
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

  handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const key = this.props.property ? this.props.property : '';
    const letter = this.props.letter ? this.props.letter : '';
    const index: number = this.props.index ? this.props.index : 0;

    if (!this.props.checked) {
      this.props.setTurner({
        ...{
          key,
          turner: true,
        },
        ...this.props.defaultVal,
      });
    }
    this.props.setAction({
      key: this.props.property,
      index,
      valueType: 'num',
      value: e.target.value,
      letter,
      alpha: e.target.value,
    });
  }
}

export default InptNumber;
