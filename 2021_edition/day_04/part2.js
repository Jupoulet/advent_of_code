import exampleInput from './exampleInput.js';
import input from './input.js';
import { parseInput, isAnyOfGivenRowsCompleted, getColumnsDoubleEntryArray } from './part1.js';

const [numbers, boards] = parseInput(input);


const dingoBingo = (currentNumbersIndex = 0, markedNumbers = [], winners = [], boardsRemaining = boards) => {
  if (!boardsRemaining.length) return winners[winners.length - 1];
  markedNumbers.push(numbers[currentNumbersIndex]);

  const boardIndexesToRemove = [];

  for (let i = 0; i < boardsRemaining.length; ++i) {
    const board = boardsRemaining[i];

    const completedRow = isAnyOfGivenRowsCompleted(board, markedNumbers);
    if (completedRow){ 
      winners.push([completedRow, board, markedNumbers]);
      boardIndexesToRemove.push(i);
      continue;
    }

    const columns = getColumnsDoubleEntryArray(board);
    const completedColumn = isAnyOfGivenRowsCompleted(columns, markedNumbers);
    if (completedColumn) {
      winners.push([completedColumn, board, markedNumbers]);
      boardIndexesToRemove.push(i);
      continue;
    }
  }

  const newRemainingBoards = boardsRemaining.map((board, index) => {
    if (boardIndexesToRemove.includes(index)) return null;
    return board;
  }).filter(Boolean);

  return dingoBingo(currentNumbersIndex + 1, markedNumbers, winners, newRemainingBoards);
}

const [completedRowOrColumn, lastWinnerBoard, markedNumbers] = dingoBingo();

const sumOfUnmarkedNumbers = lastWinnerBoard.flat().reduce((sum, currentNumber) => {
  if (markedNumbers.includes(currentNumber)) return sum;
  return sum += +currentNumber;
}, 0)

const finalScore = sumOfUnmarkedNumbers * markedNumbers[markedNumbers.length - 1];

console.log('Final Score', finalScore);