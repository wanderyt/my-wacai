import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

import './index.scss';

const FinCatSubCat = ({selectedCatGroup = {}, dispatch}) => {
  const [selectedCat, setSelectedCat] = useState(selectedCatGroup.category || '');
  const [categoryGroups, setCategoryGroups] = useState({});

  useEffect(() => {
    Axios.get('/api/wacai/getCategoryGroup')
      .then(({data}) => {
        let categoryGroupData = data.data || {};
        setCategoryGroups(categoryGroupData);
      });
  }, [])

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
          {/* <div
            className='CatItem'
            onClick={() => handleCatClick('周中')}>
            <div
              className={`CatItem-Border ${selectedCat === '周中' ? 'CatItem-Border-Selected' : ''}`}>
              周中
            </div>
          </div> */}
          {
            Object.keys(categoryGroups).map((cat, index) => (
              <div
                className='CatItem'
                key={index}
                onClick={() => handleCatClick(cat)}>
                <div
                  className={`CatItem-Border ${selectedCat === cat ? 'CatItem-Border-Selected' : ''}`}>
                  {cat}
                </div>
              </div>
            ))
          }
        </div>
        <div className='SubCats'>
          {/* <div
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
          </div> */}
          {
            selectedCat && categoryGroups[selectedCat] && categoryGroups[selectedCat].map(({subcategory, isCommon}, index) => (
              <div
                className='SubCatItem'
                onClick={() => handleSubCatSelected(subcategory)}
                key={index}>
                <div className={`${index !== categoryGroups[selectedCat].length - 1 ? 'SubCat-Border' : ''}`}>
                  <div className='SubCat-Text'>
                    {subcategory}
                  </div>
                </div>
              </div>
            ))
          }
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
