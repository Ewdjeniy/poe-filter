import * as React from 'react';

class Select
  extends React.Component<SelectProps, SelectState>
  implements SelectI
{
  onSelectChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    if (this.props.property) {
      this.props.setAction({key: this.props.property, value: e.target.value});
    } else {
      this.props.setAction(e.target.value);
    }
  }

  render(): JSX.Element {
    const options: any = this.props.options;
    const optionsList: any = Object.keys(options).map((opt: any, i: any) => (
      <option value={opt} key={`opt_${i}`}>
        {(options[opt]).toString()}
      </option>
    ));
    
    return (
      <select
        className="select"
        name={this.props.name}
        value={this.props.value}
        onChange={(e) => this.onSelectChange(e)}
      >
        {optionsList}
      </select>
    );
  }
}

export default Select;
