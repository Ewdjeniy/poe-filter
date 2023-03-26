interface CodeProps {
  rules: object[];
}

interface CodeState {
  key?: string;
}

interface CodeI {
  render(): JSX.Element;
  returnFilterCodeOutOfRules(rules: object[]): JSX.Element[];
  checkOnNoQuotes(word: string): boolean;
}
