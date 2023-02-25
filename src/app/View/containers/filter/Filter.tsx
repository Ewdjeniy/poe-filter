import * as React from 'react';
import store from '../../store/configureStore';
import { connect } from 'react-redux';
import Block from '../block/Block';
import Property from '../property/Property';
import Output from '../output/Output';
import Rules from '../rules/Rules';

class Filter
  extends React.Component<FilterProps, FilterState>
  implements FilterI
{
  render(): JSX.Element {
    return (
      <div className="container">
        <form className="control-panel">
          <Block />
          <Property property="LinkedSockets" label="Linked sockets" min="2" max="6"/>
          <Property property="AreaLevel" label="Area level" min="1" max="100"/>
        </form>
        <Rules />
        <Output />
      </div>
    );
  }
}

export default Filter;
