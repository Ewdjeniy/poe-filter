interface MultipleProps {
  placeholder?: any;
  options?: any;
  setAction?: any;
  setTurnerAction?: any;
  name?: any;
  value?: any;
  property?: any;
  multiple?: any;
}

interface MultipleState {
  inptValue?: string;
  inputClass?: any;
  triangleClass?: any;
  spinnerClass?: any;
}

interface MultipleI {
  inpt?: any;
  render(): JSX.Element;
}
