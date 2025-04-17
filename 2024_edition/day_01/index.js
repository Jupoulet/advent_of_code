import input from './input.txt';

const list1 = [];
const list2 = [];
input.split('\n').forEach(element => {
    const [first, second] = element.split('   ');
    list1.push(Number(first));
    list2.push(Number(second))
});

// Part 2
const result = list1.reduce((total, current) => {
    const occurencesInOtherList = list2.filter((n) => n === current).length;
    return total += (current * occurencesInOtherList);
}, 0);

console.log('Result', result);

// Part 1
// list1.sort();
// list2.sort();

// const ranges = [];

// list1.forEach((number, index) => {
//     const numberList2 = list2[index];
//     ranges.push(Math.abs(number - numberList2));
// });

// console.log(ranges)
// const result = ranges.reduce(
//     (accumulator, currentValue) => accumulator + currentValue,
//     0,
// );
// console.log(list1);
// console.log(list2)
// console.log(result)