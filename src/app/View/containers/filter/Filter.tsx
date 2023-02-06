import * as React from 'react';
import store from '../../store/configureStore';
import { connect } from 'react-redux';
import ControlPanel from '../controlPanel/ControlPanel';
import Output from '../output/Output';

class Filter
  extends React.Component<FilterProps, FilterState>
  implements FilterI
{
  render(): JSX.Element {
    const { radio, code, setBlockAction } = this.props;
    return (
      <div className="container">
        <ControlPanel />
        <Output />
      </div>
    );
  }
}

export default Filter;

//const mapStateToProps = store => {
//  return {
//    radio: store.radio,
//    code: store.code,
//  }
//}
//
//const mapDispatchToProps = dispatch => {
//  return {
//    setBlockAction: (block) => dispatch(setBlock(block)),
//  }
//}
//
//export default connect(mapStateToProps, mapDispatchToProps)(Filter);
