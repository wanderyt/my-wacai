class A<T> {
  value: T
}
type createA<T> = () => A<T>;
type mixin = <T>(...creaters: (string | createA<T> | A<T>)[]) => A<string> | A<T>;

class stringA extends A<string> {
  value: string
}

class numberA extends A<number> {
  value: number
}

const getA: createA<string> = () => new stringA();
const getB: createA<number> = () => new numberA();



interface IGETONE {
  (creater: string) : A<string>
  <T>(creater: A<T>) : A<T>;
  <T>(creater: createA<T>): A<T>;
  (...creater: string[]) : A<string>
  <T>(...creater: A<T>[]) : A<T>;
  // <T>(...creater: (string | A<T>)[]) : A<string|T>;
  <T extends A<T>>(...creater: (string | T)[]): T;
  <T extends any[]>(...creater: T): typeof creater[number]
}
const getOne: IGETONE = <T>(...creaters: (string | createA<T> | A<T>)[]): A<string | T> => {
  let mapped = creaters.map(creater => {
    if(typeof creater === 'string') {
      return new stringA();
    } else if (typeof creater === 'function') {
      return creater();
    } else if (creater instanceof A) {
      return creater;
    }
  });
  return mapped[0];
}
var bob1 = getOne(getA);
var bob2 = getOne(new numberA());
var bob3 = getOne('xxx');
var bob4 = getOne(new numberA(), new numberA());
var bob5 = getOne(new stringA(), new stringA());
var bob5_5 = getOne(new stringA(), new numberA());
var bob5 = getOne('xxx', 'yyy');
var bob6 = getOne('xxx', new numberA());
var bob7 = getOne('xxx', new stringA(), new numberA());















