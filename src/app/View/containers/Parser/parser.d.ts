interface ParserProps {
  name: string;
  translate(text: string): string;
}

interface ParserState {
  textArValue: string;
}

interface ParserI {
  handleInput(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  isNum(value): boolean;
  joinArrElsOnWord(wordsArr: string[], word: string): string[];
  checkIfColor(text: string): boolean;
  extractColors(text: string): { numValues: number[]; sockets: object };
  parse(): void;
  render(): JSX.Element;
}
