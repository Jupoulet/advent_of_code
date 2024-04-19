import recordDataDay18 from './puzzle_input.txt';
const lines = recordDataDay18.split('\n').map((line) => line.split(' '));

const pivoteArray = (array: string[][]) => {
    const pivotedArray: string[][] = [];

    array[0].forEach((col, colIndex) => {
        const column = [];

        for (let rowIndex = 0; rowIndex < array.length; rowIndex++) {
            column.push(array[rowIndex][colIndex])
        }
        pivotedArray.push(column);
    });
    return pivotedArray;
};

// On veut une fonction 
// On passe les instructions une à une 
// Si je sors je décale de 1 à l'inverse de l'instruction jusqu'à pouvoir réaliser l'instruction
// Après toutes les instructions réalisées, je refais tout en arrière et à l'inverse
// J'ai mon point de départ

// .....
// .....
// .....
// .....
// .....

// const getStartingPoint = (array) => {
//     let startingPoint = [0, 0];
//     lines.forEach((instruction) => {
//         const direction = instruction[0];
//         const value = Number(instruction[1]);
        
//         switch (direction) {
//             case 'R':
//                 if (array[startingPoint[0]][startingPoint[1] + value] === undefined) {
//                     while (array[startingPoint[0]][startingPoint[1] + value] === undefined) {
//                         startingPoint = [startingPoint[0],startingPoint[1] - 1];
//                     }
//                     startingPoint = [startingPoint[0],startingPoint[1] + value];
//                 } else {
//                     startingPoint = [startingPoint[0],startingPoint[1] + value];
//                 }
//                 break;
//             case 'L':
//                 if (array[startingPoint[0]][startingPoint[1] - value] === undefined) {
//                     while (array[startingPoint[0]][startingPoint[1] - value] === undefined) {
//                         startingPoint = [startingPoint[0],startingPoint[1] + 1];
//                     }
//                     startingPoint = [startingPoint[0],startingPoint[1] - value];
//                 } else {
//                     startingPoint = [startingPoint[0],startingPoint[1] - value];
//                 }
//                 break;
//             case 'U':
//                 if (array[startingPoint[0] - value][startingPoint[1]] === undefined) {
//                     while (array[startingPoint[0] - value][startingPoint[1]] === undefined) {
//                         startingPoint = [startingPoint[0] + 1 ,startingPoint[1]];
//                     }
//                     startingPoint = [startingPoint[0] - value, startingPoint[1]];
//                 } else {
//                     startingPoint = [startingPoint[0] - value, startingPoint[1]];
//                 }
//                 break;
//             case 'D':
//                 if (array[startingPoint[0] + value][startingPoint[1]] === undefined) {
//                     while (array[startingPoint[0] + value][startingPoint[1]] === undefined) {
//                         startingPoint = [startingPoint[0] - 1 ,startingPoint[1]];
//                     }
//                     startingPoint = [startingPoint[0] + value, startingPoint[1]];
//                 } else {
//                     startingPoint = [startingPoint[0] + value, startingPoint[1]];
//                 }
//                 break;        
//             default:
//                 break;
//         }
//     });
//     return startingPoint;
// }

// const getNumberOfColumns = (lines) => {
//     let maxColumns = 0;
//     let counter = 0;
//     let previousDirection;
//     lines.forEach(line => {
//         const direction = line[0];
//         const value = Number(line[1]);
//         if (direction === 'R'){
//             if (previousDirection === 'R' || !previousDirection) {
//                 counter += value;
//                 counter = Math.abs(counter);
//             } else {
//                 counter -=value;
//                 counter = Math.abs(counter);
//             }
//             if (counter > maxColumns){
//                 maxColumns = counter;
//             }
//             previousDirection = 'R';
//         }
//         if (direction === 'L'){
//             if (previousDirection === 'U' || !previousDirection) {
//                 counter += value;
//             } else {
//                 counter -=value;
//             }
//             counter = Math.abs(counter);
//             previousDirection = 'L';
//         }
//     });
//     return maxColumns + 1;
// }

// const getNumberOfRows = (lines) => {
//     let maxRows = 0;
//     let counter = 0;
//     let previousDirection;
//     lines.forEach(line => {
//         console.log('MAX ROWS', maxRows);
//         const direction = line[0];
//         const value = Number(line[1]);
//         if (direction === 'D'){
//             console.log('DOWN');
//             console.log('value', value);
//             if (previousDirection === 'D' || !previousDirection) {
//                 counter += value;
//                 counter = Math.abs(counter);
//             } else {
//                 counter -=value;
//                 counter = Math.abs(counter);
//             }
//             if (counter > maxRows){
//                 maxRows = counter;
//             }
//             previousDirection = 'D';
//             console.log('counter', counter);
//         }
//         if (direction === 'U'){
//             console.log('UP');
//             console.log('value', value);
//             if (previousDirection === 'U' || !previousDirection) {
//                 counter += value;
//             } else {
//                 counter -=value;
//             }
//             counter = Math.abs(counter);
            
//             if (counter > maxRows){
//                 maxRows = counter;
//             }
//             previousDirection = 'U';
//             console.log('counter', counter);
//         }
//     });
//     return maxRows + 1;
// }

// const fillArray = () => {
//     // console.log(lines);
//     const rows = getNumberOfRows(lines);
//     const columns = getNumberOfColumns(lines);
//     // console.log('maxRow', rows);
//     // console.log('maxCol', columns);
//     const array = [];
//     for (let i = 0; i < rows; i++) {
//         array.push([]);
//         for (let j = 0; j < columns; j++) {
//             array[i].push('.');
//         }
//     }
//     return array;
// }

const proceedInstruction = (instruction, array, currentPoint) => {
    const instructionDirection = instruction[0];
    const instructionMove = instruction[1];
    switch (instructionDirection) {
        case 'R':
            for (let i = 0; i < instructionMove; i++) {
                // if (array[currentPoint[0]] === undefined || array[currentPoint[0]][currentPoint[1]] === undefined) break;
                array[currentPoint[0]][currentPoint[1]] = '#';
                currentPoint[1] = currentPoint[1] + 1;
            }
            break;
        case 'L':
            for (let i = 0; i < instructionMove; i++) {
                // if (array[currentPoint[0]] === undefined || array[currentPoint[0]][currentPoint[1]] === undefined) break;
                array[currentPoint[0]][currentPoint[1]] = '#';   
                currentPoint[1] = currentPoint[1] - 1;
            }            
            break;
        case 'U':
            // console.log('Insctruction', instruction);
            // console.log('Problem', currentPoint);
            // console.log('array', array.length, array[0].length);
            
            for (let i = 0; i < instructionMove; i++) {
                // if (array[currentPoint[0]] === undefined || array[currentPoint[0]][currentPoint[1]] === undefined) break;
                array[currentPoint[0]][currentPoint[1]] = '#';
                currentPoint[0] = currentPoint[0] - 1;
            }    
            break;
        case 'D':
            for (let i = 0; i < instructionMove; i++) {
                // if (array[currentPoint[0]] === undefined || array[currentPoint[0]][currentPoint[1]] === undefined) break;
                array[currentPoint[0]][currentPoint[1]] = '#';   
                currentPoint[0] = currentPoint[0] + 1;
            }    
            break;
        default:
            break;
    }
}

const colorage = () => {
    let currentPoint = [2500,2500];
    lines.forEach(instruction => {
        proceedInstruction(instruction, array, currentPoint);
    });
}

// let array = fillArray();

let array = new Array(5000).fill([]).map((l) => new Array(5000).fill('.'));

// ..##

const colorageInside = () => {
    array.forEach((row, rowIndex) => {
        console.log('ROW index', rowIndex);
        
        let canColorage = false;
        row.forEach((col, colIndex) => {
            // colIndex

            const value = array[rowIndex][colIndex];
            const nextValue = array[rowIndex][colIndex + 1];
            if (colIndex < row.lastIndexOf('#')) {
                if (value === '#' && ![undefined,'#'].includes(nextValue)) canColorage = !canColorage;
                if (value === '.' && canColorage) {
                    array[rowIndex][colIndex] = '+';
                }
            }
        });
    });
}

// .................................
// ............||||||||||||||||.....
// ............|.............|......
// ............|....||||.....|......
// ............|....|..|.....|......
// ............|....||||.....|......
// ............|.....||......|......
// ............|||||||||||||||.......
// .................................
// .................................


const colorageInsideInside = () => {
    array.forEach((row, rowIndex) => {
        console.log('ROW index', rowIndex);
        
        let canColorage = true;
        row.forEach((col, colIndex) => {
            const value = array[rowIndex][colIndex];
            const nextValue = array[rowIndex][colIndex + 1];
            // if (colIndex < row.lastIndexOf('#')) {
            if (value === '#' && ![undefined,'#'].includes(nextValue)) canColorage = !canColorage;
            if (value === '.' && canColorage) {
                array[rowIndex][colIndex] = 'O';
            }
            // }
        });
    });
}


const colorageOutside = (list) => {
    list.forEach((row) => {
        for (let i = 0; i < row.length; i++) {
            if (row[i] === '.'){
                row[i] = "O";
            } else {
                break;
            }
        }
        for (let i = row.length - 1; i >= 0; i--) {
            if (row[i] === '.'){
                row[i] = "O";
            } else {
                break;
            }
        }
    });
    return list;
}
colorage();

array = colorageOutside(array);
array = pivoteArray(array);
array = colorageOutside(array);
colorageInsideInside();
array = pivoteArray(array);
colorageInsideInside();

// colorage();
// colorageInside();
let newCounter = 0;
array.forEach((row, index) => {
    console.log('Index', index);
    row.forEach(col => {
        if (['#', '.'].includes(col)){
            newCounter ++;
        }
    });
});
console.log('result', newCounter)
// array.forEach((row) => {
//     const firstIndex = row.indexOf('#');
//     const lastIndex = row.lastIndexOf('#');

//     if (firstIndex === 0 || firstIndex >= 4500) console.log('first', row.indexOf('#'));
//     if (lastIndex === 0 || lastIndex >= 4500) console.log('last', row.lastIndexOf('#'));

// });
// console.log(array[2500]);
// console.log(array[4999].indexOf('#'));

// ..###.###.###
// ..#.#.#.#.#.#



// ba faut compter le nombre de # et de + c'est ça ?
// atta on l'a ç a

// const counterColorageInside = () => {
//     array.forEach((row, rowIndex) => {
//         let canColorage = true;
//         row.forEach((col, colIndex) => {
//             const value = array[rowIndex][colIndex];
//             const nextValue = array[rowIndex][colIndex + 1];
//             if (value === '+') counter ++;
//             if (value === '+' && ![undefined,'+'].includes(nextValue)) canColorage = !canColorage;
//             if (value === '+' && canColorage) {
//                 counter ++;
//                 array[rowIndex][colIndex] = '.';
//             }
//         });
//     });
// }
// colorageInside();
// array = pivoteArray(array);
// colorageInside();
// let newCounter = 0;
// array.forEach((row) => {
//     row.forEach(col => {
//         if (['#', '+'].includes(col)){
//             newCounter ++;
//         }
//     });
// });

// array = pivoteArray(array);

// array.forEach((row) => console.log(row));
// console.log('newCounter', newCounter);

//##..###
//#######

// #######
// #.....#
// ###...#
// ..#...#
// ..#...#
// ###.###
// #...#..
// ##..###
// .#....#
// .######

// [ "#", "#", "#", "#", "#", "#", "#" ]
// [ "#", "+", "+", "+", "+", "+", "#" ]
// [ "#", "#", "#", "+", "+", "+", "#" ]
// [ ".", ".", "#", "+", "+", "+", "#" ]
// [ ".", ".", "#", "+", "+", "+", "#" ]
// [ "#", "#", "#", "+", "#", "#", "#" ]
// [ "#", "+", "+", "+", "#", ".", "." ]
// [ "#", "#", ".", ".", "#", "#", "#" ]
// [ ".", "#", "+", "+", "+", "+", "#" ]
// [ ".", "#", "#", "#", "#", "#", "#" ]

// #######
// #######
// #######
// ..#####
// ..#####
// #######
// #####..
// #######
// .######
// .######

// boucle
// let goPourColoriage = false
// goPourColoriage = true;

// ....#####....######......
// ....#####....######......
// [ "#", "#", "#", ".", "#", "#", "#" ]

// #######
// #.....#
// ###...#
// ..#...#
// ..#...#
// ###.###
// #...#..
// ##..###.. -> marche pas 
// ah en fait c'est juste un index of / last index of et -> rien compris
//entre les deux on colorie ?
// tout a fait
//easyyyyyyyyyyyyyyy
// Je vais faire un exemple ou ton implem fonctionne pas

// #######.........
// #.....#.........
// ###...#....####
// ..#...#....#..#
// ..#...#....#..#
// ###.########..#
// #.............#
// ###############

// TADA tada? tada ca marche pas
// t'es sur ?
// absolument du coup t'as un truc à proposer ?
// je propose de stocker les valeur du contour de la boucle dans un tableau à part
// on parcours la ligne, on colorie à partir du moment où on tombe sur un point qui fait partie du contour, et on s'arrete lorsqu'on rencontre un nouveau
// comme ça pas de notion de pair/impair
//comment tu gères la fin de la ligne ?
// comment ca ?
// bein tu vas croiser un bord de ligne donc tu vas vouloir colorier après ? 
// genre ..#..#....
// tu colorie pas la, on va avoir une variable qui va nous donner le feu vert pour colorier en gros
// ..#..#...
//   G##S   | G pour Go et S pour Stop colorage 
// t'as capté ? et comment tu définis que c'est Go ou Stop ?

// Au début c'est Stop
// Tu parcours ta ligne, si tu rencontre un # qui fait partie du contour -> Go
// Si tu rencontre un autre # qui fait partie du contour -> Stop 
// Et cette logique jusqu'à la fin de la ligne
//mais les # ne font pas toujours partie du contour ?
// ba c'est pour ca que les # qu'on va colorier on va pas les ajouter dans le tableau qui recense les # du contour
//hate de voir en live du coup, pas hyper clair 
// ok, je reprendrai la main alors ?
// on peut tester ton implem d'abord si tu veux
//ça me va commençons par la tienne
// pourquoi on commencerai par l'implem qui marche ?
//pour te montrer qu'elle marche PAS XD
// ok !
// super l'experience du jeu sur liveshare en tout cas
// on passe un cap
//lol j'ai vu que t'as failli perdre 
//on devrait créer une app :p on gagnerait des milions c'est sur


// .#....#
// .######

// #######
// #######
// #######
// ..#####
// ..#####
// #######
// #####..
// #######
// .######
// .######

// array.forEach((row, rowIndex) => {
//     let canColorage = false;
//     row.forEach((col, colIndex) => {
//         const value = array[rowIndex][colIndex];
//         if (value === '#') canColorage = !canColorage;
//         // ..##..##..##
//         if (value === '.' && canColorage) array[rowIndex][colIndex] = '+'; 
//     });
// });