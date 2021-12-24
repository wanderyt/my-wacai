import React, {useMemo, useCallback} from 'react';

const Parent = ({renderTime}) => {
  console.log('rendering parent...');
  const callback = () => {
    console.log('executing callback');
  };
  const memoCallback = useCallback(callback, []);
  const child = useMemo(() => <Child callback={memoCallback} />, [memoCallback]);
  return (
    <div className='Parent'>
      Parent {renderTime}
      {/* <Child /> */}
      {child}
    </div>
  );
};

const Child = ({callback = () => void 0}) => {
  console.log('rendering child...');
  return (
    <div className='Child' onClick={callback}>Child</div>
  );
};

export {
  Parent,
  Child
};

var executeMiddleware = (middlewares = []) => {
  const req = {}, res = {}, stopAtNext = false;
  middlewares.reduce(function (prevValue, currValue, index) {
    if (!stopAtNext) {
      const {req, res} = prevValue;
      stopAtNext = true;
      const next = () => {stopAtNext = false};
      currValue[index](req, res, next);
    }

    return {
      req, res
    };
  });

  return {
    req, res
  }
};

var middleware1 = (req, res, next) => {
  req._index = 1;
  res._status = true;
  if (res._data) {
    res.data = Object.assign(res._data, {first: true});
  }

  next();
};

var middleware2 = (req, res, next) => {
  req._index = 2;
  res._status = true;
  if (res._data) {
    res.data = Object.assign(res._data, {first: true});
  }

  next();
};

var result = executeMiddleware([middleware1, middleware2]);