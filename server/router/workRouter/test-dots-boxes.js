function dotsAndBoxes(ar){
  let n = getN(ar.length);
  let score = [0, 0], i = 0, isA = true;
  var moves = new Array(n - 1);
  for (idx in moves) {
    let tmp = new Array(n - 1).fill(0);
    moves[idx] = tmp;
  }
  while (i < ar.length) {
    let move = ar[i];
    let win = markLine(move, moves);
    let curPlay = isA ? 0 : 1;
    if (win) {
      score[curPlay] = score[curPlay] + win;
    } else {
      isA = !isA;
    }
  }

  return score;
}

function getN(arLength) {
  return Math.ceil(Math.sqrt(arLength / 2));
}

function markLine(move, moves) {
  let min = Math.min(...move), max = Math.max(...move), n = moves.length;
  let win = 0;
  if (max - min === 1) {
    let x = Math.floor(min % n), y = Math.floor(max / n) - 1;
    if (y >= 0 ) {
      moves[y][x] =  moves[y][x] + 1;
      moves[y][x] === 4 && win++;
    }
    if (y + 1 < n ) {
      moves[y + 1][x] =  moves[y + 1][x] + 1;
      moves[y + 1][x] === 4 && win++;
    }
  } else {
    let x = Math.floor(min % n) - 1, y = Math.floor(min / n);
    if (x >= 0 ) {
      moves[y][x] =  moves[y][x] + 1;
      moves[y][x] === 4 && win++;
    }
    if (x + 1 < n ) {
      moves[y][x + 1] =  moves[y][x + 1] + 1;
      moves[y][x + 1] === 4 && win++;
    }
  }
  return win;
}