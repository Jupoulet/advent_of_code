import input from './input.txt';

const regexp = new RegExp(/mul\(\d+(?:\.\d+)?,\d+(?:\.\d+)?\)/g);

const occurences = input.match(regexp);

console.log(occurences)
const parsedOccurences = occurences.map((occurence) => {
    const removeLetters = occurence.replaceAll(/mul\(|\)/g, '');
    return removeLetters.split(',').map(Number);
});

const result = parsedOccurences.reduce((total, current) => {
    const [first, second] = current;
    return total += first*second;
}, 0);

console.log('Result', result)


