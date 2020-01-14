let mapping = {
  max: 1,
  0: BigInt(0),
  1: BigInt(1)
};

function fib (n) {
  if (n === 0) {
    return mapping[0];
  }

  let absN = Math.abs(n);

  let fib;
  let curMax = mapping.max;
  console.log('curMax: ', curMax);
  if (absN <= curMax) {
    fib = mapping[absN];
  } else {
    let n1 = mapping[curMax - 1], n2 = mapping[curMax];
    for (let index = curMax + 1; index <= absN; index++) {
      fib = n1 + n2;
      n1 = n2;
      n2 = fib;
      if (index <= 1000000) {
        mapping[index] = fib;
        mapping.max = index;
      }
    }
  }

  // if (absN === 1) {
  //   fib = BigInt(1);
  // }
  // let n1 = BigInt(1), n2 = BigInt(0);
  // for (let index = 2; index <= absN; index++) {
  //   fib = n1 + n2;
  //   n1 = n2;
  //   n2 = fib;
  // }

  if (absN !== n && Math.pow(-1, absN + 1) < 0) {
    fib = -fib;
  }
  return fib;
}


// Final solution
const memo = fn => (cache => n => n in cache ? cache[n] : cache[n] = fn(n))([0n, 1n]);
const even = n => !(n & 1);
const F = memo(n =>
  n % 3 === 0 ? (n => 5n * F(n) ** 3n + 3n * (even(n) ? 1n : -1n) * F(n))(n / 3) :
    n % 3 === 1 ? (n => F(n + 1) ** 3n + 3n * F(n + 1) * F(n) ** 2n - F(n) ** 3n)((n - 1) / 3) :
      (n => F(n + 1) ** 3n + 3n * F(n + 1) ** 2n * F(n) + F(n) ** 3n)((n - 2) / 3)
);
const fib = n => n >= 0 ? F(n) : even(n) ? -F(-n) : F(-n);
