import React from 'react';

class TestPureComp extends React.PureComponent {
  render() {
    console.log('TestPureComp renders...');
    return (
      <div>
        <button onClick={this.props.updateState}>Click Me! - TestPureComp</button>
      </div>
    )
  };
};

export default TestPureComp;
