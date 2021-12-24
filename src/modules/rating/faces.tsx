import React, { FC, useEffect, useState } from 'react';

import './faces.scss';

interface IFaceProps {
  isActive?: boolean;
  callbackHandler?: (activeStatus: boolean) => void;
}

const useFaceHook = (isActive, callbackHandler) => {
  const [active, setActive] = useState<boolean>(isActive);
  const faceClickHandler = () => {
    const currStatus = !active;
    setActive(currStatus);
    callbackHandler && callbackHandler(currStatus);
  };

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  return {
    active,
    faceClickHandler,
  };
};

const AngryFace: FC<IFaceProps> = ({ isActive, callbackHandler }) => {
  const { active, faceClickHandler } = useFaceHook(isActive, callbackHandler);
  return (
    <div
      className={`Face AngryFace ${active ? 'active' : ''}`}
      onClick={faceClickHandler}
    >
      <div>
        <svg className="eye left">
          <Eye />
        </svg>
        <svg className="eye right">
          <Eye />
        </svg>
        <svg className="mouth">
          <Mouth />
        </svg>
      </div>
    </div>
  );
};

const SadFace: FC<IFaceProps> = ({ isActive, callbackHandler }) => {
  const [active, setActive] = useState<boolean>(isActive);
  const faceClickHandler = () => {
    const currStatus = !active;
    setActive(currStatus);
    callbackHandler && callbackHandler(currStatus);
  };
  return (
    <div
      className={`Face SadFace ${active ? 'active' : ''}`}
      onClick={faceClickHandler}
    >
      <div>
        <svg className="eye left">
          <Eye />
        </svg>
        <svg className="eye right">
          <Eye />
        </svg>
        <svg className="mouth">
          <Mouth />
        </svg>
      </div>
    </div>
  );
};

const OKFace: FC<IFaceProps> = ({ isActive, callbackHandler }) => {
  const { active, faceClickHandler } = useFaceHook(isActive, callbackHandler);
  return (
    <div
      className={`Face OKFace ${active ? 'active' : ''}`}
      onClick={faceClickHandler}
    >
      <div></div>
    </div>
  );
};

const GoodFace: FC<IFaceProps> = ({ isActive, callbackHandler }) => {
  const [active, setActive] = useState<boolean>(isActive);
  const faceClickHandler = () => {
    const currStatus = !active;
    setActive(currStatus);
    callbackHandler && callbackHandler(currStatus);
  };
  return (
    <div
      className={`Face GoodFace ${active ? 'active' : ''}`}
      onClick={faceClickHandler}
    >
      <div>
        <svg className="eye left">
          <Eye />
        </svg>
        <svg className="eye right">
          <Eye />
        </svg>
        <svg className="mouth">
          <Mouth />
        </svg>
      </div>
    </div>
  );
};

const HappyFace: FC<IFaceProps> = ({ isActive, callbackHandler }) => {
  const { active, faceClickHandler } = useFaceHook(isActive, callbackHandler);
  return (
    <div
      className={`Face HappyFace ${active ? 'active' : ''}`}
      onClick={faceClickHandler}
    >
      <div>
        <svg className="eye left">
          <Eye />
        </svg>
        <svg className="eye right">
          <Eye />
        </svg>
      </div>
    </div>
  );
};

const Eye = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 4" id="eye">
      <path d="M1,1 C1.83333333,2.16666667 2.66666667,2.75 3.5,2.75 C4.33333333,2.75 5.16666667,2.16666667 6,1"></path>
    </svg>
  );
};

const Mouth = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 7" id="mouth">
      <path d="M1,5.5 C3.66666667,2.5 6.33333333,1 9,1 C11.6666667,1 14.3333333,2.5 17,5.5"></path>
    </svg>
  );
};

export { AngryFace, SadFace, OKFace, GoodFace, HappyFace };
