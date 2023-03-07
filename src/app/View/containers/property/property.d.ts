interface PropertyProps {
  setPropertyAction: any;
  setOperatorAction: any;
  setTurnerAction: any;
  filter?: any;
  property?: any;
  min?: any;
  max?: any;
  label?: any;
  content?: any;
  instance?: any;
  True?: any;
  False?: any;
  defaultVal?: any;
  options?: any;
  lang?: any;
}

interface PropertyState {}

interface PropertyI {
  render(): JSX.Element;
}
