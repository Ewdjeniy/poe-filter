interface RadioProps {
  label?: string;
  name?: string;
  value?: string;
  checked?: any;
  setAction?: any;
  property?: any;
  instance?: any;
  imgSrc?: any;
  imgAlt?: any;
}

interface RadioState {
  value?: any;
}

interface RadioI {
  render(): JSX.Element;
}
