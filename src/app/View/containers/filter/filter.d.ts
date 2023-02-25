interface FilterProps {
  radio?: object;
  setBlockAction?: function;
}

interface FilterState {
  ruleIndex: number;
  rules: object[];
}

interface FilterI {
  render(): JSX.Element;
}
