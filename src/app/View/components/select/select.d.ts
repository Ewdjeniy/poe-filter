interface SelectProps {
  options?: object[];
  setAction: any;
  value?: any;
  property?: any;
}

interface SelectState {}

interface SelectI {
  render(): JSX.Element;
}
