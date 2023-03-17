import * as React from 'react';
import store from '../../store/configureStore';
import { connect } from 'react-redux';
import Menu from '../../components/Menu';
import Block from '../Block';
import Parser from '../Parser';
import Output from '../Output';
import Rules from '../Rules';
import PropertiesBox from '../PropertiesBox';

class Filter extends React.Component<FilterProps, FilterState> implements FilterI {
  constructor(props) {
    super(props);
    this.state = {
      active: 'Constructor',
    }
  }
  
  instance: any = {
    Constructor: () => {
      const propertiesBoxes: any = Object.keys(this.props.rules).map((propsLabel, i) => (
        <PropertiesBox key={`propertiesBox_${i}`} label={propsLabel} />
      ));
      return (
        <article className="filter__controls">
          <form className="control-panel">{propertiesBoxes}</form>
          <Rules />
        </article>
      );
    },
    Parser: () => (
      <Parser />
    ),
    About: () => (
      <div>About</div>
    )
  };
  
  render(): JSX.Element {
    return (
      <section className="filter">
        <Menu onclick={this.setMenuContent.bind(this)}/>
        {this.instance[this.state.active]()}
        <Output />
      </section>
    );
  }
  
  setMenuContent(text: string) {
    this.setState({active: text});
  }
}

const mapStateToProps = (store) => {
  return {
    rules: store.filter.contents.rules,
  };
};

export default connect(mapStateToProps)(Filter);
