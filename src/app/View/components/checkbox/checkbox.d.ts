interface CheckboxProps {
  name?: any;
  checked?: any;
  setAction?: any;
  property?: any;
  defaultVal?: any;
  label?: any;
  title?: any;
}

interface CheckboxState {
  checkerClass?: any;
}

interface CheckboxI {
  render(): JSX.Element;
}
