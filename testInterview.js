// Find shortest sub array to be larger than a specific number
var com = (a = []) => {
  let res = 0;
  for (let i = 0; i < a.length; i++) {
    res = res + a[i];
  }

  return res;
};

var a1 = (arr = [], num = 0) => {
  let start = window.performance.now();

  // Method 1: Violent traverse
  let results = [], result = arr.slice();
  for (let i = 0; i < arr.length; i++) {
    let tmp = [arr[i]];
    let j = i + 1;
    while (com(tmp) < num && j < arr.length) {
      tmp.push(arr[j]);
      j++;
    };
    if (j <= arr.length && com(tmp) >= num && result.length > tmp.length) {
      result = tmp;
    }
  }

  let end = window.performance.now();

  console.log('start: ', start);
  console.log('end: ', end);
  console.log('performance: ', end - start);

  return result;
};

var a2 = (arr = [], num = 0) => {
  let start = window.performance.now();

  // Method 2: Move flags
  let results = [], result = arr.slice();
  let s = 0, e = 1;
  while (s < arr.length && e <= arr.length) {
    let tmp = arr.slice(s, e);
    if (com(tmp) > num) {
      if (tmp.length < result.length) {
        result = tmp;
      }
      s++;
    } else {
      e++;
    }
  };

  let end = window.performance.now();

  console.log('start: ', start);
  console.log('end: ', end);
  console.log('performance: ', end - start);

  return result;
};

var testArray = [1,2,13,20,9,8,0,7,20,40];
var testNum = 32;
console.log(a1(testArray, testNum));
console.log(a2(testArray, testNum));