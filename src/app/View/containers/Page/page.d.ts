interface PageProps {
  lang: object;
}

interface PageState {
  key?: string;
}

interface PageI {
  translate(text: string): string;
  translateOptions(options: string[]): object;
  render(): JSX.Element;
}
