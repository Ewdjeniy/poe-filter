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
  checked: boolean;
  defaultVal: object;
  setTurner(options: object): void;
}

interface InptNumberState {
  key?: string;
}

interface InptNumberI {
  render(): JSX.Element;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
