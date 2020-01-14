// https://www.codewars.com/kata/52bd4ee7182a1f82720001e3/train/javascript

var findPath = (start, end) => {
  if (start === end) {
    return [];
  }

  let validPath = findPathTmp(start, end, [start], []);

  if (validPath.length > 0) {
    let pathLength = validPath[0].length, pathIndex = 0;
    validPath.map((path, index) => {
      if (path.length < pathLength) {
        pathIndex = index;
      }
    });
    return validPath[pathIndex];
  } else {
    return [];
  }
};

var findPathTmp = (start, end, path, validPath) => {
  if (validPath.length > 0) {
    return;
  }
  let validNodes = go(start, end, path);

  for (let key in validNodes) {
    if (validNodes[key] === end) {
      validPath.push([...path, end]);
    } else {
      findPathTmp(validNodes[key], end, path, validPath);
      path.pop();
    }
  }
}

var go = (start, end, path) => {
  let possiblePath = [];
  start.north && (path.indexOf(start.north) < 0 || start.north === end) && possiblePath.push(start.north);
  start.south && (path.indexOf(start.south) < 0 || start.south === end) && possiblePath.push(start.south);
  start.west && (path.indexOf(start.west) < 0 || start.west === end) && possiblePath.push(start.west);
  start.east && (path.indexOf(start.east) < 0 || start.east === end) && possiblePath.push(start.east);

  return possiblePath;
}


// ======================== Solution 2 ============================
// var visitedArray=[];
// var path=[];
// function getAjencentNotVisitedPoint(point){
//    if(point.south && visitedArray.indexOf(point.south) < 0) {
//       return point.south;
//    }
//    else if (point.east && visitedArray.indexOf(point.east) <0) {
//        return point.east;
//    }
//    else if (point.north && visitedArray.indexOf(point.north) < 0) {
//        return point.north;
//    }
//    else if(point.west && visitedArray.indexOf(point.west) < 0) {
//        return point.west;
//    } else {
//        return false;
//    }
// }
// function findPath(start, end) {
//    visitedArray.push(start);
//    path.push(start);
//    while(path.length > 0 && path[path.length -1] !== end) {
//        var nextPoint = getAjencentNotVisitedPoint(path[path.length -1]);
//        if(!nextPoint) {
//           path.pop();
//           continue;
//        }
//        visitedArray.push(nextPoint);
//        path.push(nextPoint);
//    }
//    return path;
// }

// ======================== Solution 3 ============================

function findPath(s, e, n, b, a = [[s, [s]]]) {
  while ((b = a.shift())[0] != e) {
    for (var n of ['north', 'east', 'south', 'west']) {
      if (b[0][n] && b[1].indexOf(n = b[0][n]) < 0) {
        a.push([n, b[1].concat(n)]);
      }
    }
  }
  return b[1];
}


// function findPath(s,e){for(var d=['north','east','south','west'],i=0,p=[s],k=[],c=s,x;c!==e;i>3?(p.pop(),c=p[p.length-1],i=k.pop()):((x=c[d[i]])&&p.indexOf(x)<0&&(p.push(c=x),k.push(i),i=-1)),i++);return p}