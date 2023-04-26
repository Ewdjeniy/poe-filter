interface FilterProps {
  rules: object[];
  translate(text: string): string;
  translateOptions(options: string[]): object;
  clearFilterAction(): void;
  filter: defaultInitialState;
}

interface FilterState {
  active: string;
  propertiesState: number[];
}

interface FilterI {
  renderInstance(instance: string): JSX.Element;
  handleClearClick(): void;
  checkOnQuotes(word: string): string;
  returnFilterCodeOutOfRules(rules: object[]): string;
  handleCopyClick(): void;
  setMenuContent(text: string): void;
  render(): JSX.Element;
}
