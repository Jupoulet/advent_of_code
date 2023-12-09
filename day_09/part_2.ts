import puzzle_input from './puzzle_input.txt';

const listOfHistory = puzzle_input.split('\n').map((line) => line.split(' ').map((n) => Number(n)));

const getSequences = (historys: number[][], currentIndex: number): number[][] => {
    const  historyToMap = historys[currentIndex];
    if (historyToMap.every((n) => n === 0)) return historys;

    const newSequenceEntry = [];
    for (let index = 0; index < historyToMap.length - 1; index++) {
        const distance = historyToMap[index + 1] - historyToMap[index]; 
        newSequenceEntry.push(distance);
    }
    return getSequences([...historys, newSequenceEntry], currentIndex + 1);
}

const extrapolate = (sequences: number[][]): number[][] => {
    const newSequences = JSON.parse(JSON.stringify(sequences));
    newSequences[newSequences.length - 1].unshift(0);

    for (let index = newSequences.length -2; index >= 0; index--) {
        const firstElementOfPreviousSequence = newSequences[index + 1][0]
        const firstElementOfCurrentSequence = newSequences[index][0];

        newSequences[index].unshift(firstElementOfCurrentSequence - firstElementOfPreviousSequence);
    }

    return newSequences;
}

const getPreviousValueOfHistory = (sequences: number[][]): number => {
    return sequences[0][0];
}

const result = listOfHistory.reduce((sum, history) => {
    const sequences = getSequences([history], 0);
    const sequencesExtrapolated = extrapolate(sequences);
    const nextValueInHistory = getPreviousValueOfHistory(sequencesExtrapolated);

    return sum + nextValueInHistory;
}, 0);

console.log('Result', result);