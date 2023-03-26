import * as React from 'react';
import Language from '../../containers/Language';

const logoSrc = require('./images/logo.png');

class Header
  extends React.Component<HeaderProps, HeaderState>
  implements HeaderI
{
  render(): JSX.Element {
    return (
      <header className="filter-header">
        <div></div>
        <a href="https://ru.pathofexile.com/" className="filter-header__logo">
          <img className="filter-header__img" src={logoSrc} alt="logo" />
        </a>
        <Language />
      </header>
    );
  }
}

export default Header;
