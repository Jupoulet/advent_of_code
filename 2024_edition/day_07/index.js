import input from './input.txt';

const parsed = input.split('\n').map((line) => {
    const split = line.split(' ');
    return split.map((x) => Number(x.replace(':', '')));
});

parsed.forEach(element => {
    console.log(element);
});

const operators = ['*', '/', '+', '-'];

const getFirstCombination = (numberOfOperators) => {
    const combination = [];
    for (let index = 0; index < numberOfOperators; index++) {
        combination.push(operators[0])
    };
    return combination;
}


const listOfCombinations = []
const getCombinations = (firstCombination, indexToEdit) => {
    operators.forEach((op) => {
        const newCombi = [...firstCombination];
        newCombi[indexToEdit] = op;
        if (!listOfCombinations.some((c) => JSON.stringify(c) === JSON.stringify(newCombi))) {
            listOfCombinations.push(newCombi);
            for (let index = indexToEdit; index > 0; index--) {
                getCombinations(newCombi, index - 1);
            }
        }
    });
    return listOfCombinations;
}

let sum = 0;
parsed.forEach((elementToInspect) => {
    console.log('Element to inspect', elementToInspect);
    const firstCombination = getFirstCombination(elementToInspect.length - 2);
    const allCombinations = getCombinations(firstCombination, firstCombination.length - 1);
    console.log('allCombinations', allCombinations)
    for (let index = 0; index < allCombinations.length; index++) {
        const combination = allCombinations[index];
        const [desired, ...values] = elementToInspect;
        console.log('Desired', values);
        const result = values.reduce((total, current, index) => {
            if (index === 0) return current;
            const operator = combination[index - 1];
            switch (operator) {
                case '-':
                    return total - current;
                case '+':
                    return total + current;
                case '*':
                    return total * current;
                case '/':
                    return total / current;
                default:
                    break;
            }
    
        }, 0);
        if (result === desired) {
            console.log('Result', result);
            sum += result;
            break;
        };
        
    }
})

console.log('SUM', sum);






