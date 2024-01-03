import puzzle from './puzzle_input.txt';

const formattedPuzzle = puzzle.split('\n\n').map((tile) => tile.split('\n').map((row) => row.split('')));
const searchingSuite: Array<[number, number]> = [];
let nbRepetitions: number = 0;

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

let newArray: string[][] = [];


let totalCount: Record<number, number> = {};
for (let forIndex = 0; forIndex < 1020; forIndex++) {
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
    console.log('total', total, 'index', forIndex);
    if (forIndex > 950 && forIndex < 1020){
        searchingSuite.push([total, forIndex]);
    }
    // totalCount[total] = totalCount[total] ? totalCount[total] + 1 : 1;
    // console.log('Total', total, forIndex);
}

let finalSuite: Array<[number, number]> = [];
//Searching for a suite of numbers, starting to searching for a suite of 30
for (let nbSuite = 30; nbSuite > 2; nbSuite--) {
    if (nbRepetitions === 0){
        finalSuite = [];
        //Je parcours le tableau pour chaque index jusqu'au nombre de répétitions que je teste
        for (let nb = 0; nb < nbSuite; nb++) {
            if (searchingSuite[nb][0] === searchingSuite[nb + nbSuite][0]){
                // SI mon actuel est égal à celui 30 reps plus loin, je le stock dans mon tableau
                finalSuite.push([searchingSuite[nb][0], searchingSuite[nb][1]]);
            }
            if (searchingSuite[nb][0] !== searchingSuite[nb + nbSuite][0]){
                //s'il y a une différence je sors 
                break;
            }
            if (finalSuite.length === nbSuite){
                // Si mon tableau fait la taille du nombre de rep que je teste alors je save j'ai trouvé mon nb de rep
                nbRepetitions = nbSuite;
                break;
            }
        }
    }
    // If number of repetition found je sors
    if (nbRepetitions > 0){
        break;
    }
}
finalSuite.forEach((element, index) => {
    //Le fameux combo modulo / nb de répétition, qui part de l'équation 1 000 000 000 − nb repetitions x X = un index de ma final suite.
    if ((1000000000 - element[1]) % nbRepetitions === 0){
        //comme c'est un tableau je decale de -1
        console.log("Result: ", finalSuite[index-1][0], "index", finalSuite[index-1][1], "nb of repetitions", nbRepetitions);
    }
});