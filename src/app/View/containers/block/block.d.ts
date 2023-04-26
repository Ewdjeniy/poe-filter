interface BlockProps {
  filter: defaultInitialState;
  blocks: string[];
  setBlockAction(options: object): void;
  setContinueAction(options: object): void;
  translate(text: string): string;
}

interface BlockState {
  key?: string;
}

interface BlockI {
  render(): JSX.Element;
}
