import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import HeaderToolbar from '../header-toolbar';

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
      type: 'CATEGORY_SELECTION_DONE',
      updatedCatGroup: {
        category: selectedCat,
        subcategory: subcat
      }
    });
  }

  return (
    <div className='FinCatSubCat'>
      <HeaderToolbar
        barTitle='支出类别' />
      <div className='FinCatSubCat-Container'>
        <div className='Cats'>
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
