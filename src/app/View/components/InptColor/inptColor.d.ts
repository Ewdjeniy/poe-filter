interface InptColorProps {
  name: string;
  value?: number[];
  index?: number;
  property: string;
  setAction(options: object): void;
  min?: number;
  max?: number;
  checked?: boolean;
  defaultVal: object;
  setTurner(options: object): void;
}

interface InptColorState {
  key?: string;
}

interface InptColorI {
  render(): JSX.Element;
  returnRgba(rgbAndVal: number[]): string;
  hexToRGB(hex: string): number[];
  rgba2Hex(rgba: number[]): string;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
