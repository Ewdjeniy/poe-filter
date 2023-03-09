import * as React from 'react';
import { connect } from 'react-redux';
import store from '../../store/configureStore';
import Language from '../Language';

class Header
  extends React.Component<HeaderProps, HeaderState>
  implements HeaderI
{
  render(): JSX.Element {
    return (
      <header className="filter-header">
        <div></div>
        <a href="https://ru.pathofexile.com/" className="filter-header__logo">
          <img
            className="filter-header__img"
            src={require('./images/logo.png')}
            alt="logo"
          />
        </a>
        <Language />
      </header>
    );
  }
}

const mapStateToProps = (store) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
