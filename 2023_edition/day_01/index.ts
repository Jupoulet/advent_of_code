import puzzle_input from './puzzle_input.txt';
const isDigit = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
]

const mapDigit = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
}

'twonine'

const formattedPuzzleInput = puzzle_input.split('\n');

const transformNamedDigitIntoLetterDigit = (digit: any) => {
    if (isDigit.includes(digit)) return digit;
    // @ts-ignore
    return mapDigit[digit];
}

const osef = (input: string[]) => {

    const stringsWithoutLetter: any = input.map((string) => {
        return [...string.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)].map(match => match[1]);
    });

    return stringsWithoutLetter.reduce((total, current) => {
        const firstDigit = transformNamedDigitIntoLetterDigit(current[0]);
        const lastDigit = transformNamedDigitIntoLetterDigit(current[current.length - 1]);
        
        const stringNumber = firstDigit + lastDigit;

        return total + Number(stringNumber)
    }, 0);
}

const result = osef(formattedPuzzleInput);
console.log('Result', result);
