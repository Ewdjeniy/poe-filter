interface ButtonProps {
  onclick(): void;
  value: string;
}

interface ButtonState {
  key?: string;
}

interface ButtonI {
  render(): JSX.Element;
  handleClick(): void;
}
