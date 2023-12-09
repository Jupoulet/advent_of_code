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

type Card = {
    id: number;
    numbers: number[];
    winningNumbers: number[];
}
const proceedCard = (card: Card) => {
    const copyIds: Card['id'][] = [];

    card.numbers.forEach((number) => {
        if (!card.winningNumbers.includes(number)) return;
        const lastCopyId = copyIds[copyIds.length - 1];
        copyIds.push(lastCopyId ? lastCopyId + 1 : card.id + 1);
    });

    return copyIds;
}

const proceedCards = (cards: Card[], currentIndex: number): Card[] => {
    const newCardsList: Card[] = JSON.parse(JSON.stringify(cards));
    const getCopyIds = proceedCard(cards[currentIndex]);
    const copysToAdd: Card[] = [];
    getCopyIds.forEach((id) => {
        const matchingCopy = newCardsList.find((card) => card.id === id);
        if (matchingCopy) copysToAdd.push(matchingCopy);
    });
    newCardsList.splice(currentIndex + 2, 0, ...copysToAdd)

    if (newCardsList.length - 1 > currentIndex) {
        return proceedCards(newCardsList, currentIndex + 1);
    };

    return newCardsList;
}

const result = proceedCards(formattedPuzzle, 0);

let totalInstances = 0;
for (let index = 1; index < formattedPuzzle.length + 1; index++) {
    const cardInstances = result.filter((g) => g.id === index).length;
    totalInstances += cardInstances;
}
console.log('Result', totalInstances);
