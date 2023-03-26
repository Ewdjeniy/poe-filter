interface SelectProps {
  placeholder?: string;
  options: object;
  setAction(options: object): void;
  property?: string;
  index?: number;
}

interface SelectState {
  inptValue: string;
  inputClass: string;
  triangleClass: string;
  spinnerClass: string;
}

interface SelectI {
  inpt: React.RefObject<HTMLInputElement>;
  handleBlur(): void;
  handleFocus(): void;
  handlePointerDown(value: string): void;
  handleInput(e: React.ChangeEvent<HTMLInputElement>): void;
  render(): JSX.Element;
}
