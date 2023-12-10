import puzzle from './puzzle_input.txt';

const mapOfPipes: string[][] = puzzle.split('\n').map((row) => row.split(''));
const LINE_LENGTH = mapOfPipes[0].length;

const findStartingPoint = (map: string[][]) => {
    for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < map[rowIndex].length; columnIndex++) {
            if (map[rowIndex][columnIndex] === 'S') {
                return [rowIndex, columnIndex];
            }
        } 
    }
}

const UP_MATCHES: Record<string, string[]> = {
    'S': ['|', 'F', '7'],
    '|': ['|', 'F', '7'],
    'L': ['|', 'F', '7'],
    'J': ['|', 'F', '7'],
    '-': [],
    'F': [],
    '7': [],
    '.': [],
};

const RIGHT_MATCHES: Record<string, string[]> =  {
    'S': ['-', '7', 'J'],
    'L': ['-', '7', 'J'],
    '-': ['-', '7', 'J'],
    'F': ['-', '7', 'J'],
    '7': [],
    'J': [],
    '|': [],
    '.': [],
};

const BOTTOM_MATCHES: Record<string, string[]> = {
    'S': ['|', 'J', 'L'],
    'F': ['|', 'J', 'L'],
    '7': ['|', 'J', 'L'],
    '|': ['|', 'J', 'L'],
    'J': [],
    '-': [],
    'L': [],
    '.': [],
};

const LEFT_MATCHES: Record<string, string[]> = {
    'S': ['F', 'L', '-'],
    '7': ['F', 'L', '-'],
    'J': ['F', 'L', '-'],
    '-': ['F', 'L', '-'],
    'L': [],
    '|': [],
    'F': [],
    '.': [],
};


const findExitsFromStartingPoints = (startingPoint: number[], previousPoint?: number[]) => {
    const [rowIndexStartingPoint, columnIndexStartingPoint] = startingPoint;
    const value = mapOfPipes[rowIndexStartingPoint][columnIndexStartingPoint];
    const exitPoints = [];

    const upValue = rowIndexStartingPoint > 0 ? mapOfPipes[rowIndexStartingPoint - 1][columnIndexStartingPoint] : null;
    if (
        upValue
        && UP_MATCHES[value].includes(upValue)
        && !((rowIndexStartingPoint - 1 === previousPoint?.[0]) && (columnIndexStartingPoint === previousPoint?.[1]))
    ) exitPoints.push([rowIndexStartingPoint - 1, columnIndexStartingPoint]);

    const rightValue = columnIndexStartingPoint < LINE_LENGTH - 1 ? mapOfPipes[rowIndexStartingPoint][columnIndexStartingPoint + 1] : null;
    if (
        rightValue
        && RIGHT_MATCHES[value].includes(rightValue)
        && !((rowIndexStartingPoint === previousPoint?.[0]) && (columnIndexStartingPoint + 1 === previousPoint?.[1]))
    ) exitPoints.push([rowIndexStartingPoint, columnIndexStartingPoint + 1]);

    const bottomValue = rowIndexStartingPoint < mapOfPipes.length - 1 ? mapOfPipes[rowIndexStartingPoint + 1][columnIndexStartingPoint] : null;
    if (
        bottomValue
        && BOTTOM_MATCHES[value].includes(bottomValue)
        && !((rowIndexStartingPoint + 1 === previousPoint?.[0]) && (columnIndexStartingPoint === previousPoint?.[1]))
    ) exitPoints.push([rowIndexStartingPoint + 1, columnIndexStartingPoint]);

    const leftValue = columnIndexStartingPoint > 0 ? mapOfPipes[rowIndexStartingPoint][columnIndexStartingPoint - 1] : null;
    if (
        leftValue
        && LEFT_MATCHES[value].includes(leftValue)
        && !((rowIndexStartingPoint === previousPoint?.[0]) && (columnIndexStartingPoint - 1 === previousPoint?.[1]))
    ) exitPoints.push([rowIndexStartingPoint, columnIndexStartingPoint - 1]);

    return exitPoints;
}

const startingPoint = findStartingPoint(mapOfPipes);
const exitPoints = findExitsFromStartingPoints(startingPoint!);

const walkThroughMap = (currentPoints: number[][], counterOfStep: number, previousPoints?: number[][]): number => {
    const [firstRowIndexPath, firstColumnIndexPath] = currentPoints[0];
    const [secondRowIndexPath, secondColumnIndexPath] = currentPoints[1]; 

    if (firstRowIndexPath === secondRowIndexPath && firstColumnIndexPath === secondColumnIndexPath) return counterOfStep;

    const [firstPathNextPoint] = findExitsFromStartingPoints(currentPoints[0], previousPoints?.[0]);
    const [secondPathNextPoint] = findExitsFromStartingPoints(currentPoints[1], previousPoints?.[1]);

    return walkThroughMap([firstPathNextPoint, secondPathNextPoint], counterOfStep + 1, currentPoints);
}

console.log('Result', walkThroughMap(exitPoints, 1));