import React, {useState} from 'react';
import {connect} from 'react-redux';

import './index.scss';

const FinCatSubCat = ({selectedCatGroup = {}, dispatch}) => {
  const [selectedCat, setSelectedCat] = useState(selectedCatGroup.category || '');

  const handleCatClick = (cat) => {
    setSelectedCat(cat);
  }

  const handleSubCatSelected = (subcat) => {
    dispatch({
      type: 'CHANGE_TO_MAIN',
      updatedCatGroup: {
        category: selectedCat,
        subcategory: subcat
      }
    });
  }

  const handleBackClick = () => {
    dispatch({
      type: 'CHANGE_TO_MAIN'
    });
  }

  return (
    <div className='FinCatSubCat'>
      <div className='FinCatSubCat-Header'>
        <div className='Header-Border'>
          <div
            className='Header-BackBtn'
            onClick={handleBackClick} />
          支出类别
        </div>
      </div>
      <div className='FinCatSubCat-Container'>
        <div className='Cats'>
          <div
            className='CatItem'
            onClick={() => handleCatClick('周中')}>
            <div
              className={`CatItem-Border ${selectedCat === '周中' ? 'CatItem-Border-Selected' : ''}`}>
              周中
            </div>
          </div>
        </div>
        <div className='SubCats'>
          <div
            className='SubCatItem'
            onClick={() => handleSubCatSelected('午餐')}>
            <div className='SubCat-Border'>
              <div className='SubCat-Text'>
                午餐
              </div>
            </div>
          </div>
          <div
            className='SubCatItem'
            onClick={() => handleSubCatSelected('晚餐')}>
            <div className=''>
              <div className='SubCat-Text'>
                晚餐
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  let fin = state.fin;
  let selectedCatGroup = fin.selectedCatGroup || {};
  return {
    selectedCatGroup
  };
};

export default connect(mapStateToProps)(FinCatSubCat);
