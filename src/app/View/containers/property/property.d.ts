interface PropertyProps {
  setPropertyAction: any;
  setOperatorAction: any;
  setTurnerAction: any;
  filter?: any;
  property?: any;
  min?: any;
  max?: any;
  label?: any;
}

interface PropertyState {}

interface PropertyI {
  render(): JSX.Element;
}
