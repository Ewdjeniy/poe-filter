interface FilterProps {
  rules?: any;
  setBlockAction?: any;
}

interface FilterState {
  active?: string;
}

interface FilterI {
  instance?: any;
  render(): JSX.Element;
}
