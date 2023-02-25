import * as React from 'react';

class Checkbox extends React.Component<CheckboxProps, CheckboxState> implements CheckboxI {
  onCheckboxChange(e: React.ChangeEvent<HTMLInputElement>): any {
    this.props.setAction(Object.assign({}, {key: this.props.property, turner: e.target.checked}, this.props.defaultVal));
  }
  render(): JSX.Element {
    return (
      <div className="checkbox">
        <label className="checkbox__label">
          <input
            className="checkbox__input"
            name={this.props.name}
            type="checkbox"
            checked={this.props.checked}
            onChange={(e) => this.onCheckboxChange(e)}
          />
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
