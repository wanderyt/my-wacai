function countOddPentaFib(n) {
  // let mapping = {
  //   0: [0, 0],
  //   1: [1, 1],
  //   2: [1, 1],
  //   3: [2, 1],
  //   4: [4, 1]
  // };

  // return countOdd(n, mapping)[1];
  return countOdd(n, [[0, 1, 1, 2, 4], 1])[1];
}

var countOdd = (n, resultArray) => {
  if (n === 5) {
    return resultArray;
  } else {
    // console.log(`mapping[n - 1]: `, mapping[n - 1]);
    // console.log(`mapping[n - 2]: `, mapping[n - 2]);
    // console.log(`mapping[n - 3]: `, mapping[n - 3]);
    // console.log(`mapping[n - 4]: `, mapping[n - 4]);
    // console.log(`mapping[n - 5]: `, mapping[n - 5]);
    // console.log('n: ', n);
    // console.log('mapping: ', mapping);
    // let n1 = mapping[n - 1] || countOdd(n - 1, mapping);
    // let n2 = mapping[n - 2] || countOdd(n - 2, mapping);
    // let n3 = mapping[n - 3] || countOdd(n - 3, mapping);
    // let n4 = mapping[n - 4] || countOdd(n - 4, mapping);
    // let n5 = mapping[n - 5] || countOdd(n - 5, mapping);

    // let nResult = n1[0] + n2[0] + n3[0] + n4[0] + n5[0];
    // let nFlag = nResult % 2 === 0;
    // let nCount = nFlag ? n1[1] : n1[1] + 1;
    // return mapping[n] = [nResult % 10, nCount];

    let [result, count] = resultArray;
    let nResult = result[0] + result[1] + result[2] + result[3] + result[4];
    let nFlag = nResult % 2 === 0;
    let nCount = nFlag ? count : count + 1;
    return countOdd(n - 1, [[...result.slice(1), nResult], nCount]);
  }
}



var countOddPentaFib = (n) => {
  let i = 5, count = 1, array = [1, 1, 2, 4, 8];
  while (i < n) {
    i++;
    let newP = array[0] + array[1] + array[2] + array[3] + array[4];
    array.shift()
    array.push(newP % 10);
    newP % 2 !== 0 && count++;
    // console.log('i:',  i);
    // console.log('array:',  array);
    // console.log('count:',  count);
  }
  return count;
}