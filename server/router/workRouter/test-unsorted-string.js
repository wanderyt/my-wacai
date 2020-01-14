// '798174707585847782767269738083867178', 18
// '937175789196798988958481879092738677708380947485827672', 27
// '484937413950434240354647454452513638', 18
// '624146195665173229515570242540216158186848332022534942662835595026446769544523433652303427644737385763603139', 54


function mysteryRange(s, n){
  // console.log('s: ', s);
  // console.log('n: ', n);
  let d = s.length / n;
  let isOver = Math.floor(d) !== d;
  let min = isOver ? Math.max(Math.pow(10, Math.floor(d)) - n + 1, 1) : Math.pow(10, Math.floor(d - 1));
  let max = isOver ? Math.pow(10, Math.floor(d)) + n - 1 : Math.pow(10, Math.floor(d)) - 1;
  // console.log('min: ', min);
  // console.log('max: ', max);
  let digit = Math.floor(d);
  let maxDigit = Math.ceil(d);
  let idx = 0, result = [];
  while (idx < s.length) {
    if (!isOver) {
      let start = parseInt(s.slice(idx, idx + digit));
      if (start <= max && start >= min) {
        let initialPath = [start];
        let startIndex = idx;
        let endIndex = idx + digit;
        // console.log('over current start: ', start, ', startIndex: ', startIndex, ', endIndex: ', endIndex, ', idx: ', idx, ', digit: ', digit);
        result = go(s, n, digit, maxDigit, start, startIndex, endIndex, [[0, 1, initialPath]]);
      }
      if (result.length > 0) {
        return [result[0], result[n - 1]]
      }
    } else {
      // if over digits
      let curDigit = 1;
      while(curDigit <= maxDigit) {
        start = parseInt(s.slice(idx, idx + curDigit));
        if (start <= max && start >= min) {
          let initialPath = [start];
          let startIndex = idx;
          let endIndex = idx + curDigit;
          // console.log('over current start: ', start, ', startIndex: ', startIndex, ', endIndex: ', endIndex, ', idx: ', idx, ', curDigit: ', curDigit);
          result = go(s, n, digit, maxDigit, start, startIndex, endIndex, [[0, 1, initialPath]]);
        }
        if (result.length > 0) {
          return [result[0], result[n - 1]]
        }
        curDigit++;
      }
    }

    idx++;
  }

  return [result[0], result[n - 1]]
}

function checkValid (string, start, end, array) {
  let tmp = parseInt(string);
  return string === '' + parseInt(string) && tmp >= start && tmp <= end && !array[tmp - start];
}

function go(s, n, digit, maxDigit, start, startIndex, endIndex, results) {
  let isOver = digit !== maxDigit;
  let end = start + n - 1;
  let step = digit;
  let result = [];
  while (results.length > 0) {
    let tmpResult = results.shift();
    let [curIndex, tmpArrayLength, tmpArray] = tmpResult;
    // console.log('tmpResult: ', curIndex, ', ', tmpArrayLength, ', ', tmpArray.join(','));
    if (curIndex >= startIndex && curIndex < endIndex) {
      // console.log('pushing: ', endIndex, ', ', tmpArrayLength, ', ', tmpArray.join(','));
      results.push([endIndex, tmpArrayLength, tmpArray]);
      continue;
    }
    if (tmpArrayLength === n) {
      result = tmpArray;
      break;
    }
    if ((curIndex + step) > startIndex && (curIndex + step) < endIndex) {
      continue;
    }
    let tmp = parseInt(s.slice(curIndex, curIndex + step));
    // console.log('start: ', start, ', end: ', end);
    // console.log('tmp: ', tmp);
    if (checkValid(s.slice(curIndex, curIndex + step), start, end, tmpArray)) {
      let newArray = tmpArray.slice();
      newArray[tmp - start] = tmp;
      let newLength = tmpArrayLength + 1;
      // console.log('pushing: ', curIndex + step, ', ', newLength, ', ', newArray.join(','));
      results.push([curIndex + step, newLength, newArray]);
    }
    if (isOver) {
      // if over digits
      let curDigit = 1;
      while (curDigit <= maxDigit) {
        if (curDigit === step) {
          curDigit++;
          continue;
        }
        let [curIndex, tmpArrayLength, tmpArray] = tmpResult;
        if ((curIndex + curDigit) > startIndex && (curIndex + curDigit) < endIndex) {
          curDigit++;
          continue;
        }
        tmp = parseInt(s.slice(curIndex, curIndex + curDigit));
        // console.log('over starting: ');
        // console.log('start: ', start, ', end: ', end);
        // console.log('tmp: ', tmp);
        if (checkValid(s.slice(curIndex, curIndex + curDigit), start, end, tmpArray)) {
          let newArray = tmpArray.slice();
          newArray[tmp - start] = tmp;
          let newLength = tmpArrayLength + 1;
          // console.log('pushing: ', curIndex + curDigit, ', ', newLength, ', ', newArray.join(','));
          results.push([curIndex + curDigit, newLength, newArray]);
        }
        // console.log('over ending: ');
        curDigit++;
      }
    }
  }

  return result;
}


