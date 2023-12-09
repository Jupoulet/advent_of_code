import puzzle from './puzzle_input.txt';

const [directions, map] = puzzle.split('\n\n');

const formattedMap: Record<string, string[]> = {};

map.split('\n')
.map((line) => {
    const [key, rest] = line.split(' = ');
    const leftAndRight = rest.replace(/[()]/g, '').split(', ');
    formattedMap[key] = leftAndRight;
});

let moveCount = 0;
const processDirections = (nextDirectionIndex: number, startingPosition: string): number => {
    const directionIndex = nextDirectionIndex > directions.length - 1 ? 0 : nextDirectionIndex;
    const direction = directions[directionIndex];
    const nextElementKey = direction === 'L' ? formattedMap[startingPosition][0] : formattedMap[startingPosition][1]
    moveCount += 1;

    if (nextElementKey !== 'ZZZ') return processDirections(directionIndex + 1, nextElementKey);
    return moveCount;
};

console.log('Result', processDirections(0, 'AAA'))

