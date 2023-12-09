import puzzle from './puzzle_input.txt';

const [time, distance] = puzzle.split('\n')
    .map((l) => {
        const separator = l.indexOf(':')
        return l.substring(separator + 1).trim().split(' ').filter(Boolean).join('');
    })
    .map(Number);

let result = 1;
const matchingDistance = distance;
let winningCount = 0;
for (let index = 0; index <= time; index++) {
    const speed = index;
    const reachedDistance = (time - speed) * speed;
    if (reachedDistance > matchingDistance) {
        winningCount += 1;
    }
}
result *= winningCount;


console.log('Result', result);