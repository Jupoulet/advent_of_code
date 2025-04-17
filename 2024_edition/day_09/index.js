import input from './input.txt';

const parsed = input.split('').map(Number);

const treated = [];
let counter = 0;
parsed.forEach((number, index) => {
    if (index%2 === 0) {
        for (let index = 0; index < number; index++) {
            treated.push(counter)
        }
        counter++;
    } else {
        for (let index = 0; index < number; index++) {
            treated.push('.')
        }
    }
});
console.log('treated', treated);


// for (let index = treated.length - 1; index >= 0; index--) {
//     let indexToReplace = treated.findIndex((number) => number === '.');
//     treated[indexToReplace] = treated[index];
//     treated[index] = '.';
// }

const identifyBlockOfFiles = (indexToCheck) => {
    let counter = 1;
    for (let index = indexToCheck; index >= 0; index--) {
        const element = treated[index];
        if (treated[index-1]){
            if (element === treated[index-1]){
                counter++;
            }
            else break;
        }
    }
    return counter;
}

const findAvailablePlace = (length, max) => {
    let counter = 0;
    for (let index = 0; index <= max; index++) {
        const element = treated[index];
        if (element !== '.') {
            counter = 0;
            continue;
        };
        if (treated[index+1]){
            if (counter + 1 === length) return index - counter;
            if (element === treated[index+1]){
                counter++;
                if (counter + 1 === length) return index - counter + 1;
            }
            else {
                counter = 0;
                continue;
            };
        }
    }
}

console.log('treated', treated);


for (let i = treated.length - 1; i >= 0; i--) {
    if (treated[i] === '.') continue;
    // console.log('---')
    // console.log('I', i);
    // console.log('treated[i]', treated[i])
    let toDelete = identifyBlockOfFiles([i]);
    // console.log('to delete', toDelete);
    let toUpdate = findAvailablePlace(toDelete, i);
    if (toUpdate === undefined) {
        i -= toDelete - 1;
    }
    // console.log("toUpdate", toUpdate);
    for (let j = toUpdate; j < (toUpdate+toDelete); j++) {
        treated[j] = treated[i];
    }
    // console.log('treated de i ', treated[i])
    // console.log('i', i);

    for (let k = i - toDelete + 1; k <= i; k++) {
        // console.log('index de i', i);
        // console.log('treated de i - to delete', i - toDelete);
        if (toUpdate === undefined) break;
        treated[k] = '.';
    }

    // console.log('TREATED', treated);
    // Remplacer les toDelete avec des '.'
}
// console.log('LENGTH', treated.length);
// console.log('treated after', treated);

// console.log('toto', identifyBlockOfFiles(treated.length - 8));

// console.log('treated', treated);
let result=0;
for (let index = 0; index < treated.length; index++) {
    const element = treated[index]
    // console.log('Element', element)
    if (element && element !== '.')  {
        result += element*(index)
    }
}
console.log(result);