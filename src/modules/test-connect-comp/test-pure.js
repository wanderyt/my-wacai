import React from 'react';
import {connect} from 'react-redux';

class TestPureComp extends React.PureComponent {
  updateVariant = () => {
    const dispatch = this.props.dispatch;
    dispatch({
      type: 'UPDATE_VARIANT'
    });
  }

  render() {
    console.log('TestPureComp renders...');
    return (
      <div>
        <button onClick={this.updateVariant}>Click Me! - TestPureComp</button>
      </div>
    )
  };
};

export default connect()(TestPureComp);
