import * as React from 'react';

class Code extends React.Component<CodeProps, CodeState> implements CodeI {
  returnFilterCodeOutOfRules(rules: any): any {
    return rules.map((rule: any, i) => {
      const block: any = `${Object.keys(rule)[0]}`;
      const list: any = Object.keys(rule[block]).map(
        (ruleName: any, i: any) => {
          if (rule[block][ruleName].operator) {
            return (
              <div key={`div_${i}`}>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {`${ruleName} ${rule[block][ruleName].operator} ${rule[block][ruleName].value}`}
              </div>
            );
          } else {
            return (
              <div key={`div_${i}`}>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {`${ruleName} ${rule[block][ruleName].value}`}
              </div>
            );
          }
        },
      );
      return (
        <div key={`block_${i}`}>
          {block}
          {list}
        </div>
      );
    });
  }

  render(): JSX.Element {
    return (
      <article className="code">
        {this.returnFilterCodeOutOfRules(this.props.rules)}
      </article>
    );
  }
}

export default Code;
