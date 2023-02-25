import * as React from 'react';

class Select
  extends React.Component<SelectProps, SelectState>
  implements SelectI
{
  onSelectChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    this.props.setAction({key: this.props.property, value: e.target.value});
  }

  getOptions(options: any[]): any {
    return options.map((opt, i) => (
      <option value={opt.value} key={`opt_${i}`}>
        {opt.text}
      </option>
    ));
  }

  render(): JSX.Element {
    return (
      <select
        className="select"
        value={this.props.value}
        onChange={(e) => this.onSelectChange(e)}
      >
        {this.getOptions(this.props.options)}
      </select>
    );
  }
}

export default Select;
