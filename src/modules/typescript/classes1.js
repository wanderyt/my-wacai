var _this = this;
var Person = /** @class */ (function () {
    function Person(name, age, hobby) {
        var _this = this;
        this.name = name;
        this.sayMyHobbies = function () {
            console.log('this is: ', _this);
            return _this.hobby;
        };
        this.age = age;
        this.hobby = hobby;
    }
    Person.prototype.getMyAge = function () {
        console.log('this is: ', this);
        return this.age;
    };
    Person.sex = 'male';
    return Person;
}());
;
var footballPlayer = new Person('Arteta', 40, 'Passing');
console.log(footballPlayer.name);
console.log(footballPlayer.age);
console.log(Person.sex);
console.log(footballPlayer.getMyAge());
console.log(footballPlayer.sayMyHobbies());
var basketballPlayer = new Person('LeBron', 37, 'Scoring');
console.log(basketballPlayer.name);
console.log(basketballPlayer.age);
console.log(Person.sex);
console.log(basketballPlayer.getMyAge());
console.log(basketballPlayer.sayMyHobbies());
Person.sex = 'female';
Person.prototype.sayMyHobbies = function () {
    console.log('this is: ', _this);
    return 'I am saying my hobbies: ' + _this.hobby;
};
console.log('Change sex and prototype sayMyHobbies');
console.log(Person.sex);
console.log(footballPlayer.sayMyHobbies());
console.log(Person.sex);
console.log(basketballPlayer.sayMyHobbies());
footballPlayer.sayMyHobbies = function () {
    console.log('this is: ', this);
    return 'As a football player, I am saying my hobbies: ' + this.hobby;
};
console.log('Change footballPlayer sayMyHobbies');
console.log(footballPlayer.sayMyHobbies());
console.log(basketballPlayer.sayMyHobbies());
footballPlayer.getMyAge = function () {
    return this.age + 10;
};
console.log('Change footballPlayer getMyAge');
console.log(footballPlayer.getMyAge());
console.log(basketballPlayer.getMyAge());
