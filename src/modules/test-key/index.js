import React, {useState} from 'react';

const ArrayItem = ({value}) => {
  console.log(`rendering item ${value}...`); // eslint-disable-line
  return (
    <span>{value}</span>
  );
};

const IntArrayItem = ({value}) => {
  console.log(`rendering int item ${value}...`); // eslint-disable-line
  return (
    <span>{value}</span>
  );
};

const StringArrayItem = ({value}) => {
  console.log(`rendering string item ${value}...`); // eslint-disable-line
  return (
    <div>{value}</div>
  );
};

const KeyTest = () => {
  const [arrayTest, setArrayTest] = useState([]);

  const addANumber = () => {
    const arrayTest1 = arrayTest;
    const newNumber = Math.ceil(Math.random() * 100);
    const newArrayTest = arrayTest1.slice();
    newArrayTest.push(newNumber);
    setArrayTest(newArrayTest);
  }

  const orderNumber = () => {
    const arrayTest1 = arrayTest.slice();
    arrayTest1.sort((a, b) => {
      return a - b;
    });
    setArrayTest(arrayTest1);
  }

  return (
    <div className='KeyTest'>
      <button onClick={addANumber}>Add</button>
      <button onClick={orderNumber}>Order</button>
      {
        arrayTest.map((item, index) => (
          <div key={index}>
            {
              item % 2 === 0 ?
              <IntArrayItem value={item} />
              :
              <StringArrayItem value={item} />
            }
          </div>
        ))
      }
    </div>
  );
};

class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }

  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      console.log(this.state.val);  // 第 3 次 log
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};

export default KeyTest;

export {
  Example
};
