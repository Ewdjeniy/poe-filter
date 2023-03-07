interface FilterProps {
  radio?: object;
  rules?: any;
  setBlockAction?: function;
}

interface FilterState {
  ruleIndex: number;
  rules: object[];
}

interface FilterI {
  render(): JSX.Element;
}
