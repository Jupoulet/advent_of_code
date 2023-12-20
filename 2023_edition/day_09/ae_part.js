import recordDataDay9 from './puzzle_input.txt';
let lines = recordDataDay9.split('\n').map((line, index) => line.split(' ').map(number => parseInt(number)));
let result = 0;
const getNextLine = (line, indexLine) => {
    const nextLines = [];
    for (let i = 1; i < line[indexLine].length; i++) {
        //On construit la nextLine pour chaque valeur
        nextLines.push(line[indexLine][i] - line[indexLine][i-1]);    
    }
    //On push dans le tableau la nextline
    line.push(nextLines);
}
lines.forEach((line, indexLine) => {
    //Je la mets dans un tableau pour stocker ses évolutions
    line = [line];
    //Je fais la somme
    let sum = line.every((n) => n === 0);

    while (sum === false) {
        // Si la somme n'est pas égale à 0 je vais chercher nextline
        getNextLine(line, line.length-1);
        // Et je set sum selon la dernière ligne
        sum = line[line.length-1].reduce((acc, valeur) => acc + valeur, 0);
    }
    result += line.reduce((acc, l) => { return acc + l[l.length - 1]; }, 0);
    console.log('Final line', indexLine, line);
});
console.log('result',result);