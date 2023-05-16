interface MenuProps {
  onclick(menuValue: string, id: number): void;
  translate(text: string): string;
  activeLiId: any;
}

interface MenuState {

}

interface MenuI {
  render(): JSX.Element;
  handleLiClick(text: string, i: number): void;
}
