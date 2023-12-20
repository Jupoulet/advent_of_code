import puzzle from './puzzle_input.txt';

const formattedPuzzle = puzzle.split('\n\n').map((tile) => tile.split('\n').map((row) => row.split('')));

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

const pivotedArray = pivoteArray(formattedPuzzle[0]);

const moveRockToLeft = (currentRow: string[], index: number): string[] => {
    let newRow = [...currentRow];

    if (currentRow[index - 1] === undefined) return newRow;
    if (['O', '#'].includes(currentRow[index - 1])) return newRow;

    newRow[index] = '.';
    newRow[index - 1] = 'O';

    return moveRockToLeft(newRow, index - 1);
}

const moveRocks = (row: string[]) => {
    row.forEach((element, index) => {
        if (element === 'O') {
            row = moveRockToLeft(row, index);
        }
    });
    return row;
};

const newArray: string[][] = [];
pivotedArray.forEach((row) => {
    newArray.push(moveRocks(row));
})

let total = 0;
newArray.forEach((row, index) => {
    const sum = row.reduce((total, current, index) => {
        if (current !== 'O') return total;
        return total += row.length - index;
    }, 0);
    total += sum;
});

console.log('Total', total);


