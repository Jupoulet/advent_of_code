import puzzle from './puzzle_input.txt';

let listOfLines = puzzle.split('\n').map((l) => l.split('~').map((n) => n.split(',').map((x) => Number(x))));
// [0,0,1], [3,0,1]
// On converti chaque ligne en points qu'il occupe dans l'espace
// [0,0,1], [1,0,1], [2,0,1], [3,0,1]
// On passe sur chaque ligne pour voir laquelle a Z qui est le plus petit,
// on descend le le Z à 1 et tous les Z de la ligne du nombre de Z descendus 

// [0,0,1], [3,0,1]
const buildLineFromStartingPoints = (points) => {
    const lineToReturn = [];
    const [start, end] = points;
    const delta0 = end[0] - start[0]
    if (delta0) {
        lineToReturn.push(start);
        for (let index = 1; index < delta0; index++) {
            lineToReturn.push([start[0] + index, start[1], start[2]])
        }
        lineToReturn.push(end);
        return lineToReturn;
    }

    const delta1 = end[1] - start[1]
    if (delta1) {
        lineToReturn.push(start);
        for (let index = 1; index < delta1; index++) {
            lineToReturn.push([start[0], start[1] + index, start[2]])
        }
        lineToReturn.push(end);
        return lineToReturn;
    }

    const delta2 = end[2] - start[2]
    if (delta2) {
        lineToReturn.push(start);
        for (let index = 1; index < delta2; index++) {
            lineToReturn.push([start[0], start[1], start[2] + index])
        }
        lineToReturn.push(end);
        return lineToReturn;
    }

    return points;
}

listOfLines = listOfLines.map((l) => buildLineFromStartingPoints(l));

listOfLines = listOfLines.sort((a, z) => {
    const zA = a[0][2];
    const zZ = z[0][2];
    if (zA < zZ) return 1;
    if (zA > zZ) return - 1;
    return 0;
});

const areLinesNotEqualFinally = (line1, line2) => {
    // on regarde si elles sont toutes différentes point par point sur Y OU sur X
    const lowestLine = line1 < line2 ? line1 : line2;
    const higherLine = line1 > line2 ? line1 : line2;

    const hasSamePoint = lowestLine.split('').some((p, index) => p === higherLine.split('')[index]);
    return !hasSamePoint;
}

const moulinette = () => {
    for (let index = listOfLines.length - 1; index >= 0; index--) {
        const currentLine = listOfLines[index];
        let upperLine = listOfLines[index - 1];
    
        if (upperLine === undefined) break;
        if (currentLine[0][2] === upperLine[0][2]) continue;
        const allXCurrent = currentLine.map((l) => l[0]).join(''); // '12'
        const allXUpper = upperLine.map((l) => l[0]).join(''); // '123'
        const canGoDownOnX = areLinesNotEqualFinally(allXCurrent, allXUpper);
    
    
        const allYCurrent = currentLine.map((l) => l[1]).join(''); // '123'
        const allYUpper = upperLine.map((l) => l[1]).join(''); // '123'
        const canGoDownOnY = areLinesNotEqualFinally(allYCurrent, allYUpper);

        const delta = upperLine[0][2] - currentLine[0][2];
        if (canGoDownOnX || canGoDownOnY) {
            listOfLines[index - 1] = listOfLines[index - 1].map((p, i) => {
                console.log(listOfLines[index - 1]);
                console.log('i', i)
                console.log('UPPER', upperLine);
                console.log('CURRENT LINE', currentLine);
                // on set une variable Z du premier de la current line - Z ligne d'au dessus
                // on fait chaque Z de la current - la variable
                const Z = upperLine[i][2] - delta;
                return [listOfLines[index - 1][i][0], listOfLines[index - 1][i][1], Z ];
            });
        } else {
            listOfLines[index - 1] = listOfLines[index - 1].map((p, i) => {
                const Z = upperLine[i][2] - delta + 1;
                return [listOfLines[index - 1][i][0], listOfLines[index - 1][i][1], Z ];
            });
        }
    }
}

moulinette();

let counter = 0;
const initialState = JSON.parse(JSON.stringify(listOfLines));
listOfLines.forEach((line, index) => {
    let allZBefore = '';
    for (let i = index + 1; i < listOfLines.length; i++) {
        const line = listOfLines[i];
        allZBefore += line.map((x) => x[2]).join(',').replaceAll(',', '');
    }
    console.log('allZBefore', allZBefore);
    listOfLines.splice(index, 1);
    moulinette();
    let allZAfter = '';
    for (let i = index + 1; i < listOfLines.length; i++) {
        const line = listOfLines[i];
        allZAfter += line.map((x) => x[2]).join(',').replaceAll(',', '');
    }
    console.log('allZAftere', allZAfter);
    // on les compare
    if (allZAfter !== allZBefore) {
        counter ++;
    }
    // on incrémente compteur si différent -> RESULTAT
    // on remet initial dans list of lines
    listOfLines = JSON.parse(JSON.stringify(initialState));
});

console.log('...');
listOfLines.forEach((l) => console.log(l));
console.log('counter', counter - 1);


