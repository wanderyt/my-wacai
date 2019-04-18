import React from 'react';
import PropTypes from 'prop-types';
 import './index.scss';
 const Loading = (props) => {
  const style = {
    width: props.width || '4em',
    height: props.height || '4em'
  };
   return <div className='Loading' style={style}></div>;
};
 Loading.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
};
 export default Loading;