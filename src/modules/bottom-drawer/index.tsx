import React, {useState, useRef, useEffect, FC} from 'react';

import './index.scss';

interface IBottomDrawer {
  autoExpand?: boolean;
};

const BottomDrawer: FC<IBottomDrawer> = ({children, autoExpand = false}) => {
  const [isExpanded, setIsExpanded] = useState(autoExpand);
  const [contentRectHeight, setContentRectHeight] = useState<number>(0)
  const [drawerHeight, setDrawerHeight] = useState<number>(0);
  const childrenRef = useRef(null);
  const toggleDrawer = () => {
    setIsExpanded(!isExpanded);
    setDrawerHeight(drawerHeight ? 0 : contentRectHeight);
  };

  useEffect(() => {
    const boundingClientRect = childrenRef.current.getBoundingClientRect();
    setContentRectHeight(boundingClientRect.height);

    if (autoExpand) {
      setDrawerHeight(boundingClientRect.height);
    }
  }, [childrenRef]);

  return (
    <div className='BottomDrawer'>
      <div className='Handle' onClick={toggleDrawer} />
        <div className='Content' style={{height: `${drawerHeight}px`}}>
          <div ref={childrenRef}>
            {children}
          </div>
        </div>
    </div>
  );
};

export default BottomDrawer;