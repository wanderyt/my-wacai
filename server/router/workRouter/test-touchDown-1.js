var myscoreBreakdowns = function(score) {
  const start = new Date();
  let results = [];
  console.log(`score: `, score);

  // const mapping = {
  //   td: 6,
  //   tp: 2,
  //   ep: 1,
  //   fg: 3,
  //   s: 2
  // };

  let twoList = getTwo(score);
  let threeList = getThree(score);
  let sixList = getSix(score);
  let sevenList = getSeven(score);
  let eightList = getEight(score);

  results = [...twoList, ...threeList, ...sixList, ...sevenList, ...eightList];

  console.log('results:', results);

  var re = results.map((result) => {
    let obj = {
      td: 0,  // touchdowns = 6pts * 2
      tp: 0,  // 2 point conversions = 2pts * 1
      ep: 0,  // extra points = 1pts * 1
      fg: 0,  // field goals = 3pts * 1
      s:  0   // safeties = 2pts * 0
    }
    result.forEach((item) => {
      obj[item] = obj[item] + 1;
    });
    return obj;
  })

  const end = new Date();

  console.log(`performance: `, end - start);

  return re;
}

var getTwo = (score) => {
  let results = [];
  if (score < 2) {
    return results;
  }
  // s
  if (score % 2 === 0) {
    let tmp = [];
    for (let index = 0; index < score / 2; index++) {
      tmp.push('s');
    }
    results.push(tmp);
  }
  return results;
}

var getThree = (score) => {
  let results = [];
  if (score < 3) {
    return results;
  }
  // fg
  for (let index = 0; index < score / 3; index++) {
    let base = [];
    for (let i = 0; i <= index; i++) {
      base.push('fg');
    }

    let rest = score - (index + 1) * 3;
    if (rest === 0) {
      results.push([...base]);
      break;
    }

    let twoList = getTwo(rest);
    for (const item of twoList) {
      results.push([...base, ...item]);
    }
  }
  return results;
}

var getSix = (score) => {
  let results = [];
  if (score < 6) {
    return results;
  }
  // td
  for (let index = 0; index < score / 6; index++) {
    let base = [];
    for (let i = 0; i <= index; i++) {
      base.push('td');
    }

    let rest = score - (index + 1) * 6;
    if (rest === 0) {
      results.push([...base]);
      break;
    }

    let twoList = getTwo(rest);
    for (const item of twoList) {
      results.push([...base, ...item]);
    }
    let threeList = getThree(rest);
    for (const item of threeList) {
      results.push([...base, ...item]);
    }
  }
  return results;
}

var getSeven = (score) => {
  let results = [];
  if (score < 7) {
    return results;
  }
  // td
  for (let index = 0; index < score / 7; index++) {
    let base = [];
    for (let i = 0; i <= index; i++) {
      base.push('td');
      base.push('ep');
    }

    let rest = score - (index + 1) * 7;
    if (rest === 0) {
      results.push([...base]);
      break;
    }

    let twoList = getTwo(rest);
    for (const item of twoList) {
      results.push([...base, ...item]);
    }
    let threeList = getThree(rest);
    for (const item of threeList) {
      results.push([...base, ...item]);
    }
    let sixList = getSix(rest);
    for (const item of sixList) {
      results.push([...base, ...item]);
    }
  }
  return results;
}

var getEight = (score) => {
  let results = [];
  if (score < 8) {
    return results;
  }
  // td
  for (let index = 0; index < score / 8; index++) {
    let base = [];
    for (let i = 0; i <= index; i++) {
      base.push('td');
      base.push('tp');
    }

    let rest = score - (index + 1) * 8;
    if (rest === 0) {
      results.push([...base]);
      break;
    }

    let twoList = getTwo(rest);
    for (const item of twoList) {
      results.push([...base, ...item]);
    }
    let threeList = getThree(rest);
    for (const item of threeList) {
      results.push([...base, ...item]);
    }
    let sixList = getSix(rest);
    for (const item of sixList) {
      results.push([...base, ...item]);
    }
    let sevenList = getSeven(rest);
    for (const item of sevenList) {
      results.push([...base, ...item]);
    }
  }
  return results;
}




// var scoreBreakdowns = function(score) {
//   const start = new Date();
//   var scoreArr=[];
//   var temp={};
//   var remainingScore;
//   //loop for td 6
//   for(var i=0; i<= parseInt(score/6); i++){
//       //loop for tp 2
//       for(var x=0; x<=i; x++){
//           //loop for ep 1
//           for (var y=0; y<=i-x; y++) {
//               //loop for fg 3
//               for(var j=0; j<=parseInt(score/3); j++){
//                   remainingScore = score - 6*i - 2*x -1*y - 3*j;
//                   //count s 2
//                   if(remainingScore>=0 && remainingScore % 2 == 0){
//                       temp.td=i;
//                       temp.tp=x;
//                       temp.ep=y;
//                       temp.fg=j;
//                       temp.s=remainingScore/2;
//                       scoreArr.push(temp);
//                       temp={};
//                   } else {
//                       continue;
//                   }
//               }
//           }
//       }
//   }

//   const end = new Date();

//   console.log(`performance: `, end - start);
//   return scoreArr;
// };