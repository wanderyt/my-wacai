const shanghaiAvg = 8211;
function get(monthlySalary = 35000, stockAmountOnMar15 = 120, workingYearAtEbay = 5.5) {
  // var yearPerformance = 0.75;
  // var totalYear = monthlySalary * 13 + monthlySalary * 12 * 0.1 * yearPerformance;
  // monthlySalary = totalYear / 12;
  var leaveBonus, tybAtLeast;
  const stockValues = stockAmountOnMar15 * 35.6 / 0.144402;
  console.log('==== > stock values you\'ll get on Mar 15', stockValues);
  console.group('==== > use your own monthlySalary, n + 4')
  leaveBonus = getLeaveBouns(monthlySalary, 4, workingYearAtEbay);
  tybAtLeast = leaveBonus - stockValues;
  logTyb(tybAtLeast, stockValues);
  console.groupEnd();
  console.log();
  console.group('==== > use your own monthlySalary, n + 1')
  leaveBonus = getLeaveBouns(monthlySalary, 1, workingYearAtEbay);
  tybAtLeast = leaveBonus - stockValues;
  logTyb(tybAtLeast, stockValues);
  console.groupEnd();
  console.log();
  console.group('==== > use shanghai avg monthlySalary, n + 1')
  leaveBonus = getLeaveBouns(monthlySalary, 1, workingYearAtEbay, false);
  tybAtLeast = leaveBonus - stockValues;
  logTyb(tybAtLeast, stockValues);
  console.groupEnd();
}
function logTyb(tybAtLeast, stockValues) {
  if (tybAtLeast < 0) {
    console.log('Just sign on next Monday, you have a lot stock', stockValues, ', you dont need leave bonus');
  } else {
    console.log('thany you bonus(before tax) should at least be(tax with 20%)', (tybAtLeast * 1.2));
  }
}
function getRate(x) {
  var taxRate, taxFastNum;
  if (x > 960000) {
    taxRate = 0.45;
    taxFastNum = 181920;
  } else if (x > 660000) {
    taxRate = 0.35;
    taxFastNum = 85920;
  } else if (x > 420000) {
    taxRate = 0.30;
    taxFastNum = 52920;
  } else if (x > 300000) {
    taxRate = 0.25;
    taxFastNum = 31920;
  } else if (x > 144000) {
    taxRate = 0.20;
    taxFastNum = 16920;
  } else if (x > 36000) {
    taxRate = 0.10;
    taxFastNum = 2520;
  } else if (x > 0) {
    taxRate = 0.03;
    taxFastNum = 0;
  } else {
    taxRate = 0;
    taxFastNum = 0;
  }
  return {taxRate , taxFastNum}
}
function getLeaveBouns(monthlySalary, nAddOneOrFour, n, x = true) {
  if (x) {
    var leaveBonus = monthlySalary * (n + nAddOneOrFour);
  } else {
    var leaveBonus = shanghaiAvg * 3 * n + monthlySalary * nAddOneOrFour;
  }
  console.log('leaveBonus before tax\t', leaveBonus);
  var x = (leaveBonus - shanghaiAvg * 12 * 3);
  x = x > 0 ? x : 0;
  console.log('leaveBonus need tax\t', x);
  var {taxRate, taxFastNum} = getRate(x);
  var leaveBonusTax = x * taxRate - taxFastNum;
  console.log('leaveBonus tax\t', leaveBonusTax);
  var leaveBonusAfterTax = leaveBonus - leaveBonusTax;
  console.log('leaveBonus after tax\t', leaveBonusAfterTax, `, ${(leaveBonusAfterTax / leaveBonus * 100).toFixed(2)}% of the amout before tax`);
  return leaveBonusAfterTax;
}
get(30000, 274, 1);