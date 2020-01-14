var scoreBreakdowns = function(score) {
  console.log(`score: `, score);
  let validPoints = ['td', 'fg', 's'];

  let cache = {};

  const mapping = {
    td: 6,
    tp: 2,
    ep: 1,
    fg: 3,
    s: 2
  };

  let initial = [[score, validPoints, []]];
  let results = [];

  while (initial.length > 0) {
    let [rest, options, scores] = initial.shift();
    console.log('rest, options, scores: ', rest, options, scores);
    if (rest === 0) {
      results.push([...scores]);
      cache = cacheResults(score, [...scores], cache, mapping);
      continue;
    }
    for (let index = 0; index < options.length; index++) {
      let name = options[index];
      let point = mapping[name];

      // handle td
      if (rest >= point && point === 6) {
        initial.push([rest - point - 2, options.slice(index), [...scores, 'td', 'tp']]);
        initial.push([rest - point - 1, options.slice(index), [...scores, 'td', 'ep']]);
        initial.push([rest - point, options.slice(index), [...scores, 'td']]);
      // } else if (rest > point) {
      //   console.log('options.slice(index): ', options, " ", index, " ", options.slice(index));
      //   initial.push([rest - point, options.slice(index), [...scores, name]]);
      // } else if (rest === point) {
      //   results.push([...scores, name]);

      } else if (rest >= point) {
        if (cache[rest]) {
          console.log(`hit cache ${rest}: `, cache[rest]);
          for (const option of cache[rest]) {
            results.push([...scores, ...option]);
          }
        } else {
          initial.push([rest - point, options.slice(index), [...scores, name]]);
        }
      }
    }
  }

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

  return re;
};

var cacheResults = (score, options, cache, mapping) => {
  let rest = 0;
  for (let index = 0; index < options.length; index++) {
    const option = options[index];
    if (option === 'td' || option === 'tp' || option === 'ep') {
      rest = score - mapping[option];
    } else {
      if (cache[rest]) {
        cache[rest].push(options.slice(index));
      } else {
        cache[rest] = [options.slice(index)];
      }
    }
  }

  return cache;
}