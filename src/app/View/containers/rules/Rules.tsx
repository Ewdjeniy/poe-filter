import * as React from 'react';
import { connect } from 'react-redux';
import store from '../../store/configureStore';
import Rule from '../../components/rule/Rule';
import { setIndex } from '../filter/filterActions';

class Rules
  extends React.Component<RulesProps, RulesState>
  implements RulesI
{
  render(): JSX.Element {
    const ruleList = this.props.filter.rules.map((rule, i) => <Rule key={`rule_${i}`} index={i} setAction={this.props.setIndexAction} block={Object.keys(rule)[0]}/>);
    return (
      <table className="rules">
        <tbody>
          {ruleList}                                   
        </tbody>
      </table>
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
    setIndexAction: (index: any) => dispatch(setIndex(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rules);
