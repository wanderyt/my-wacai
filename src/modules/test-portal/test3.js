import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';

class App extends React.PureComponent {
  constructor(props) {
    super(props)

    this.toggleRoot = this._toggleRoot.bind(this);

    console.log('initialize two children...');
    this.Child1 = <Child1 key="child-1" />;
    this.Child2 = <Child2 key="child-2" />;

    this.state = {
      root: 1,
      Comp: this.Child1,
    };

    // Create target elements
    let appDiv = document.createElement('div');
    appDiv.setAttribute('id', 'app');
    let child1Div = document.createElement('div');
    child1Div.setAttribute('id', 'root-1');
    let child2Div = document.createElement('div');
    child2Div.setAttribute('id', 'root-2');
    document.body.appendChild(appDiv);
    document.body.appendChild(child1Div);
    document.body.appendChild(child2Div);

    this.tmpDiv = document.createElement('div');
    this.tmpDiv.setAttribute('id', 'tmp');
  }

  _toggleRoot() {
    let curRoot = this.state.root;
    this.setState({
      root: curRoot === 1 ? 2 : 1,
      Comp: curRoot === 1 ? this.Child2: this.Child1,
    });
  }

  render() {
    let {root} = this.state;
    return (
      <div key="div">
        <button key="button" onClick={this.toggleRoot}>
          In root {root}. Toggle?
        </button>
        {
          root === 1 ?
          <div>
            <div key={1} className='Child1'>{this.Child1}</div>
            <div key={2} className='Child2'>{this.Child2}</div>
          </div>
          :
          <div>
            <div key={2} className='Child2'>{this.Child2}</div>
            <div key={1} className='Child1'>{this.Child1}</div>
          </div>
        }
      </div>
    )
  }
}

class Child1 extends React.PureComponent {
  constructor(props) {
    super(props)

    this.number = Math.random()
  }

  render() {
    console.log('render child 1');
    return (
      <div>
        Child 1: {this.number}
      </div>
    )
  }

  componentWillUnmount() {
    console.log('unmount child 1');
  }
}

class Child2 extends React.PureComponent {
  constructor(props) {
    super(props)

    this.number = Math.random()
  }

  render() {
    console.log('render child 2');
    return (
      <div>
        Child 2: {this.number}
      </div>
    )
  }

  componentWillUnmount() {
    console.log('unmount child 2');
  }
}

export default App;

export {
  Child1,
  Child2,
};
