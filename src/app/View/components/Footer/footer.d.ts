interface FooterProps {
  translate(text: string): string;
}

interface FooterState {
  key?: string;
}

interface FooterI {
  render(): JSX.Element;
}
