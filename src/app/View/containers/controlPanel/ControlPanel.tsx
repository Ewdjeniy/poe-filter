import * as React from 'react';
import store from '../../store/configureStore';
import { connect } from 'react-redux';
import Radio from '../../components/radio/Radio';
import { setOperator } from '../../actions/CodeActions';

class ControlPanel
  extends React.Component<ControlPanelProps, ControlPanelState>
  implements ControlPanelI
{
  render(): JSX.Element {
    return (
      <section>
        <Radio
          label="Show"
          name="block"
          value="Show"
          setOperator={this.props.setOperatorAction}
        />
        <Radio
          label="Hide"
          name="block"
          value="Hide"
          setOperator={this.props.setOperatorAction}
        />
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
    setOperatorAction: (operator) => dispatch(setOperator(operator)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
