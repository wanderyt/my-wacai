import React, { FC, useEffect, useState } from 'react';
import Axios from 'axios';

const TagContext = React.createContext<Array<string>>(null);

const useTagContext = () => {
  const context = React.useContext(TagContext);

  if (!context) {
    // dispatch({
    //   type: 'SET_MESSAGE',
    //   notificationType: 'error',
    //   message: '标签未成功获取'
    // });
    console.log('tags are not fetched!');
  }

  return context || {};
};

const TagProvider: FC<{}> = ({children}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tags, setTags] = useState<Array<string>>(null);

  useEffect(() => {
    Axios.get('/api/wacai/getAllTags')
      .then(({data}) => {
        let responseData = data.data || [];
        setTags(responseData);
        setIsLoading(false);
      });
  }, []);

  return (
    !isLoading ?
      <TagContext.Provider value={tags}>{children}</TagContext.Provider>
      :
      null
  );
};

export {
  TagProvider,
  useTagContext,
};
