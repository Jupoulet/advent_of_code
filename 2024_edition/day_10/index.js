// TODO
// 1. On stock tous les zero dans un tableau avec leurs coordonnées
// 2. On passe dans ce tableau on regarde si ils vont jusqu'à 9 on fait la somme et voila

import input from './input.txt';

const parsed = input.split('\n').map((l) => l.split('').map(Number))

const getAllStartingPoints = () => {
    const startingPoints = [];

    for (let y = 0; y < parsed.length; y++) {
        const line = parsed[y];
        for (let x = 0; x < line.length; x++) {
            if (line[x] === 0) startingPoints.push([y, x]); 
        }
    }
    return startingPoints;
}

console.log(getAllStartingPoints())

const findNextMoves = (position, nextMove) => {
    const [y, x] = position;
    const nextPositions = [];
    const topMove = parsed[y-1] && parsed[y-1][x]
    const bottomMove = parsed[y+1] && parsed[y+1][x]
    const leftMove = parsed[y][x-1]
    const rightMove = parsed[y][x+1]

    if (topMove === nextMove) nextPositions.push([y-1, x])
    if (bottomMove === nextMove) nextPositions.push([y+1, x])
    if (leftMove === nextMove) nextPositions.push([y, x-1])
    if (rightMove === nextMove) nextPositions.push([y, x+1])
    return nextPositions; 
}

let counter = 0;

const findPaths = (position, startingPoint) => {
    const [y, x] = position;
    const value = parsed[y][x];
    const nextMove = value + 1;
    console.log('VALUE', value, position);
    const nextMoves = findNextMoves(position, nextMove);
    console.log('NEXT move ??', nextMoves);
    nextMoves.forEach((move) => {
        const [moveY, moveX] = move;
        if (parsed[moveY][moveX] === 9) {
            counter++;
            console.log('COUNTER', counter)
        } else {
            findPaths(move);
        }
    })
    console.log('Next moves', nextMoves);
}

getAllStartingPoints().forEach((startingPoint) => {
    findPaths(startingPoint);
});
console.log('Counter', counter)
// We must store each 9's position reached in a list with their matching starting point
// We must check this list to see if this 9 has allready been visited