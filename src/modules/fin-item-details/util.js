/**
 * Rebuild comment full info options
 * @param {array} options - comment full info options
 * @param {string} options[0].comment - comment
 * @param {string} options[0].category - category
 * @param {string} options[0].subcategory - subcategory
 * @param {string} options[0].place - place
 */
const restructureCommentOptions = (options = []) => {
  const result = {};
  options.forEach(option => {
    if (result[option.comment]) {
      result[option.comment].push({
        category: option.category,
        subcategory: option.subcategory,
        place: option.place,
      });
    } else {
      result = {
        ...result,
        [option.comment]: [{
          category: option.category,
          subcategory: option.subcategory,
          place: option.place,
        }]
      };
    }
  })
  return result;
};

/**
 * Filter comment for search dropdown
 * @param {array} options - comment option list
 * @param {string} options[0].comment - comment option
 * @param {string} options[0].date - date for each place
 * @param {string} value - current value
 * @param {number} num - filter list count, default to 3
 */
const commentFilterFn = (options = [], value = '', num = 3) => {
  let validList = options.filter(option => option.comment.toLowerCase().indexOf(value.toLowerCase()) > -1) || [];
  let result = validList.map(item => item.date + 'dateComment' + item.comment).sort().reverse().map(item => item.slice(item.indexOf('dateComment') + 11));
  return result.slice(0, num);
};

/**
 * Filter place for search dropdown
 * @param {array} options - place option list
 * @param {string} options[0] - place option
 * @param {string} value - current value
 * @param {number} num - filter list count, default to 3
 */
const placeFilterFn = (options = [], value = '', num = 3) => {
  let list = options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) > -1) || [];
  return list.slice(0, num);
};

export {
  restructureCommentOptions,
  commentFilterFn,
  placeFilterFn
};
