import * as React from 'react';
import store from '../../store/configureStore';
import { connect } from 'react-redux';
import Block from '../block/Block';
import Output from '../output/Output';
import Rules from '../rules/Rules';
import PropertiesBox from '../PropertiesBox';

class Filter
  extends React.Component<FilterProps, FilterState>
  implements FilterI
{
  
  render(): JSX.Element {
    const propertiesBoxes: any = Object.keys(this.props.rules).map((propsLabel, i) => <PropertiesBox key={`propertiesBox_${i}`} label={propsLabel} />);
    
    return (
      <section className="filter">
        <menu className="filter__menu">menu</menu>
        <article className="filter__controls">
          <form className="control-panel">
            {propertiesBoxes}
          </form>
          <Rules />                                                          
        </article>                                                          
        <Output />
      </section>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    rules: store.filter.contents.rules,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
