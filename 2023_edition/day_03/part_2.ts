import puzzle_input from './puzzle_input.txt';

const NUMBERS = '0123456789';

const doubleDimensionalArray = puzzle_input.split('\n').map((row) => row.split(''));

type DigitObject = {
    consecutivesDigits: string;
    gearId?: string;
}

const getGearIndex = (row: number, column: number): string | undefined => {
    // Check upper cases
    if (row > 0) {
        if (doubleDimensionalArray[row - 1][column] === '*') return `${row-1}${column}`;
        if (column > 0) {
            if (doubleDimensionalArray[row - 1][column - 1] === '*') return `${row-1}${column-1}`;
        }
        if (column < (doubleDimensionalArray[row].length - 1)) {
            if (doubleDimensionalArray[row - 1][column + 1] === '*') return `${row-1}${column+1}`;
        }
    }

    // Check left and right cases
    if (column < (doubleDimensionalArray[row].length - 1)) {
        if (doubleDimensionalArray[row][column + 1] === '*') return `${row}${column+1}`;
    }

    if (column > 0) {
        if (doubleDimensionalArray[row][column - 1] === '*') return `${row}${column-1}`;
    }

    // Check bottom cases
    if (row < (doubleDimensionalArray.length - 1)) {
        if (doubleDimensionalArray[row + 1][column] === '*') return `${row+1}${column}`;
        if (column > 0) {
            if (doubleDimensionalArray[row + 1][column - 1] === '*') return `${row+1}${column-1}`;
        }
        if (column < (doubleDimensionalArray[row].length - 1)) {
            if (doubleDimensionalArray[row + 1][column + 1] === '*') return `${row+1}${column+1}`;
        }
    }

    return undefined;
}

const result = () => {
    const numbersInRow: DigitObject[] = [];
    const currentDigit: DigitObject = {
        consecutivesDigits: '',
        gearId: undefined,
    };
    

    for (let row = 0; row < doubleDimensionalArray.length; row++) {
        if (currentDigit.consecutivesDigits.length) numbersInRow.push({ ...currentDigit });
        currentDigit.consecutivesDigits = '';
        currentDigit.gearId = undefined;

        for (let column = 0; column < doubleDimensionalArray[row].length; column++) {
            const char = doubleDimensionalArray[row][column];

            if (!NUMBERS.includes(char) && currentDigit.consecutivesDigits.length) {
                numbersInRow.push({ ...currentDigit });
                currentDigit.consecutivesDigits = '';
                currentDigit.gearId = undefined;
            }
    
            if (NUMBERS.includes(char)) {
                currentDigit.consecutivesDigits += char;
                if (!currentDigit.gearId) {
                    currentDigit.gearId = getGearIndex(row, column)
                }
            }
            
        }
    }
    console.log('List', numbersInRow);
    console.log('Numbers with gearId', numbersInRow.filter((n) => !!n.gearId))
    const numbersWithGearId = numbersInRow.filter((n) => !!n.gearId);
    const gearIdCount: string[] = [];
    const gearRatios: number[] = [];

    numbersWithGearId.forEach((number) => {
        const gearId: string = number.gearId as string;
        if (gearIdCount.includes(gearId)) return;

        const numbersWithSameGearIds = numbersWithGearId.filter((n) => n.gearId === gearId);
        if (numbersWithSameGearIds.length !== 2) return;
        
        const [first, second] = numbersWithSameGearIds;
        gearRatios.push(Number(first.consecutivesDigits) * Number(second.consecutivesDigits));
        gearIdCount.push(gearId);
    })

    console.log('gearRatios', gearRatios.reduce((sum, current) => sum + current, 0));

}

result();
