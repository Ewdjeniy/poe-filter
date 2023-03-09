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
        <Code rules={this.props.filter.rules} />
      </section>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    filter: store.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Output);
