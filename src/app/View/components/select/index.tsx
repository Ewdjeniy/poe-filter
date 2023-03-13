import * as React from 'react';

class Select
  extends React.Component<SelectProps, SelectState>
  implements SelectI
{
  inpt: any;

  constructor(props) {
    super(props);
    this.state = {
      inptValue: '',
      inputClass: 'select__input select__input_blur',
      triangleClass: 'select__triangle select__triangle_top',
      spinnerClass: 'select__ul select__ul_off',
    };
    this.inpt = React.createRef();
  }

  handleBlur(): any {
    this.setState({
      inputClass: 'select__input select__input_blur',
      triangleClass: 'select__triangle select__triangle_top',
      spinnerClass: 'select__ul select__ul_off',
    });
  }

  handleFocus(): any {
    this.setState({
      inputClass: 'select__input select__input_focus',
      triangleClass: 'select__triangle select__triangle_bottom',
      spinnerClass: 'select__ul select__ul_on',
    });
  }

  handlePointerDown(value: any): any {
    if (this.props.property) {
      this.props.setAction({ key: this.props.property, value: value });
    } else {
      this.props.setAction(value);
    }
    this.setState({
      inptValue: '',
    });
    return false;
  }

  handleInput(e: any): any {
    this.setState({
      inptValue: e.target.value,
    });
  }

  render(): JSX.Element {
    const options: any = this.props.options;
    const optionsList: any = Object.keys(options).map((opt: any, i: any) => {
      if (options[opt].toString().includes(this.state.inptValue)) {
        return (
          <li
            key={`li_${i}`}
            className="select__li"
            onPointerDown={() => this.handlePointerDown(opt)}
          >
            {options[opt].toString()}
          </li>
        );
      }
    });
    return (
      <div className="select select_theme_poe">
        <div className="select__flex">
          <input
            className={this.state.inputClass}
            ref={this.inpt}
            type="text"
            placeholder={this.props.placeholder}
            value={this.state.inptValue}
            onChange={(e: any) => this.handleInput(e)}
            onFocus={this.handleFocus.bind(this)}
            onBlur={this.handleBlur.bind(this)}
          />
          <div
            className="select__div"
            onClick={() => this.inpt.current.focus()}
          >
            <div className={this.state.triangleClass}></div>
          </div>
        </div>
        <ul className={this.state.spinnerClass}>{optionsList}</ul>
      </div>
    );
  }
}

export default Select;
