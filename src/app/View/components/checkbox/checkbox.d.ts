interface CheckboxProps {
  name: string;
  checked?: boolean;
  setAction?: (options?: object) => void;
  property?: string;
  defaultVal?: object;
  index?: number;
  value?: string;
}

interface CheckboxState {
  checkerClass: string;
}

interface CheckboxI {
  render(): JSX.Element;
  onCheckboxChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
