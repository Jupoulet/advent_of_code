import puzzleInput from './data.js';

const exampleInput = [
  'forward 5',
  'down 5',
  'forward 8',
  'up 3',
  'down 8',
  'forward 2'
];

const calculatePosition = (input) => {
  let horizontalPosition = 0;
  let depthPosition = 0;
  let aim = 0;

  for (const instructions of input) {
    const [type, value] = instructions.split(' ');
    const numberValue = +value;

    switch (type) {
      case 'forward':
        horizontalPosition += numberValue;
        depthPosition += aim * numberValue;
        break;
      case 'up':
        aim -= numberValue;
        break;
      case 'down':
        aim += numberValue;
        break;
    }
  }

  console.log('HorizontalPosition', horizontalPosition);
  console.log('DepthPosition', depthPosition);
  console.log('Aim', aim);

  return depthPosition * horizontalPosition;
}

console.log('Result', calculatePosition(puzzleInput));