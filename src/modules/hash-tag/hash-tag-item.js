import React from 'react';
import PropTypes from 'prop-types';

import './hash-tag-item.scss';

class HashTagItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelected: props.isSelected
    };
  }

  toggleSelection = () => {
    const currState = this.state.isSelected;
    this.setState({
      isSelected: !currState
    });

    this.props.toggleSelection && this.props.toggleSelection(this.props.tag, !currState);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isSelected: nextProps.isSelected
    });
  }

  render() {
    const {tag = ''} = this.props;
    const {isSelected} = this.state;

    return (
      <div className={`HashTagItem ${isSelected ? 'HashTagItem--Selected' : ''}`} onClick={this.toggleSelection}>
        <div className='HashTag__Content'>
          {tag}
        </div>
        <div className='HashTag__Flag' />
      </div>
    );
  }
}

HashTagItem.propTypes = {
  tag: PropTypes.string,
  isSelected: PropTypes.bool
};

export default HashTagItem;
