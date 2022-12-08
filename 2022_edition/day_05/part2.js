import { exampleGrid, instructionsExample, grid, instructions } from './data.js';

const executeMovements = (grid, instruction) => {
  const gridCopy = JSON.parse(JSON.stringify(grid));
  const [quantity, from, to] = instruction;

  if (quantity === 0) return grid;

  const elementRemovedFromList = gridCopy[from - 1].splice(-quantity);
  gridCopy[to - 1].push(...elementRemovedFromList);

  return gridCopy;
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

