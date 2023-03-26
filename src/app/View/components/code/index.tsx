import * as React from 'react';

class Code extends React.Component<CodeProps, CodeState> implements CodeI {
  render(): JSX.Element {
    return (
      <article className="code">
        {this.returnFilterCodeOutOfRules(this.props.rules)}
      </article>
    );
  }

  returnFilterCodeOutOfRules(rules: object[]): JSX.Element[] {
    return rules.map((rule: object, i) => {
      const block = `${Object.keys(rule)[0]}`;
      const ruleList: JSX.Element[] = Object.keys(rule[block]).map(
        (ruleName: string, i: number) => {
          let content = `${ruleName}`;
          if (rule[block][ruleName].operator) {
            content += ` ${rule[block][ruleName].operator}`;
          }
          if (rule[block][ruleName].numValues) {
            rule[block][ruleName].numValues.forEach((value) => {
              content += ` ${value}`;
            });
          }
          if (rule[block][ruleName].textValues) {
            rule[block][ruleName].textValues.forEach((value) => {
              content += this.checkOnNoQuotes(value)
                ? ` ${value}`
                : ` "${value}"`;
            });
          }
          if (rule[block][ruleName].colorValues) {
            rule[block][ruleName].colorValues.forEach((value) => {
              value.forEach((color) => {
                content += ` ${color}`;
              });
            });
          }
          if (rule[block][ruleName].sockets) {
            const sockets = { ...rule[block][ruleName].sockets };
            Object.keys(sockets).forEach((key) => {
              if (sockets[key] > 0) {
                for (let i = 0; i < sockets[key]; i += 1) {
                  content += key;
                }
              }
            });
          }
          return (
            <div key={`div_${i}`}>
              &nbsp;&nbsp;&nbsp;&nbsp;
              {content}
            </div>
          );
        },
      );

      return (
        <div key={`block_${i}`}>
          {block}
          {ruleList}
        </div>
      );
    });
  }

  checkOnNoQuotes(word: string): boolean {
    const wordsWithNoQuotes: string[] = [
      'True',
      'False',
      'Normal',
      'Magic',
      'Rare',
      'Unique',
      'Superior',
      'Divergent',
      'Anomalous',
      'Phantasmal',
      'Red',
      'Green',
      'Blue',
      'Brown',
      'White',
      'Yellow',
      'Cyan',
      'Grey',
      'Orange',
      'Pink',
      'Purple',
      'Temp',
      'Circle',
      'Diamond',
      'Hexagon',
      'Square',
      'Star',
      'Triangle',
      'Cross',
      'Moon',
      'Raindrop',
      'Kite',
      'Pentagon',
      'UpsideDownHouse',
    ];
    for (let i = 0; i < wordsWithNoQuotes.length; i += 1) {
      if (word === wordsWithNoQuotes[i]) {
        return true;
      }
    }
    return false;
  }
}

export default Code;
