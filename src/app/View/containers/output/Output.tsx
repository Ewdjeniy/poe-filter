import * as React from 'react';
import { connect } from 'react-redux';
import store from '../../store/configureStore';
import Code from '../../components/code/Code';

class Output
  extends React.Component<OutputProps, OutputState>
  implements OutputI
{
  render(): JSX.Element {
    return (
      <section className="output">
        <Code value={this.props.code.operator} />
      </section>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    code: store.code,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //setOperatorAction: (operator) => dispatch(setOperator(operator)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Output);
