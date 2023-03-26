interface FilterInitialState {
  ruleIndex: number;
  contents: object;
  rules: object[];
}

interface languageInitialState {
  language: string;
  lang: object;
}

interface RuleInterface {
  operator?: string;
  numValues?: number[];
  textValues?: string[];
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
