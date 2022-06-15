import React, { FC, useEffect, useState } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";

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
  detailsOptions: Array<string>;
  placeOptions: Array<string>;
  commentFullInfoOptions: Array<ICommentFullInfoOption>;
}

const CommentContext = React.createContext<ICommentContext>(null);

const useCommentContext = () => {
  const context = React.useContext(CommentContext);
  const dispatch = useDispatch();

  if (!context) {
    dispatch({
      type: "SET_MESSAGE",
      notificationType: "error",
      message: "评论未成功获取",
    });
  }

  return context || {};
};

const CommentProvider: FC<{}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [commentOptions, setCommentOptions] =
    useState<Array<ICommentOption>>(null);
  const [detailsOptions, setDetailsOptions] = useState<Array<string>>();
  const [placeOptions, setPlaceOptions] = useState<Array<string>>();
  const [commentFullInfoOptions, setCommentFullInfoOptions] =
    useState<Array<ICommentFullInfoOption>>();
  const commentStoreValue = useSelector((state) => state.fin.comment || {});
  const dispatch = useDispatch();

  useEffect(() => {
    if (commentStoreValue.commentOptions) {
      return;
    }

    Axios.get("/api/wacai/getAllCommentWithOptions").then(({ data }) => {
      let commentsResponse = data.data.comments || [];
      let detailsResponse = data.data.details || [];
      let placeOptions = [],
        detailsOptions = [];
      commentsResponse.forEach((option) => {
        placeOptions.push(option.comment);
      });
      detailsResponse.forEach((option) => {
        detailsOptions.push(option.details);
      });
      setCommentOptions(commentsResponse);
      setDetailsOptions(detailsOptions);
      setPlaceOptions(placeOptions);
      setCommentFullInfoOptions(data.data.options || []);
      dispatch({
        type: "COMMENT_LOADED",
        commentOptions: commentsResponse,
        detailsOptions,
        placeOptions,
        commentFullInfoOptions: data.data.options || [],
      });
      setIsLoading(false);
    });
  }, []);

  return !isLoading ? (
    <CommentContext.Provider
      value={{
        commentOptions,
        placeOptions,
        detailsOptions,
        commentFullInfoOptions,
      }}
    >
      {children}
    </CommentContext.Provider>
  ) : null;
};

export { CommentProvider, useCommentContext };
