import puzzle from './puzzle_input.txt';

const [directions, map] = puzzle.split('\n\n');

const formattedMap: Record<string, string[]> = {};

map.split('\n')
.map((line) => {
    const [key, rest] = line.split(' = ');
    const leftAndRight = rest.replace(/[()]/g, '').split(', ');
    formattedMap[key] = leftAndRight;
});

const mapsEndingWithA = { ...formattedMap };
Object.keys(formattedMap).forEach((key) => {
    if (key[2] !== 'A') delete mapsEndingWithA[key];
})

let moveCount = 0;
const processDirections = (nextDirectionIndex: number, startingPositions: string[]): number => {
    console.log('moveCount', moveCount);
    const directionIndex = nextDirectionIndex > directions.length - 1 ? 0 : nextDirectionIndex;
    const direction = directions[directionIndex];

    const nextElementsKeys: string[] = [];

    startingPositions.forEach((startingPosition) => {
        const nextElementKey = direction === 'L' ? formattedMap[startingPosition][0] : formattedMap[startingPosition][1]
        nextElementsKeys.push(nextElementKey);
    })
    moveCount += 1;

    const isAllNextKeysEndsWithZ = nextElementsKeys.every((key) => key[2] === 'Z');

    if (!isAllNextKeysEndsWithZ) return processDirections(directionIndex + 1, nextElementsKeys);
    return moveCount;
};


console.log('map', mapsEndingWithA);
console.log('Result', processDirections(0, Object.keys(mapsEndingWithA)))

