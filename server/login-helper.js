// ****************** 加密 / 解密 ******************
// https://github.com/chenshenhai/blog/issues/21
/**
 * encrypto 加密程序
 * @param {Strng} str 待加密字符串
 * @param {Number} xor 异或值
 * @param {Number} hex 加密后的进制数
 * @return {Strng} 加密后的字符串
 */
const encrypto = (str, xor, hex) => {
  if (typeof str !== 'string' || typeof xor !== 'number' || typeof hex !== 'number') {
    return;
  }

  let resultList = [];
  hex = hex <= 25 ? hex : hex % 25;

  for ( let i=0; i<str.length; i++ ) {
    // 提取字符串每个字符的ascll码
    let charCode = str.charCodeAt(i);
    // 进行异或加密
    charCode = (charCode * 1) ^ xor;
    // 异或加密后的字符转成 hex 位数的字符串
    charCode = charCode.toString(hex);
    resultList.push(charCode);
  }

  let splitStr = String.fromCharCode(hex + 97);
  let resultStr = resultList.join( splitStr );
  return resultStr;
}

/**
 * decrypto 解密程序
 * @param {Strng} str 待加密字符串
 * @param {Number} xor 异或值
 * @param {Number} hex 加密后的进制数
 * @return {Strng} 加密后的字符串
 */
const decrypto = (str, xor, hex) => {
  if (typeof str !== 'string' || typeof xor !== 'number' || typeof hex !== 'number') {
    return;
  }
  let strCharList = [];
  let resultList = [];
  hex = hex <= 25 ? hex : hex % 25;
  // 解析出分割字符
  let splitStr = String.fromCharCode(hex + 97);
  // 分割出加密字符串的加密后的每个字符
  strCharList = str.split(splitStr);

  for ( let i=0; i<strCharList.length; i++ ) {
    // 将加密后的每个字符转成加密后的ascll码
    let charCode = parseInt(strCharList[i], hex);
    // 异或解密出原字符的ascll码
    charCode = (charCode * 1) ^ xor;
    let strChar = String.fromCharCode(charCode);
    resultList.push(strChar);
  }
  let resultStr = resultList.join('');
  return resultStr;
}
// ****************** 加密 / 解密 ******************

// =============================
// let s1 = 'hello world';

// 加密
// s1 = encrypto(s1, 123, 25);
// console.log('s1=', s1);
// s1= jz15znznzkz3gzczkz9znz16

// 解密
// let s2 = decrypto(s1, 123, 25);
// console.log('s2=', s2);
// s2= hello world
// =============================

const generateToken = (username = '', password = '') => {
  let originalString = `${username}@${password}`;
  return encrypto(originalString, 123, 25);
};

const getUserAccount = (token = '') => {
  let parsedToken = decrypto(token, 123, 25);
  let parseRegex = /^([^@]*)@([^@]*)$/;
  let matchList = parsedToken.match(parseRegex);
  let username = '', password = '';
  if (matchList && matchList.length === 3) {
    username = matchList[1];
    password = matchList[2];
  }

  return {
    username,
    password,
  }
}

module.exports = {
  encrypto,
  decrypto,
  generateToken,
  getUserAccount,
};