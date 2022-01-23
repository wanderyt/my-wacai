import React, { FC, useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
// import { useCommentList } from '../store/fin/hooks';
import { setCommentLoaded } from '../store/fin';

interface ICommentOption {
  comment: string;
  date: string;
}

interface ICommentFullInfoOption {
  comment: string;
  category: string;
  subcategory: string;
  place: string;
}

interface ICommentContext {
  commentOptions: Array<ICommentOption>;
  placeOptions: Array<string>;
  commentFullInfoOptions: Array<ICommentFullInfoOption>;
}

const CommentContext = React.createContext<ICommentContext>(null);

const useCommentContext = () => {
  const context = React.useContext(CommentContext);
  const dispatch = useDispatch();

  if (!context) {
    dispatch({
      type: 'SET_MESSAGE',
      notificationType: 'error',
      message: '评论未成功获取',
    });
  }

  return context;
};

const CommentProvider: FC<{}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [commentOptions, setCommentOptions] =
    useState<Array<ICommentOption>>(null);
  const [placeOptions, setPlaceOptions] = useState<Array<string>>();
  const [commentFullInfoOptions, setCommentFullInfoOptions] =
    useState<Array<ICommentFullInfoOption>>();
  // const commentStoreValue = useCommentList();
  // const dispatch = useDispatch();

  useEffect(() => {
    // Chcek if data has been set
    if (commentOptions) {
      return;
    }

    Axios.get('/api/wacai/getAllCommentWithOptions').then(({ data }) => {
      /**
       * Data Sample:
       * comments: [{
       *   comment: "1886汽车主题德国餐厅"
       *   date: "2018-01-06 22:41:21"
       * }]
       * options: [{
       *   category: "周中"
       *   comment: "1度手工凉皮"
       *   place: "饿了么"
       *   subcategory: "午餐"
       * }]
       */
      let commentsResponse = data.data.comments || [];
      let placeOptions = [];
      commentsResponse.forEach(option => {
        placeOptions.push(option.comment);
      });
      setCommentOptions(commentsResponse);
      setPlaceOptions(placeOptions);
      setCommentFullInfoOptions(data.data.options || []);
      // dispatch(
      //   setCommentLoaded({
      //     commentData: {
      //       commentOptions: commentsResponse,
      //       placeOptions,
      //       commentFullInfoOptions: data.data.options || [],
      //     },
      //   })
      // );
      setIsLoading(false);
    });
  }, []);

  return !isLoading ? (
    <CommentContext.Provider
      value={{
        commentOptions,
        placeOptions,
        commentFullInfoOptions,
      }}
    >
      {children}
    </CommentContext.Provider>
  ) : null;
};

export { CommentProvider, useCommentContext };
