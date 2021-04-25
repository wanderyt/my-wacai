import React, {useState, useMemo, FC} from 'react';
import ModalMask from '../modal-mask';
import DropdownList from '../dropdown-list';
import Checkbox from '../checkbox';

import './index.scss';

const CATEGORY_JOINT = ' - ';

interface OptionItem {
  place: string;
  category: string;
  subcategory: string;
  comment: string;
};

interface ISuccessCallbackParam {
  place?: string,
  category?: string,
  subcategory?: string
};

interface ISuccessCallback {
  (param: ISuccessCallbackParam) : void;
}

interface Props {
  closeCallback: () => void;
  successCallback: ISuccessCallback;
  optionList: Array<OptionItem>;
  commentKeyWord: string;
};

const CommentHintDialog : FC<Props> = ({closeCallback, successCallback, optionList = [], commentKeyWord = ''}) => {
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
  const [isPlaceConfirmed, setIsPlaceConfirmed] = useState<boolean>(false);
  const [isCategoryConfirmed, setIsCategoryConfirmed] = useState<boolean>(false);

  const placeSelectionHandler = (place) => {
    setSelectedPlace(place);
  };

  const categorySelectionHandler = (category) => {
    setSelectedCategory(category);
  };

  const confirmSelection = () => {
    const [category, subcategory] = selectedCategory.split(CATEGORY_JOINT);
    let result = {};
    if (isPlaceConfirmed) {
      result = Object.assign({}, {place: selectedPlace});
    }
    if (isCategoryConfirmed) {
      result = Object.assign(result, {category, subcategory});
    }
    successCallback(result);
  };

  const checkPlaceChange = (evt) => {
    setIsPlaceConfirmed(evt.target.checked);
  };

  const checkCategoryChange = (evt) => {
    setIsCategoryConfirmed(evt.target.checked);
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
              <Checkbox onChange={checkPlaceChange} />
            </div>
            <div className='CommentHint__Dropdown Category-DropdownList'>
              <DropdownList
                defaultSelectedValue={categoryGroupList[0]}
                items={categoryGroupList}
                customizeItemClickHandler={categorySelectionHandler} />
              <Checkbox onChange={checkCategoryChange} />
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
