interface RadioProps {
  label: string;
  name: string;
  value: string;
  setOperator?: any;
}

interface RadioState {
  count?: number;
}

interface RadioI {
  render(): JSX.Element;
}
