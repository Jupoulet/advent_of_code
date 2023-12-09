import puzzle from './puzzle_input.txt';

let currentSeeds = puzzle.split('\n')[0].split(': ')[1].split(' ').map((s) => Number(s));
let nextSeeds = [...currentSeeds];

const listOfMaps = puzzle
    .split('\n\n')
    .map((s) => s.split('\n'));

listOfMaps.shift();

const maps = listOfMaps.map((s) => {
    s.shift();
    // ["50 98 2", "52 50 48"]
    return s.map((j) => {
        return j.split(' ').map(Number);
    });
});

// maps.forEach((map) => {
//     const seedsIndexesValidated: number[] = [];
//     currentSeeds = [...nextSeeds];
//     map.forEach((row) => {
//         const [destination, source, length] = row;
//         const matchs = currentSeeds.filter((seed, i) => seed >= source && seed <= source + length && !seedsIndexesValidated.includes(i));
//         const matchsWithIndexes = matchs.map((match) => ({
//             value: match,
//             index: nextSeeds.indexOf(match),
//         }));
//         matchsWithIndexes.forEach((m) => {
//             nextSeeds[m.index] = m.value + (destination - source);
//             seedsIndexesValidated.push(m.index);
//         });
//     });
// });

currentSeeds.forEach((seed, seedIndex) => {
    let currentSeed = seed;
    maps.forEach((map) => {
        const seedsIndexesValidated: number[] = [];
        map.forEach((row) => {
            const [destination, source, length] = row;
            const match = currentSeed >= source && currentSeed <= source + length && !seedsIndexesValidated.includes(seedIndex);
            if (!match) return;
            currentSeed = (currentSeed - source) + destination;
            seedsIndexesValidated.push(seedIndex);
        });
        nextSeeds[seedIndex] = currentSeed;
    })
});

console.log('Résult', nextSeeds.sort((a,b) => a - b)[0]);


