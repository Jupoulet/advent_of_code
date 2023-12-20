import puzzle from './puzzle_input.txt';

const doubleEntryArray = puzzle.split('\n').map((row) => row.split(''));
const copy = JSON.parse(JSON.stringify(doubleEntryArray));
doubleEntryArray.forEach((row, index) => {
    const isEmpty = row.every((char) => char === '.');
    if (isEmpty) {
       copy.splice(index + 1, 0, row);
    };
});

const copy2 = JSON.parse(JSON.stringify(copy));

let columnCreatedCount = 1;
copy[0].forEach((char, columnIndex) => {
    const column = [];

    for (let index = 0; index < copy.length; index++) {
        column.push(copy[index][columnIndex])
    }
    const isEmpty = column.every((x) => x === '.');
    if (!isEmpty) return;
    for (let index = 0; index < copy.length; index++) {
        copy2[index].splice(columnIndex + columnCreatedCount, 0, '.');
    }
    columnCreatedCount ++;
});

let galaxyNumber = 1;
copy2.forEach((row, rowIndex) => {
    row.forEach((char, index) => {
        if (char !== '#') return;
        copy2[rowIndex][index] = galaxyNumber;
        galaxyNumber ++;
    });
});
galaxyNumber -= 1;

const findGalaxyByValue = (galaxyValue: number) => {
    for (let rowIndex = 0; rowIndex < copy2.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < copy2[rowIndex].length; columnIndex++) {
            if (copy2[rowIndex][columnIndex] === galaxyValue) return [rowIndex, columnIndex];
        }    
    }
    return [];
}

// [0, 2, 0, 3]
const getShortestPathFromPair = (pair: number[]) => {
    const [rowIndex, columnIndex, rowIndex2, columnIndex2] = pair;
    return Math.abs(rowIndex - rowIndex2) + Math.abs(columnIndex - columnIndex2);
}

const pairs = [];
for (let index = 1; index <= galaxyNumber; index++) {
    for (let j = index + 1; j <= galaxyNumber; j++) {
        const pair = [...findGalaxyByValue(index), ...findGalaxyByValue(j)];
        pairs.push(pair);
    }
}
console.log('Pairs', pairs.length);
console.log('Path', getShortestPathFromPair(pairs[0]));


const result = pairs.reduce((total, currentPair) => {
    return total += getShortestPathFromPair(currentPair);
}, 0);

console.log(result);
