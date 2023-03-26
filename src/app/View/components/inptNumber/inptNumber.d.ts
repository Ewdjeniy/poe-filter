interface InptNumberProps {
  name: string;
  value?: number;
  min?: number;
  max?: number;
  setAction(options: object): void;
  property: string;
  color?: string;
  placeholder?: string;
  letter?: string;
  index?: number;
}

interface InptNumberState {
  key?: string;
}

interface InptNumberI {
  render(): JSX.Element;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
