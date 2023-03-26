import * as React from 'react';
import { connect } from 'react-redux';
import Rule from '../../components/Rule';
import Select from '../../components/Select';
import { setIndex, addBlock, deleteBlock } from '../../actions/filterActions';

class Rules extends React.Component<RulesProps, RulesState> implements RulesI {
  render(): JSX.Element {
    const ruleList = this.props.filter.rules.map((rule, i) => {
      let content = `${this.props.translate(Object.keys(rule)[0])}: `;

      Object.values(rule).forEach((ruleProperties) => {
        Object.keys(ruleProperties).forEach((property) => {
          const ruleElements = ruleProperties[property];
          content += ` ${this.props.translate(property)} - `;

          Object.keys(ruleElements).forEach((ruleEl) => {
            switch (ruleEl) {
              case 'numValues': {
                ruleElements.numValues.forEach((val) => {
                  content += ` ${val}`;
                });
                break;
              }
              case 'textValues': {
                ruleElements.textValues.forEach((val) => {
                  content += ` ${val},`;
                });
                content = content.slice(0, -1);
                break;
              }
              case 'colorValues': {
                ruleElements.colorValues.forEach((vals) => {
                  vals.forEach((val) => {
                    content += ` ${val},`;
                  });
                });
                content = content.slice(0, -1);
                break;
              }
              case 'sockets': {
                const sockets = ruleElements[ruleEl];
                content += ' (';
                Object.keys(sockets).forEach((color) => {
                  content +=
                    sockets[color] > 0
                      ? ` ${sockets[color]} ${this.props.translate(color)}`
                      : '';
                });
                content += ' )';
                break;
              }
              default: {
                content += ` ${this.props.translate(ruleElements[ruleEl])}`;
              }
            }
          });
          content += ', ';
        });
      });

      content = `${content.slice(0, -2)}.`;

      return (
        <Rule
          key={`rule_${i}`}
          index={i}
          active={i === this.props.filter.ruleIndex}
          setAction={this.props.setIndexAction}
          deleteAction={this.props.deleteBlockAction}
          content={content}
        />
      );
    });

    return (
      <section className="rules">
        {ruleList}
        <div className="rules__div">
          <Select
            placeholder={`+ ${this.props.translate('AddFilter')}`}
            options={this.props.translateOptions(
              this.props.filter.contents.rules.Blocks,
            )}
            setAction={this.props.addBlockAction}
          />
        </div>
      </section>
    );
  }
}

const mapStateToProps = (store) => ({
  filter: store.filter,
});

const mapDispatchToProps = (dispatch) => ({
  setIndexAction: (index: number) => dispatch(setIndex(index)),
  addBlockAction: (obj: object) => dispatch(addBlock(obj)),
  deleteBlockAction: (index: number) => dispatch(deleteBlock(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rules);
