const padZero = (day) => {
  if (day < 10) {
    return `0${day}`;
  } else {
    return `${day}`;
  }
};

const formatDate = (date = new Date()) => {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  return `${year}-${padZero(month + 1)}-${padZero(day)}`;
};

const formatMonth = (date = new Date()) => {
  let year = date.getFullYear();
  let month = date.getMonth();

  return `${year}-${padZero(month + 1)}`;
};

export {
  padZero,
  formatDate,
  formatMonth
};