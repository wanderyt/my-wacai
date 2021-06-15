import React, {useState, useRef, useEffect, FC, cloneElement, isValidElement} from 'react';

import './index.scss';

interface IBottomDrawer {
  autoExpand?: boolean;
};

const BottomDrawer: FC<IBottomDrawer> = ({children, autoExpand = false}) => {
  const [contentRectHeight, setContentRectHeight] = useState<number>(0)
  const [drawerHeight, setDrawerHeight] = useState<number>(0);
  const [recalculateContentTrigger, setRecalculateContentTrigger] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(autoExpand);
  const childrenRef = useRef(null);
  const toggleDrawer = () => {
    setIsExpanded(!isExpanded);
    setDrawerHeight(drawerHeight ? 0 : contentRectHeight);
  };

  useEffect(() => {
    const boundingClientRect = childrenRef.current.getBoundingClientRect();
    setContentRectHeight(boundingClientRect.height);

    if (isExpanded) {
      setDrawerHeight(boundingClientRect.height);
    }
  }, [isExpanded]);

  useEffect(() => {
    let boundingClientRect;
    if (!contentRectHeight) {
      boundingClientRect = childrenRef.current.getBoundingClientRect();
    }

    setDrawerHeight(autoExpand ? contentRectHeight || boundingClientRect.height : 0);
  }, [autoExpand]);

  // Recalculate content height
  useEffect(() => {
    const boundingClientRect = childrenRef.current.getBoundingClientRect();
    setContentRectHeight(boundingClientRect.height);

    if (isInitialLoad) {
      setDrawerHeight(autoExpand ? contentRectHeight || boundingClientRect.height : 0);
    } else {
      setDrawerHeight(contentRectHeight);
    }
    setIsInitialLoad(false);
  }, [recalculateContentTrigger]);

  const childrenElement = cloneElement(
    isValidElement(children) ? children : <span>{children}</span>, {
      handleContentChange: () => {
        setRecalculateContentTrigger(!recalculateContentTrigger);
      }
    }
  );

  return (
    <div className='BottomDrawer'>
      <div className='Handle' onClick={toggleDrawer} />
        <div className='Content' style={{height: `${drawerHeight}px`}}>
          <div ref={childrenRef}>
            {isExpanded && childrenElement}
          </div>
        </div>
    </div>
  );
};

export default BottomDrawer;