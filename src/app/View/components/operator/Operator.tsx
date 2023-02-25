import * as React from 'react';
import Select from '../select/Select';

class Operator
  extends React.Component<OperatorProps, OperatorState>
  implements OperatorI
{
  render(): JSX.Element {
    return (
      <Select
        setAction={this.props.setAction}
        property={this.props.property}
        value={this.props.value}
        options={[
          { value: '=', text: 'Равно' },
          { value: '!', text: 'Не равно' },
          { value: '<=', text: 'Меньше или равно' },
          { value: '>=', text: 'Больше или равно' },
          { value: '<', text: 'Меньше чем' },
          { value: '>', text: 'Больше чем' },
          { value: '==', text: 'Точное соответствие' },
        ]}
      />
    );
  }
}

export default Operator;
