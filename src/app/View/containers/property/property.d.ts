interface PropertyProps {
  setPropertyAction(options: object): void;
  setOperatorAction(options: object): void;
  setTurnerAction(options: object): void;
  setMultipleAction(options: object): void;
  setSocketsAction(options: object): void;
  setColorAction(options: object): void;
  setSwitcherAction(options: object): void;
  filter: defaultInitialState;
  property: string;
  min?: number;
  max?: number;
  label: string;
  content: defaultContent;
  instance: string;
  defaultVal: {
    sockets?: {
      R: number;
      G: number;
      B: number;
      A: number;
      D: number;
      W: number;
    };
  };
  options: object;
  title: string;
  value?: string;
  translate(text: string): string;
  translateOptions(options: string[]): object;
}

interface PropertyState {
  key?: string;
}

interface PropertyState {
  key?: string;
}

interface PropertyI {
  renderProperty(instance: string): JSX.Element;
  checkIfRuleOn(): boolean;
  returnRule(): RuleInterface;
  render(): JSX.Element;
}
