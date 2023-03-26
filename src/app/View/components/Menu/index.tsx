import * as React from 'react';

class Menu extends React.Component<MenuProps, MenuState> implements MenuI {
  constructor(props) {
    super(props);
    this.state = {
      liClass: 'li',
      activeLiId: 1,
    };
  }

  render(): JSX.Element {
    const liList = ['Parser', 'Constructor', 'About'].map((text, i) => (
      <li
        key={`li_${i}`}
        className={
          this.state.activeLiId === i ? 'menu__li menu__li_active' : 'menu__li'
        }
        onClick={() => this.handleLiClick(i, text)}
      >
        {this.props.translate(text)}
      </li>
    ));
    return <menu className="menu">{liList}</menu>;
  }

  handleLiClick(i: number, text: string): void {
    this.props.onclick(text);
    this.setState({
      activeLiId: i,
    });
  }
}

export default Menu;
