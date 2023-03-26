interface FilterProps {
  rules: object[];
  translate(text: string): string;
  translateOptions(options: string[]): object;
  clearFilterAction(): void;
  state: object[];
}

interface FilterState {
  active: string;
}

interface FilterI {
  instance: object;
  handleClearClick(): void;
  checkOnNoQuotes(word: string): boolean;
  returnFilterCodeOutOfRules(rules: object[]): string;
  handleCopyClick(): void;
  setMenuContent(text: string): void;
  render(): JSX.Element;
}
