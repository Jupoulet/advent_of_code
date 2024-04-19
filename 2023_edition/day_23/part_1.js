import puzzle from './puzzle_input.txt';

const hikingMap = puzzle.split('\n').map((r) => r.split(''));

const STARTING_POINT = [0, 1];
const END_POINT = [hikingMap.length - 1, 21];
let previousPosValue = 0;
let counterBis = 0;
let listOfCounters = [];
let counterIndex = 0;
const listOfListOfCounters = [];

const nodes = []

const getPossibleNextMoves = (position, map, pathId, nextMoveLength) => {

    // if (nextMoveLength > 1) {
    //     counterBis = previousPosValue;
    // }

    const [x, y] = position;

    let north = {};
    let south = {};
    let east = {};
    let west = {};

    if (map[x - 1]) {
        north.value = map[x - 1][y];
        north.position = [x-1, y];
    }
    if (map[x + 1]) {
        south.value = map[x+1][y];
        south.position = [x+1, y];
    }
    east.value = map[x][y + 1];
    east.position = [x, y + 1]
    west.value = map[x][y - 1];
    west.position = [x, y - 1];
    
    return [north, south, east, west].map((direction, index) => {
        if (direction.value === '.') {
            // map[x][y] = `${pathId}`; 
            map[x][y] = previousPosValue + 1
            // previousPosValue + 1;
            previousPosValue ++;
            
            return direction.position;
        }
        if (direction.value === '>' && index !== 3) {
            // map[x][y + 1] = `${pathId}`;
            // map[x][y] = `${pathId}`; 
            map[x][y + 1] = previousPosValue + 1;
            map[x][y] = previousPosValue;
            // previousPosValue + 1;
            previousPosValue ++;

            return [x, y + 1]
        }
        if (direction.value === '<' && index !== 2) {
            // map[x][y - 1] = `${pathId}`;
            // map[x][y] = `${pathId}`; 
            map[x][y - 1] = previousPosValue + 1;
            map[x][y] = previousPosValue; 
            // previousPosValue + 1;
            // previousPosValue ++;
            return [x, y - 1]
        }
        if (direction.value === 'v' && index !== 0) {
            // map[x + 1][y] = `${pathId}`;
            // map[x][y] = `${pathId}`;
            map[x + 1][y] = previousPosValue + 1;
            map[x][y] = previousPosValue; 
            // previousPosValue + 1;
            // previousPosValue ++;
            return [x + 1, y]
        }
    }).filter(Boolean);
}

const move = (startingPoint, pathId) => {
    // log pour Anne-Emilie
    // hikingMap.forEach((l) => console.log(l));
    // console.log('STARTING POINT', startingPoint);
    // ----
    const nextMoves = getPossibleNextMoves(startingPoint, hikingMap, pathId);
    if (startingPoint[0] === END_POINT[0] && startingPoint[1] === END_POINT[1]) {
        console.log('COUCOU');
        console.log(startingPoint);
        console.log(END_POINT);
        console.log('listOfCounters', listOfCounters);
        previousPosValue = listOfCounters[0];
        if (listOfCounters.length !== 0){
            listOfListOfCounters.push(listOfCounters);
        }
        // listOfCounters = [];
        counterBis = 0;
        counterIndex = 0;
        previousPosValue = 0
        return;
    };
    if (nextMoves.length === 0) {
        if (listOfCounters.length !== 0){
            listOfListOfCounters.push(listOfCounters);
        }
        listOfCounters = [];
        counterBis = 0;
        previousPosValue = 0;
        counterIndex = 0;
    };
    console.log('Coucou', previousPosValue, nextMoves.length);
    
    nextMoves.forEach((nextMove, index) => {
        if (nextMoves.length > 1) {
            counterBis = previousPosValue;
            if (listOfCounters[listOfCounters.length - 1] !== counterBis) {
                if (counterBis !== 0){
                    console.log('ici', counterBis);
                    console.log('nextMoves.length', nextMoves)
                    listOfCounters.push(counterBis);
                }
            }
            console.log("listOfCounters", listOfCounters);
        }
        move(nextMove, pathId + index, nextMoves.length); //on doit return le compteur dès que nextMoves.lenght s'incrémente 
        previousPosValue = counterBis;
        if (counterBis === 0) {
            console.log('listOfListOfCounters', listOfListOfCounters[listOfListOfCounters.length-1]);
            previousPosValue = listOfListOfCounters[listOfListOfCounters.length-1][counterIndex]; // là faut mettre l'index 
            console.log('??', previousPosValue)
            counterBis = previousPosValue;
            counterIndex++;
        }
        //dès qu'on relance on reset le compteur à la valeur du précédent noeud 
    });

}

move(STARTING_POINT, 0);

hikingMap.forEach((l) => console.log(l));
console.log(listOfListOfCounters);

// Il faut fix le premier chiffre de la bifurcation
// Il faut gérer une liste de counter :)
// Dupliquer les counters à chaque noeud
// Incrémenter les counters à chaque noeud

// Il faut faire un nouveau tableau à chaque fois qu'on arrive au bout d'un path
// Path -> next_move -> undefined
// Path -> next_move -> END_POINT