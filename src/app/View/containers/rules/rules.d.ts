interface RulesProps {
  setIndexAction(index: number): void;
  addBlockAction(obj: object): void;
  deleteBlockAction(index: number): void;
  filter: defaultInitialState;
  translateOptions(options: string[]): object;
  translate(text: string): string;
}

interface RulesState {
  key?: string;
}

interface RulesI {
  render(): JSX.Element;
}
