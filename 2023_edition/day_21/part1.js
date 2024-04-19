import puzzle from './puzzle_input.txt';

const garden = puzzle.split('\n').map((r) => r.split(''));

const findStartingPoint = (garden) => {
    for (let y = 0; y < garden.length; y++) {
        for (let x = 0; x < garden.length; x++) {
            const element = garden[y][x];
            if (element === 'S') return [y, x];  
        }
    }
}

let listOfStartingPoints = [
    [findStartingPoint(garden)] // [5, 5]
    // []
]

const predictMove = (garden, listOfPositions) => {
    console.log('COUNTING...', listOfPositions.length)
    if (listOfStartingPoints.length === 65) {
        // console.log('Coucou', listOfStartingPoints[listOfStartingPoints.length - 1].length);
        return listOfStartingPoints[listOfStartingPoints.length - 1].length
    }

    const allDirections = [];
    listOfPositions.forEach((currentPosition) => {
        let north,south,west,east;
        // console.log('current pos', currentPosition);
        if (currentPosition[0] - 1 >= 0) {
            // console.log('value', currentPosition[0] - 1);
            north = garden[currentPosition[0] - 1][currentPosition[1]];
            // console.log('north', north);
            if (north !== '#') allDirections.push([currentPosition[0] - 1, currentPosition[1]]);
        }
        // console.log('garden[currentPosition[0] + 1]', currentPosition[0] + 1)
        if (currentPosition[0] + 1 < garden.length) {
            // console.log('onentredanslesud')
            south = garden[currentPosition[0] + 1][currentPosition[1]];
            if (south !== '#') allDirections.push([currentPosition[0] + 1, currentPosition[1]]);
        }
        if (currentPosition[1] - 1 >= 0) {
            west = garden[currentPosition[0]][currentPosition[1] - 1];
            // console.log('west', west);
            if (west !== '#') allDirections.push([currentPosition[0], currentPosition[1]-1]);
    
        }
        if (currentPosition[1] + 1 < garden[0].length) {
            east = garden[currentPosition[0]][currentPosition[1] + 1];
            // console.log('east', east);
            if (east !== '#') allDirections.push([currentPosition[0], currentPosition[1]+1]);
    
        }
    });
    const uniqDirections = [];
    allDirections.forEach((direction) => {
        if (uniqDirections.some((d) => JSON.stringify(d) === JSON.stringify(direction))) return;
        uniqDirections.push(direction)
    });
    listOfStartingPoints.push(uniqDirections);
    predictMove(garden, uniqDirections);
}

const result = predictMove(garden, listOfStartingPoints[listOfStartingPoints.length-1]);
console.log(result);
listOfStartingPoints.forEach((l) => console.log(l.length))
