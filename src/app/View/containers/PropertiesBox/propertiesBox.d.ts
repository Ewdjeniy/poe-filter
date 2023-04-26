interface PropertiesBoxProps {
  label: string;
  rules: object[];
  translate(text: string): string;
  translateOptions(options: string[]): object;
  active: boolean;
  onclick(index: number): void;
  index: number;
}

interface PropertiesBoxState {
  turner?: number;
}

interface Props {
  key: string;
  label: string;
  title: string;
  property: string;
  defaultVal: object;
  options: string[];
  instance: string;
  translate(text: string): string;
  translateOptions(options: string[]): object;
}

interface PropertiesBoxI {
  render(): JSX.Element;
}
