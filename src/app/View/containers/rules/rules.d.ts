interface RulesProps {
  setIndexAction(index: number): void;
  addBlockAction(obj: object): void;
  deleteBlockAction(index: number): void;
  filter: defaultInitialState;
  translateOptions(options: string[]): object;
  translate(text: string): string;
  onclick(index: number): void;
}

interface RulesState {
  key?: string;
}

interface RulesI {
  render(): JSX.Element;
}
