import data, { example } from './data.js'

const fillRemainingNumbers = (array) => {
  const lastItem = array[array.length - 1];
  const beforeLastItem = array[array.length - 2];
  if (lastItem === beforeLastItem) return [lastItem];
  if (beforeLastItem < lastItem - 1) {
    array.splice(array.length - 1, 0, beforeLastItem + 1);
    return fillRemainingNumbers(array)
  }
  return array;
}

const sectionRangeToListOfSections = (sectionRange) => {
  const sectionList = sectionRange.split('-').map(number => number * 1);
  return fillRemainingNumbers(sectionList)
}

const formattedInput = data.map((pair) => {
  const listOfSections = pair.map(range => sectionRangeToListOfSections(range))
  return listOfSections
});

const result = formattedInput.reduce((sum, pair) => {
  const [smallOne, bigOne] = pair.sort((a, z) => a.length - z.length);
  if (smallOne.every(number => bigOne.includes(number))) {
    return sum + 1;
  }
  return sum;
}, 0);

console.log(result);

