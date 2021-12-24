import React, { FC, useEffect, useState } from 'react';
import { AngryFace, OKFace, HappyFace } from './faces';
import Input from '../input';

import './index.scss';

const RATING_STATUS_MAPPING = {
  0: 'ANGRY',
  1: 'OK',
  2: 'HAPPY',
};

type IRatingStatus = keyof typeof RATING_STATUS_MAPPING;

interface IRatingProps {
  rating?: IRatingStatus;
  defaultPositiveComment?: string;
  defaultNegativeComment?: string;
  handleContentChange?: () => void;
  onRatingFaceSelected?: (rating: IRatingStatus) => void;
  onPositiveCommentChange?: (comment: string) => void;
  onNegativeCommentChange?: (comment: string) => void;
}

const DEFAULT_RATING = 1;

const Rating: FC<IRatingProps> = ({
  rating = DEFAULT_RATING,
  defaultPositiveComment,
  defaultNegativeComment,
  onRatingFaceSelected,
  onPositiveCommentChange,
  onNegativeCommentChange,
}) => {
  const [selectedRating, setSelectedRating] = useState<number>(rating);
  const [positiveComment, setPositiveComment] = useState<string>(
    defaultPositiveComment
  );
  const [negativeComment, setNegativeComment] = useState<string>(
    defaultNegativeComment
  );
  const toggleAngryFace = status => {
    const selectedStatus = status ? 0 : DEFAULT_RATING;
    setSelectedRating(selectedStatus);
    onRatingFaceSelected && onRatingFaceSelected(selectedStatus);
  };
  const toggleOKFace = () => {
    setSelectedRating(DEFAULT_RATING);
    onRatingFaceSelected && onRatingFaceSelected(DEFAULT_RATING);
  };
  const toggleHappyFace = status => {
    const selectedStatus = status ? 2 : DEFAULT_RATING;
    setSelectedRating(selectedStatus);
    onRatingFaceSelected && onRatingFaceSelected(selectedStatus);
  };
  const positiveCommentChange = comment => {
    setPositiveComment(comment);
    onPositiveCommentChange && onPositiveCommentChange(comment);
  };
  const negativeCommentChange = comment => {
    setNegativeComment(comment);
    onNegativeCommentChange && onNegativeCommentChange(comment);
  };

  useEffect(() => {
    setPositiveComment(defaultPositiveComment);
  }, [defaultPositiveComment]);
  useEffect(() => {
    setNegativeComment(defaultNegativeComment);
  }, [defaultNegativeComment]);

  return (
    <div className="Rating">
      <div className="Rating__Faces">
        <AngryFace
          isActive={selectedRating === 0}
          callbackHandler={toggleAngryFace}
        />
        <OKFace
          isActive={selectedRating === 1}
          callbackHandler={toggleOKFace}
        />
        <HappyFace
          isActive={selectedRating === 2}
          callbackHandler={toggleHappyFace}
        />
      </div>
      <div className="MoreRatings">
        <Input
          placeholder="好评"
          defaultValue={positiveComment}
          onInputChange={positiveCommentChange}
        />
        <Input
          placeholder="差评"
          defaultValue={negativeComment}
          onInputChange={negativeCommentChange}
        />
      </div>
    </div>
  );
};

export default Rating;
