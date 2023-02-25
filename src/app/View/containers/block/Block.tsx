import * as React from 'react';
import { connect } from 'react-redux';
import store from '../../store/configureStore';
import Radio from '../../components/radio/Radio';
import { setBlock } from '../filter/filterActions';

class Block extends React.Component<BlockProps, BlockState> implements BlockI {
  render(): JSX.Element {
    const value = Object.keys(
      this.props.filter.rules[this.props.filter.ruleIndex],
    )[0];
    return (
      <article className="block">
        <Radio
          label="Show"
          name="block"
          value="Show"
          checked={value}
          setAction={this.props.setBlockAction}
        />
        <Radio
          label="Hide"
          name="block"
          value="Hide"
          checked={value}
          setAction={this.props.setBlockAction}
        />
        <Radio
          label="Minimal"
          name="block"
          value="Minimal"
          checked={value}
          setAction={this.props.setBlockAction}
        />
      </article>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    filter: store.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBlockAction: (block) => dispatch(setBlock(block)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Block);
