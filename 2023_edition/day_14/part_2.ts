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

let pivotedArray = formattedPuzzle[0];

const moveRock = (currentRow: string[], index: number, direction: number): string[] => {
    let newRow = [...currentRow];

    if (currentRow[index + direction] === undefined) return newRow;
    if (['O', '#'].includes(currentRow[index + direction])) return newRow;

    newRow[index] = '.';
    newRow[index + direction] = 'O';

    return moveRock(newRow, index + direction, direction);
}

const moveRocks = (row: string[], direction: number) => {
    for (
        let index = direction === -1 ? 0 : row.length - 1;
        direction === -1 ? index < row.length : index >= 0;
        direction === -1 ? index++ : index--
    ) {
        if (row[index] === 'O') {
            row = moveRock(row, index, direction);
        } 
    }
    return row;
};

const average = (numbers: number[]) => {
    if (!numbers.length) return 0;
    const sum = numbers.reduce((acc, value) => {
        return acc + value;
    }, 0);
    return sum / numbers.length;
}

let newArray: string[][] = [];


let totalCount: Record<number, any> = {};
for (let forIndex = 0; forIndex < 1000; forIndex++) {
    // console.log('----');
    // pivotedArray.forEach(row => console.log(row.join('')));

    
    ['n', 'w', 's', 'e'].forEach((direction) => {
        const translatedDirection = ['n', 'w'].includes(direction) ? -1 : 1;
    
        switch (direction) {
            case 'n':
                pivotedArray = pivoteArray(pivotedArray);
                pivotedArray.forEach((row) => {
                    newArray.push(moveRocks(row, translatedDirection));
                });
                pivotedArray = pivoteArray(newArray);
                newArray = [];
                break;
            case 'w':
                pivotedArray.forEach((row) => {
                    newArray.push(moveRocks(row, translatedDirection));
                });
                pivotedArray = newArray;
                newArray = [];
                break;
            case 's':
                pivotedArray = pivoteArray(pivotedArray);
                pivotedArray.forEach((row) => {
                    newArray.push(moveRocks(row, translatedDirection));
                });
                
                pivotedArray = pivoteArray(newArray);
                newArray = [];
                break;
            case 'e':
                pivotedArray.forEach((row) => {
                    newArray.push(moveRocks(row, translatedDirection));
                });
                pivotedArray = newArray;
                newArray = [];
                break;
            default:
                break;
        }    
    })
    
    let total = 0;
    pivoteArray(pivotedArray).forEach((row, index) => {
        const sum = row.reduce((total, current, index) => {
            if (current !== 'O') return total;
            return total += row.length - index;
        }, 0);
        total += sum;
    });
    
    if (!totalCount[total]) {
        totalCount[total] = {
            count: 1,
            firstIndex: forIndex,
            previousIndex: forIndex,
            frequencys: [],
            average: 0,
        }
    } else {
        totalCount[total].count += 1;
        totalCount[total].frequencys = [...totalCount[total].frequencys, forIndex - totalCount[total].previousIndex];
        totalCount[total].previousIndex = forIndex;
        totalCount[total].average = average(totalCount[total].frequencys);
        totalCount[total].modulo = 1000000000 % forIndex - 1;
    }
    // console.log('Total', total, forIndex);
}

Object.keys(totalCount).forEach((key: any) => {
    if (totalCount[key].frequencys.every(f => f === 14) && totalCount[key].frequencys.length) {
        console.log(key + ' :', totalCount[key]);
    }
})

