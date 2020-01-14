class Student {
  fullName: string;
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

console.log(user);


function f(): object {
  var a = 10;
  return function g() {
    var b = a + 1;
    return b;
  }
}

function f1(shouldInitialize: boolean): number {
  if (shouldInitialize) {
      var x = 10;
  }
  return x;
}

// Destructure
let o = {
  a: 'name',
  b: 1,
};
let { a, b }: { a: string, b: string } = o;

// Interface
let interfaceA: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = interfaceA;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
interfaceA = ro; // error!

interfaceA = ro as number[];


interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = {color: "white", area: 100};
  if (config.clor) {
    // Error: Property 'clor' does not exist on type 'SquareConfig'
    newSquare.color = config.clor;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ colour: "red", width: 100 });
let mySquare1 = createSquare({ c: "red", width: 100 });
let mySquare2 = createSquare({ [100]: "red", width: 100 });

interface Person {
  name: string;
  age: number;
  sex: string;
  sayHello: object;
  [propName: string]: any;
};

type Teacher = {
  class: string;
  grade: string;
  career: string;
  [propName: string]: any;
};

// Interfaces Extending Classes
class Control {
  // public name: string;
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Image implements SelectableControl {
  private state: any;
  // name: 'image';
  // private state: any;

  get state(): string {
    return 'state';
  }
  set state(newState: string) {
    this.state = newState;
  }

  select() {
    return 'image';
  }
}
