import input from './data.js';

const exampleInput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`.split('\n').filter(Boolean);

const splitBinaryByIndexedBit = (array, indexPosition) => {
  const zeroBinaryArray = [];
  const oneBinaryArray = [];

  for (const binary of array) {
    if (binary[indexPosition] === '0') zeroBinaryArray.push(binary);
    else oneBinaryArray.push(binary)
  }

  return [zeroBinaryArray, oneBinaryArray];
};

const getCorrespondingArray = ([zeroBinaryArray, oneBinaryArray] , type) => {
 if (type === 'oxygen') return zeroBinaryArray.length > oneBinaryArray.length ? zeroBinaryArray : oneBinaryArray;
 return zeroBinaryArray.length <= oneBinaryArray.length ? zeroBinaryArray : oneBinaryArray;
}

const battleRoyalBinaryArrays = (array, index, type) => {
  if (array.length === 1) return array[0];

  const [zeroBinaryArray, oneBinaryArray] = splitBinaryByIndexedBit(array, index);
  return battleRoyalBinaryArrays(getCorrespondingArray([zeroBinaryArray, oneBinaryArray], type), index + 1, type);
};

const oxygenGeneratorRating = parseInt(battleRoyalBinaryArrays(input, 0, 'oxygen'), 2);
const CO2ScrubberRating = parseInt(battleRoyalBinaryArrays(input, 0, 'co2'), 2);

console.log('oxygenGeneratorRating', oxygenGeneratorRating);
console.log('CO2ScrubberRating', CO2ScrubberRating);
console.log('Result', oxygenGeneratorRating * CO2ScrubberRating);
