const padZero = (day) => {
  if (day < 10) {
    return `0${day}`;
  } else {
    return `${day}`;
  }
};

const formatDate = (year, month = 1, day = 1) => {
  let validDatePart = [];
  validDatePart.push(year);
  validDatePart.push(padZero(month));
  validDatePart.push(padZero(day));
  return validDatePart.join('-');
}

const formatDateObject = (dateObj) => {
  let validDatePart = [];
  validDatePart.push(dateObj.getFullYear());
  validDatePart.push(padZero(dateObj.getMonth() + 1));
  validDatePart.push(padZero(dateObj.getDate()));
  return validDatePart.join('-');
}

const formatDateTime = (date = new Date()) => {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  return `${year}-${padZero(month + 1)}-${padZero(day)} ${padZero(hour)}:${padZero(minute)}:${padZero(second)}`;
};

const formatMonth = (date = new Date()) => {
  let year = date.getFullYear();
  let month = date.getMonth();

  return `${year}-${padZero(month + 1)}`;
};

const uuid = () => {
  let s = [];
  let hexDigits = "0123456789ABCDEF";
  for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  let uuid = s.join("");
  return uuid;
}

/**
 * Get preselected category / subcategory/
 * Support weekend presetting
 * @returns {object} category group - {category, subcategory}
 */
const getPreselectedCategories = () => {
  let now = new Date();
  let day = now.getDay(); // [0 - 6], [Sunday - Saturday]
  let category = '周末', subcategory = '晚餐';
  if (day === 0 || day === 6) {
    category = '周末';
    let hours = now.getHours();
    if (hours <= 10) {
      subcategory = '早餐';
    } else if (hours < 15 && hours > 10) {
      subcategory = '午餐';
    } else if (hours < 20 && hours > 16) {
      subcategory = '晚餐';
    }
  }

  return {
    category,
    subcategory
  };
}

export {
  padZero,
  formatDateTime,
  formatMonth,
  uuid,
  formatDate,
  formatDateObject,
  getPreselectedCategories
};