class A {
  constructor(a) {
    this.name = a;
  }
  getName() {
    return this.name;
  }
  getAge = () => {
    console.log('class A getAge');
  }
}

class B extends A{
  constructor() {
    super();
  }
};

function Person(name, age){
	this.name = name;
	this.age = age;
}

let a = new A();

var _new = (fn, ...args) => {
  var newObject = {};
  newObject.__proto__ = fn.prototype;
  return fn.apply(newObject, args);
}