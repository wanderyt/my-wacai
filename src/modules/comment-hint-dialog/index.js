import React, {useState, useMemo} from 'react';
import ModalMask from '../modal-mask';
import DropdownList from '../dropdown-list';

import './index.scss';

const CATEGORY_JOINT = ' - ';

const CommentHintDialog = ({closeCallback, successCallback, optionList = [], commentKeyWord = ''}) => {
  const buildList = () => {
    const placeList = [], categoryGroupList = [];
    optionList.map(({place, category, subcategory, comment}) => {
      if (commentKeyWord === comment) {
        placeList.indexOf(place) < 0 && placeList.push(place);
        const categoryString = `${category}${CATEGORY_JOINT}${subcategory}`;
        categoryGroupList.indexOf(categoryString) < 0 && categoryGroupList.push(categoryString);
      }
    });
    return [placeList, categoryGroupList];
  };

  const [placeList, categoryGroupList] = useMemo(buildList, [optionList, commentKeyWord]);
  const [selectedPlace, setSelectedPlace] = useState(placeList[0]);
  const [selectedCategory, setSelectedCategory] = useState(categoryGroupList[0]);

  const placeSelectionHandler = (place) => {
    setSelectedPlace(place);
  };

  const categorySelectionHandler = (category) => {
    setSelectedCategory(category);
  };

  const confirmSelection = () => {
    const [category, subcategory] = selectedCategory.split(CATEGORY_JOINT);
    successCallback(selectedPlace, category, subcategory);
  };

  return (
    <ModalMask>
      <div className='CommentHintDialog'>
        <div className='CommentHintDialog__Content'>
          <div className='CommentHintDialog-Close' onClick={closeCallback} />
          <div className='CommentHint__Title'>
            <div className='Title'>Choose Details</div>
          </div>
          <div className='CommentHint__Content'>
            <div className='CommentHint__Dropdown Place-DropdownList'>
              <DropdownList
                defaultSelectedValue={placeList[0]}
                items={placeList}
                customizeItemClickHandler={placeSelectionHandler} />
            </div>
            <div className='CommentHint__Dropdown Category-DropdownList'>
              <DropdownList
                defaultSelectedValue={categoryGroupList[0]}
                items={categoryGroupList}
                customizeItemClickHandler={categorySelectionHandler} />
            </div>
          </div>
          <div className='CommentHint__Footer'>
            <div className='MyWacai-Button ConfirmBtn' onClick={confirmSelection}>确定</div>
            <div className='MyWacai-Button CancelBtn' onClick={closeCallback}>取消</div>
          </div>
        </div>
      </div>
    </ModalMask>
  );
};

CommentHintDialog.defaultProps = {
  closeCallback: () => void 0,
  successCallback: () => void 0,
  optionList: []
};

export default CommentHintDialog;
