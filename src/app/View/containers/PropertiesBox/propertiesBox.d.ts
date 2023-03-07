interface PropertiesBoxProps {
  label?: any;
  lang?: any;
  rules?: any;
}

interface PropertiesBoxState {
  propertiesBoxTurner: number;
  propertiesBoxCheckboxClass: string;
  propertiesBoxPropertiesClass: string;
}

interface PropertiesBoxI {
  render(): JSX.Element;
}
