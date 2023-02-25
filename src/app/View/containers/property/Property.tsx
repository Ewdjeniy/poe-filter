import * as React from 'react';
import { connect } from 'react-redux';
import store from '../../store/configureStore';
import { setProperty, setOperator, setTurner } from '../filter/filterActions';
import Checkbox from '../../components/checkbox/Checkbox';
import InptNumber from '../../components/inptNumber/InptNumber';
import Operator from '../../components/operator/Operator';

class Property
  extends React.Component<PropertyProps, PropertyState>
  implements PropertyI
{
  
  checkIfRuleOn(): any {
    const rules = this.props.filter.rules[this.props.filter.ruleIndex][
        Object.keys(this.props.filter.rules[this.props.filter.ruleIndex])[0]];
    
    for (let key in rules) {
      if (key == this.props.property) return true;  
    }
      
    return false;
  }
  
  render(): JSX.Element {
    const { operator, value } =
      this.props.filter.rules[this.props.filter.ruleIndex][
        Object.keys(this.props.filter.rules[this.props.filter.ruleIndex])[0]
      ][this.props.property] ? this.props.filter.rules[this.props.filter.ruleIndex][
        Object.keys(this.props.filter.rules[this.props.filter.ruleIndex])[0]
      ][this.props.property] : {operator: '>', value: 4};

    return (
      <article className="property">
        <Checkbox
          checked={this.checkIfRuleOn()}
          property={this.props.property}
          defaultVal={{operator: '>', value: 4}}
          setAction={this.props.setTurnerAction}
        />
        {this.props.label}
        <Operator
          value={operator}
          property={this.props.property}
          setAction={this.props.setOperatorAction}
        />
        <InptNumber
          value={value}
          property={this.props.property}
          setAction={this.props.setPropertyAction} 
          min={this.props.min}
          max={this.props.max}
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
    setPropertyAction: (property: any) =>
      dispatch(setProperty(property)),
    setOperatorAction: (property: any) => dispatch(setOperator(property)),
    setTurnerAction: (property: any) => dispatch(setTurner(property)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Property);
