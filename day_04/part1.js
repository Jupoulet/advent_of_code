import exampleInput from './exampleInput.js';
import input from './input.js';

export const parseInput = (stringInput) => {
  return [
    stringInput[0].split(','),
    stringInput.slice(1).map((board) => {
      return board.split('\n').map((row) => row.split(' ').filter((n) => n !== ''))
    })
  ]
}

const [numbers, boards] = parseInput(input);

export const isAnyOfGivenRowsCompleted = (rows, markedNumbers) => {
  return rows.find((row) => row.every((number) => markedNumbers.includes(number)));
}

export const getColumnsDoubleEntryArray = (array) => {
  return [0, 1, 2, 3, 4].map((index) => [
    array[0][index],
    array[1][index],
    array[2][index],
    array[3][index],
    array[4][index]
  ])
}

const dingoBingo = (currentNumbersIndex = 0, markedNumbers = [], winner) => {
  if (winner) return winner;
  markedNumbers.push(numbers[currentNumbersIndex]);

  for (let i = 0; i < boards.length; ++i) {
    const board = boards[i];

    const completedRow = isAnyOfGivenRowsCompleted(board, markedNumbers);
    if (completedRow) return [completedRow, board, markedNumbers];

    const columns = getColumnsDoubleEntryArray(board);
    const completedColumn = isAnyOfGivenRowsCompleted(columns, markedNumbers);
    if (completedColumn) return [completedColumn, board, markedNumbers];
  }

  return dingoBingo(currentNumbersIndex + 1, markedNumbers);
}

const [completedRowOrColumn, winnerBoard, markedNumbers] = dingoBingo();

const sumOfUnmarkedNumbers = winnerBoard.flat().reduce((sum, currentNumber) => {
  if (markedNumbers.includes(currentNumber)) return sum;
  return sum += +currentNumber;
}, 0)

const finalScore = sumOfUnmarkedNumbers * markedNumbers[markedNumbers.length - 1];

// console.log('Resulton', finalScore);
