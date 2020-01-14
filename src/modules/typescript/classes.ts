// Classes
// class Animal {
//   private name: string;
//   constructor(theName: string) { this.name = theName; }
//   sayName(): void {
//     console.log(this.name);
//   }
// }

// class Rhino extends Animal {
//   constructor() { super("Rhino"); }
// }

// class Employee {
//   private name: string;
//   constructor(theName: string) { this.name = theName; }
// }

// let animal = new Animal("Goat");
// let rhino = new Rhino();
// let employee = new Employee("Bob");

// console.log(rhino.sayName());
// // console.log(rhino.name); // error
// console.log('ends');



class Greeter {
  static standardGreeting = "Hello, there";
  greeting: string;
  public pubGreeting: string = 'I am public greeting';
  private priGreeting: string = 'I am private greeting';
  greet() {
      console.log(this.priGreeting);
      if (this.greeting) {
          return "Hello, " + this.greeting;
      }
      else {
          return Greeter.standardGreeting;
      }
  }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());
console.log('public: ', greeter1.pubGreeting);
// console.log('privart: ', greeter1.priGreeting);

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());




console.log(greeter1.greet());