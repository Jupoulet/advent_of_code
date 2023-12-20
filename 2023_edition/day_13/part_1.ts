import puzzle from './puzzle_input.txt';

const formattedPuzzle = puzzle.split('\n\n').map((tile) => tile.split('\n').map((row) => row.split('')));

const spotDifferences = (stringA, stringB) => {
    let deltas = 0;

    stringA.split('').forEach((char, index) => {
        if (char !== stringB[index]) deltas ++;
    });
    return deltas;
}

const getRowReflectionsCount = (map: string[]): number | undefined => {
    for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
        if (map[rowIndex] === map[rowIndex + 1]) {
            for (let index = 1; index < map.length; index++) {
                if (!map[rowIndex - index] && !map[rowIndex + index + 1]) break;
                if (map[rowIndex - index] === map[rowIndex + index + 1]) continue;
                if (
                    map[rowIndex - index] === undefined && map[rowIndex + index + 1]
                    || map[rowIndex + index + 1] === undefined && map[rowIndex - index]
                ) {
                    return rowIndex + 1;
                }
                break;
            }
        }
    }
}

const pivoteArray = (array: string[][]) => {
    const pivotedArray: string[][] = [];

    array[0].forEach((col, colIndex) => {
        const column = [];

        for (let rowIndex = 0; rowIndex < array.length; rowIndex++) {
            column.push(array[rowIndex][colIndex])
        }
        pivotedArray.push(column);
    });
    return pivotedArray;
};

const mirrors = {
    colMirorCount: 0,
    rowMirorCount: 0,
};

formattedPuzzle.forEach((map) => {
    const isRowMirror = getRowReflectionsCount(map.map((r) => r.join('')));
    if (isRowMirror) mirrors.rowMirorCount += isRowMirror;

    const pivotedArray = pivoteArray(map);
    const isColMirror = getRowReflectionsCount(pivotedArray.map((r) => r.join('')));
    if (isColMirror) mirrors.colMirorCount += isColMirror;
});
