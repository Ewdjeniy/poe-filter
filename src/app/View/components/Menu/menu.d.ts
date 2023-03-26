interface MenuProps {
  onclick(menuValue: string): void;
  translate(text: string): string;
}

interface MenuState {
  liClass?: string;
  activeLiId: number;
}

interface MenuI {
  render(): JSX.Element;
  handleLiClick(i: number, text: string): void;
}
