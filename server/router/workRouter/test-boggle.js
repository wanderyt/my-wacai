function checkWord(board, word) {
  let flag = false;
  console.log('word: ', word);

  let possibleStart = findStart(board, word[0]);
  let initialStep = [];
  for (const start of possibleStart) {
    initialStep.push([1, start, [start]]);
  }

  while (initialStep.length > 0) {
    let currentStep = initialStep.shift();
    if (currentStep[0] === word.length) {
      flag = true;
      break;
    }
//     console.log('currentStep: ', currentStep);
//     console.log('findNext: ', currentStep[1][1], currentStep[1][0], board, word[currentStep[0]]);
    let possibleNext = findNext(currentStep[1][1], currentStep[1][0], board, word[currentStep[0]], currentStep[2]);
    for (const next of possibleNext) {
      initialStep.push([currentStep[0] + 1, [next[0], next[1]], currentStep[2].push(next)]);
    }
  }

  return flag;
}

function findStart (array, start) {
  let possibleStart = [];
  for (var y = 0; y < array.length; y++) {
    for (var x = 0; x < array.length; x++) {
      array[y][x] === start && possibleStart.push([y, x]);
    }
  }
  return possibleStart;
}

function findNext (x, y, array, next, path) {
  let possiblePath = [];
  // up
  array[y - 1] && array[y - 1][x] && !checkPath(path, [y - 1, x]) && array[y - 1][x] === next && possiblePath.push([y - 1, x]);
  // down
  array[y + 1] && array[y + 1][x] && !checkPath(path, [y + 1, x]) && array[y + 1][x] === next && possiblePath.push([y + 1, x]);
  // left
  array[y] && array[y][x - 1] && !checkPath(path, [y, x - 1]) && array[y][x - 1] === next && possiblePath.push([y, x - 1]);
  // right
  array[y] && array[y][x + 1] && !checkPath(path, [y, x + 1]) && array[y][x + 1] === next && possiblePath.push([y, x + 1]);
  // up-right
  array[y - 1] && array[y - 1][x + 1] && !checkPath(path, [y - 1, x + 1]) && array[y - 1][x + 1] === next && possiblePath.push([y - 1, x + 1]);
  // up-left
  array[y - 1] && array[y - 1][x - 1] && !checkPath(path, [y - 1, x - 1]) && array[y - 1][x - 1] === next && possiblePath.push([y - 1, x - 1]);
  // down-right
  array[y + 1] && array[y + 1][x + 1] && !checkPath(path, [y + 1, x + 1]) && array[y + 1][x + 1] === next && possiblePath.push([y + 1, x + 1]);
  // down-left
  array[y + 1] && array[y + 1][x - 1] && !checkPath(path, [y + 1, x - 1]) && array[y + 1][x - 1] === next && possiblePath.push([y + 1, x - 1]);

  return possiblePath;
}

function checkPath (path, point) {
  let flag = false;
  for (const item of path) {
    if (item[0] === point[0] && item[1] === point[1]) {
      flag = true;
      break;
    }
  }
  return flag;
}