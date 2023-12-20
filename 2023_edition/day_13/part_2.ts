import puzzle from './puzzle_input.txt';

const formattedPuzzle = puzzle.split('\n\n').map((tile) => tile.split('\n').map((row) => row.split('')));

const spotDifferences = (stringA?: string, stringB?: string) => {
    if (stringA === undefined || stringB === undefined) return 2;
    let deltas = 0;

    stringA.split('').forEach((char, index) => {
        if (char !== stringB[index]) deltas ++;
    });
    return deltas;
}

let exitCount = 0;

const getRowReflectionsCount = (map: string[]): number | undefined => {
    let hasSeveralDifferences = false
    for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
        const differences = spotDifferences(map[rowIndex], map[rowIndex + 1]);
        console.log('---');

        if ([0, 1].includes(differences)) {
            console.log(map[rowIndex]);
            console.log(map[rowIndex + 1]);
            console.log('DIFF', differences)

            if (differences === 1) hasSeveralDifferences = true;

            for (let index = 1; index < map.length; index++) {
                if (!map[rowIndex - index] && !map[rowIndex + index + 1]) break;
                console.log('ROW BIS', map[rowIndex - index]);
                console.log('ROW BIS', map[rowIndex + index + 1]);

                const differenceBis = spotDifferences(map[rowIndex - index], map[rowIndex + index + 1]);
                console.log('Diff bis', differenceBis);
                
                if ([0, 1].includes(differenceBis)) {
                    hasSeveralDifferences = hasSeveralDifferences || differenceBis === 1;
                    continue;
                };

                if (
                    (map[rowIndex - index] === undefined && map[rowIndex + index + 1]
                    || map[rowIndex + index + 1] === undefined && map[rowIndex - index])
                    && hasSeveralDifferences
                ) {
                    console.log('exit', hasSeveralDifferences);
                    exitCount += 1;
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
    if (isRowMirror) {
        mirrors.rowMirorCount += isRowMirror;
        return;
    }

    const pivotedArray = pivoteArray(map);
    const isColMirror = getRowReflectionsCount(pivotedArray.map((r) => r.join('')));
    if (isColMirror) {
        mirrors.colMirorCount += isColMirror;
        return;
    }
    console.log('ERROR');
    map.forEach((row) => console.log(row.join('')));
    throw new Error('Problem');
});

console.log('Result', mirrors.colMirorCount + 100 * mirrors.rowMirorCount);
