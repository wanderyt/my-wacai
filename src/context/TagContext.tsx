import React, { FC, useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
// import { useTagList } from '../store/fin/hooks';

const TagContext = React.createContext<Array<string>>(null);

const useTagContext = () => {
  const context = React.useContext(TagContext);
  const dispatch = useDispatch();

  if (!context) {
    dispatch({
      type: 'SET_MESSAGE',
      notificationType: 'error',
      message: '标签未成功获取',
    });
  }

  return context;
};

const TagProvider: FC<{}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tags, setTags] = useState<Array<string>>(null);
  // const tagStoreValue = useTagList();
  // const dispatch = useDispatch();

  useEffect(() => {
    if (tags) {
      return;
    }

    Axios.get('/api/wacai/getAllTags').then(({ data }) => {
      let responseData = data.data || [];
      setTags(responseData);
      // dispatch({
      //   type: 'TAG_LOADED',
      //   tag: responseData,
      // });
      setIsLoading(false);
    });
  }, []);

  return !isLoading ? (
    <TagContext.Provider value={tags}>{children}</TagContext.Provider>
  ) : null;
};

export { TagProvider, useTagContext };
