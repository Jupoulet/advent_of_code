import { exampleGrid, instructionsExample, grid, instructions } from './data.js';

const executeMovements = (grid, instruction) => {
  const gridCopy = JSON.parse(JSON.stringify(grid));
  const [quantity, from, to] = instruction;
  // console.log(instruction)

  if (quantity === 0) return grid;

  const elementRemovedFromList = gridCopy[from - 1].pop();
  gridCopy[to - 1].push(elementRemovedFromList);

  return executeMovements(gridCopy, [quantity - 1, from, to])
}

const processInstructions = (grid, instructions) => {
  if (!instructions.length) return grid;

  const newGrid = executeMovements(grid, instructions[0])
  const newInstructions = instructions.slice(1);

  return processInstructions(newGrid, newInstructions);
}

const gridAfterInstructions = processInstructions(grid, instructions);

const listOfTopStack = gridAfterInstructions.map((list) => {
  return list.pop();
});

console.log(listOfTopStack.join(''));

