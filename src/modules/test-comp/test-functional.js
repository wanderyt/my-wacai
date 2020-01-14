import React from 'react';

const TestFunctionalComp = (props) => {
  console.log('TestFunctionalComp renders...');
  return (
    <div>
      <button onClick={props.updateState}>Click Me! - TestFunctionalComp</button>
    </div>
  );
};

export default TestFunctionalComp;
