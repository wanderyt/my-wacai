import React from 'react';
import {connect} from 'react-redux';

class TestClassComp extends React.Component {
  // shouldComponentUpdate(nextProps) {
  //   console.log('nextProps: ', nextProps);
  //   console.log('this.props.updateState === nextProps.updateState: ', this.props.updateState === nextProps.updateState);
  //   return false;
  // }

  updateVariant = () => {
    const dispatch = this.props.dispatch;
    dispatch({
      type: 'UPDATE_VARIANT'
    });
  }

  render() {
    console.log('TestClassComp renders...');
    return (
      <div>
        <button onClick={this.updateVariant}>Click Me! - TestClassComp</button>
      </div>
    )
  };
};

export default connect()(TestClassComp);
