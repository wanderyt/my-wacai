import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
  resetUpdatedCatGroup,
  switchToCategorySelection,
  switchToTemplateList,
} from '../../store/fin';
import { useAppDispatch } from '../../store';
import { useUpdatedCatGroup } from '../../store/fin/hooks';
import styled from 'styled-components';
import { IFinItem } from '../../utils/gql-client/props';
import { Colors } from '../../styles/colors';
import { setLoginStatus } from '../../store/login';

const CreatePanel = styled.div`
  padding: 0 10px;
`;
const FinSubCat = styled.div`
  height: 60px;
  line-height: 60px;
  text-indent: 40px;
  padding: 5px 0;
  background-image: url('./category.png');
  background-size: 30px;
  background-position-y: center;
  background-repeat: no-repeat;
  font-size: 16px;
`;
const FinItem = styled.div`
  height: 50px;
  line-height: 50px;
  input {
    width: 100%;
    outline: none;
    font-size: 16px;
    border: 0;
    background: transparent;
  }
`;
const FinToolbar = styled.div`
  padding: 10px 0;
`;
const FinBtns = styled.div`
  margin: 0 auto;
  width: 80%;
  display: flex;
  justify-content: space-between;
`;
const FinBtn = styled.div`
  border: 1px solid ${Colors.GreyLightII};
  border-radius: 5px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  font-weight: bold;
  min-width: 80px;
  text-align: center;
`;

const CreateTemplate = () => {
  const dispatch = useAppDispatch();
  const updatedCatGroup = useUpdatedCatGroup();
  const [template, setTemplate] = useState<Partial<IFinItem>>(updatedCatGroup);

  useEffect(() => {
    dispatch(resetUpdatedCatGroup());
  }, []);

  const handleBackBtn = () => {
    dispatch(switchToTemplateList());
  };

  const handleSaveButton = () => {
    if (template.category && template.subcategory && template.comment) {
      Axios.post('/api/wacai/createFinTemplate', { data: template }).then(
        () => {
          dispatch(switchToTemplateList());
        },
        ({ response }) => {
          if (response.status === 401) {
            dispatch(setLoginStatus(false));
          }
        }
      );
    }
  };

  const handleCatSelection = () => {
    dispatch(
      switchToCategorySelection({
        selectedCatGroup: {
          category: template.category,
          subcategory: template.subcategory,
        },
      })
    );
  };

  const handleCommentChange = evt => {
    setTemplate(Object.assign({}, template, { comment: evt.target.value }));
  };

  const handlePlaceChange = evt => {
    setTemplate(Object.assign({}, template, { place: evt.target.value }));
  };

  return (
    <div className="CreateTemplate">
      <CreatePanel>
        <FinSubCat onClick={handleCatSelection}>
          {template.category} - {template.subcategory}
        </FinSubCat>
        <FinItem>
          <input
            className="CommentInput"
            placeholder="备注"
            type="input"
            onChange={handleCommentChange}
            value={template.comment}
          />
        </FinItem>
        <FinItem>
          <input
            className="PlaceInput"
            placeholder="商场"
            type="input"
            onChange={handlePlaceChange}
            value={template.place}
          />
        </FinItem>
        <FinToolbar>
          <FinBtns>
            <FinBtn className="Fin-BackBtn" onClick={handleBackBtn}>
              返回
            </FinBtn>
            <FinBtn className="Fin-SaveBtn" onClick={handleSaveButton}>
              保存
            </FinBtn>
          </FinBtns>
        </FinToolbar>
      </CreatePanel>
    </div>
  );
};

export default CreateTemplate;
