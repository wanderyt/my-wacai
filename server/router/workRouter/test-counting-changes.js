var countChange = function(money, coins) {
  console.log('money: ', money);
  console.log('coins: ', coins);

  // coins asc
  // var collection = [],
  //   original = [[money, coins.sort((a,b) => a - b), []]];
  // while (original.length > 0) {
  //   var curSolution = original.shift();
  //   var curCoins = curSolution[1];
  //   for (var index in curCoins) {
  //     var coin = curCoins[index];
  //     var rest = curSolution[0];
  //     if (rest > coin) {
  //       original.push([rest - coin, curCoins.slice(index), [...curSolution[2], coin]]);
  //       continue;
  //     } else if (rest === coin) {
  //       collection.push([...curSolution[2], coin]);
  //       break;
  //     } else if (rest < coin) {
  //       break;
  //     }
  //   }
  // }

  // coins desc
  var collection = [],
    original = [[money, coins.sort((a,b) => b - a), []]];
  while (original.length > 0) {
    var curSolution = original.shift();
    var curCoins = curSolution[1];
    for (var index in curCoins) {
      var coin = curCoins[index];
      var rest = curSolution[0];
      if (rest < coin) {
        original.push([rest - coin, curCoins.slice(index + 1), [...curSolution[2], coin]]);
        continue;
      } else if (rest === coin) {
        collection.push([...curSolution[2], coin]);
        break;
      } else if (rest > coin) {
        original.push([rest - coin, curCoins.slice(index), [...curSolution[2], coin]]);
        continue;
      }
    }
  }

  return collection.length;
}