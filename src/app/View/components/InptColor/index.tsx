import * as React from 'react';
import InptNumber from '../InptNumber';

class InptColor
  extends React.Component<InptColorProps, InptColorState>
  implements InptColorI
{
  render(): JSX.Element {
    const style: object = {
      background: `rgba(${this.returnRgba(this.props.value)})`,
    };
    return (
      <div className="inpt-color inpt-color_theme_poe">
        <label className="inpt-color__label">
          <div className="inpt-color__div" style={style}></div>
          <input
            className="inpt-color__input"
            name={this.props.name}
            value={this.rgba2Hex(this.props.value)}
            type="color"
            onChange={(e) => this.handleChange(e)}
          />
        </label>
        <InptNumber
          name={`${this.props.property}_alpha`}
          index={this.props.index}
          value={this.props.value[3]}
          property={this.props.property}
          setAction={this.props.setAction}
          min={this.props.min}
          max={this.props.max}
          checked={this.props.checked}
          defaultVal={this.props.defaultVal}
          setTurner={this.props.setTurner}
        />
      </div>
    );
  }

  returnRgba(rgbAndAlpha: number[]): string {
    const rgba = rgbAndAlpha.slice(0);
    rgba[3] /= 255;
    return rgba.join();
  }

  hexToRGB(hex: string): number[] {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return [r, g, b];
  }

  rgba2Hex(rgba: number[]): string {
    const rgb = rgba.slice(0, 3);
    const hexFromRgb = `#${rgb
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
      })
      .join('')}`;
    return hexFromRgb;
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const key = this.props.property ? this.props.property : '';
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
      rgb: this.hexToRGB(e.target.value),
    });
  }
}

export default InptColor;
