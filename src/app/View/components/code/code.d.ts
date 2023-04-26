interface CodeProps {
  rules: object[];
  checkOnQuotes(word: string): string;
}

interface CodeState {
  key?: string;
}

interface CodeI {
  render(): JSX.Element;
  returnFilterCodeOutOfRules(rules: object[]): JSX.Element[];
}
