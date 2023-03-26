import * as React from 'react';

class Checkbox
  extends React.Component<CheckboxProps, CheckboxState>
  implements CheckboxI
{
  constructor(props) {
    super(props);
    const checkerClass = this.props.checked
      ? 'checkbox__checker checkbox__checker_checked'
      : 'checkbox__checker';
    this.state = {
      checkerClass,
    };
  }

  render(): JSX.Element {
    return (
      <div className="checkbox checkbox_theme_poe">
        <label className="checkbox__label">
          <input
            className="checkbox__input"
            name={this.props.name}
            type="checkbox"
            checked={this.props.checked}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              this.onCheckboxChange(e)
            }
          />
          <div className="checkbox__box">
            <div
              className={
                this.props.checked
                  ? 'checkbox__checker checkbox__checker_checked'
                  : 'checkbox__checker'
              }
            ></div>
          </div>
          <span className="checkbox__span" title={this.props.title}>
            {this.props.label}
          </span>
        </label>
      </div>
    );
  }

  onCheckboxChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const checkerClass = this.props.checked
      ? 'checkbox__checker'
      : 'checkbox__checker checkbox__checker_checked';
    if (this.props.value) {
      const index = this.props.index ? this.props.index : 0;
      const value = e.target.checked ? this.props.value : '';
      this.props.setAction({
        key: this.props.property,
        index,
        valueType: 'text',
        value,
      });
    }
    this.props.setAction({
      ...{ key: this.props.property, turner: e.target.checked },
      ...this.props.defaultVal,
    });
    this.setState({
      checkerClass,
    });
  }
}

export default Checkbox;
