interface RadioProps {
  label: string;
  name: string;
  value: string;
  checked: any;
  setAction: any;
}

interface RadioState {}

interface RadioI {
  render(): JSX.Element;
}
