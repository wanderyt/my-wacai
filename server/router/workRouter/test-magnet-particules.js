// https://www.codewars.com/kata/magnet-particules-in-boxes

function doubles(maxk, maxn) {
  var result = 0;
  for (var i = 1; i <= maxk; i++) {
    for (var j = 1; j <= maxn; j++) {
      result += 1 / (i * Math.pow((j + 1), 2 * i));
    }
  }

  return result;
}