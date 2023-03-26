interface LanguageProps {
  setLanguageAction(property: object): void;
  language: string;
}

interface LanguageState {
  key?: string;
}

interface LanguageI {
  render(): JSX.Element;
}
