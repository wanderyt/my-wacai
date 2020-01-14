import React, {useState} from 'react';

const Parent = ({children}) => {
  const [variant, setVariant] = useState(0);
  const updateState = () => {
    setVariant(variant + 1);
  }

  if (window.prevUpdateState) {
    console.log('window.prevUpdateState === updateState: ', window.prevUpdateState === updateState);
  }

  window.prevUpdateState = updateState;

  console.log('Parent renders...');

  return (
    <div>
      Variant - {variant}
      {children({updateState})}
    </div>
  );
};

export default Parent;
