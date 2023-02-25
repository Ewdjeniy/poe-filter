import * as React from 'react';

class InptNumber extends React.Component<InptNumberProps, InptNumberState> implements InptNumberI {
  
  handleInput(e: React.ChangeEvent<HTMLInputElement>): any {
    this.props.setAction({key: this.props.property, value: e.target.value});
  }
  
  render(): JSX.Element {
    return (
      <div className="inpt-number">
        <input
          className="inpt-number__input"
          value={this.props.value}
          name={this.props.name}
          type="number"
          min={this.props.min}
          max={this.props.max}
          onChange={(e) => this.handleInput(e)}
        />
      </div>
    );
  }
}

export default InptNumber;
