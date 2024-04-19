import puzzle from './puzzle_input.txt';

const twoDimArray = puzzle.split('\n').map((row) => row.split(''));

twoDimArray.forEach((row) => console.log(row));

type Direction = '>' | '<' | '^' | 'v'; 

const listOfBeams: Beam[] = [
    {
        id: 1,
        positions: [],
        currentDirection: '>',
        startingPosition: {
            rowIndex: 0,
            columnIndex: 0,
            direction: '>',
        }
    }
];

type PositionObject = {
    rowIndex: number;
    columnIndex: number;
    direction: Direction;
};

 type Beam = {
    id: number;
    positions: PositionObject[];
    currentDirection: Direction;
    startingPosition: PositionObject;
 }

const determineNextDirection = (direction: Direction, position: [number, number], beamId: number): Direction => {
    let nextDirection = direction;
    const [rowIndex, columnIndex] = position;
    const value = twoDimArray[rowIndex][columnIndex];
    switch (direction) {
        case '>':
            switch (value) {
                case '.':
                case '-':
                    break;
                case '|':
                    // create new Beam
                    listOfBeams.push({
                        id: beamId + 1,
                        positions: [],
                        currentDirection: '^',
                        startingPosition: {
                            rowIndex,
                            columnIndex,
                            direction: '^'
                        },
                    });
                    nextDirection = 'v';
                    break;
                case '/':
                    nextDirection = '^';
                    break;
                case 'B':
                    nextDirection = 'v';
                default:
                    break;
            }
            break;
            
        case '<':
            switch (value) {
                case '.':
                case '-':
                    break;
                case '|':
                    // create new Beam
                    listOfBeams.push({
                        id: beamId + 1,
                        positions: [],
                        currentDirection: '^',
                        startingPosition: {
                            rowIndex,
                            columnIndex,
                            direction: '^'
                        },
                    });
                    nextDirection = 'v';
                    break;
                case '/':
                    nextDirection = 'v';
                    break;
                case 'B':
                    nextDirection = '^';
                default:
                    break;
            }
            break;
        case '^':
            switch (value) {
                case '.':
                case '|':
                    break;
                case '-':
                    // create new Beam
                    listOfBeams.push({
                        id: beamId + 1,
                        positions: [],
                        currentDirection: '>',
                        startingPosition: {
                            rowIndex,
                            columnIndex,
                            direction: '>'
                        },
                    });
                    nextDirection = '<';
                    break;
                case '/':
                    nextDirection = '>';
                    break;
                case 'B':
                    nextDirection = '<';
                default:
                    break;
            }
            break;
        case 'v':
            switch (value) {
                case '.':
                case '|':
                    break;
                case '-':
                    // create new Beam
                    listOfBeams.push({
                        id: beamId + 1,
                        positions: [],
                        currentDirection: '>',
                        startingPosition: {
                            rowIndex,
                            columnIndex,
                            direction: '>'
                        },
                    });
                    nextDirection = '<';
                    break;
                case '/':
                    nextDirection = '<';
                    break;
                case 'B':
                    nextDirection = '>';
                default:
                    break;
            }
            break;
        default:
            break;
    };
    const matchingBeam = listOfBeams.find((beam) => beam.id === beamId);
    matchingBeam?.positions.push({
        rowIndex,
        columnIndex,
        direction,
    });
    return nextDirection;
};

const determineNextPosition = (direction: Direction, currentPosition: [number, number]): [number, number] | undefined => {
    const [rowIndex, columnIndex] = currentPosition;

    switch (direction) {
        case '>':
            return columnIndex + 1 < twoDimArray[0].length ? [rowIndex, columnIndex + 1] : undefined;
        case '<':
            return columnIndex - 1 >= 0 ? [rowIndex, columnIndex - 1] : undefined;
        case '^':
            return rowIndex - 1 >= 0 ? [rowIndex - 1, columnIndex] : undefined;
        case 'v':
            return rowIndex + 1 < twoDimArray.length ? [rowIndex + 1, columnIndex] : undefined;
    
        default:
            break;
    }
};

let count = 0;

const moveBeam = (beam: Beam, currentPosition: [number, number]): any => {
    // let lastKnownPositions = beam.positions[beam.positions.length - 1];
    
    const nextDirection = determineNextDirection(
        beam.currentDirection,
        // !beam.positions.length ? [beam.startingPosition.rowIndex, beam.startingPosition.columnIndex] : [lastKnownPositions.rowIndex, lastKnownPositions.columnIndex],
        currentPosition,
        beam.id
    );

    // const lastKnownPositions = beam.positions[beam.positions.length - 1];
    const nextPosition = determineNextPosition(
        nextDirection,
        currentPosition,
    );
    if (!nextPosition) return;
    const [nextRowIndex, nextColumnIndex] = nextPosition;
    if (beam.positions.some((position) => position.rowIndex === nextRowIndex && position.columnIndex === nextColumnIndex && position.direction === nextDirection)) return;
    
    beam.currentDirection = nextDirection;
    
    count += 1;
    
    return moveBeam(beam, nextPosition);
}

console.log('YOLO');

for (let index = 0; index < 1; index++) {
    const beam = listOfBeams[index];
    console.log('BEAM ID', beam.id);
    
    moveBeam(beam, [beam.startingPosition.rowIndex, beam.startingPosition.columnIndex]);
}

// listOfBeams.forEach((beam) => {
//     console.log('Beam ID', beam.id);
//     moveBeam(beam, [beam.startingPosition.rowIndex, beam.startingPosition.columnIndex]);
// });

console.log('END', listOfBeams);




