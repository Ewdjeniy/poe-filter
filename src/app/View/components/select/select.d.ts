interface SelectProps {
  placeholder?: any;
  options?: any;
  setAction?: any;
  setTurnerAction?: any;
  name?: any;
  value?: any;
  property?: any;
  multiple?: any;
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
