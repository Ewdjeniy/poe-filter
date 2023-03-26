interface RuleProps {
  content: string;
  index: number;
  setAction(index: number): void;
  deleteAction(index: number): void;
  active?: boolean;
}

interface RuleState {
  key?: string;
}

interface RuleI {
  render(): JSX.Element;
}
