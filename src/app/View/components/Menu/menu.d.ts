interface MenuProps {
  onclick?: any;
}

interface MenuState {
  liClass?: any;
  activeLiId?: any;
}

interface MenuI {
  render(): JSX.Element;
}
