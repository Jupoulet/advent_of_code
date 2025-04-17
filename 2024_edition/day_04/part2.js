import input from './input.txt';

const parsed = input.split('\n').map((line) => line.split(''));

const toCheck = [['X', 'M', 'A', 'S'],['S', 'A', 'M', 'X']]
let occurencesCount = 0;

const findMas = (indexLine, indexLetter) => {
    if (
        !parsed[indexLine + 1] ||
        !parsed[indexLine + 2] || 
        !parsed[indexLine + 3]
    ) return;
    const first = parsed[indexLine][indexLetter]; // M
    const second = parsed[indexLine][indexLetter + 2];
    const third = parsed[indexLine + 1][indexLetter + 1]
    const fourth = parsed[indexLine + 2][indexLetter]
    const fifth = parsed[indexLine + 2][indexLetter+2]

    const possibleString = `${first}${second}${third}${fourth}${fifth}`;

    if (possibleString === 'MSAMS') occurencesCount++;
    if (possibleString === 'SSAMM') occurencesCount++;
    if (possibleString === 'MMASS') occurencesCount++;
    if (possibleString === 'SMASM') occurencesCount++;

}

const findHorizontalOccurences = (indexLine, indexLetter) => {
    toCheck.forEach((checkedLine) => {
        console.log('----');
        let isOccurrence = true;
        checkedLine.forEach((checkedLetter, index) => {
            console.log('isOccurence', isOccurrence);
            console.log('check letter', checkedLetter);
            console.log('letter input', parsed[indexLine][indexLetter + index]);
            if (checkedLetter !== parsed[indexLine][indexLetter + index]) {
                isOccurrence = false;
            }
        })
        if (isOccurrence === true) occurencesCount++;
    });
}

const findVerticalOccurences = (indexLine, indexLetter) => {
    if (
        !parsed[indexLine + 1] ||
        !parsed[indexLine + 2] || 
        !parsed[indexLine + 3]
    ) return;

    const first = parsed[indexLine][indexLetter];
    const second = parsed[indexLine + 1][indexLetter];
    const third = parsed[indexLine + 2][indexLetter];
    const fourth = parsed[indexLine + 3][indexLetter];

    const possibleString = `${first}${second}${third}${fourth}`;

    if (possibleString === 'XMAS') occurencesCount++;
    if (possibleString === 'SAMX') occurencesCount++;
}

const findDiagonalLeft = (indexLine, indexLetter) => {
    if (
        !parsed[indexLine + 1] ||
        !parsed[indexLine + 2] || 
        !parsed[indexLine + 3]
    ) return;

    const first = parsed[indexLine][indexLetter];
    const second = parsed[indexLine + 1][indexLetter-1];
    const third = parsed[indexLine + 2][indexLetter-2];
    const fourth = parsed[indexLine + 3][indexLetter-3];

    const possibleString = `${first}${second}${third}${fourth}`;

    if (possibleString === 'XMAS') occurencesCount++;
    if (possibleString === 'SAMX') occurencesCount++;
}


const findDiagonalRight = (indexLine, indexLetter) => {
    if (
        !parsed[indexLine + 1] ||
        !parsed[indexLine + 2] || 
        !parsed[indexLine + 3]
    ) return;

    const first = parsed[indexLine][indexLetter];
    const second = parsed[indexLine + 1][indexLetter+1];
    const third = parsed[indexLine + 2][indexLetter+2];
    const fourth = parsed[indexLine + 3][indexLetter+3];

    const possibleString = `${first}${second}${third}${fourth}`;

    if (possibleString === 'XMAS') occurencesCount++;
    if (possibleString === 'SAMX') occurencesCount++;

}

const parcoursTableau = () => {
    parsed.forEach((line, indexLine) => {
        line.forEach((letter, indexLetter) => {
            findMas(indexLine, indexLetter)
        })
    })
}

parcoursTableau();
console.log(occurencesCount)
