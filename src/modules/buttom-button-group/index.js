import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './index.scss';

const ButtomButtonGroup = ({isExpanded = false, goToMainPage = () => void 0, scrollIntoViewRef}) => {
  const [buttonExpanded, setbuttonExpanded] = useState(false);

  const toggleExpandedButton = () => {
    setbuttonExpanded(!buttonExpanded);
  };

  const goToTop = () => {
    // window.scrollTo(0, 0);
    scrollIntoViewRef.current.scrollIntoView({behavior: "smooth", block: "start"});
    setbuttonExpanded(false);
  };

  const goToMain = () => {
    goToMainPage();
    setbuttonExpanded(false);
  }

  return (
    <div className='ButtomButtonGroup'>
      <div className={`ControlButton ${buttonExpanded ? 'buttonExpanded' : ''}`} onClick={toggleExpandedButton} />
      {
        buttonExpanded &&
        <div className='Bottom_ButtonGroup'>
          <div className='BottomButton BackToTop' onClick={goToTop} />
          <div className='BottomButton BackToMain' onClick={goToMain} />
        </div>
      }
    </div>
  );
};

ButtomButtonGroup.propTypes = {
  isExpanded: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => ({
  goToMainPage: () => {
    dispatch({
      type: 'CHANGE_TO_MAIN',
    });
  }
});

export default connect(null, mapDispatchToProps)(ButtomButtonGroup);
