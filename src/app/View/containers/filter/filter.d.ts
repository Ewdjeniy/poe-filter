interface FilterProps {
  radio?: object;
  setBlockAction?: function;
  code?: string;
}

interface FilterState {
  count?: number;
}

interface FilterI {
  render(): JSX.Element;
}
