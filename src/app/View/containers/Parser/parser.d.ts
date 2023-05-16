interface ParserProps {
  name: string;
  setRulesAction(rules: any): void;
  translate(text: string): string;
  switchConstructor: any;
}

interface ParserState {
  textArValue: string;
}

interface ParserI {
  handleInput(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  isNum(value): boolean;
  joinArrElsOnQuotes(wordsArr: string[]): string[];
  checkIfColor(text: string): boolean;
  extractColors(text: string): { numValues: number[]; sockets: object };
  parse(): void;
  render(): JSX.Element;
}
