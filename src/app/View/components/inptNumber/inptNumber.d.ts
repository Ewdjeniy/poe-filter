interface InptNumberProps {
  name?: string;
  value?: number;
  min?: any;
  max?: any;
  setAction?: any;
  property?: any;
  color?: any;
  placeholder?: any;
  letter?: any;
  index?: any;
}

interface InptNumberState {}

interface InptNumberI {
  render(): JSX.Element;
}
