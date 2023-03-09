interface RulesProps {
  filter?: any;
  setIndexAction?: any;
  lang?: any;
  addBlockAction?: any;
  deleteBlockAction?: any;
}

interface RulesState {
  count?: number;
}

interface RulesI {
  render(): JSX.Element;
}
