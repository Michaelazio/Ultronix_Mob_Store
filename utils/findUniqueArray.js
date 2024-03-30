export default (array) => {
  let uniqueArray = [];

  for (let i = 0; i < array.length; i++) {
    if (array.indexOf(array[i]) === i) {
      uniqueArray.push(array[i]);
    }
  }

  return uniqueArray;
};
