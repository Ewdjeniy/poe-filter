import * as React from 'react';
import { connect } from 'react-redux';
import store from '../../store/configureStore';
import Button from '../../components/Button';

class Parser extends React.Component<ParserProps, ParserState> implements ParserI {
  constructor(props) {
    super(props);
    this.state ={
      textArValue: '',
    }
  }
  render(): JSX.Element {
    return (
      <article className="parser">
        <textarea
          name={this.props.name}
          rows={2}
          placeholder="Enter filter code here"
          value={this.state.textArValue}
          onInput={(e: any) => this.handleInput(e)}
        >
        </textarea>
        <Button onclick={this.parse.bind(this)}/>
      </article>
    );
  }
  
  handleInput(e: any): any {
    this.setState({textArValue: e.target.value});
  }
  
  isNum(value: any): any {
    if(parseFloat(value) >= 0 || parseFloat(value) <= 0) return true;
    return false;
  }
  
  joinArrElsOnWord(wordsArr: any[], word: string): any {
    let deleted: any;
    for (let i = 1; i < wordsArr.length; i++) {
      if (wordsArr[i] == word) {
        deleted = wordsArr.splice(i, 2).join(' ');
        wordsArr.splice(i, 0, deleted);
      }
    }
    return wordsArr;
  }
  
  checkIfColor(text: string): any {
    let counter: number = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] != 'R' && text[i] != 'G' && text[i] != 'B' && text[i] != 'W' && text[i] != 'A' && text[i] != 'D' && text[i] != '"' && !this.isNum(text[i])) {
        return false;
      } else if (this.isNum(text[i])) {
        counter++;        
      }
    }
    if (counter == text.length) {
      return false;
    }
    return true;
  }
  
  extractColors(text: any): any {
    let result: any;
    if (!this.checkIfColor(text)) return false;
    result = {};
    text = text.split('');
    text.forEach((textEl) => {
      if (this.isNum(textEl)) {
        result.numValues = result.numValues ? result.numValues : [];
        result.numValues.push(textEl);
      } else {
        result.sockets = result.sockets ? result.sockets : { R: 0, G: 0, B: 0, A: 0, D: 0, W: 0 };
        result.sockets[textEl] += 1;
      }
    });
    return result;
  }
  
  parse(): any {
    let rules: any[] = [];
    let blockName: any = '';
    let textToCode: any = this.state.textArValue.split('\n');
    
    for (let i = 0; i < textToCode.length; i++) {
      textToCode[i] = textToCode[i].trim();
      if (textToCode[i] == 'Show' || textToCode[i] == 'Hide' || textToCode[i] == 'Minimal') {
        rules.push({});
        rules[rules.length - 1][textToCode[i]] = {};
        blockName = [textToCode[i]];
      } else {
        let codeStringArr = textToCode[i].split(' ');
        codeStringArr = this.joinArrElsOnWord(codeStringArr, '"of');
        let key: string = '';
        codeStringArr.forEach((str, j) => {
          if (j == 0) {
            rules[rules.length - 1][blockName][str] = {};
            key = str;
          } else if (str == '=' || str == '!' || str == '<=' || str == '>=' || str == '<' || str == '>' || str == '==') {
            rules[rules.length - 1][blockName][key].operator = str;
          } else if (this.extractColors(str)) {
            if (this.extractColors(str).numValues) {
              rules[rules.length - 1][blockName][key].numValues = rules[rules.length - 1][blockName][key].numValues ? rules[rules.length - 1][blockName][key].numValues : [];
              rules[rules.length - 1][blockName][key].numValues = rules[rules.length - 1][blockName][key].numValues.concat(this.extractColors(str).numValues);
            }
            rules[rules.length - 1][blockName][key].sockets = this.extractColors(str).sockets;
          } else if (this.isNum(str)) {
            rules[rules.length - 1][blockName][key].numValues = rules[rules.length - 1][blockName][key].numValues ? rules[rules.length - 1][blockName][key].numValues : [];
            rules[rules.length - 1][blockName][key].numValues.push(str);
          } else {
            rules[rules.length - 1][blockName][key].textValues = rules[rules.length - 1][blockName][key].textValues ? rules[rules.length - 1][blockName][key].textValues : [];
            rules[rules.length - 1][blockName][key].textValues.push(str);
          }
        });
      }
    }
    
    console.log(textToCode);
    console.log(rules);
  }
}

 

const mapStateToProps = (store) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Parser);
