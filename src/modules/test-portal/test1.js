import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';

class App extends React.PureComponent {
  constructor(props) {
    super(props)

    this.toggleRoot = this._toggleRoot.bind(this);

    this.state = {
      root: 1,
      Comp: Child1,
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
  }

  _toggleRoot() {
    let curRoot = this.state.root;
    this.setState({
      root: curRoot === 1 ? 2 : 1,
      Comp: curRoot === 1 ? Child2: Child1,
    });
  }

  render() {
    let {root, Comp} = this.state;
    return (
      <div key="div">
        <button key="button" onClick={this.toggleRoot}>
          In root {root}. Toggle?
        </button>
        {
          ReactDOM.createPortal(
            <Comp />,
            document.getElementById('root-' + root)
          )
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
    return (
      <div>
        Child 1: {this.number}
      </div>
    )
  }
}

class Child2 extends React.PureComponent {
  constructor(props) {
    super(props)

    this.number = Math.random()
  }

  render() {
    return (
      <div>
        Child 2: {this.number}
      </div>
    )
  }
}

export default App;

export {
  Child1,
  Child2,
};
