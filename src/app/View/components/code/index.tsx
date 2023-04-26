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
      let continueString: any = false;
      const ruleList: JSX.Element[] = Object.keys(rule[block]).map(
        (ruleName: string, i: number) => {
          switch (ruleName) {
            case 'DropSound': {
              if (rule[block].DropSound === false) {
                let content = 'DisableDropSound';
                return (
                  <div key={`div_${i}`}>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {content}
                  </div>
                );
              } else if (rule[block].DropSound) {
                let content = 'EnableDropSound';
                return (
                  <div key={`div_${i}`}>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {content}
                  </div>
                );
              }
            }
            case 'DropSoundIfAlertSound': {
              if (rule[block].DropSoundIfAlertSound === false) {
                let content = 'DisableDropSoundIfAlertSound';
                return (
                  <div key={`div_${i}`}>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {content}
                  </div>
                );
              } else if (rule[block].DropSoundIfAlertSound) {
                let content = 'EnableDropSoundIfAlertSound';
                return (
                  <div key={`div_${i}`}>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {content}
                  </div>
                );
              }
            }
            case 'Continue': {
              if (rule[block].Continue) {
                continueString = () => (
                  <div key={`div_${i}`}>
                    &nbsp;&nbsp;&nbsp;
                    Continue
                  </div>
                );
                break;
              }
              break;
            }
            default: {
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
                  content += ` ${this.props.checkOnQuotes(value)}`;
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
            }
          }
        }
      );

      return (
        <div key={`block_${i}`}>
          {block}
          {ruleList}
          {continueString ? continueString(): ''}
        </div>
      );
    });
  }
}

export default Code;
