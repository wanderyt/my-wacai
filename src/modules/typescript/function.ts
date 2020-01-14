export {};

let myAdd: (x: number, y: number) => number = (x: number, y: number): number => {return x + y};
let myAdd1 = (x: number, y: number): number => {return x + y};
let myAdd2 = function (x: number, y: number): number {return x + y};

function buildName(firstName: string, lastName?: string) {
  return firstName + " " + lastName;
}

let name1 = buildName('David', 'Ren');

function buildName1(firstName: string, lastName: string) {
  return firstName + " " + lastName;
}

// let name2 = buildName1('David'); // error

function buildName2(firstName: string, restName?: readonly string[]) {
  return firstName + " " + restName.join(' ');
}

class TestPrivate {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}

let testPrivate = new TestPrivate('David');
testPrivate.sayName();