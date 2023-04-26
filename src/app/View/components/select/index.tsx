import * as React from 'react';

class Select
  extends React.Component<SelectProps, SelectState>
  implements SelectI
{
  inpt: React.RefObject<HTMLInputElement>;

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

  render(): JSX.Element {
    const { options } = this.props;

    const optionsList: JSX.Element[] = Object.keys(options)
      .filter((opt) => options[opt].toString().includes(this.state.inptValue))
      .map((opt: string, i: number) => (
        <li
          key={`li_${i}`}
          className="select__li"
          onPointerDown={() => this.handlePointerDown(opt)}
        >
          {options[opt].toString()}
        </li>
      ));

    return (
      <div className="select select_theme_poe">
        <div className="select__flex">
          <input
            className={this.state.inputClass}
            ref={this.inpt}
            type="text"
            placeholder={this.props.placeholder}
            value={this.state.inptValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              this.handleInput(e)
            }
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

  handleBlur(): void {
    this.setState({
      inputClass: 'select__input select__input_blur',
      triangleClass: 'select__triangle select__triangle_top',
      spinnerClass: 'select__ul select__ul_off',
    });
  }

  handleFocus(): void {
    this.setState({
      inputClass: 'select__input select__input_focus',
      triangleClass: 'select__triangle select__triangle_bottom',
      spinnerClass: 'select__ul select__ul_on',
    });
  }

  handlePointerDown(value: string): boolean {
    const index = this.props.index ? this.props.index : 0;
    const key = this.props.property ? this.props.property : '';

    if (this.props.setTurner && !this.props.checked) {
      this.props.setTurner({
        ...{
          key,
          turner: true,
        },
        ...this.props.defaultVal,
      });
    }
    this.props.setAction({
      key,
      index,
      valueType: 'text',
      value,
    });
    this.setState({
      inptValue: '',
    });
    return false;
  }

  handleInput(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      inptValue: e.target.value,
    });
  }
}

export default Select;
