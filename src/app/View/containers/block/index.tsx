import * as React from 'react';
import { connect } from 'react-redux';
import Radio from '../../components/Radio';
import Checkbox from '../../components/Checkbox';
import { setBlock, setContinue } from '../../actions/filterActions';

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
          name={`block_${i}`}
          value={block}
          checked={value === block}
          setAction={this.props.setBlockAction}
        />
      ),
    );

    return (
      <article className="block">
        {blockList}
        <label className="block__checkbox-label">
          <Checkbox
            checked={this.props.filter.rules[this.props.filter.ruleIndex][value].Continue}
            name="continue"
            setAction={this.props.setContinueAction}
          />
          <span className="block__span">
            {this.props.translate('Continue')}
          </span>
        </label>
      </article>
    );
  }
}

const mapStateToProps = (store) => ({
  filter: store.filter,
  blocks: store.filter.contents.rules.Blocks,
});

const mapDispatchToProps = (dispatch) => ({
  setBlockAction: (block) => dispatch(setBlock(block)),
  setContinueAction: (property) => dispatch(setContinue(property)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Block);
