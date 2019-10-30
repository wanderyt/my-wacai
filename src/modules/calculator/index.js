import React, {useState} from 'react';

import './index.scss';

const Calculator = ({defaultValue = '0', confirmCallback = () => void 0}) => {
  const [value, setValue] = useState(defaultValue);
  const [operator, setOperator] = useState('0');
  const [lastOperand, setLastOperand] = useState('');
  const [isOperating, setIsOperating] = useState(false);

  const handleOperand = (evt) => {
    evt.stopPropagation();
    // If previous input is operand (isOperating is true)
    // do not calculate
    // otherwise
    // 1. calculate previous result
    // 2. set current operand
    // 3. set operating to be true
    if (!isOperating) {
      calculateOutput();
      setLastOperand(evt.target.innerText);
      setIsOperating(true);
    }
  }

  const handleNumber = (evt) => {
    evt.stopPropagation();
    let number = evt.target.innerText;
    let input;
    // if previous input is operand (isOperating is true)
    // 1. set current number to be operator
    // 2. reinput the number
    // 3. clear isOperating status
    if (isOperating) {
      setOperator(value);
      input = '' + number;
      setValue(input);
      setIsOperating(false);
    } else {
      // otherwise, continue to input
      input = value === '0' ? ('' + number) : (value + '' + number);
      setValue(input);
    }
  }

  const handlePoint = (evt) => {
    evt.stopPropagation();
    // if previous input is operand (isOperating is true)
    // 1. set current number to be operator
    // 2. reinput the number
    // 3. clear isOperating status
    let input;
    if (isOperating) {
      setOperator(value);
      input = '0.';
      setValue(input);
      setIsOperating(false);
    } else {
      // otherwise, continue to input
      input = value + '.';
      setValue(input);
    }
  }

  const calculateOutput = () => {
    let curValue = value;
    switch (lastOperand) {
      case '+':
        curValue = parseFloat(operator) + parseFloat(value);
        setValue(curValue + '');
        break;
      case '-':
        curValue = parseFloat(operator) - parseFloat(value);
        setValue(curValue + '');
        break;
      case '×':
        curValue = parseFloat(operator) * parseFloat(value);
        setValue(curValue + '');
        break;
      case '÷':
        curValue = parseFloat(operator) / parseFloat(value);
        setValue(curValue + '');
        break;
    }
    setOperator('0');
    return curValue;
  }

  const handleBackspace = (evt) => {
    evt.stopPropagation();
    setValue(value.slice(0, -1));
  }

  const handleClear = (evt) => {
    evt.stopPropagation();
    setValue('0');
    setOperator('0');
    setLastOperand('');
  }

  const handleEqual = (evt) => {
    evt.stopPropagation();
    calculateOutput();
    // Reset all states
    setLastOperand('');
    setOperator('0');
    setIsOperating(false);
  }

  const handleConfirm = (evt) => {
    evt.stopPropagation();
    let result = calculateOutput();
    confirmCallback(result);
  }

  return (
    <div className='Calculator'>
      <div className='NumberContainer'>{value}</div>
      <div className='OperatorContainer'>
        <div className='OperatorRow BasicOperators'>
          <div className='OperatorItem' onClick={handleOperand}>+</div>
          <div className='OperatorItem' onClick={handleOperand}>-</div>
          <div className='OperatorItem' onClick={handleOperand}>×</div>
          <div className='OperatorItem' onClick={handleOperand}>÷</div>
        </div>
        <div className='OperatorRow NumberPad-1'>
          <div className='OperatorItem' onClick={handleNumber}>1</div>
          <div className='OperatorItem' onClick={handleNumber}>2</div>
          <div className='OperatorItem' onClick={handleNumber}>3</div>
          <div className='OperatorItem Backspace' onClick={handleBackspace}></div>
        </div>
        <div className='OperatorRow NumberPad-4'>
          <div className='OperatorItem' onClick={handleNumber}>4</div>
          <div className='OperatorItem' onClick={handleNumber}>5</div>
          <div className='OperatorItem' onClick={handleNumber}>6</div>
          <div className='OperatorItem' onClick={handleClear}>C</div>
        </div>
        <div className='OperatorRow NumberPad-7'>
          <div className='OperatorItem' onClick={handleNumber}>7</div>
          <div className='OperatorItem' onClick={handleNumber}>8</div>
          <div className='OperatorItem' onClick={handleNumber}>9</div>
          <div className='OperatorItem' onClick={handleEqual}>=</div>
        </div>
        <div className='OperatorRow NumberPad-0'>
          <div className='OperatorItem OperatorItem--TwoSpan' onClick={handleNumber}>0</div>
          <div className='OperatorItem' onClick={handlePoint}>.</div>
          <div className='OperatorItem ConfirmBtn' onClick={handleConfirm}>确认</div>
        </div>
      </div>
    </div>
  )
}

export default Calculator;
