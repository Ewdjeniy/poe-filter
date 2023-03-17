interface SelectProps {
  placeholder?: any;
  options?: any;
  setAction?: any;
  value?: any;
  property?: any;
}

interface SelectState {
  inptValue?: string;
  inputClass?: any;
  triangleClass?: any;
  spinnerClass?: any;
}

interface SelectI {
  inpt?: any;
  render(): JSX.Element;
}
