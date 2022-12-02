import input from './input.js';
const exampleInput = [3,4,3,1,2];

let lanternFishes = input;

const lanternFishCount = new Array(9).fill(0);

lanternFishes.forEach(lanterFishIndex => {
  lanternFishCount[lanterFishIndex] += 1;
});

const daysOfStudy = 256;
let currentDay = 1;

while(currentDay <= daysOfStudy) {
  const fishAt0 = lanternFishCount[0];

  for (let i = 0; i < lanternFishCount.length - 1; i++) {
    lanternFishCount[i] = lanternFishCount[i + 1]
  }

  lanternFishCount[8] = fishAt0;
  lanternFishCount[6] += fishAt0;
  
  currentDay += 1;
}

const sum = lanternFishCount.reduce((sum, current) => sum + current, 0);

console.log(`After ${daysOfStudy} days, we count ${sum} lanternFish`);