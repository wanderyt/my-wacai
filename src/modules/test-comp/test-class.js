import React from 'react';

class TestClassComp extends React.Component {
  shouldComponentUpdate(nextProps) {
    console.log('nextProps: ', nextProps);
    console.log('this.props.updateState === nextProps.updateState: ', this.props.updateState === nextProps.updateState);
    return false;
  }

  render() {
    console.log('TestClassComp renders...');
    return (
      <div>
        <button onClick={this.props.updateState}>Click Me! - TestClassComp</button>
      </div>
    )
  };
};

export default TestClassComp;
