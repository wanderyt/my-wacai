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
var Greeter = /** @class */ (function () {
    function Greeter() {
        this.pubGreeting = 'I am public greeting';
        this.priGreeting = 'I am private greeting';
    }
    Greeter.prototype.greet = function () {
        console.log(this.priGreeting);
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    };
    Greeter.standardGreeting = "Hello, there";
    return Greeter;
}());
var greeter1;
greeter1 = new Greeter();
console.log(greeter1.greet());
console.log('public: ', greeter1.pubGreeting);
// console.log('privart: ', greeter1.priGreeting);
var greeterMaker = Greeter;
greeterMaker.standardGreeting = "Hey there!";
var greeter2 = new greeterMaker();
console.log(greeter2.greet());
console.log(greeter1.greet());
