import React, { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../styles/colors';

const CalculatorRed = '#D40740';
const CalculatorNumberFont = 'DigitalMono, Osaka, monaco, sans-serif';
const CalculatorButtonFont = 'sans-serif';

const Container = styled.div`
  max-width: 400px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;
const NumberContainer = styled.div`
  text-align: right;
  height: 15vh;
  line-height: 21vh;
  font-family: ${CalculatorNumberFont};
  font-size: 3.5em;
  color: ${Colors.White};
  background-color: ${CalculatorRed};
  padding-right: 10px;
  margin: 5px 1%;
`;
const OperatorContainer = styled.div``;
const OperatorRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ForbidSelect = styled.div`
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Likely future */
  outline: none;
`;
const OperatorItem = styled(ForbidSelect)<{
  isTwoSpan?: boolean;
}>`
  height: 40px;
  line-height: 40px;
  font-size: 30px;
  width: ${props => (props.isTwoSpan ? '50%' : '24%')};
  margin: 5px 1%;
  font-family: ${CalculatorNumberFont};
  font-weight: bold;
  text-align: center;
`;
const Operand = styled(OperatorItem)<{
  isClear?: boolean;
}>`
  color: ${CalculatorRed};
  font-family: ${props => (props.isClear ? CalculatorNumberFont : 'unset')};
`;
const ConfirmBtn = styled(OperatorItem)`
  font-size: 16px;
  color: ${Colors.White};
  font-family: ${CalculatorButtonFont};
  background-color: ${CalculatorRed};
`;
const Backspace = styled(OperatorItem)`
  background-image: url('./backspace-red-bold.png');
  background-size: 30px;
  background-position: center;
  background-repeat: no-repeat;
`;

const Calculator = ({
  defaultValue = '0',
  confirmCallback,
}: {
  defaultValue: string;
  confirmCallback: (outputValue: number) => void;
}) => {
  const [value, setValue] = useState(defaultValue);
  const [operator, setOperator] = useState('0');
  const [lastOperand, setLastOperand] = useState('');
  const [isOperating, setIsOperating] = useState(false);

  const handleOperand = (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    // If previous input is operand (isOperating is true)
    // do not calculate
    // otherwise
    // 1. calculate previous result
    // 2. set current operand
    // 3. set operating to be true
    if (!isOperating) {
      calculateOutput();
      setLastOperand(evt.currentTarget.innerText);
      setIsOperating(true);
    }
  };

  const handleNumber = (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    let number = evt.currentTarget.innerText;
    let input;
    // if previous input is operand (isOperating is true)
    // 1. set current number to be operator
    // 2. reinput the number
    // 3. clear isOperating status
    if (isOperating) {
      setOperator(value);
      input = number;
      setValue(input);
      setIsOperating(false);
    } else {
      // otherwise, continue to input
      input = value === '0' ? '' + number : value + '' + number;
      setValue(input);
    }
  };

  const handlePoint = (evt: MouseEvent<HTMLDivElement>) => {
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
  };

  const checkDigits = (num: number) => {
    // check whether it is decimal
    if (Math.floor(num) === num) {
      return num + '';
    } else if (Math.floor(num * 10) === num * 10) {
      return num.toFixed(1);
    } else {
      return num.toFixed(2);
    }
  };

  const calculateOutput = (): number => {
    let curValue = parseFloat(value);
    switch (lastOperand) {
      case '+':
        curValue = parseFloat(operator) + parseFloat(value);
        setValue(checkDigits(curValue));
        break;
      case '-':
        curValue = parseFloat(operator) - parseFloat(value);
        setValue(checkDigits(curValue));
        break;
      case '×':
        curValue = parseFloat(operator) * parseFloat(value);
        setValue(checkDigits(curValue));
        break;
      case '÷':
        curValue = parseFloat(operator) / parseFloat(value);
        setValue(checkDigits(curValue));
        break;
    }
    setOperator('0');
    return curValue;
  };

  const handleBackspace = (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    setValue(value.slice(0, -1));
  };

  const handleClear = (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    setValue('0');
    setOperator('0');
    setLastOperand('');
  };

  const handleEqual = (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    calculateOutput();
    // Reset all states
    setLastOperand('');
    setOperator('0');
    setIsOperating(false);
  };

  const handleConfirm = (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    let result = calculateOutput();
    confirmCallback(result);
  };

  return (
    <Container>
      <NumberContainer>{value}</NumberContainer>
      <OperatorContainer>
        <OperatorRow className="BasicOperators">
          <Operand onClick={handleOperand}>+</Operand>
          <Operand onClick={handleOperand}>-</Operand>
          <Operand onClick={handleOperand}>×</Operand>
          <Operand onClick={handleOperand}>÷</Operand>
        </OperatorRow>
        <OperatorRow className="NumberPad-1">
          <OperatorItem onClick={handleNumber}>1</OperatorItem>
          <OperatorItem onClick={handleNumber}>2</OperatorItem>
          <OperatorItem onClick={handleNumber}>3</OperatorItem>
          <Backspace onClick={handleBackspace} />
        </OperatorRow>
        <OperatorRow className="NumberPad-4">
          <OperatorItem onClick={handleNumber}>4</OperatorItem>
          <OperatorItem onClick={handleNumber}>5</OperatorItem>
          <OperatorItem onClick={handleNumber}>6</OperatorItem>
          <Operand isClear onClick={handleClear}>
            C
          </Operand>
        </OperatorRow>
        <OperatorRow className="NumberPad-7">
          <OperatorItem onClick={handleNumber}>7</OperatorItem>
          <OperatorItem onClick={handleNumber}>8</OperatorItem>
          <OperatorItem onClick={handleNumber}>9</OperatorItem>
          <Operand onClick={handleEqual}>=</Operand>
        </OperatorRow>
        <OperatorRow className="NumberPad-0">
          <OperatorItem isTwoSpan onClick={handleNumber}>
            0
          </OperatorItem>
          <OperatorItem onClick={handlePoint}>.</OperatorItem>
          <ConfirmBtn onClick={handleConfirm}>确认</ConfirmBtn>
        </OperatorRow>
      </OperatorContainer>
    </Container>
  );
};

export default Calculator;
