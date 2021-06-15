import React, { useEffect, useState } from 'react';
import BottomDrawer from '../../src/modules/bottom-drawer';
import Rating from '../../src/modules/rating';
import {storiesOf} from '@storybook/react';

const DynamicContent = ({handleContentChange}) => {
  const [contentHeight, setContentHeight] = useState(0);
  const resetHeight = () => {
    const height = Math.floor(Math.random() * 300) + 100;
    setContentHeight(height);
    handleContentChange();
  };

  useEffect(() => {
    resetHeight();
  }, []);

  return (
    <div style={{
      height: `${contentHeight}px`,
      cursor: 'pointer'
    }}
      onClick={resetHeight}>
      Click me to change content
    </div>
  )
}

storiesOf('Bottom Drawer', module)
  .add('Default folded', () => (
    <div style={{
      // margin: '0 20px'
    }}>
      <BottomDrawer>
        <div style={{
          height: "300px"
        }}>This is bottom drawer content</div>
      </BottomDrawer>
    </div>
  ))
  .add('Default expanded', () => (
    <div style={{
      // margin: '0 20px'
    }}>
      <BottomDrawer autoExpand>
        <div style={{
          height: "300px"
        }}>This is bottom drawer content</div>
      </BottomDrawer>
    </div>
  ))
  .add('Enabled toggle expanded', () => {
    const [expanded, setExpanded] = useState(true);
    const toggleExpanded = () => {
      setExpanded(!expanded);
    };
    return (
      <div style={{
        // margin: '0 20px'
      }}>
        <button onClick={toggleExpanded}>Toggle Drawer</button>
        <BottomDrawer autoExpand={expanded}>
          <div style={{
            height: "300px"
          }}>This is bottom drawer content</div>
        </BottomDrawer>
      </div>
    );
  })
  .add('Dynamic content height', () => {
    return (
      <div style={{
        // margin: '0 20px'
      }}>
        <BottomDrawer autoExpand>
          <DynamicContent />
        </BottomDrawer>
      </div>
    );
  })
  .add('Rating drawer', () => {
    return (
      <div style={{
        width: '375px',
        height: '100vh',
        position: 'relative',
      }}>
        <BottomDrawer>
          <Rating />
        </BottomDrawer>
      </div>
    );
  });
