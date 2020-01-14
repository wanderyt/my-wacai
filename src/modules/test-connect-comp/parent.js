import React from 'react';
import {connect} from 'react-redux';

const Parent = ({variant, children}) => {
  console.log('Parent renders...');

  return (
    <div>
      Variant - {variant}
      {children}
    </div>
  );
};

const mapStateToProps = (state) => {
  const test = state.test || {};
  return {
    variant: test.variant || 0
  };
};

export default connect(mapStateToProps)(Parent);
