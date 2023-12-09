import puzzle from './puzzle_input.txt';

const formattedPuzzle = puzzle
    .split('\n')
    .map((l) => {
        const [left, right] = l.split(':');
        const id = left.replace('Card ', '');
        const [winningNumbers, numbers] = right.trim().split(' | ');
        return {
            id: Number(id),
            numbers: numbers.split(' ').map(Number).filter(Boolean),
            winningNumbers: winningNumbers.split(' ').map(Number).filter(Boolean)
        }
    })

console.log(formattedPuzzle);


const cardsScores: number[] = [];
formattedPuzzle.forEach((card) => {
    let matchingNumbers: number[] = [];

    card.numbers.forEach((number) => {
        if (!card.winningNumbers.includes(number)) return;
        matchingNumbers.push(number);
    })

    const score = matchingNumbers.reduce((sum) => {
        if (sum === 0) return 1;
        return sum * 2;
    }, 0);

    cardsScores.push(score);
});

console.log('Result', cardsScores.reduce((sum, current) => sum + current, 0))