import * as React from 'react';

class InptNumber
  extends React.Component<InptNumberProps, InptNumberState>
  implements InptNumberI
{
  handleChange(e: React.ChangeEvent<HTMLInputElement>): any {
    this.props.setAction({ key: this.props.property, value: e.target.value }); 
  }

  render(): JSX.Element {
    return (
      <div className="inpt-number inpt-number_theme_poe">
        <input
          className="inpt-number__number"
          value={this.props.value}
          name={this.props.name}
          type="number"
          min={this.props.min}
          max={this.props.max}
          onChange={(e) => this.handleChange(e)}
        />
      </div>
    );
  }
}

export default InptNumber;


//<input
//          className="inpt-number__input"
//          value={this.props.value}
//          name={this.props.name}
//          type="number"
//          min={this.props.min}
//          max={this.props.max}
//          onChange={(e) => this.handleInput(e)}
//        />

//        <div className="inpt-number__div">
//          <input
//            className="inpt-number__text"
//            type="text"
//            name={this.props.name}
//            value={this.props.value}
//          />
//        </div>