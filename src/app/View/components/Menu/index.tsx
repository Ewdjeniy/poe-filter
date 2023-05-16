import * as React from 'react';

class Menu extends React.Component<MenuProps, MenuState> implements MenuI {
  constructor(props) {
    super(props);
  }

  render(): JSX.Element {
    const liList = ['Parser', 'Constructor', 'About'].map((text, i) => (
      <li
        key={`li_${i}`}
        className={
          this.props.activeLiId === i ? 'menu__li menu__li_active' : 'menu__li'
        }
        onClick={() => this.handleLiClick(text, i)}
      >
        {this.props.translate(text)}
      </li>
    ));
    return <menu className="menu">{liList}</menu>;
  }

  handleLiClick(text: string, i: number,): void {
    this.props.onclick(text, i);
  }
}

export default Menu;
