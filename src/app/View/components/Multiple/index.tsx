import * as React from 'react';

class Multiple
  extends React.Component<MultipleProps, MultipleState>
  implements MultipleI
{
  inpt: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);

    this.state = {
      turner: 0,
      inptValue: '',
      inputClass: 'multiple__input multiple__input_blur',
      triangleClass: 'multiple__triangle multiple__triangle_top',
      spinnerClass: 'multiple__ul multiple__ul_off',
    };

    this.inpt = React.createRef();
  }

  render(): JSX.Element {
    const { options } = this.props;

    const optionsList: JSX.Element[] = Object.keys(options)
      .filter((opt) => options[opt].toString().includes(this.state.inptValue))
      .map((opt: string, i: number) => {
        const returnActive = (): boolean => {
          if (
            this.props.placeholder &&
            !Array.isArray(this.props.placeholder) &&
            this.props.placeholder === options[opt].toString()
          ) {
            return true;
          }
          const placeholderArr = this.props.placeholder.split(',');
          for (let i = 0; i < placeholderArr.length; i += 1) {
            if (placeholderArr[i] === options[opt].toString()) {
              return true;
            }
          }
          return false;
        };
        return (
          <li
            key={`li_${i}`}
            className={
              returnActive()
                ? 'multiple__li multiple__li_active'
                : 'multiple__li'
            }
            onPointerDown={() => this.handlePointerDown(opt)}
            onPointerUp={this.handlePointerUp.bind(this)}
          >
            {options[opt].toString()}
          </li>
        );
      });

    return (
      <div className="multiple multiple_theme_poe">
        <div className="multiple__flex">
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
            className="multiple__div"
            onPointerDown={this.handleTrianglePointerDown.bind(this)}
            onPointerUp={this.handleTrianglePointerUp.bind(this)}
          >
            <div className={this.state.triangleClass}></div>
          </div>
        </div>
        <ul className={this.state.spinnerClass}>{optionsList}</ul>
      </div>
    );
  }

  handleTrianglePointerDown(): void {
    if (this.state.turner === 0) {
      this.handleTrianglePointerUp = () => {
        this.inpt.current.focus();
      };
    } else {
      this.handleTrianglePointerUp = () => false;
    }
    this.handleTrianglePointerUp();
  }

  handleTrianglePointerUp(): void {}

  handleBlur(): void {
    this.setState({
      turner: 0,
      inptValue: '',
      inputClass: 'multiple__input multiple__input_blur',
      triangleClass: 'multiple__triangle multiple__triangle_top',
      spinnerClass: 'multiple__ul multiple__ul_off',
    });
  }

  handleFocus(): void {
    this.setState({
      turner: 1,
      inputClass: 'multiple__input multiple__input_focus',
      triangleClass: 'multiple__triangle multiple__triangle_bottom',
      spinnerClass: 'multiple__ul multiple__ul_on',
    });
  }

  handlePointerDown(value: string): void {
    const key = this.props.property ? this.props.property : '';
    const index: number = this.props.index ? this.props.index : 0;

    this.handleBlur = () => false;

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
      key,
      index,
      valueType: 'text',
      value,
    });
  }

  handlePointerUp(): void {
    this.inpt.current.focus();
    this.handleBlur = () => {
      this.setState({
        turner: 0,
        inptValue: '',
        inputClass: 'multiple__input multiple__input_blur',
        triangleClass: 'multiple__triangle multiple__triangle_top',
        spinnerClass: 'multiple__ul multiple__ul_off',
      });
    };
  }

  handleInput(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      inptValue: e.target.value,
    });
  }
}

export default Multiple;
