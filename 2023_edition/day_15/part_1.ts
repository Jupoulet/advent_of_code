import puzzle from './puzzle_input.txt';

const customSplit = (string: string) => {
    const operation = string.split('').find((c) => ['-', '='].includes(c));
    const [label, focalLength] = string.split(/-|=/);
    return { label, operation, focalLength };
  }

const listOfSequences = puzzle.split(',')
.map((sequence) => customSplit(sequence));

const getASCIIValueFromChar = (char: string) => char.charCodeAt(0);

const getCurrentValueOfChar = (char: string, currentValue: number) => {
    let newValue = currentValue;
    const ACSIIValue = getASCIIValueFromChar(char);
    newValue += ACSIIValue;
    newValue *= 17;
    newValue = newValue % 256;
    return newValue;
};

const getCurrentValueOfString = (string: string) => {
    let currentValue = 0;

    string.split('').forEach((char) => {
        currentValue = getCurrentValueOfChar(char, currentValue)
    });
    return currentValue;
};

const object: any = {};

listOfSequences.forEach((sequence) => {
    const { label, operation, focalLength } = sequence;
    const labelHashed = getCurrentValueOfString(label);
    let box = object[labelHashed];
    if (!box) box = [];

    if (operation === '=') {
        let sameBoxIndex = undefined;
        for (let index = 0; index < box.length; index++) {
            if (box[index].label === label) {
                sameBoxIndex = index;
                break;
            }
        }

        if (sameBoxIndex !== undefined) {
            box[sameBoxIndex].focalLength = focalLength;
            return;
        }
        box.push(sequence);
    }

    if (operation === '-') {
        let sameBoxIndex = undefined;
        for (let index = 0; index < box.length; index++) {
            if (box[index].label === label) {
                sameBoxIndex = index;
                break;
            }
        }

        if (sameBoxIndex !== undefined) {
            box = box.filter((s: any) => s.label !== label);
        }
    }

    object[labelHashed] = box;

})

let sum = 0;

Object.entries(object).forEach(([boxPosition, sequences]: [any, any]) => {
    sequences.forEach((sequence, index) => {
        const value = (Number(boxPosition) + 1) * (index + 1) * (Number(sequence.focalLength))
        sum += value;
    })
});

console.log('Sum', sum);





