import puzzle_input from './puzzle_input.txt';

const NUMBERS = '0123456789';

const doubleDimensionalArray = puzzle_input.split('\n').map((row) => row.split(''));

type DigitObject = {
    consecutivesDigits: string;
    hasSymbolAdjacent: boolean;
}

const isSymbolAdjacent = (row: number, column: number): boolean => {
    const NO_SYMBOL_REGEX = /[0-9.]/;

    // Check upper cases
    if (row > 0) {
        if (!NO_SYMBOL_REGEX.test(doubleDimensionalArray[row - 1][column])) return true;
        if (column > 0) {
            if (!NO_SYMBOL_REGEX.test(doubleDimensionalArray[row - 1][column - 1])) return true;
        }
        if (column < (doubleDimensionalArray[row].length - 1)) {
            if (!NO_SYMBOL_REGEX.test(doubleDimensionalArray[row - 1][column + 1])) return true;
        }
    }

    // Check left and right cases
    if (column < (doubleDimensionalArray[row].length - 1)) {
        if (!NO_SYMBOL_REGEX.test(doubleDimensionalArray[row][column + 1])) return true;
    }

    if (column > 0) {
        if (!NO_SYMBOL_REGEX.test(doubleDimensionalArray[row][column - 1])) return true;
    }

    // Check bottom cases
    if (row < (doubleDimensionalArray.length - 1)) {
        if (!NO_SYMBOL_REGEX.test(doubleDimensionalArray[row + 1][column])) return true;
        if (column > 0) {
            if (!NO_SYMBOL_REGEX.test(doubleDimensionalArray[row + 1][column - 1])) return true;
        }
        if (column < (doubleDimensionalArray[row].length - 1)) {
            if (!NO_SYMBOL_REGEX.test(doubleDimensionalArray[row + 1][column + 1])) return true;
        }
    }

    return false;
}

const result = () => {
    const numbersInRow: DigitObject[] = [];
    const currentDigit: DigitObject = {
        consecutivesDigits: '',
        hasSymbolAdjacent: false
    };
    

    for (let row = 0; row < doubleDimensionalArray.length; row++) {
        if (currentDigit.consecutivesDigits.length) numbersInRow.push({ ...currentDigit });
        currentDigit.consecutivesDigits = '';
        currentDigit.hasSymbolAdjacent = false;

        for (let column = 0; column < doubleDimensionalArray[row].length; column++) {
            const char = doubleDimensionalArray[row][column];

            if (!NUMBERS.includes(char) && currentDigit.consecutivesDigits.length) {
                numbersInRow.push({ ...currentDigit });
                currentDigit.consecutivesDigits = '';
                currentDigit.hasSymbolAdjacent = false;
            }
    
            if (NUMBERS.includes(char)) {
                currentDigit.consecutivesDigits += char;
                if (!currentDigit.hasSymbolAdjacent) {
                    currentDigit.hasSymbolAdjacent = isSymbolAdjacent(row, column)
                }
            }
            
        }
    }
    console.log('List', numbersInRow);
    console.log('Numbers in row', numbersInRow.reduce((sum, current) => {
        if (!current.hasSymbolAdjacent) return sum;
        return sum + Number(current.consecutivesDigits);
    }, 0));
}

result();
