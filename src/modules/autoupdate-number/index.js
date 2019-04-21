import React, {useState, useEffect} from 'react';

// Compute initial number
const computeInitialNumber = (total) => {
  if (total < 1000) {
    return 0;
  } else if (total < 5000) {
    return 1000;
  } else if (total < 10000) {
    return 5000;
  } else if (total < 15000) {
    return 10000;
  } else if (total < 20000) {
    return 15000;
  } else {
    return 20000;
  }
}

const AutoUpdateNumber = ({total, start = 0, duration = 200}) => {
  const [currentVal, setCurrentVal] = useState(start || computeInitialNumber(total));
  const diff = total - currentVal;
  const step = diff / duration;
  // use global variable to store value of each step
  // state change is async, and cannot be rendered immediately
  let currentStep = currentVal;

  useEffect(() => {
    let interval = setInterval(() => {
      currentStep = currentStep + step;
      if (currentStep >= total) {
        currentStep = total;
        clearInterval(interval);
      }
      setCurrentVal(currentStep);
    }, 1);
  }, [total]);

  return (
    <div className='AutoUpdateNumber'>
      {parseFloat(currentVal).toFixed(2)}
    </div>
  )
};

export default AutoUpdateNumber;
