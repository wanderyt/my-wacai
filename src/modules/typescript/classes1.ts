class Person {
  public age: number;
  static sex: string = 'male';
  private hobby: string;
  constructor(public name: string, age: number, hobby: string) {
    this.age = age;
    this.hobby = hobby;
  }
  getMyAge(): number {
    console.log('this is: ', this);
    return this.age;
  }
  sayMyHobbies: () => string = () => {
    console.log('this is: ', this);
    return this.hobby;
  }
};

let footballPlayer = new Person('Arteta', 40, 'Passing');
console.log(footballPlayer.name);
console.log(footballPlayer.age);
console.log(Person.sex);
console.log(footballPlayer.getMyAge());
console.log(footballPlayer.sayMyHobbies());

let basketballPlayer = new Person('LeBron', 37, 'Scoring');
console.log(basketballPlayer.name);
console.log(basketballPlayer.age);
console.log(Person.sex);
console.log(basketballPlayer.getMyAge());
console.log(basketballPlayer.sayMyHobbies());

Person.sex = 'female';
Person.prototype.sayMyHobbies = () => {
  console.log('this is: ', this);
  return 'I am saying my hobbies: ' + this.hobby;
};

console.log('Change sex and prototype sayMyHobbies');
console.log(Person.sex);
console.log(footballPlayer.sayMyHobbies());
console.log(Person.sex);
console.log(basketballPlayer.sayMyHobbies());

footballPlayer.sayMyHobbies = function() {
  console.log('this is: ', this);
  return 'As a football player, I am saying my hobbies: ' + this.hobby;
}

console.log('Change footballPlayer sayMyHobbies');
console.log(footballPlayer.sayMyHobbies());
console.log(basketballPlayer.sayMyHobbies());

footballPlayer.getMyAge = function() {
  return this.age + 10;
}

console.log('Change footballPlayer getMyAge');
console.log(footballPlayer.getMyAge());
console.log(basketballPlayer.getMyAge());


