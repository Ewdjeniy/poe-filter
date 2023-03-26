interface RadioProps {
  label?: string;
  name: string;
  value?: string;
  checked?: boolean;
  setAction(options: object): void;
  property?: string;
  instance?: string;
  imgSrc?: string;
  imgAlt?: string;
}

interface RadioState {
  key?: string;
}

interface RadioI {
  render(): JSX.Element;
  renderRadio(instance: string): JSX.Element;
}
