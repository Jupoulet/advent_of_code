import puzzle_input from './puzzle_input.txt';
console.log('Day O1');
const formatPuzzleInput = puzzle_input
    .split('\n\n')
    .map((block) => block.split('\n'))
    .map((strings) => strings.map(Number));
console.log(formatPuzzleInput[0]);
