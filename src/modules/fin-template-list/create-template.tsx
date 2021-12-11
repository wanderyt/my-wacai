import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

import './create-template.scss';

const CreateTemplate = ({ updatedCatGroup, dispatch }) => {
  const [template, setTemplate] = useState(updatedCatGroup);

  useEffect(() => {
    dispatch({
      type: 'RESET_UPDATED_CAT_GROUP',
    });
  }, []);

  const handleBackBtn = () => {
    dispatch({
      type: 'CHANGE_TO_FIN_TEMPLATE_LIST',
    });
  };

  const handleSaveButton = () => {
    if (template.category && template.subcategory && template.comment) {
      Axios.post('/api/wacai/createFinTemplate', { data: template }).then(
        () => {
          dispatch({
            type: 'CHANGE_TO_FIN_TEMPLATE_LIST',
          });
        },
        ({ response }) => {
          if (response.status === 401) {
            dispatch({
              type: 'TOKEN_INVALID',
            });
          }
        }
      );
    }
  };

  const handleCatSelection = () => {
    dispatch({
      type: 'CHANGE_TO_CATEGORY_SELECTION',
      selectedCatGroup: {
        category: template.category,
        subcategory: template.subcategory,
      },
    });
  };

  const handleCommentChange = evt => {
    setTemplate(Object.assign({}, template, { comment: evt.target.value }));
  };

  const handlePlaceChange = evt => {
    setTemplate(Object.assign({}, template, { place: evt.target.value }));
  };

  return (
    <div className="CreateTemplate">
      <div className="CreatePanel">
        <div className="Fin-SubCat" onClick={handleCatSelection}>
          {template.category} - {template.subcategory}
        </div>
        <div className="Fin-Comment">
          <input
            className="CommentInput"
            placeholder="备注"
            type="input"
            onChange={handleCommentChange}
            value={template.comment}
          />
        </div>
        <div className="Fin-Place">
          <input
            className="PlaceInput"
            placeholder="商场"
            type="input"
            onChange={handlePlaceChange}
            value={template.place}
          />
        </div>
        <div className="Fin-Toolbar">
          <div className="Fin-Btns">
            <div className="Fin-Btn Fin-BackBtn" onClick={handleBackBtn}>
              返回
            </div>
            <div className="Fin-Btn Fin-SaveBtn" onClick={handleSaveButton}>
              保存
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  let fin = state.fin || {};
  return {
    updatedCatGroup: fin.updatedCatGroup || {},
    isCreatingTemplate: fin.isCreatingTemplate,
  };
};

export default connect(mapStateToProps)(CreateTemplate);
