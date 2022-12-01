import data from './data.js';

const listOfCaloriesSum = data
  .map((elve) => {
    return elve.map(snack => snack * 1).reduce((total, sum) => total + sum, 0)
  })
  .sort((a,z) => z - a);

const topThreeElvesCalories = listOfCaloriesSum.splice(0,3);
const sum = topThreeElvesCalories.reduce((total, sum) => total + sum, 0);

console.log('RESULT', sum);