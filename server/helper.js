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

const ENV_VAR_TRUE_REGEX = /^true|1$/i;
const isEnvVarTrue = (s) => {
  return ENV_VAR_TRUE_REGEX.test(s);
};

module.exports = {
  padZero,
  formatDate,
  formatMonth,
  isEnvVarTrue
};