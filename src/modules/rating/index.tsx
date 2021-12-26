import React, { FC, useEffect, useState } from 'react';
import { AngryFace, OKFace, HappyFace } from './faces';
import Input from '../input';

import './index.scss';
import { IRating, IRatingStatus } from '../../utils/gql-client/props';

interface IRatingProps {
  rating?: IRating | undefined;
  onRatingFaceSelected?: (rating: IRatingStatus) => void;
  onPositiveCommentChange?: (comment: string) => void;
  onNegativeCommentChange?: (comment: string) => void;
}

const DEFAULT_RATING_LEVEL = 1;

const Rating: FC<IRatingProps> = ({
  rating,
  onRatingFaceSelected,
  onPositiveCommentChange,
  onNegativeCommentChange,
}) => {
  const [selectedRating, setSelectedRating] = useState<number>(
    rating ? rating.rating : DEFAULT_RATING_LEVEL
  );
  const [positiveComment, setPositiveComment] = useState<string>(
    (rating && rating.positiveComment) || ''
  );
  const [negativeComment, setNegativeComment] = useState<string>(
    (rating && rating.negativeComment) || ''
  );
  const toggleAngryFace = status => {
    const selectedStatus = status ? 0 : DEFAULT_RATING_LEVEL;
    onRatingFaceSelected && onRatingFaceSelected(selectedStatus);
  };
  const toggleOKFace = () => {
    onRatingFaceSelected && onRatingFaceSelected(DEFAULT_RATING_LEVEL);
  };
  const toggleHappyFace = status => {
    const selectedStatus = status ? 2 : DEFAULT_RATING_LEVEL;
    onRatingFaceSelected && onRatingFaceSelected(selectedStatus);
  };
  const positiveCommentChange = comment => {
    onPositiveCommentChange && onPositiveCommentChange(comment);
  };
  const negativeCommentChange = comment => {
    onNegativeCommentChange && onNegativeCommentChange(comment);
  };

  useEffect(() => {
    if (rating) {
      setPositiveComment(rating.positiveComment);
      setNegativeComment(rating.negativeComment);
      setSelectedRating(rating.rating);
    }
  }, [rating]);

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
