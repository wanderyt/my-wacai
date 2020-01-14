/*

// Test cases
var deps = {
  'dep1': function () {return 'this is dep1';},
  'dep2': function () {return 'this is dep2';},
  'dep3': function () {return 'this is dep3';},
  'dep4': function () {return 'this is dep4';}
};

var di = new DI(deps);

var myFunc = di.inject(function (dep3, dep1, dep2) {
  return [dep1(), dep2(), dep3()].join(' -> ');
});

Test.assertEquals(myFunc(), 'this is dep1 -> this is dep2 -> this is dep3');
*/


/**
 * Constructor DependencyInjector
 * @param {Object} - object with dependencies
 */
var DI = function (dependency) {
  this.dependency = dependency;
};

// Should return new function with resolved dependencies
DI.prototype.inject = function (func) {
  let funcString = func.toString().replace(/\s/g, '');
  let args = /^function[^\(]*\(([^\)]*)\){.*/.exec(funcString)[1];
  let argNames = args.split(',');
  let dependencies = this.dependencies;
  let validArgs = argNames.map((arg) => {
    return dependencies[arg];
  });

  return () => {
    func(...validArgs);
  }
}