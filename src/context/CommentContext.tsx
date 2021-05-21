import React, { FC, useEffect, useState } from 'react';
import Axios from 'axios';

interface ICommentOption {
  comment: string;
  date: string;
};

interface ICommentFullInfoOption {
  comment: string;
  category: string;
  subcategory: string;
  place: string;
};

interface ICommentContext {
  commentOptions: Array<ICommentOption>;
  placeOptions: Array<string>;
  commentFullInfoOptions: Array<ICommentFullInfoOption>;
};

const CommentContext = React.createContext<ICommentContext>(null);

const useCommentContext = () => {
  const context = React.useContext(CommentContext);

  if (!context) {
    // dispatch({
    //   type: 'SET_MESSAGE',
    //   notificationType: 'error',
    //   message: '评论未成功获取'
    // });
    console.log('comments are not fetched!');
  }

  return context || {};
};

const CommentProvider: FC<{}> = ({children}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [commentOptions, setCommentOptions] = useState<Array<ICommentOption>>(null);
  const [placeOptions, setPlaceOptions] = useState<Array<string>>();
  const [commentFullInfoOptions, setCommentFullInfoOptions] = useState<Array<ICommentFullInfoOption>>();

  useEffect(() => {
    Axios.get('/api/wacai/getAllCommentWithOptions')
      .then(({data}) => {
        let commentsResponse = data.data.comments || [];
        let placeOptions = [];
        commentsResponse.forEach((option) => {
          placeOptions.push(option.comment);
        });
        setCommentOptions(commentsResponse);
        setPlaceOptions(placeOptions);
        setCommentFullInfoOptions(data.data.options || []);
        setIsLoading(false);
      });
  }, []);

  return (
    !isLoading ?
      <CommentContext.Provider value={{
        commentOptions,
        placeOptions,
        commentFullInfoOptions
      }}>{children}</CommentContext.Provider>
      :
      null
  );
};

export {
  CommentProvider,
  useCommentContext,
};
