import * as React from 'react';
import { connect } from 'react-redux';
import { setRules } from '../../actions/filterActions';
import Button from '../../components/Button';

class Parser
  extends React.Component<ParserProps, ParserState>
  implements ParserI
{
  constructor(props) {
    super(props);
    this.state = {
      textArValue: '',
    };
  }

  render(): JSX.Element {
    return (
      <article className="parser">
        <textarea
          name={this.props.name}
          rows={2}
          placeholder="Enter filter code here"
          value={this.state.textArValue}
          onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            this.handleInput(e)
          }
        ></textarea>
        <Button value="Parse" onclick={this.parse.bind(this)} />
      </article>
    );
  }

  handleInput(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({ textArValue: e.target.value });
  }

  isNum(value): boolean {
    if (parseFloat(value) >= 0 || parseFloat(value) <= 0) return true;
    return false;
  }

  joinArrElsOnQuotes(wordsArr: string[]): string[] {
    let deleted: string;
    const resultArr: string[] = [];
    for (let i = 0; i < wordsArr.length; i += 1) {
      if (wordsArr[i][0] !== '"' && wordsArr[i][wordsArr[i].length - 1] !== '"') {
        resultArr.push(wordsArr[i]); 
      } else if (wordsArr[i][0] === '"' && wordsArr[i][wordsArr[i].length - 1] !== '"') {
        resultArr.push(wordsArr[i].replace(/"/g, ''));
        for (let j = i + 1; j < wordsArr.length; j += 1) {
          if (wordsArr[j].indexOf('"') !== -1) {
            resultArr[resultArr.length - 1] += ` ${wordsArr[j].replace(/"/g, '')}`;
            i = j;
            break;
          }
          resultArr[resultArr.length - 1] += ` ${wordsArr[j]}`;
        }
      } else if (wordsArr[i][0] === '"' && wordsArr[i][wordsArr[i].length - 1] === '"') {
        resultArr.push(wordsArr[i].replace(/"/g, ''));        
      }
    }
    return resultArr;
  }

  checkIfColor(text: string): boolean {
    let counter = 0;
    for (let i = 0; i < text.length; i += 1) {
      if (
        text[i] !== 'R' &&
        text[i] !== 'G' &&
        text[i] !== 'B' &&
        text[i] !== 'W' &&
        text[i] !== 'A' &&
        text[i] !== 'D' &&
        text[i] !== '"' &&
        !this.isNum(text[i])
      ) {
        return false;
      }
      counter += 1;
    }
    if (counter === text.length) {
      return false;
    }
    return true;
  }

  extractColors(text: string): { numValues: number[]; sockets: object } {
    const textArr: string[] = text.split('');
    const result: { numValues: number[]; sockets: object } = {
      numValues: [],
      sockets: {
        R: 0,
        G: 0,
        B: 0,
        A: 0,
        D: 0,
        W: 0,
      },
    };
    textArr.forEach((textEl: string) => {
      if (this.isNum(textEl)) {
        result.numValues.push(parseFloat(textEl));
      } else {
        result.sockets[textEl] += 1;
      }
    });
    return result;
  }

  isOperator(str: string): any {
    if (
      str === '=' ||
      str === '!' ||
      str === '<=' ||
      str === '>=' ||
      str === '<' ||
      str === '>' ||
      str === '=='
    ) {
      return str;
    }
    return false;
  }

  parseProperty(str: string): {propertyName: string, property: any} {
    
    let wordsArr = str.split(' ');
    wordsArr = this.joinArrElsOnQuotes(wordsArr);
    const returnParsed = (property: any) => ({
      propertyName: wordsArr[0],
      property
    });
    let property: any = {};
    const defaultOperator = '>=';
    
    switch (wordsArr[0]) {
      case 'SetBackgroundColor': {
        const colorValues: number[] = [];
        for (let i = 1; i < wordsArr.length; i += 1) {
          colorValues.push(+wordsArr[i])
        } 
        property.colorValues = [colorValues];
        return returnParsed(property);
      }
      case 'SetBorderColor': {
        const colorValues: number[] = [];
        for (let i = 1; i < wordsArr.length; i += 1) {
          colorValues.push(+wordsArr[i])
        } 
        property.colorValues = [colorValues];
        return returnParsed(property);
      }
      case 'SetTextColor': {
        const colorValues: number[] = [];
        for (let i = 1; i < wordsArr.length; i += 1) {
          colorValues.push(+wordsArr[i])
        } 
        property.colorValues = [colorValues];
        return returnParsed(property);
      }
      case 'PlayAlertSound': {
        if (wordsArr[1]) {
          property.textValues = [wordsArr[1]];
        }
        if (wordsArr[2]) {
          property.numValues = [wordsArr[2]];
        }  
        return returnParsed(property);
      }
      case 'PlayAlertSoundPositional': {
        if (wordsArr[1]) {
          property.textValues = [wordsArr[1]];
        }
        if (wordsArr[2]) {
          property.numValues = [wordsArr[2]];
        }  
        return returnParsed(property);
      }
      case 'SocketGroup': {
        for (let i = 1; i < wordsArr.length; i += 1) {
          if (this.isOperator(wordsArr[i])) {
            property.operator = wordsArr[i];
          } else {
            const sockets = this.extractColors(wordsArr[i]);
            property = {
              ...property,
              numValues: sockets.numValues,
              sockets: sockets.sockets,
            }
          }
        }
        property.operator = property.operator ? property.operator : '>=';
        if (!property.numValues[0] && property.sockets) {
          let socketsAmount = 0;
          Object.keys(property.sockets).forEach((colorName) => {
            socketsAmount += property.sockets[colorName],
            property.numValues = [socketsAmount];
          });
        }
        return returnParsed(property);
      }
      case 'Sockets': {
        for (let i = 1; i < wordsArr.length; i += 1) {
          if (this.isOperator(wordsArr[i])) {
            property.operator = wordsArr[i];
          } else {
            const sockets = this.extractColors(wordsArr[i]);
            property = {
              ...property,
              numValues: sockets.numValues,
              sockets: sockets.sockets,
            }
          }
        }
        property.operator = property.operator ? property.operator : '>=';
        if (!property.numValues[0] && property.sockets) {
          let socketsAmount = 0;
          Object.keys(property.sockets).forEach((colorName) => {
            socketsAmount += property.sockets[colorName],
            property.numValues = [socketsAmount];
          });
        }
        return returnParsed(property);
      }
      case 'HasExplicitMod': {
        property.operator = defaultOperator;
        for (let i = 1; i < wordsArr.length; i += 1) {
          if (this.isOperator(wordsArr[i])) {
            property.operator = wordsArr[i];
          } else if (this.isNum(wordsArr[i])) {
            property.numValues = property.numValues ? property.numValues : [];
            property.numValues.push(wordsArr[i]);
          } else {
            property.textValues = property.textValues ? property.textValues : [];
            property.textValues.push(wordsArr[i]);
          }
        }
        property.numValues = property.numValues ? property.numValues : [property.textValues.length];
        return returnParsed(property);
      }
      case 'Rarity': {
        property.operator = defaultOperator;
      }
      case 'BaseArmour': {
        property.operator = defaultOperator;
      }
      case 'BaseDefencePercentile': {
        property.operator = defaultOperator;
      }
      case 'BaseEnergyShield': {
        property.operator = defaultOperator;
      }
      case 'BaseEvasion': {
        property.operator = defaultOperator;
      }
      case 'BaseWard': {
        property.operator = defaultOperator;
      }
      case 'LinkedSockets': {
        property.operator = defaultOperator;
      }
      case 'CorruptedMods': {
        property.operator = defaultOperator;
      }
      case 'EnchantmentPassiveNum': {
        property.operator = defaultOperator;
      }
      case 'HasEaterOfWorldsImplicit': {
        property.operator = defaultOperator;
      }
        
      case 'Width': {
        property.operator = '=';
      }
        
      case 'Height': {
        property.operator = '=';
      }
        
      case 'Quality': {
        property.operator = defaultOperator;
      }
        
      case 'StackSize': {
        property.operator = defaultOperator;
      }
        
      case 'AreaLevel': {
        property.operator = defaultOperator;
      }
        
      case 'DropLevel': {
        property.operator = defaultOperator;
      }
        
      case 'GemLevel': {
        property.operator = defaultOperator;
      }
        
      case 'ItemLevel': {
        property.operator = defaultOperator;
      }
        
      case 'MapTier': {
        property.operator = defaultOperator;
      }
        
      case 'HasSearingExarchImplicit': {
        property.operator = defaultOperator;
      }
      
      default: {
        for (let i = 1; i < wordsArr.length; i += 1) {
          if (this.isOperator(wordsArr[i])) {
            property.operator = wordsArr[i];
          } else if (this.isNum(wordsArr[i])) {
            property.numValues = property.numValues ? property.numValues : [];
            property.numValues.push(wordsArr[i]);
          } else {
            property.textValues = property.textValues ? property.textValues : [];
            property.textValues.push(wordsArr[i]);
          }
        }
        return returnParsed(property);
      }
    }
    
  }

  parse(): void {
    
    const rules: object[] = [];
    const textToCode: string[] = this.state.textArValue.split('\n');
    let blockName = '';

    for (let i = 0; i < textToCode.length; i += 1) {
      textToCode[i] = textToCode[i].trim();
      if (textToCode[i].indexOf('#') === 0) {
        continue;
      }
      if (textToCode[i] === 'Show' || textToCode[i] === 'Hide' || textToCode[i] === 'Minimal') {
        rules.push({});
        rules[rules.length - 1][textToCode[i]] = {};
        blockName = textToCode[i];
        continue;
      }
      switch (textToCode[i]) {
        case 'Continue': {
          rules[rules.length - 1][blockName].Continue = true;
          break;
        }
        case 'EnableDropSound': {
          rules[rules.length - 1][blockName].DropSound = true;
          break;
        }
        case 'DisableDropSound': {
          rules[rules.length - 1][blockName].DropSound = false;
          break;
        }
        case 'EnableDropSoundIfAlertSound': {
          rules[rules.length - 1][blockName].DropSoundIfAlertSound = true;
          break;
        }
        case 'DisableDropSoundIfAlertSound': {
          rules[rules.length - 1][blockName].DropSoundIfAlertSound = false;
          break;
        }
        default: {
          const codeString = this.parseProperty(textToCode[i]);
          if (codeString && codeString.propertyName && codeString.property) {
            rules[rules.length - 1][blockName][codeString.propertyName] = codeString.property;
          } else {
            alert('Code not valid!');
          }
        }     
      }
    }
    this.setState({textArValue: '',});
    this.props.setRulesAction(rules);
    this.props.switchConstructor();
    
  }
  
}

const mapStateToProps = (store) => ({});

const mapDispatchToProps = (dispatch) => ({
  setRulesAction: (rules: any) => dispatch(setRules(rules)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Parser);
