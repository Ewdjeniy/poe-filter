import * as React from 'react';

class Code extends React.Component<CodeProps, CodeState> implements CodeI {
  render(): JSX.Element {
    return <article className="code">{this.returnFilterCodeOutOfRules(this.props.rules)}</article>;
  }

  returnFilterCodeOutOfRules(rules: any): any {
    return rules.map((rule: any, i) => {
      const block: any = `${Object.keys(rule)[0]}`;
      const ruleList: any = Object.keys(rule[block]).map((ruleName: any, i: any) => {
        let content: any = `${ruleName}`;
        if (rule[block][ruleName].operator) {
          content += ` ${rule[block][ruleName].operator}`;
        }
        if (rule[block][ruleName].numValues) {
          rule[block][ruleName].numValues.forEach((value) => content += ` ${value}`);
        }
        if (rule[block][ruleName].textValues) {
          rule[block][ruleName].textValues.forEach((value) => content += ` ${value}`);
        }
        if (rule[block][ruleName].sockets) {
          const sockets = Object.assign({}, rule[block][ruleName].sockets);
          for (let key in sockets) {
            if (sockets[key] > 0) {
              for (let i = 0; i < sockets[key]; i++) {
                content += key;
              }
            }
          }
        }
        return (
          <div key={`div_${i}`}>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {content}
          </div>
        );
      });

      return (
        <div key={`block_${i}`}>
          {block}
          {ruleList}
        </div>
      );
    });
  }
}

export default Code;
