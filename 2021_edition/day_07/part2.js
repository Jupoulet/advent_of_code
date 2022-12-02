import input from './input.js';
const exampleInput = [16,1,2,0,4,2,7,1,2,14];

const calculateCostFromAToB = (a, b) => {
  const distance = Math.abs(a - b);
  let currentCost = 1;
  let distanceCalculated = 0;
  let finalCost = 0;
  
  while (distanceCalculated < distance) {
    finalCost += currentCost;
    currentCost += 1;
    distanceCalculated += 1;
  }
  return finalCost;
}

export const calculateFuel = (input, positionToAlign) => {
  return input.reduce((sum, current) => {
    return sum + calculateCostFromAToB(current, positionToAlign);
  }, 0)
}

const minCrab = input.sort((a,z) => a - z)[0];
const maxCrab = input.sort((a,z) => z - a)[0];

const listOfCostOfTwoOppositeCrabs = (a, z) => {
  const listOfCost = [];
  for (let i = a; i < z; i++) {
    const positionToAlign = Math.abs(i - z);
    listOfCost.push(calculateFuel(input, positionToAlign))
  }
  return listOfCost;
}

const result = listOfCostOfTwoOppositeCrabs(minCrab, maxCrab).sort((a,z) => a - z)[0];
console.log('Result', result);