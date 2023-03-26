interface MultipleProps {
  placeholder?: string;
  options: object;
  setAction(options: object): void;
  property: string;
  index?: number;
}

interface MultipleState {
  inptValue: string;
  inputClass: string;
  triangleClass: string;
  spinnerClass: string;
}

interface MultipleI {
  inpt: React.RefObject<HTMLInputElement>;
  handleBlur(): void;
  handleFocus(): void;
  handlePointerDown(value: string): void;
  handlePointerUp(): void;
  handleInput(e: React.ChangeEvent<HTMLInputElement>): void;
  render(): JSX.Element;
}
