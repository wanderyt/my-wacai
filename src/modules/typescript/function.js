var myAdd = function (x, y) { return x + y; };
var myAdd1 = function (x, y) { return x + y; };
var myAdd2 = function (x, y) { return x + y; };
function buildName(firstName, lastName) {
    return firstName + " " + lastName;
}
var name1 = buildName('David', 'Ren');
function buildName1(firstName, lastName) {
    return firstName + " " + lastName;
}
// let name2 = buildName1('David'); // error
function buildName2(firstName, restName) {
    return firstName + " " + restName.join(' ');
}
var TestPrivate = /** @class */ (function () {
    function TestPrivate(name) {
        this.name = name;
    }
    TestPrivate.prototype.sayName = function () {
        console.log(this.name);
    };
    return TestPrivate;
}());
var testPrivate = new TestPrivate('David');
testPrivate.sayName();
