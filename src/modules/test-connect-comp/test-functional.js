import React from 'react';
import {connect} from 'react-redux';

const TestFunctionalComp = (props) => {
  const updateVariant = () => {
    const dispatch = props.dispatch;
    dispatch({
      type: 'UPDATE_VARIANT'
    });
  };

  console.log('TestFunctionalComp renders...');

  return (
    <div>
      <button onClick={updateVariant}>Click Me! - TestFunctionalComp</button>
    </div>
  );
};

export default connect()(TestFunctionalComp);
