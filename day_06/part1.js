import input from './input.js';
const exampleInput = [3,4,3,1,2];

let lanternFishes = input;


const daysOfStudy = 80;
let currentDay = 1;

while(currentDay <= daysOfStudy) {
  const newBornLanterFishes = [];
  const newLanternFishes = lanternFishes.map((lanternFish) => {
    if (lanternFish === 0) {
      newBornLanterFishes.push(8);
      return 6;
    }

    return lanternFish - 1;
  });
  console.log('DAY: ', currentDay);
  console.log('New Lanternfished', [...newLanternFishes, ...newBornLanterFishes]);
  lanternFishes = [...newLanternFishes, ...newBornLanterFishes];
  currentDay += 1;
}

console.log(`After ${daysOfStudy}, we count ${lanternFishes.length} lanternFish`);