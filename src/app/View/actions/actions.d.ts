interface ActionProperty {
  key?: string;
  operator?: string;
  numValues?: number[];
  textValues?: string[];
  turner?: boolean;
  valueType?: string;
  value?: string;
  index?: number;
  block?: string;
  letter?: string;
  rgb?: number[];
  alpha?: number;
  colorValues?: number[][];
  sockets?: {
    R: number;
    G: number;
    B: number;
    A: number;
    D: number;
    W: number;
  };
}
