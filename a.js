function validTime(time) {
  if (typeof time !== "string") {
    return false;
  }
  const splitTime = time.split(":");
  return (
    time.length === 5 &&
    splitTime[0].length === 2 &&
    splitTime[1].length === 2 &&
    +splitTime[0] >= 0 &&
    +splitTime[0] <= 23 &&
    +splitTime[1] >= 0 &&
    +splitTime[1] <= 59
  );
}

function missingNumber(arr) {
  if (
    !arr ||
    arr.constructor !== Array ||
    arr.length < 1 ||
    arr.length > 1000 ||
    arr.some(function (num) {
      return num < 0 || num > arr.length || !Number.isInteger(num);
    })
  ) {
    return "Invalid Input";
  }
  let result;
  for (let i = 0; i <= arr.length; i++) {
    if (arr.indexOf(i) === -1) {
      result = i;
      break;
    }
  }
  return result;
}
