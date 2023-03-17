import * as React from 'react';
import { connect } from 'react-redux';
import store from '../../store/configureStore';
import Code from '../../components/Code';

class Output extends React.Component<OutputProps, OutputState> implements OutputI {
  render(): JSX.Element {
    return (
      <section className="output">
        <Code rules={this.props.rules} />
      </section>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    rules: store.filter.rules,
  };
};

export default connect(mapStateToProps)(Output);
