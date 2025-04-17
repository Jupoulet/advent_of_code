import input from './input.txt';

const parsed = input.split(' ');

// tableau avec nouvelles pierres
const treatStone = (stone) => {
    if (stone === '0') return ['1'];
    if (stone.length % 2 === 0) {
        const middleIndex = Math.floor(stone.length / 2);
        // 21 03

        // Slice into two halves
        const firstHalf = `${Number(stone.slice(0, middleIndex))}`;
        const secondHalf = `${Number(stone.slice(middleIndex))}`;
        return [firstHalf, secondHalf];
    }
    return [`${stone * 2024}`];
}

const main = (array, counter) => {
    console.log('COUNTER', counter)
    if (counter === 75) return array.length;
    const newArray = [];
    array.forEach((stone) => {
        const newStones = treatStone(stone);
        newStones.forEach(s => newArray.push(s));
    });
    return main(newArray, counter + 1);
}

console.log(main(parsed, 0));