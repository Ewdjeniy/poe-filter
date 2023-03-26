import * as React from 'react';
import { connect } from 'react-redux';
import Radio from '../../components/Radio';
import { setBlock } from '../../actions/filterActions';

class Block extends React.Component<BlockProps, BlockState> implements BlockI {
  render(): JSX.Element {
    const value = Object.keys(
      this.props.filter.rules[this.props.filter.ruleIndex],
    )[0];

    const blockList: JSX.Element[] = this.props.blocks.map(
      (block: string, i: number) => (
        <Radio
          key={`block_${i}`}
          instance="Radio"
          label={this.props.translate(block)}
          name="Block"
          value={block}
          checked={value === block}
          setAction={this.props.setBlockAction}
        />
      ),
    );

    return <article className="block">{blockList}</article>;
  }
}

const mapStateToProps = (store) => ({
  filter: store.filter,
  blocks: store.filter.contents.rules.Blocks,
});

const mapDispatchToProps = (dispatch) => ({
  setBlockAction: (block) => dispatch(setBlock(block)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Block);
