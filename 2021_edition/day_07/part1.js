import input from './input.js';
const exampleInput = [16,1,2,0,4,2,7,1,2,14];

const getMedian = (arr) => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

const median = getMedian(input);

const calculateFuel = (input, positionToAlign) => {
  return input.reduce((sum, current) => {
    return sum + Math.abs(positionToAlign - current);
  }, 0)
}

const amountOfFuelSpent = calculateFuel(input, median);

console.log(`Amount of fuel to align crabs on position: ${median}`, amountOfFuelSpent)