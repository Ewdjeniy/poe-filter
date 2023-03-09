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

    const blockList: any = this.props.blocks.map((block: any, i: any) => (
      <Radio
        key={`block_${i}`}
        instance="Radio"
        label={this.props.lang[block]}
        name="Block"
        value={block}
        checked={value}
        setAction={this.props.setBlockAction}
      />
    ));
    return <article className="block">{blockList}</article>;
  }
}

const mapStateToProps = (store) => {
  return {
    filter: store.filter,
    blocks: store.filter.contents.rules.Blocks,
    lang: store.language.lang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBlockAction: (block) => dispatch(setBlock(block)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Block);
