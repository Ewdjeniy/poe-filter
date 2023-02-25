interface InptNumberProps {
  name?: string;
  value?: number;
  min?: any;
  max?: any;
  setAction?: any;
  property?: any;
}

interface InptNumberState {
  value: number;
}

interface InptNumberI {
  render(): JSX.Element;
}
